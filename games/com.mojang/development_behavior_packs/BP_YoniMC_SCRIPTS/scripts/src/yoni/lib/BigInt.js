export class MyBigInt {
    #raw;
    get raw(){
        return Array.from(this.#raw);
    }
    constructor(num){
        if (num instanceof MyBigInt)
            this.#raw = num.valueOf();
        this.#raw = MyBigInt._getRawNumber(num);
    }
    valueOf(){
        return Array.from(this.#raw);
    }
    toString(){
        return MyBigInt._getNumberOfRawNumber(this.#raw);
    }
    
    static numberStrs = (function (){
        let a = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        for (let i = 0x80; i<=0xffff; i++){
            a.push(String.fromCharCode(i));
        }
        return Object.freeze(a);
    })();
    
    /**
     * 转化数字为一个数组
     */
    static _getRawNumber(theNumber, base=10, numbers = MyBigInt.numberStrs){
        theNumber = String(theNumber).toUpperCase();
        
        let rawNumber = [];
        
        
        let isNegative = false;
        
        if (theNumber.startsWith("-")){
            theNumber = theNumber.slice(1);
            isNegative = true;
        }
        
        for (let currentVal of theNumber){
            let idx = numbers.indexOf(currentVal);
            if (idx >= base){
                throw new Error("number base doesn't match");
            }
            if (idx === -1){
                throw new Error(`cover char '${currentVal}' failed`);
            }
            rawNumber.push(idx);
        }
        if (isNegative){
            rawNumber.unshift("-");
        }
        return rawNumber;
    }
    /**
     * @returns {string}
     */
    static _getNumberOfRawNumber(rawNumber, base=10, numbers = MyBigInt.numberStrs){
        let theNumber = "";
        
        let isNegative = false;
        if (rawNumber[0] === "-"){
            rawNumber.shift();
            isNegative = true;
        }
        
        for (let idx = 0; idx < rawNumber.length; idx++){
            let currentVal = rawNumber[idx];
            if (idx === 0
            && idx !== (rawNumber.length-1)
            && currentVal === 0){
                throw new Error("zero before number array");
            }
            if (!isFinite(currentVal)){
                throw new Error(`number not valid: ${currentVal}`);
            }
            if (base <= currentVal){
                throw new RangeError(`number '${currentVal}' bigger than base '${base}'`);
            }
            theNumber += numbers[currentVal];
        }
        theNumber = (theNumber === "") ? numbers[0] : theNumber;
        if (isNegative){
            theNumber = "-" + theNumber;
        }
        return theNumber;
    }
    static _splitRawNumber(rawNumber, divisor, base=10){
        let isNegative = false;
        if (rawNumber[0] === "-"){
            rawNumber.shift();
            isNegative = true;
        }
        
        let Quotient = []; //商
        let Remainder = 0; //余数
        
        for (let i = 0; i < rawNumber.length; i++){
            let currentVal = rawNumber[i];
            if (!isFinite(currentVal)){
                throw new RangeError(`Number not valid in ${i}: ${currentVal}`);
            }
            Quotient[i] = Math.floor(currentVal / divisor);
            Remainder = currentVal % divisor;
            //如果还有下一个值
            if (i+1 < rawNumber.length){
                rawNumber[i+1] = (rawNumber[i+1] + (Remainder * base));
            }
        }
        let allowZero = false;
        Quotient = Quotient.filter((n)=>{
            if (!isFinite(n)) return false;
            if (!allowZero && n === 0){
                return false;
            }
            allowZero = true;
            return true;
        });
        if (Quotient.length === 0){
            Quotient.push(0);
        }
        if (isNegative){
            Quotient.unshift("-");
        }
        return {
            Quotient,
            Remainder
        }
    }
    
    /**
     * @param {number|string} num - 数字
     * @param {number} base - 数字的新基底
     * @param {number} oldBase - 数字的旧基底
     * @param {string[]} numbers - 用于表示数字的一个字符串序列
     */
    static _coverBase(fromNumber, toNewBase, byOldBase=10, besideNumbers = MyBigInt.numberStrs){
        var rawNumArrOf_fromNumber = MyBigInt._getRawNumber(fromNumber, byOldBase);
        var retVal0 = [];
        
        var retVal1 = [];
        
        var numberToSplit = rawNumArrOf_fromNumber;
        
        do {
            retVal1 = MyBigInt._splitRawNumber(numberToSplit, toNewBase, byOldBase);
            retVal0.unshift(retVal1.Remainder);
            numberToSplit = retVal1.Quotient;
        } while (numberToSplit[0] !== 0);
        
        return MyBigInt._getNumberOfRawNumber(retVal0, toNewBase, besideNumbers);
    }
    
    static add(a, b){
        a = new MyBigInt(a);
        b = new MyBigInt(b);
        a = a.valueOf();
        b = b.valueOf();
        
    }
    static subtract(){}
    static multiply(){}
    static split(){}
    static equals(a, b){}
}

export { MyBigInt as BigInt };

globalThis.BN = MyBigInt;

export function toIntAddress(address, addrnums = addressNumbers){
    address = String(address);
    return Number(coverBase(address, 10, addrnums.length));
}
export function toAddress(int, addrnums = addressNumbers){
    int = Number(int | 0);
    if (int > Number.MAX_SAFE_INTEGER || int < 0) throw new Error("number out of range");
    let rt = coverBase(int, addrnums.length, 10);
    return rt;
}

let addressNumbers = (function (){
    let a = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (let i = 0x80; i<=0xffff; i++){
        a.push(String.fromCharCode(i));
    }
    return a;
})();
Object.freeze(addressNumbers);
export { addressNumbers };

/**
 * 分割数字
 */
export function getNumArr(num, base=10, numbers = addressNumbers){
    let arr = [];
    num = 字母变大写(num);
    let fs = false;
    if (num.startsWith("-")){
        num = num.slice(1);
        fs = true;
    }
    for (let n of num){
        let idx = numbers.indexOf(n);
        if (idx >= base) throw new Error("number base too big");
        if (idx === -1) throw new Error("cover "+n+" failed");
        arr.push(idx);
    }
    if (fs){
        arr.unshift("-");
    }
    return arr;
}
/**
 * @returns {string}
 */
export function getNum(numArr, base=10, numbers = addressNumbers){
    let num = "";
    let fs = false;
    if (numArr[0] === "-"){
        numArr.shift();
        fs = true;
    }
    for (let idx = 0; idx<numArr.length; idx++){
        let n = numArr[idx];
        if (idx === 0 && idx !== (numArr.length-1) && n === 0) throw new Error("zero before number array");
        if (!isFinite(n)) throw new Error("number not valid "+n);
        if (base <= n) throw new Error("number "+n+" bugger than base "+base);
        num += numbers[n];
    }
    let rt = (num === "") ? numbers[0] : num;
    if (fs){
        return ("-"+rt);
    }
    return rt;
}
export function splitNumberArr(numArr, sp, base=10){
    let Quotient = []; //商
    let Remainder = 0; //余数
    
    for (let i = 0; i < numArr.length; i++){
        if (!isFinite(numArr[i])) throw new Error("number not valid "+numArr[i]);
        Quotient[i] = Math.floor(numArr[i] / sp);
        Remainder = numArr[i] % sp;
        if (i+1 < numArr.length){
            numArr[i+1] = (numArr[i+1] + (Remainder * base));
        }
    }
    let allowZero = false;
    let newNumArr = Quotient.filter((n)=>{
        if (!isFinite(n)) return false;
        if (!allowZero && n === 0){
            return false;
        }
        allowZero = true;
        return true;
    });
    if (newNumArr.length === 0){
        newNumArr = [];
        newNumArr.push(0);
    }
    return {
        Quotient: newNumArr,
        Remainder
    }
}
/**
 * @param {number|string} num - 数字
 * @param {number} base - 数字的新基底
 * @param {number} oldBase - 数字的旧基底
 * @param {string[]} numbers - 用于表示数字的一个字符串序列
 */
export function coverBase(num, base, oldBase=10, numbers = addressNumbers){
    let oldNumArr = getNumArr(num, oldBase);
    
    let nDA = oldNumArr;
    let newNumArr = [];
    do {
        nDA = splitNumberArr(nDA, base, oldBase);
        newNumArr.unshift(nDA.Remainder);
        nDA = nDA.Quotient;
    } while (nDA[0] !== 0);
    
    return getNum(newNumArr, base);
}

function 字母变大写(str){
    str = String(str);
    let nstr = "";
    let requireToUpperCase = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
    for (let c in str){
        c = str[c];
        if (requireToUpperCase.includes(c))
            c = c.toUpperCase();
        nstr += c;
    }
    return nstr;
}
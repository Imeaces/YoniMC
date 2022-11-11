export function toAddress(int){
    let arr = [];
    let s, q = int;
    do {
        q = Math.floor(q / addressNumbers.length);
        s = q % addressNumbers.length;
        arr.push(s);
        
    } while (q !== 0);
    
}
export function toIntAddress(address){
    return Number(coverBase(address, 85, 10));
}
export function toAddress(int){
    return coverBase(int, 85, 10);
}

//需要注意的是，0~36代表的是0-9A-Z，在这之后还有a-z以及另外的字符，用于表示更高进制的数字
let addressNumbers = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","_","¡","¢","£","¤","¥","©","ª","«","¬","®","¯","°","±","²","³","µ","¶","¹","º","»","¼","½"];
export function getNumArr(num, base=10, numbers = addressNumbers){
    let arr = [];
    for (let n of String(num)){
        let idx = numbers.indexOf(n);
        if (idx >= base) throw new Error("number base too big");
        if (idx === -1) throw new Error("cover "+n+" failed");
        arr.push(idx);
    }
    return arr;
}
export function getNum(numArr, base=10, numbers = addressNumbers){
    let allowZero = false;
    let num = "";
    for (let n of numArr){
        if (!allowZero && n === 0) throw new Error("zero before number array");
        if (!isFinite(n)) throw new Error("number not valid "+n);
        if (base <= n) throw new Error("number "+n+" bugger than base "+base);
        allowZero = true;
        num += numbers[n];
    }
    return (num === "") ? numbers[0] : num;
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

const defaultNumbers = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "_",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "¡",
    "¢",
    "£",
    "¤",
    "¥",
    "©",
    "ª",
    "«",
    "¬",
    "®",
    "¯",
    "°",
    "±",
    "²",
    "³",
    "µ",
    "¶",
    "¹",
    "º",
    "»",
    "¼",
    "½"
];
function toNumber(oldNum, base=10, oldBase=10, numbers=defaultNumbers){
    let oldNumbers = Array.from(numbers).splice(0, oldBase);
    let newNumbers = Array.from(numbers).splice(0, base);
    
    let oldNum = String(oldNum);
    let newNum = "";
    let oldNumArr = [];
    let newNumArr = oldNumArr;
    
    for (let n of oldNum){ 
        let idx = oldNumbers.indexOf(n);
        oldNumArr.push(idx);
    }
    
    for (let i = newNumArr.length; i > 0; i--){
        let idx = newNumArr[i];
        let nextIdx = (i===0) ? -1 : newNumArr[i-1];
        
        while (nextIdx >= 0 && idx < base){
            idx += oldBase;
            nextIdx -= 1;
        }
        while (idx >= base){
            idx -= oldBase;
            nextIdx += 1;
        }
        newNumArr[i] = idx;
        (i!==0) ? newNumArr[i-1] = nextIdx : 0;
    }
    let canBelowZero = true;
    let canBelowOne = false;
    for (let idx of newNumArr){
        if (idx < 0){
            if (!canBelowZero){
                throw new Error("cannot below zero");
            }
            continue;
        }
        canBelowZero = false;
        if (!canBelowOne && idx === 0) continue;
        canBelowOne = true;
        newNum += newNumbers[idx];
    }
    return newNum === "" ? newNumbers[0] : newNum;
}

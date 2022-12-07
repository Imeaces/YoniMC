import { Scoreboard } from "yoni/scoreboard.js";


// length 最小值为1
// index 最小值为 0
/**
 * an array-like object that contains a set of number, each number means 1 byte
 * @typedef IByteArray
 * @property {number} length - length of byte array
 */
class ByteBlock {
    #identity;
    #scoreboardObjective;
    #modCount = 0;
    get identity(){
        return this.#identity;
    }
    get length(){
        return this.#scoreboardObjective.getScore("length") ?? 0;
    }
    set length(v){
        this.#scoreboardObjective.setScore("length", v);
    }
    constructor(identity, usedLength = 0){
        this.#scoreboardObjective = Scoreboard.getObjective(identity, true);
    }
    /**
     * @param {ArrayLike<number>} byteArray
     * @param {number} startIndex
     * @returns {Promise<void>} 返回一个Promise，在写入任务完成后被resolve，否则被拒
     */
    async write(byteArray, startIndex = this.length, length = byteArray.length){
        let fourthIndexOfStartIndex = ByteBlock.getFourthIndexOfIndex(startIndex);
        let fourthIndex = fourthIndexOfStartIndex;
        let fourBytes = [];
        let endIndex = startIndex + length;
        let fourthIndexOfEndIndex = ByteBlock.getFourthIndexOfIndex(endIndex);
        let byteArrayIndex = 0;
        
        //如果未对齐4B
        //提前在fourBytes加上前边的bytes的内容
        if (fourthIndexOfStartIndex * 4 !== startIndex){
            
            //先获取起始4Index位置的4Bytes
            let inStartFourthIndexFourBytes = this.read4Bytes(fourthIndexOfStartIndex);
            
            //计算已经使用的长度
            let usedLength = startIndex % 4;
            
            //复制已使用的长度
            switch (usedLength){
                case 3:
                    fourBytes[2] = inStartFourthIndexFourBytes[2];
                case 2:
                    fourBytes[1] = inStartFourthIndexFourBytes[1];
                case 1:
                    fourBytes[0] = inStartFourthIndexFourBytes[0];
                    break;
                default:
                    throw new InternalError();
            }

            //如果整个写入的内容不足以覆盖一整个4B
            if (fourthIndexOfStartIndex === fourthIndexOfEndIndex) {
                //从byteArray添加byte直到补充完整，或没有更多字节
                while (fourBytes.length !== 4 && byteArrayIndex < length){
                    fourBytes[fourBytes.length] = byteArray[byteArrayIndex];
                    byteArrayIndex += 1;
                }
                //如果未补充完整，从旧的4B中复制字节
                while (fourBytes.length !== 4){
                    fourBytes[fourBytes.length] = inStartFourthIndexFourBytes[fourBytes.length];
                }
            }
        }
        
        let allPromise = [];
        while (byteArrayIndex <= length){
            //当开始写入最后一个字节时
            //如果不足4字节，用0补齐4字节
            if (byteArrayIndex === length){
                while (fourBytes.length !== 4){
                    fourBytes[fourBytes.length] = 0;
                }
            }
            //当充满4B,写入
            if (fourBytes.length === 4){
                let promise = this.write4Bytes(fourBytes, fourthIndex);
                allPromise[allPromise.length] = promise;
                fourthIndex += 1;
                fourBytes.length = 0;
            }
            //向4B推入1字节
            fourBytes[fourBytes.length] = byteArray[byteArrayIndex];
            byteArrayIndex += 1;
        }
        return Promise.all(allPromise).then(() => { });
    }

    /**
     * 
     * @param {ArrayLike<number>} fourBytes - an array-like object that contains 4 elements of number, each number is range from 0 to 255
     * @param {number} fourthIndex - where will the fourBytes be written, default append to the end of byteblock
     * @returns {Promise<number>}
     */
    write4Bytes(fourBytes, fourthIndex = null){
        this.#modCount ++;
        if (fourthIndex === null){
            fourthIndex = ByteBlock.getFourthIndexOfIndex(this.length + 4);
            this.setLastFourthIndex(fourthIndex);
        }
        let name = ByteBlock.encodeName(fourthIndex);
        let num = enc(fourBytes);
        let score = ByteBlock.transformNumberToScore(num);
        return this.#scoreboardObjective.postSetScore(name, score);
    }
    setLastIndex(idx){
        this.length = (idx + 1);
    }
    setLastFourthIndex(fourthIndex){
        let index = ByteBlock.getStartIndexOfFourthIndex(fourthIndex);
        this.setLastIndex(index + 3);
    }
    /**
     * @ignore
     * @returns {Generator<number>}
     */
    * readAll (){
        throw new Error("not implemented");
        let modCount = this.#modCount;
        let length = this.length;
        let fourBytes = null;
        let fourIdx = 0;
        for (let idx = 0;
            idx < length;
            idx ++
        ){
            if (this.#modCount !== modCount){
                throw new Error("byte changed when read");
            }
            if (idx % 4 === 0){
                fourBytes = this.read4Bytes(fourIdx++);
            }
            yield fourBytes.shift();
        }
    }
    /**
     * @ignore
     */
    * readAllWithWrite (){
        throw new Error("not implemented");
    }
    read4Bytes(fourthIndex){
        let name = ByteBlock.encodeName(fourthIndex);
        let score = this.#scoreboardObjective.getScore(name);
        let num = ByteBlock.transformScoreToNumber(score);
        return dec(num);
    }
    static encodeName(idx){
        return String(idx).replaceAll(/(\d)/g, "§$1");
    }
    static decodeName(name){
        return Number(name.replaceAll("§", ""));
    }
    static getStartIndexOfFourthIndex(idx){
        return (idx * 4);
    }
    static getFourthIndexOfIndex(idx){
        return ((idx - (idx % 4)) / 4);
    }
    static transformNumberToScore(idx){
        return (idx + 2147483648);
    }
    static transformScoreToNumber(idx){
        return (idx - 2147483648);
    }
    static transformIndexToScoreName(idx){
        return ByteBlock.encodeName(ByteBlock.transformIndexToScore(idx));
    }
}

/**
 * 
 * @param {number[]} fourBytes 
 * @returns {number}
 */
function enc(fourBytes){
    let [ b0, b1, b2, b3 ] = fourBytes;
    return b0 * 16777216 + b1 * 65536 + b2 * 256 + b3;
}
function dec(b){
    let b0 = b >>> 24;
    let b1 = ( b % 16777216 ) >>> 16;
    let b2 = ( b % 65536 ) >>> 8;
    let b3 = ( b % 256 ) >>> 0;
    return [b0, b1, b2, b3];
}
/* 然后我发现最上边的那个更快
function dec(b){
   let b0, b1, b2, b3;
   let c0, c1;
   
   c0 = b % 16777216;
   b0 = (b - c0) / 16777216;
   
   c1 = c0 % 65536;
   b1 = (c0 - c1) / 65536;
   
   b3 = c1 % 256;
   b2 = (c1 - b3) / 256;
   
   return [b0, b1, b2, b3];
}
*/
/* 留着纪念一下，下边这个的速度理论上比上边的要慢
   可能用的变量比较少是一个好的地方？
function dec(int){
   let fourBytes = [];
   let b, c;
   
   fourBytes.unshift(int % 256);
   
   b = int - fourBytes[0];
   c = b % 65536;
   fourBytes.unshift(c / 256);
   
   b = b - c;
   c = b % 16777216;
   fourBytes.unshift(c / 65536);
   
   b = b - c;
   fourBytes.unshift(b / 16777216);
   
   return fourBytes;
}
*/
/*
4294967296

255, 254, 253, 252
4294901244

//encode
255 * (2**24)
+ 254 * (2**16)
+ 253 * (2**8)
+252*/


/* 建议别看，虽然我在这算了大半天，但我也不知道它是怎么运行的，只是凑巧算出来的
//decode
4294901244 % (2**8) = 252 // byte3

4294901244 - 252 = 4294900992
4294900992 % (2**16) = 64768
64768 / (2**8) = 253 // byte2

4294900992 - 64768 = 4294836224
4294836224 % (2**24) = 16646144
16646144 / (2**16) = 254 // byte1

4294836224 - 16646144 = 4278190080
4278190080 / (2**24) = 255 //byte0
*/

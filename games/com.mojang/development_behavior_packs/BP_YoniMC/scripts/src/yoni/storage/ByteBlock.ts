// @ts-nocheck
import { ScoreboardObjectiveEntryIndexMapper } from "./n0_block_device_raw_addr.js";

let cTime = 0;

// length 最小值为1
// index 最小值为 0
/**
 * an array-like object that contains a set of number, each number means 1 byte
 * @typedef IByteArray
 * @property {number} length - length of byte array
 */
export class ByteBlock {
    
    #identity;
    #mapper;
    
    get identity(){
        return this.#identity;
    }
    get length(){
        return this.#mapper.length * 4;
    }
    set length(v){
        this.#mapper.length = parseInt(v / 4);
    }
    close(){
        throw new Error("Unknown file.");
    }
    constructor(blockId, mapper = new ScoreboardObjectiveEntryIndexMapper(blockId)){
        this.#identity = blockId;
        this.#mapper = mapper;
    }
    
    #offset = "0";
    
    static getPositionBetweensPosition4Range(
        position: number,
        length: number,
        totalLength: number
    ): Position4Range {
    
        let object = { range: [0, 0], startOffset: 0, endOffset: 0, length: length };
        
        let start = position;
        
        let end = position + length;
        
        object.range[0] = parseInt(start / 4);
        
        object.range[1] = parseInt(end / 4);
        
        if (object.range[1] > totalLength)
            throw new RangeError(`end index ${object.range[1]} > totalLength ${totalLength}`);
        
        object.startOffset = start - object.range[0] * 4;
        
        object.endOffset = object.range[1] * 4 - end;
        
        if (totalLength === object.range[1] && object.endOffset !== 0)
            throw new RangeError(`end index reached: ${object.range[1]}, unable to allocate more block`);
        
        return object;
    }
    
    async * readBlockAsync(position, length, blockLength = 128): number[]{
        let p4range = ByteBlock.getPositionBetweensPosition4Range(position, length, this.#mapper.length);
        
        let result = [];
        
        let startOffset = p4range.startOffset;
        
        for (let p4 = p4range.range[0]; p4 <= p4range.range[1]; p4++){
            let b4arr = this.#read4(p4);
            let idx = startOffset;
            startOffset = 0;
            let endIdx = 4;
            if (p4 === p4range.range[1]){
                if (p4range.endOffset === 0)
                    break;
                endIdx += p4range.endOffset;
            }
            let barr = b4arr.slice(idx, endIdx);
            for (let i = 0; i < barr.length; i++){
                result.push(barr[i]);
            }
            if (result.length >= blockLength){
                yield result;
                result = new Array();
            }
        }
        if (result.length !== 0)
            yield result;
    }
    
    async * readAsync(position, length){
        let p4range = ByteBlock.getPositionBetweensPosition4Range(position, length, this.#mapper.length);
        
        let result = [];
        
        let startOffset = p4range.startOffset;
        
        for (let p4 = p4range.range[0]; p4 <= p4range.range[1]; p4++){
            let b4arr = this.#read4(p4);
            let idx = startOffset;
            startOffset = 0;
            let endIdx = 4;
            if (p4 === p4range.range[1]){
                if (p4range.endOffset === 0)
                    break;
                endIdx += p4range.endOffset;
            }
            let barr = b4arr.slice(idx, endIdx);
            for (let i = 0; i < barr.length; i++){
                yield barr[i];
            }
        }
    }
    
    read(position: number, length: number): number[]{
        let p4range = ByteBlock.getPositionBetweensPosition4Range(position, length, this.#mapper.length);
        
        let result = [];
        
        let startOffset = p4range.startOffset;
        
        for (let p4 = p4range.range[0]; p4 <= p4range.range[1]; p4++){
            let b4arr = this.#read4(p4);
            let idx = startOffset;
            startOffset = 0;
            let endIdx = 4;
            if (p4 === p4range.range[1]){
                if (p4range.endOffset === 0)
                    break;
                endIdx += p4range.endOffset;
            }
            let barr = b4arr.slice(idx, endIdx);
            for (let i = 0; i < barr.length; i++){
                result.push(barr[i]);
            }
        }
        
        return result;
    }
    write(buffer, position, length = buffer.length): void{
        let p4range = ByteBlock.getPositionBetweensPosition4Range(position, length, this.#mapper.length);
        
        let { startOffset, endOffset } = p4range;
        
        let idx = 0;
        
        for (let p4 = p4range.range[0]; p4 <= p4range.range[1]; p4++){
            let endIdx = 4;
            
            let b4arr;
            if (startOffset !== 0){
                b4arr = this.#read4(p4);
            } else if (p4 === p4range.range[1]){
                if (endOffset === 0){
                    break;
                }
                endIdx += endOffset;
                b4arr = this.#read4(p4);
            } else {
                b4arr = [];
            }
            for (let i = startOffset; i < endIdx; i++){
                b4arr[i] = buffer[idx++];
            }
            
            startOffset = 0;
            this.#mod4(p4, b4arr);
        }
    }
    
    trim(position, length){
    }
    trim4(position4){
        delete this.#mapper[position4];
    }
    
    seek(offset, whence){}
    putByte(byte){}
    getByte(){}
    tell(){}
    tello(){}
    eof(){}
    flush(){}
    close(){}
    
    /**
     * 
     * @param fourBytesArray - an array-like object that contains 4 elements of number, each number is range from 0 to 255
     * @param position4 - where will the fourBytes be written, default append to the end of byteblock
     */
    mod4(
        position4: number,
        fourBytesArray: [number, number, number, number]
    ){
        
        if (arguments.length !== 2){
            throw new Error(`require 2 argus, but found ${arguments.length} argus`);
        }
        
        if (this.#mapper.length <= position4 || position4 < 0){
            throw new RangeError("position4 out of length");
        }
        
        this.#mod4(position4, fourBytesArray);
    }
    #mod4(
        position4: number,
        fourBytesArray: [number, number, number, number]
    ){
        this.#mapper[position4] = (enc(fourBytesArray) >> 0);
    }
    read4(position4: number){
        
        if (arguments.length !== 1){
            throw new Error(`require 1 argus, but found ${arguments.length} argus`);
        }
        
        if (this.#mapper.length <= position4 || position4 < 0){
            throw new RangeError("position4 out of length");
        }
        
        return this.#read4(position4);
        
    }
    #read4(position4: number){
        let result = dec(this.#mapper[position4] >>> 0);
        
        return result;
    }
    
}

interface Position4Range {
    range: [ number, number ]
    startOffset: number
    endOffset: number
    length: number
}

/**
 * 你可能想不到，这个函数的逻辑是ChatGPT想出来的
 * 这个函数的作用是将4个byte编码成一个int
 * 按位与运算符“|”会将超过32位的数字丢弃其最高有效位
 * （实际上我没明白原理）
 * 不过我不确定这个东西的性能怎么样
 * （然后我发现它是有符号的，所以改了一下）
 * （然后我发现它兼容不太行，又改了一下）
 * @param {number[]} fourBytes 
 * @returns {number}
 */
function enc(fourBytes){
    let b0 = fourBytes[0];
    let b1 = fourBytes[1];
    let b2 = fourBytes[2];
    let b3 = fourBytes[3];
    return (b0 << 24 | b1 << 16 | b2 << 8 | b3) >>> 0;
}
/*旧函数，只用作参考。比我厉害的人实在太多了
function enc(fourBytes){
    let [ b0, b1, b2, b3 ] = fourBytes;
    return b0 * 16777216 + b1 * 65536 + b2 * 256 + b3;
}
*/
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

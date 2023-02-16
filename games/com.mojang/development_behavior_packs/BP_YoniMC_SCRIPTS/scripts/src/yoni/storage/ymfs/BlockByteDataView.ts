import { B4toInt, B4toUint, UintToB4, IntToB4 } from "./codec.js";

export class BlockByteDateView {
    
    #block: Array<number>;
    
    get length(){
        return this.#block.length * 4;
    }
    constructor(block: Array<number>){
        this.#block = block;
    }
    
    #offset = "0";
    
    static getPositionBetweensPosition4Range(
        position: number,
        length: number,
        totalLength: number
    ): Position4Range {
    
        let object: Position4Range = { range: [0, 0], startOffset: 0, endOffset: 0, length: length };
        
        let start = position;
        
        let end = position + length;
        
        // @ts-ignore
        object.range[0] = parseInt(start / 4);
        
        // @ts-ignore
        object.range[1] = parseInt(end / 4);
        
        if (object.range[1] > totalLength)
            throw new RangeError(`end index ${object.range[1]} > totalLength ${totalLength}`);
        
        object.startOffset = start - object.range[0] * 4;
        
        object.endOffset = object.range[1] * 4 - end;
        
        if (totalLength === object.range[1] && object.endOffset !== 0)
            throw new RangeError(`end index reached: ${object.range[1]}, unable to allocate more block`);
        
        return object;
    }
    
    async * readBlockAsync(position: number, length: number, blockLength: number = 128): AsyncGenerator<number[]> {
        let p4range = BlockByteDateView.getPositionBetweensPosition4Range(position, length, this.#block.length);
        
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
    
    async * readAsync(position: number, length: number): AsyncGenerator<number> {
        let p4range = BlockByteDateView.getPositionBetweensPosition4Range(position, length, this.#block.length);
        
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
    
    read(position: number, length: number): number[] {
        let p4range = BlockByteDateView.getPositionBetweensPosition4Range(position, length, this.#block.length);
        
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
    write(buffer: number[], position: number, length: number = buffer.length): void {
        let p4range = BlockByteDateView.getPositionBetweensPosition4Range(position, length, this.#block.length);
        
        let { startOffset, endOffset } = p4range;
        
        let idx = 0;
        
        for (let p4 = p4range.range[0]; p4 <= p4range.range[1]; p4++){
            let endIdx = 4;
            
            let b4arr: number[];
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
            // @ts-ignore
            this.#mod4(p4, b4arr);
        }
    }
    
    trim(position: number, length: number){
    }
    trim4(position4: number){
        delete this.#block[position4];
    }
    
    seek(offset: number, whence: any){}
    putByte(byte: number){}
    getByte(){}
    tell(){}
    tello(){}
    eof(){}
    flush(){}
    close(){
        throw new Error("Unknown file.");
    }
    
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
        
        if (this.#block.length <= position4 || position4 < 0){
            throw new RangeError("position4 out of length");
        }
        
        this.#mod4(position4, fourBytesArray);
    }
    read4(position4: number){
        
        if (arguments.length !== 1){
            throw new Error(`require 1 argus, but found ${arguments.length} argus`);
        }
        
        if (this.#block.length <= position4 || position4 < 0){
            throw new RangeError("position4 out of length");
        }
        
        return this.#read4(position4);
        
    }
    
    #mod4(
        position4: number,
        fourBytesArray: [number, number, number, number]
    ){
        this.#block[position4] = B4toInt(fourBytesArray);
    }
    #read4(position4: number){
        return IntToB4(this.#block[position4]);
    }
}

interface Position4Range {
    range: [ number, number ]
    startOffset: number
    endOffset: number
    length: number
}

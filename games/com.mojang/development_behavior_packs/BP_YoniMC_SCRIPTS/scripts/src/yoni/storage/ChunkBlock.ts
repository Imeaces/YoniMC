import { Minecraft } from "../basis.js";
import { Chunk } from "./Chunk.js";

export class ChunkBlock {
    chunk: Chunk;
    index: number;
    constructor(chunk: Chunk, index: number){
        this.chunk = chunk;
        this.index = index;
    }
    
    /**
     * 将字符串写入到此对象代表的块。
     * @param {string} dataStr - 要存储在此块上的数据字符串。
     */
    setDataStr(dataStr: string){
        let mitem = new Minecraft.ItemStack("minecraft:stone");
        mitem.setLore([dataStr]);
        this.chunk.mcontainer.setItem(this.index, mitem);
    }
    /**
     * 读取块上存入的字符串。
     * @returns {string} 此块上存储的数据字符串。
     */
    getDataStr(){
        let mitem = this.chunk.mcontainer.getItem(this.index);
        
        if (mitem == null) return "";
        
        let dataStr = mitem.getLore()[0];
        return dataStr;
    }
    
    /**
     * 将数据写入到此对象代表的块。
     * @param {ArrayBuffer} buffer - 要存储在此块上的数据。
     */
    setData(buffer: ArrayBuffer){
        let view = new Uint8Array(buffer);
        let dataStr = "";
        view.forEach(byte => {
            dataStr += String.fromCharCode(byte);
        });
        let mitem = new Minecraft.ItemStack("minecraft:stone");
        mitem.setLore([dataStr]);
        this.chunk.mcontainer.setItem(this.index, mitem);
    }
    
    /**
     * 读取块上的数据。
     * @param {ArrayBuffer} [buffer] - 若指定，将此块上的数据写入此缓冲区。
     * @returns {ArrayBuffer} 此块上存储的数据。
     */
    getData(buffer?: ArrayBuffer): ArrayBuffer {
        //读取数据字符串
        let mitem = this.chunk.mcontainer.getItem(this.index);
        
        if (mitem == null){
            if (buffer instanceof ArrayBuffer){
                return buffer;
            } else {
                buffer = new ArrayBuffer(0);
            }
        }
        
        let dataStr = mitem.getLore()[0];
        
        //将字符串转换为一系列数字
        let data: number[] = dataStr.split("")
            .map((c: string) => c.codePointAt(0) as number);
        
        //若指定，将数据截断为缓冲区的长度，否则创建新的缓冲区
        if (buffer instanceof ArrayBuffer){
            if (buffer.byteLength < data.length){
                data.length = buffer.byteLength;
            }
        } else {
            buffer = new ArrayBuffer(data.length);
        }
        
        //通过视图向缓冲区写入数据
        let view = new Uint8Array(buffer);
        
        data.forEach((byte, index) => {
            view[index] = byte;
        });
        
        return buffer;
    }
}

class UUID {
    static NIL_UUID_STR = "00000000-0000-0000-0000-000000000000";
    static NIL_UUID = null;
    static UUID_CHARS = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ];
    static randomUUID(){
        let uuidStr = UUID.NIL_UUID_STR;
        while (uuidStr === UUID.NIL_UUID_STR){
            uuidStr = UUID.NIL_UUID_STR.replaceAll(/0/g, ()=>{
                //随机部分还有一点问题，这个随机方法可能会导致某些字符出现概率小于其他字符
                let charPoint = Math.round(Math.random()*15);
                return UUID.UUID_CHARS[charPoint];
            });
        }
        return new UUID(uuidStr);
    }
    static fromInt(int){
        // -2^31 ~ 2^31-1
        throw new Error("not implemented");
    }
    static fromUUID(u){
        return new UUID(u);
    }
    static clone(u){
        return new UUID(u);
    }
    #uuidSequene = [];
    get uuidSequene(){
        return Array.from(this.#uuidSequene);
    }
    toJSON(){
        return JSON.stringify({uuid: this.toString().toLowerCase() });
    }
    clone(){
        return new UUID(this);
    }
    toString(){
        let str = "";
        this.#uuidSequene.forEach((part)=>{
            str += part;
            if (str.length !== 36)
                str += "-";
        });
        return str.toUpperCase();
    }
    toLocaleString(){
        return "uuid:"+this.toString();
    }
    constructor(targetUUID, allowNil=false){
        if (typeof targetUUID === "string"){
            let matches = targetUUID.toUpperCase().match(/^([0-9A-F]{8})(?:-|[\s]*)?([0-9A-F]{4})(?:-|[\s]*)?([0-9A-F]{4})(?:-|[\s]*)?([0-9A-F]{4})(?:-|[\s]*)?([0-9A-F]{12})$/m);
            if (matches === null || matches.includes(undefined)){
                throw new Error("uuid syntax error: "+targetUUID);
            }
            this.#uuidSequene = matches.slice(1, 6);
            if (!allowNil && this.toString() === UUID.NIL_UUID_STR){
                throw new Error("Nil UUID not allowed");
            }
        } else if (targetUUID instanceof UUID){
            let sequene = targetUUID.uuidSequene;
            this.#uuidSequene = Array.from(sequene);
        } else {
            throw new Error("unknown targetUUID, did you mean random new uuid? use UUID.randomUUID() to get one");
        }
    }
}
UUID.NIL_UUID = new UUID(UUID.NIL_UUID_STR, true);
export default UUID;
export { UUID };
/*
1 2089 2581 9614 6291 7470 6176n
2^5^16
*/

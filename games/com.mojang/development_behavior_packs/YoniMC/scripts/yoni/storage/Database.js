/*所有数据使用记分板存储
使用以scbdb开头的记分项
为了最高性能，尽量不引入其它的东西（毕竟本来就不是直接存到文件里）
也不做某些安全性判断，不然影响性能
就是不太安全
*/
import * as mc from "mojang-minecraft";

let scbdb;
let initialed = false;
let overworld = mc.world.getDimension(mc.MinecraftDimensionTypes.overworld);

class Scb {
    static set(n, o, d){
        overworld.runCommand(`scoreboard players set ${n} ${o.id} ${d}`);
    }
    static get(n, o){
        (`scoreboard players set ${n} ${o.id} ${d}`);
    }
}

function getObj(id){
    if (id.constructor !== String)
        throw TypeError("only string is allowed");
    else if(id.length < 1)
        throw Error("zero-length id");
    
    let obj = mc.world.scoreboard.getObjective("scbdb:"+id);
    if (obj === undefined)
        obj = mc.world.scoreboard.addObjective("scbdb:"+id);
    
    return obj;
}

function getByteLength(obj){
    //理论上，每个记分项可以存储的字节数是1073741824，也就是1G
    let l = obj.getScore("db:btL");
    if (l === undefined)
        Sset("db:btL", obj, 0);
}

function initialDataScoreboard(){
    initialed = true;
    let obj = getObj("db");
    scbdb = obj;
}

export default class Database {
    static getDataFromEntity(entity) {
    }
    static getDatabase(name) {
    }
    static createDatsbase(name) {
    }
}

export { Database };

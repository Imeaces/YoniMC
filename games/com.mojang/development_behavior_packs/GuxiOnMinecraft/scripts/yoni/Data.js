import { log } from "./yoni-lib.js";
class Data {
  static database = {};
  static put(obj,val){
    log("设置 " + obj + " = " + val);
    this.database[obj] = val;
  }
  static get(obj){
    return this.database[obj];
  }
}
export { Data };

import {
  events,
  log as LOG
} from "../lib/yoni-lib.js";

export default class Callback {
  static functions = {};
  static id = 0;
  
  static add(...args){
    return this.addCallback(...args);
  }
  static addCallback(caller, func, ...args) {
    if (!events[caller]){
      LOG(new ReferenceError("不存在事件" + caller), "ERROR");
      throw new ReferenceError("不存在事件" + caller);
    }
    if (typeof func == "function"){
      let id = "func" + this.id;
      this.functions[id] = func;
      events[caller].subscribe((eventData, ...args) => {
        return Callback.invokeCallback(id, eventData, ...args);
      }, ...args);
    } else {
      LOG(new TypeError("回调需要是一个函数"), "ERROR");
      throw new TypeError("回调需要是一个函数");
    }
    LOG("为"+caller+"添加了回调，ID: "+this.id);
    return this.id ++;
  }
  static removeCallback(id) {
    let funcid = "func" + id;
    if (this.functions[funcid]){
      this.functions[funcid] = undefined;
      LOG("移除了回调，ID: "+id);
    }
  }
  static invokeCallback(id, eventData, ...args){
    let callFunction = this.functions[id];
    if (callFunction && typeof callFunction == "function"){
      try {
        return callFunction(eventData, ...args);
      } catch(err){
        LOG(`[Callback:${id}]${err}`, "WARN");
      }
    }
    return;
  }
}

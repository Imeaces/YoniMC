import Logger from "scripts/lib/yoni/Logger.js";
import StatusCode from "scripts/lib/yoni/StatusCode.js";
import { MinecraftEvents } from "scripts/lib/yoni/events.js";

let LOG = new Logger("Callback");
LOG.maxLength = 100;

export default class Callback {
  static #callbacks = [];
  
  /**
   * add a new callback function for specific event
   * @param {EventIdentity} caller - the event identify 
   * @param {Function} callback - callback function
   * @params args - any arguments you want, they will be transmitted directly 
   * @return {number} - id of the callback
   */
  static addCallback(caller, callback, ...args) {
    LOG.debug("尝试添加回调");
    LOG.debug(callback);
    if (!MinecraftEvents[caller]){
      let msg = `无法添加，因为不存在事件${caller}`;
      
      LOG.trace(msg);
      return {
        statusCode: StatusCode.error,
        message: msg
      };
    }
    if (typeof callback != "function"){
      let msg = "无法添加，因为回调不是函数"
      
      LOG.trace(msg);
      return {
        statusCode: StatusCode.error,
        message: msg
      };
    }
    
    let id = this.#callbacks.push(callback);
    MinecraftEvents[caller].subscribe(
      (event, ...args)=>{ return Callback.invokeCallback(id, event, ...args); },
      ...args
    );
    LOG.debug("为"+caller+"添加了回调，ID: "+id);
    return {
      statusCode: StatusCode.succeed,
      id: id
    };
  }
  static removeCallback(id) {
    LOG.debug("尝试移除ID为"+id+"的回调");
    if (this.#callbacks[id]){
      this.#callbacks[id] = undefined;
      LOG.debug("移除了回调，ID: "+id);
      return {
        statusCode: StatusCode.succeed,
        id: id
      };
    } else {
      let msg = "无法移除ID为"+id+"的回调，可能此回调不存在，又或许已经被移除"
      LOG.trace(msg);
      return {
        statusCode: StatusCode.fail,
        message: msg
      };
    }
  }
  static invokeCallback(id, event, ...args){
    LOG.debug("尝试调用ID为"+id+"的回调");
    let callback = this.#callbacks[id];
    if (typeof callback == "function"){
      try {
        return callback(event, ...args);
      } catch(err){
        LOG.trace("调用ID为"+id+"的回调时出现错误");
        LOG.trace(err);
      }
    } else {
      LOG.trace("无法调用ID为"+id+"的回调，可能此回调已取消");
    }
    return;
  }
}

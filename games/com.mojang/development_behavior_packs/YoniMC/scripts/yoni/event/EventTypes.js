import { VanillaEvents as MinecraftEvents, SystemEvents } from "yoni/basis.js";
import { debug } from "yoni/config.js";
import { Logger } from "yoni/util/Logger.js";
import { EventListener } from "./EventListener.js";

/**
 * 事件管理
 * 不建议移除事件，由于移除事件的机制为设空回调，导致移除事件并不是真正的移除，大量移除事件导致事件遗留，可能影响性能
 * 可能会在以后优化
 */

const logger = new Logger("Event");

/* 与事件有关的一些函数 */

export function getIdentifierInfo(identifier){
    if (typeof identifier !== "string"){
        throw new TypeError("Not a string identifier");
    }
    let namespace = null;
    let name = null;
    let info = identifier.match(/^(?:(\S+):)?(\S+)$/m);
    if (info === null){
        throw new Error("Invalid identifier: "+identifier);
    } else if (info[2] === undefined){
        throw new Error("Could not find a name in identifier: "+identifier);
    }
    if (info[1] !== undefined){
        namespace = info[1];
    }
    name = info[2];
    return { id: identifier, name, namespace }
}

/* 事件注册部分 */
//定义存储已注册事件的地图
const registeredEventTypes = new Map();

//用于记录 已延迟的 事件的监听 的注册 的地图
const waitingEventRegisterMap = new Map();
export class DelayedListener {
    static add(eventTypeIdentifier, callback){
        let idInfo = getIdentifierInfo(eventTypeIdentifier);
        if (!waitingEventRegisterMap.has(idInfo.id)){
            waitingEventRegisterMap.set(idInfo.id, []);
        }
        let list = waitingEventRegisterMap.get(idInfo.id);
        list.push(callback);
    }
    static async register(eventType){
        if (EventTypes.has(eventType) && waitingEventRegisterMap.has(eventType)){
            let list = waitingEventRegisterMap.get(eventType);
            waitingEventRegisterMap.delete(eventType);
            list.forEach((callback)=>{
                callback();
            });
        } else {
            throw new Error("unknown eventType"+eventType);
        }
    }
}

function getNamespaceEventTypesMap(namespace){
    if (namespace === null){
        let rtmap = new Map();
        for (let map of registeredEventTypes.values()){
            for (let key of map.keys()){
                if (rtmap.has(key)){
                    continue;
                }
                rtmap.set(key, map.get(key));
            }
        }
        return rtmap;
    }
    if (!registeredEventTypes.has(namespace)){
        registeredEventTypes.set(namespace, new Map());
    }
    return registeredEventTypes.get(namespace);
}

export class EventTypes {
    static register(identifier, eventType){
        let idInfo = getIdentifierInfo(identifier);
        if (idInfo.namespace === null){
            idInfo.namespace = "custom";
        }
        let namespaceMap = getNamespaceEventTypesMap(idInfo.namespace);
        if (namespaceMap.has(idInfo.name)){
            throw new Error("EventType "+idInfo.id+" already registered");
        }
        if ("subscribe" in eventType){
            if (!("unsubscribe" in eventType)){
                logger.warn("正在注册的{}事件没有一个unsubscribe属性，这可能会导致一些错误", idInfo.id);
            }
            try {
                namespaceMap.set(idInfo.name, eventType);
            } catch (err){
                throw new Error("未能注册事件，可能指定的命名空间不可修改事件\n以下是错误信息: "+String(err));
            }
            logger.trace("注册了事件 {}", idInfo.id);
        } else {
            throw new Error("在eventType上必须有一个subscribe属性才可以注册事件");
        }
        if (waitingEventRegisterMap.has(idInfo.id)){
            DelayedListener.register(idInfo.id);
        }
    }
    static registerNamespace(namespace, namespaceEventTypes){
        if (typeof namespace === "string" || namespace.match(/[\s:]/) === null){
            throw new Error("命名空间需要是一个字符串，且不能包含空格或冒号");
        }
        if (registeredEventTypes.has(namespace)){
            throw new Error("指定的命令空间已被注册");
        }
        if ("get" in namespaceEventTypes){
            registeredEventTypes.set(namespace, namespaceEventTypes);
            logger.trace("注册了事件命名空间 {}", namespace);
        }
    }
    /**
     * @param {String} 事件的identifer
     * @returns {Boolean} 事件是否存在且已移除
     */
    static unregister(identifier){
        let idInfo = getIdentifierInfo(identifier);
        if (idInfo.namespace === null){
            idInfo.namespace = "custom";
        }
        let namespaceMap = getNamespaceEventTypesMap(idInfo.namespace);
        if (namespaceMap.has(idInfo.name)){
            try {
                namespaceMap.delete(idInfo.name);
            } catch (err){
                throw new Error("未能注册事件，可能指定的命名空间不可修改事件\n以下是错误信息: "+String(err));
            }
            logger.debug("已注销事件 {}，但它仍存在于已注册的监听器中", idInfo.id);
            return true;
        } else {
            return false;
        }
    }
    static hasNamespace(namespace){
        return registeredEventTypes.has(namespace);
    }
    static has(identifier){
        let idInfo = getIdentifierInfo(identifier);
        let namespaceMap = getNamespaceEventTypesMap(idInfo.namespace);
        return namespaceMap.has(idInfo.name);
    }
    /**
     * @param {String} 事件的identifer
     * @returns 事件的示例，如不存在返回null
     */
    static get(identifier){
        let idInfo = getIdentifierInfo(identifier);
        let namespaceMap = getNamespaceEventTypesMap(idInfo.namespace);
        if (namespaceMap.has(idInfo.name)){
            return namespaceMap.get(idInfo.name);
        } else {
            return null;
        }
    }
    static getEventTypes (){
        let rtmap = new Map();
        for (let mkey of registeredEventTypes.keys()){
            let map = registeredEventTypes.get(mkey);
            for (let key of map.keys()){
                let k = mkey+":"+key;
                rtmap.set(k, map.get(key));
            }
        }
        return rtmap;
    }
    static getAll = function * getAll(){
        for (let namespaceMap of registeredEventTypes.values()){
            for (let eventType of namespaceMap.values()){
                yield eventType;
            }
        }
    }
}

// Minecraft事件注册
(()=>{
    let map = new Map();
    for (let s in MinecraftEvents){
        map.set(s, MinecraftEvents[s]);
        logger.trace("注册了事件minecraft:{}", s);
    }
    Object.freeze(map);
    registeredEventTypes.set("minecraft", map);
})();
// Minecraft System事件注册
(()=>{
    let map = new Map();
    for (let s in SystemEvents){
        map.set(s, SystemEvents[s]);
        logger.trace("注册了事件system:{}", s);
    }
    Object.freeze(map);
    registeredEventTypes.set("system", map);
})();

export class Event {
    constructor(values){
        if (values === undefined){
            return;
        }
        for (let key in values){
            Object.defineProperty(this, key, {
                get: function (){
                    return values[key];
                },
                set: function (val){
                    values[key] = val;
                }
            });
        }
    }
}

import { VanillaEvents as MinecraftEvents, SystemEvents } from "../basis.js";
import { debug } from "../config.js";
import { Logger } from "../util/Logger.js";

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
class EventRegisterListener {
    static add(eventTypeIdentifier, callback){
        let idInfo = getIdentifierInfo(eventTypeIdentifier);
        if (!waitingEventRegisterMap.has(idInfo.id)){
            waitingEventRegisterMap.set(idInfo.id, []);
        }
        let list = waitingEventRegisterMap.get(idInfo.id);
        list.push(callback);
    }
    static async register(eventType){
        if (Types.has(eventType) && waitingEventRegisterMap.has(eventType)){
            let list = waitingEventRegisterMap.get(eventType);
            waitingEventRegisterMap.delete(eventType);
            list.forEach((callback)=>{
                try {
                    callback();
                } catch(e) {
                    logger.error(e);
                }
            });
        } else {
            logger.error("unknown eventType"+eventType);
        }
    }
}

function getNamespaceEventTypesMap(namespace){
    if (namespace === null){
        let rtmap = new Map();
        //获取key的反序，这样，先注册的事件优先级就会变低
        for (let map of Array.from(registeredEventTypes.values()).reverse()){
            for (let key of Array.from(map.keys()).reverse()){
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

/**
 * @deprecated 官方可能正在对事件系统进行大幅度修改，此接口可能会出现错误。
 */
class Types {
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
            EventRegisterListener.register(idInfo.id);
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
                 logger.debug("已注销事件 {}，但它仍存在于已注册的监听器中", idInfo.id);
                return true;
            } catch (err){
                throw new Error("未能注册事件，可能指定的命名空间不可修改事件\n以下是错误信息: "+String(err));
            }
        }
        return false;
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
    static getEventTypes(){
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
    static * getAll(){
        for (let namespaceMap of registeredEventTypes.values()){
            yield* namespaceMap.values();
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

export const events = new Proxy({}, {
    get(t, k){
        if (k === Symbol.iterator)
            return () => Types.getAll();
        if (Types.has(k))
            return Types.get(k);
    },
    set(t, k, v){
        try {
            Types.register(k, v);
        } catch {
            return false;
        }
        return true;
    },
    has(t, k){
        if (k in t){
            return true;
        }
        return Types.has(k);
    },
    deleteProperty(t, k){
        try {
            Types.unregister(k);
        } catch {
            return false;
        }
        return true;
    },
    ownKeys(){
        let typeKeys = [];
        let defaultKeys = [];
        for (let k of Types.getEventTypes().keys()){
            let idInfo = getIdentifierInfo(k);
            if (!defaultKeys.includes(idInfo.id))
                defaultKeys.push(idInfo.id);
            if (idInfo.namespace === "custom")
                continue;
            typeKeys.push(k);
        }
        return defaultKeys.concat(typeKeys);
    }
});
export default Types;
export { Types };
export { Types as EventTypes };
export { EventRegisterListener };
import("./_loadEvents");

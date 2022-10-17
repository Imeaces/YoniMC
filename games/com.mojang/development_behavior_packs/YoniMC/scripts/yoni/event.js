import { VanillaEvents as MinecraftEvents, SystemEvents } from "scripts/yoni/basis.js";
import { printError } from "scripts/yoni/util/console.js";
import { Logger } from "scripts/yoni/util/Logger.js";

const logger = new Logger("Event");

let eventRegisterMap = new Map();

let waitingEventRegisterMap = new Map();

eventRegisterMap.set("minecraft", ()=>{
    let map = new Map();
    for (let s in MinecraftEvents){
        logger.trace("注册了事件minecraft:{}", s);
        map.set(s, MinecraftEvents[s]);
    }
    return Object.freeze(map);
}());

eventRegisterMap.set("system", ()=>{
    let map = new Map();
    for (let s in SystemEvents){
        logger.trace("注册了事件system:{}", s);
        map.set(s, SystemEvents[s]);
    }
    return Object.freeze(map);
}());

function getEventType(namespace, type){
    if (namespace === "custom"){
        for (let pM of [...eventRegisterMap.values()].reverse()){
            if (pM.has(type)){
                return pM.get(type);
            }
        }
    }
    if (!eventRegisterMap.has(namespace)) return;
    return eventRegisterMap.get(namespace).get(type);
}

function setEventType(namespace, type, signal){
    if (!eventRegisterMap.has(namespace))
        eventRegisterMap.set(namespace, new Map());
        
    eventRegisterMap.get(namespace).set(type, signal);
}

function getNameSpace(eventType){
    let eventName;
    let prefix;
    let idx = eventType.indexOf(":");
    if (idx !== -1){
        eventName = eventType.slice(idx+1, eventType.length);
        prefix = eventType.slice(0, idx);
    } else {
        eventName = eventType;
        prefix = "custom";
    }
    return { namespace: prefix, eventName: eventName };
    
}

export const Events = new Proxy({}, {
    has: (target, prop)=>{
        let ns = getNameSpace(prop);
        if (ns.namespace === "custom"){
            if (getEventType(ns.namespace, ns.eventName) !== undefined) return true;
        }
        if (eventRegisterMap.has(ns.namespace)
        && eventRegisterMap.get(ns.namespace).has(ns.eventName)) return true;
        return false;
    },
    get: (target, prop)=>{
        if (prop === Symbol.iterator || prop === "values"){
            let vals = [];
            for (let pM of [...eventRegisterMap.values()].reverse()){
                vals.push(...pM.values());
            }
            return vals[Symbol.iterator];
        } else if (prop === "keys"){
            let keys = [];
            for (let pM of [...eventRegisterMap.values()].reverse()){
                keys.push(...pM.keys());
            }
            return keys[Symbol.iterator];
        } else {
            return getEventType(
                getNameSpace(prop).namespace,
                getNameSpace(prop).eventName);
        }
    },
    set: (target, prop, value)=>{
        if (prop in Events){
            throw new Error("event has been registered");
        }
        let ns = getNameSpace(prop);
        setEventType(ns.namespace, ns.eventName, value);
        if (prop in Events){
            waitingEventRegisterMap.get(prop).forEach(f=>f());
            waitingEventRegisterMap.delete(prop);
        }
        logger.trace("注册了事件{}:{}", ns.namespace, ns.eventName);
        return true;
    },
    deleteProperty: (target, prop)=>{
        return false;
    }
});

export class EventSignal {
    #callbacks = [];
    #eventClass;
    #registered = false;
    #registerFuncs = {
        register: ()=>{},
        unregister: ()=>{}
    };
    set registered(t){
        if (t !== true || t !== false){
            t = (t) ? true : false;
        }
        if (this.#registered !== t){
            if (t === true)
                this.#registerFuncs.register();
            else if (t === false)
                this.#registerFuncs.unregister();
        }
        this.#registered = t;
    }
    get registered(){
        return this.#registered;
    }
    constructor(eventType, eventClass){
        if (eventType === undefined) throw new SyntaxError("eventType undefined");
        
        this.#eventClass = eventClass;
        let self = this;
        
        let eventName;
        let prefix;
        let idx = eventType.indexOf(":");
        if (idx !== -1){
            eventName = eventType.slice(idx+1, eventType.length);
            prefix = eventType.slice(0, idx);
        } else {
            eventName = eventType;
            prefix = "custom";
        }
        
        let eventSignalClass = class {
            get name(){
                return eventName;
            }
            get eventName(){
                return `${prefix}:${eventName}`;
            }
            get eventPrefix(){
                return prefix;
            }
            subscribe(...args){
                return self.subscribe(...args);
            }
            unsubscribe(...args){
                return self.unsubscribe(...args);
            }
        }
        
        let eventSignal = new eventSignalClass();
        let rt = {
            eventSignal: eventSignal,
            eventClass: eventClass,
            register: (f) => {
                this.#registerFuncs.register = f;
                return rt;
            },
            unregister: (f) => {
                this.#registerFuncs.unregister = f;
                return rt;
            },
            triggerEvent: (...args) => {
                this.#triggerEvent(...args);
                return rt;
            },
            registerEvent(){
                if (eventSignal.eventName in Events)
                    throw new Error("event registered");
                    
                Events[eventSignal.eventName] = eventSignal;
                
                return rt;
            }
        }
        
        Object.defineProperty(rt, "registered", {
            get: ()=>{
                return this.registered;
            },
            set: (s)=>{
                this.registered = s;
            }
        });
        return rt;
    }
    subscribe(f, ...filters){
        if (filters.length > 0){
            this.#callbacks.push({callback: f, filters: filters});
        } else {
            this.#callbacks.push(f);
        }
        if (this.#callbacks.length > 0)
            this.registered = true;
    }
    unsubscribe(callback){
        this.#callbacks = this.#callbacks.filter((f)=>{
            if (f === callback || f?.callback === callback){
                return;
            } else {
                return f;
            }
        });
        if (this.#callbacks.length < 1)
            this.registered = false;
    }
    #triggerEvent(...args){
        if (this.registered){
            this.#callbacks.forEach(f=>{
                if (f?.callback instanceof Function)
                    f.callback(new this.#eventClass(...args, ...f.filters));
                else
                    f(new this.#eventClass(...args));
            });
        }
    }
}

export class EventListener {
    static #callbacks = [];
    static #index = 0;
    
    //这个方法不推荐使用，但是调试用起来是很方便
    static _getCallback(id){
        return this.#callbacks[id];
    }
    
    static delayRegister(...args){
        if (args[0]?.constructor !== String)
            throw new Error("无法对已实例化的事件进行延迟注册");
        
        if (args[0] in Events)
            return this.register(...args);
        
        this.#delayRegister(this.#index++, ...args)
    }
    
    static #delayRegister(idx, eventType, callback, ...eventFilters){
        let ns = getNameSpace(eventType);
        let eventName = ns.namespace + ":" + ns.eventName;
        if (!waitingEventRegisterMap.has(eventName)){
            waitingEventRegisterMap.set(eventName, []);
        }
        let fireCallback = (...args) => {
            let func = this.#callbacks[idx];
            if (func instanceof Function){
                try {
                    return func(...args);
                    logger.trace("完成了ID为 {} 的事件回调", idx);
                } catch(err){
                    logger.error("尝试对事件进行ID为 {} 的回调时发生错误 {}", idx, err);
                }
            }
            return;
        };
        waitingEventRegisterMap.get(eventName).push(()=>{
            eventType = Events[eventType];
            if (!eventType?.subscribe instanceof Function){
                throw new TypeError("require a subscribe() to register event");
        }
            try {
                this.#callbacks[idx] = callback;
                eventType.subscribe(fireCallback, ...eventFilters);
                logger.debug("已成功延迟注册id为{}的回调", idx);
            } catch (e){
                this.#callbacks[idx] = undefined;
                logger.error("在延迟注册id为{}的回调时发生错误 {}", idx, e);
            }
        });
        return idx - 1;
    }
    
    /**
     * add a new callback function for specific event
     * @param {EventIdentity} caller - the event identify 
     * @param {Function} callback - callback function
     * @params args - any arguments you want, they will be transmitted directly 
     * @return {number} - id of the callback
     */
    static register(eventType, callback, ...eventFilters){
        let idx = this.#index;
        
        if (!(callback instanceof Function)){
            throw new TypeError("回调得是个函数");
        }
        
        if (eventType?.constructor === String){
            if (eventType in Events){
                eventType = Events[eventType];
            } else {
                logger.debug("延迟id为{}的{}事件注册", this.#index, eventType);
                this.#delayRegister(this.#index, eventType, callback, ...eventFilters);
                return this.#index ++;
            }
        }
        
        if (!(eventType?.subscribe instanceof Function)){
            throw new TypeError("require a subscribe() to register event");
        }
        
        let fireCallback = (...args) => {
            let func = this.#callbacks[idx];
            if (func instanceof Function){
                try {
                    return func(...args);
                } catch(err){
                    logger.error("尝试对事件进行ID为{}的回调时发生错误 {} ", idx, err);
                }
            }
            return;
        };
        
        try {
            this.#callbacks[this.#index] = callback;
            eventType.subscribe(fireCallback, ...eventFilters);
            return this.#index ++;
        } catch (e){
            this.#callbacks[this.#index] = undefined;
            logger.error("无法注册事件 {}", e);
            return;
        }
        
    }
    
    static unregister(id){
        if (this.#callbacks[id] != null){
            this.#callbacks[id] = null;
            logger.debug("移除了ID为{}的回调", id);
        } else {
            for (let idx = 0; idx < this.#callbacks.length; idx++){
                if (this.#callbacks[idx] === id){
                    this.#callbacks[idx] = null;
                    logger.debug("移除了ID为{}的回调", idx);
                }
            }
        }
    }
}

export default Events;

import('scripts/yoni/event/eventreg.js');

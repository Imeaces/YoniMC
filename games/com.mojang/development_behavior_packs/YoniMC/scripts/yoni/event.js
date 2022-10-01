import { VanillaEvents as MinecraftEvents, SystemEvents } from "scripts/yoni/basis.js";
import { printError } from "scripts/yoni/util/console.js";

//动态导入，防止出什么奇怪的问题
let Debug;
import("scripts/yoni/debug.js")
    .then((m)=>{Debug=m})
    .catch();
    
let eventRegisterMap = new Map();
eventRegisterMap.set("minecraft", ()=>{
    let map = new Map();
    for (let s in MinecraftEvents){
        map.set(s, MinecraftEvents[s]);
    }
    return Object.freeze(map);
}());
eventRegisterMap.set("system", ()=>{
    let map = new Map();
    for (let s in SystemEvents){
        map.set(s, SystemEvents[s]);
    }
    return Object.freeze(map);
}());
eventRegisterMap.set("custom", new Map());

function getEventType(namespace, type){
    if (!eventRegisterMap.has(namespace)) return;

    if (namespace === "custom"){
        for (let pM of [...eventRegisterMap.values()].reverse()){
            if (pM.has(type))
                return pM.get(type);
        }
    }
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
    if (eventType.indexOf(":") !== -1){
        eventName = eventType.slice(idx+1, eventType.length);
        prefix = eventType.slice(0, idx);
    } else {
        eventName = eventType;
        prefix = "custom";
    }
    return { namespace: prefix, eventName: eventName };
    
}

const Events = new Proxy({}, {
    has: (target, prop)=>{
        if (eventRegisterMap.has(getNameSpace(prop).namespace) 
        && eventRegisterMap.get(getNameSpace(prop).namespace).has(getNameSpace(prop).eventName)) return true;
        return false;
    },
    get: (target, prop)=>{
        return getEventType(getNameSpace(prop).namespace, getNameSpace(prop).namespace);
    },
    set: (target, prop, value)=>{
        if (prop in Events){
            throw new Error("event has been registered");
        }
        setEventType(getNameSpace(prop).namespace, getNameSpace(prop).namespace, value);
    },
    deleteProperty: (target, prop)=>{
        return false;
    }
});

export class EventSignal {
    #callbacks;
    #eventClass;
    #registered = false;
    #register(){
    }
    #unregister(){
    }
    set registered(t){
        if (t !== true || t !== false){
            t = (t) ? true : false;
        }
        if (this.#registered !== t){
            if (t === true)
                this.#register();
            else if (t === false)
                this.#unregister();
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
                this.#register = f;
                return rt;
            },
            unregister: (f) => {
                this.#unregister = f;
                return rt;
            },
            triggerEvent: (...args) => {
                this.#triggerEvent(...args);
                return rt;
            },
            registerEvent(){
                //TODO
                if (prefix in Events && name in Events[prefix])
                    
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
    subscribe(f){
        this.#callbacks.push(f);
        if (this.#callbacks.length > 0)
            this.registered = true;
    }
    unsubscribe(callback){
        this.#callbacks = this.#callbacks.filter((f)=>{
            if (f === callback){
                return;
            } else {
                return f;
            }
        });
        if (this.#callbacks.length < 1)
            this.registered = false;
    }
    #triggerEvent(...args){
        this.#callbacks.forEach(f=>{
            let event = new this.#eventClass(...args);
            f(event);
        });
    }
}

export class EventListener {
    static #callbacks = [];
    
    //这个方法不推荐使用，但是调试用起来是很方便
    static _getCallback(id){
        return this.#callbacks[id];
    }
    
    /**
     * add a new callback function for specific event
     * @param {EventIdentity} caller - the event identify 
     * @param {Function} callback - callback function
     * @params args - any arguments you want, they will be transmitted directly 
     * @return {number} - id of the callback
     */
    static register(eventType, callback, ...eventFilters){
        let idx = this.#callbacks.push(callback);
        
        if (eventType.constructor === String){
            let namespaces = getNameSpace(eventType);
            let registeredEvent = getEventType(namespaces.namespace, namespaces.eventName);
            if (registeredEvent !== undefined) eventType = registeredEvent;
        }
        try {
            eventType.subscribe((...args) => {
                let func = this.#callbacks[idx-1];
                if (func !== null || func !== undefined){
                    try {
                        return func(...args);
                    } catch(err){
                        printError("尝试对事件进行ID为"+idx+"的回调时发生错误", err);
                    }
                }
                return;
            }, ...eventFilters);
        } catch (e){
            printError("无法注册事件", e);
            this.#callbacks.pop();
        }
        return idx - 1;
    }
    
    static unregister(id){
        if (this.#callbacks[id] != null){
            this.#callbacks[id] = null;
            console.warn("移除了ID为"+(id+1)+"的回调");
        } else {
            for (let idx = 0; idx < this.#callbacks.length; idx++){
                if (this.#callbacks[idx] === id){
                    this.#callbacks[idx] = null;
                    console.warn("移除了ID为"+(idx+1)+"的回调");
                    break;
                }
            }
        }
    }
}

//防止被覆盖
eventRegisterMap.set("yonimc", new Map());
//导入事件
import("scripts/yoni/events/TickEvent.js");
import("scripts/yoni/events/PlayerDeadEvent.js");

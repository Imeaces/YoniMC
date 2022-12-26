/**
 * @interface
 */
export class IEventTrigger {
    
    constructor(identifier, signal=null){
        if (Object.getPrototypeOf(this) === IEventTrigger.prototype){
            throw new TypeError("not implemented yet.");
        }
    }
    
    signal;
    
    getCallbacks;
    
    
    /**
     * @param {any[]} eventValues
     * @param {any[]|any} filters
     * @return {boolean}
     */
    filterResolver(eventValues, filters){
        throw new TypeError("not implemented yet.");
    };
    
    triggerEvent(){
        throw new TypeError("not implemented yet.");
    }
    registerEvent(){
        throw new TypeError("not implemented yet.");
    }
    unregisterEvent(){
        throw new TypeError("not implemented yet.");
    }
}

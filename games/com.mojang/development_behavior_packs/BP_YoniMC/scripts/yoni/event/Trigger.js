import { Types, getIdentifierInfo } from "./Types.js";
import { Event, EventRemover } from "./Event.js";

class Trigger {
    
    #identifier;
    get identifier(){
        return this.#identifier;
    }
    
    get namespace(){
        return getIdentifierInfo(this.#identifier).namespace;
    }
    
    get eventName(){
        return getIdentifierInfo(this.#identifier).name;
    }
    
    signal;
    
    firebug(callbacks /* Array<Object{callback: <Function>, filters: <Array> }> */, eventClass /* any */, eventValues/* Array[any] */){
        let event = EventRemover(new eventClass(...eventValues));
        callbacks.forEach((f)=>{
            f(event);
        });
    }
    async firebugAsync(callbacks /* Array<Object{callback: <Function>, filters: <Array> }> */, eventClass /* any */, eventValues/* Array[any] */){
        await Promise.all(
            callbacks.map(async (f)=>{
                await f(EventRemover(new eventClass(...eventValues)));
            })
        )
    }
    
    getCallbacks(){
        return [];
    }
    
    filterResolver(eventValue /* Array[any] */, filters, /* Array[any] */){
        return true;
    };
    
    constructor(identifier, signal=null){
        this.#identifier = getIdentifierInfo(identifier).id;
        this.signal = signal;
    }
    
    getCallbacksByFilter(...args){
        return this.getCallbacks().map(e=>{
            if (e.filters === undefined)
                return e.callback;
            else if (this.filterResolver(args, e.filters))
                return e.callback;
            else
                return;
        }).filter(e => e !== undefined);
    }
    
    fireEvent(...args){
        let callbacks = this.getCallbacksByFilter(...args);
        this.firebug(callbacks, this.eventClass, args);
    };
    async fireEventAsync(...args){
        let callbacks = this.getCallbacksByFilter(...args);
        await this.firebugAsync(callbacks, this.eventClass, args);
    }
    triggerEvent = this.fireEvent;
    triggerEventAsync = this.fireEventAsync;
    
    registerEvent(){
        Types.register(this.identifier, this.signal);
        return this;
    }
    unregisterEvent(){
        Types.unregister(this.identifier);
        return this;
    }
    
    onSubscribe(){
    }
    onUnsubscribe(){
    }
    whenFirstSubscribe(){
    }
    whenLastUnsubscribe(){
    }
}

export default Trigger;
export { Trigger };
export { Trigger as EventTrigger };

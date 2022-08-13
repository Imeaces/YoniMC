export default class Objective {
    #name;
    #displayName;
    #displaySlot;
    get name(){
        return this.#name;
    }
    get displayName(){
        return this.#displayName;
    }
    set displayName(newName){}
    
    constructor(name, criteria, displayName){}
    
    getScore(entry){}
    getCriteria(){ return "dummy"; }
    getDisplaySlot(){}
    
    setDisplaySlot(slot){}
    
    unregister();
}
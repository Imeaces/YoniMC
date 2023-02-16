import { Entry } from "./Entry.js";
import { Objective } from "./Objective.js";

/**
 * 一个对象，包含了分数持有者，以及其在某一记分项上的分数。
 * @deprecated 无法保证某些属性可以正常工作。
 */
export class ScoreInfo {
    #entry;
    #objective;
    
    /**
     * @param {Objective} obj
     * @param {Entry} entry
     */
    constructor(obj: Objective, entry: Entry){
        if (!(obj instanceof Objective))
            throw new TypeError("Not an Objective type");
        if (!(entry instanceof Entry))
            throw new TypeError("Not an Entry type");
        this.#objective = obj;
        this.#entry = entry;
    }
    
    /**
     * @param {number} score
     */
    set score(score: number | undefined){
        if (score === undefined)
            this.#objective.resetScore(this.#entry);
        else
            this.#objective.setScore(this.#entry, score);
    }
    
    /**
     * 分数持有者在记分项上的分数
     * @type {number}
     */
    get score(): number | undefined {
        return this.#objective.getScore(this.#entry);
    }
    
    /**
     * 重置此对象对应的分数持有者在对应的记分项上的分数。
     */
    reset(){
        return this.#objective.resetScore(this.#entry);
    }
    
    getEntry(){
        return this.#entry;
    }
    
    getObjective(){
        return this.#objective;
    }
    
    toString(){
        return `ScoreInfo { Score: ${this.score}, Entry: ${this.getEntry().id} }`;
    }
    
}


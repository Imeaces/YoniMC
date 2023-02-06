import { ScoreboardAccessor } from "../scoreboard/SimpleScoreboard.js";

class ScoreboardDataView {
    #objective;
    get objective(){
        return this.#objective;
    }
    constructor(objective){
        objective = (objective instanceof Objective) ? objective : Scoreboard.getObjective(objective, true);
        this.#objective = new ScoreboardAccessor(objective);
    }
    getUint8
}

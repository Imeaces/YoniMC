import { dealWithCmd } from "../../lib/utils.js";

export class PlayerOnScreenDisplay {
    #player;
    constructor(player){
        this.#player = player;
    }
    clearTitle(){
        this.#player.fetchCommand("title @s clear");
    }
    setTitle(text, options = null){
        if (options){
            const { fadeInSeconds, staySeconds, fadeOutSeconds } = options;
            if (!isFinite(fadeInSeconds) || !isFinite(fadeOutSeconds) || !isFinite(staySeconds)){
                throw new TypeError("require 'fadeInSeconds', 'fadeOutSeconds' and 'staySeconds' filed in options, and required to be a number");
            }
            this.#player.fetchCommand(`title @s times ${fadeInSeconds} ${fadeOutSeconds} ${staySeconds}`);
        }
        if (typeof text === "string")
            this.#player.fetchCommand("title @s title "+text);
        else
            this.#player.fetchCommand("titleraw @s title "+JSON.stringify(text, dealWithCmd));
        if (options.subtitle){
            this.updateSubtitle(options.subtitle);
        }
    }
    setActionbar(text){
        if (typeof text === "string")
           this.#player.fetchCommand("title @s actionbar "+text);
        else
            this.#player.fetchCommand("titleraw @s actionbar "+JSON.stringify(text, dealWithCmd));
    }
    updateSubtitle(text){
        if (typeof text === "string")
           this.#player.fetchCommand("title @s subtitle "+text);
        else
            this.#player.fetchCommand("titleraw @s subtitle "+JSON.stringify(text, dealWithCmd));
    }
}

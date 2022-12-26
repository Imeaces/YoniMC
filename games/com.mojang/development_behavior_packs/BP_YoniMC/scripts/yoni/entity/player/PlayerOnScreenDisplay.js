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
        this.#player.fetchCommand("title @s title "+text);
        if (options.subtitle){
            this.updateSubtitle(options.subtitle);
        }
    }
    setActionbar(text){
        this.#player.fetchCommand("title @s actionbar "+text);
    }
    updateSubtitle(text){
        this.#player.fetchCommand("title @s subtitle "+text);
    }
}


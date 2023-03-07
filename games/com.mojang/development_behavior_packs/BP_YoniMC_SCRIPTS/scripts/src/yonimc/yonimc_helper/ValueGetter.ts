import { Minecraft, VanillaWorld, dim,
    EntityBase, Command, Scoreboard,
    EventListener,
    World,
    YoniPlayer,
    YoniScheduler } from "../../yoni/index.js";

YoniScheduler.runCycleTickTask(() => {
    let healthO = Scoreboard.getObjective("health") ?? Scoreboard.addObjective("health");
    let maxHealthO = Scoreboard.getObjective("max_health") ?? Scoreboard.addObjective("max_health");
    
    let promises: Promise<any>[] = [];
    for (let _ of World.selectPlayers({tags: [ "test:health" ]})){
        let player = <YoniPlayer>_;
        let currentHealth = Math.floor(player.getCurrentHealth());
        let maxHealth = Math.floor(player.getMaxHealth());
        try {
             healthO.setScore(player, currentHealth);
        } catch {
             promises[promises.length] = healthO.postSetScore(player, currentHealth);
        }
        
        try {
            maxHealthO.setScore(player, maxHealth);
        } catch {
             promises[promises.length] = maxHealthO.postSetScore(player, maxHealth);
        }
    }
    
    //利用YoniScheduler处理Promise 
    return Promise.allSettled(promises);
    
}, 1, 1, true);

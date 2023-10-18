import { Minecraft, MinecraftSystem, VanillaWorld, dim,
    EntityBase, Command, Scoreboard,
    LegacyEventListener,
    world as World,
    YoniPlayer,
    YoniScheduler, Location, Objective } from "yoni-mcscripts-lib";

YoniScheduler.runCycleTickTask(() => {
    let healthO = Scoreboard.getObjective("health", true);
    let maxHealthO = Scoreboard.getObjective("max_health", true);
    
    for (let player of World.getPlayers({tags: [ "test:health" ]})){
        let currentHealth = Math.floor(player.getCurrentHealth());
        let maxHealth = Math.floor(player.getMaxHealth());
        healthO.setScore(player, currentHealth);
        maxHealthO.setScore(player, maxHealth);
    }
    
}, 1, 3, false);


let lTick = MinecraftSystem.currentTick;
YoniScheduler.runCycleTimerTask(()=>{
    let cTick = MinecraftSystem.currentTick
    let passTick = cTick - lTick;
    let tps = passTick/2;
    lTick = cTick;
    Scoreboard.getObjective("world", true).setScore("tps", Math.floor(tps));
}, 2000, 2000);


YoniScheduler.runCycleTickTask(async () => {
    let sobj = Scoreboard.getObjective("speed_rate", true) as Objective;
    
    for (let player of World.getAllPlayers()){
        let length = new Location(player.velocity).getLength();
        sobj.setScore(player, Math.floor(length * 100));
    }
}, 1, 3, true);

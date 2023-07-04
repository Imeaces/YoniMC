import { MinecraftSystem, Scoreboard, world as World, YoniScheduler, Location } from "yoni-mcscripts-lib";
YoniScheduler.runCycleTickTask(() => {
    let healthO = Scoreboard.getObjective("health") ?? Scoreboard.addObjective("health");
    let maxHealthO = Scoreboard.getObjective("max_health") ?? Scoreboard.addObjective("max_health");
    let promises = [];
    for (let _ of World.selectPlayers({ tags: ["test:health"] })) {
        let player = _;
        let currentHealth = Math.floor(player.getCurrentHealth());
        let maxHealth = Math.floor(player.getMaxHealth());
        try {
            healthO.setScore(player, currentHealth);
        }
        catch {
            promises[promises.length] = healthO.postSetScore(player, currentHealth);
        }
        try {
            maxHealthO.setScore(player, maxHealth);
        }
        catch {
            promises[promises.length] = maxHealthO.postSetScore(player, maxHealth);
        }
    }
    //利用YoniScheduler处理Promise 
    return Promise.allSettled(promises);
}, 1, 3, true);
let lTick = MinecraftSystem.currentTick;
YoniScheduler.runCycleTimerTask(() => {
    let cTick = MinecraftSystem.currentTick;
    let passTick = cTick - lTick;
    let tps = passTick / 2;
    lTick = cTick;
    Scoreboard.getObjective("world", true).postSetScore("tps", Math.floor(tps));
}, 2000, 2000);
YoniScheduler.runCycleTickTask(async () => {
    let sobj = Scoreboard.getObjective("speed_rate", true);
    for (let player of World.getAllPlayers()) {
        let length = new Location(player.velocity).getLength();
        sobj.postSetScore(player, Math.floor(length * 100));
    }
}, 1, 3, true);

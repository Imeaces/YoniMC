import { YoniScheduler, World } from "yoni-mcscripts-lib";
let sleepTimer = new WeakMap();
function addSleepTimer(guxi) {
    guxi.sendMessage("§4#不要睡过去");
    const taskId = YoniScheduler.runDelayTickTask(function killSleepGuxi() {
        if (sleepTimer.get(guxi) === taskId) {
            sleepTimer.delete(guxi);
        }
        else {
            return;
        }
        guxi.sendMessage("#能量停止活跃");
        if (guxi.hasFamily("guxi")
            && guxi.hasTag("flag:status.is_sleeping")) {
            guxi.applyDamage(1000);
        }
    }, 90);
    sleepTimer.set(guxi, taskId);
}
YoniScheduler.runCycleTickTask(function detectSleepingGuxi() {
    for (let guxi of World.getPlayers({ families: ["guxi"] })) {
        if (sleepTimer.has(guxi)
            && !guxi.hasTag("flag:status.is_sleeping")) {
            sleepTimer.delete(guxi);
            continue;
        }
        if (!sleepTimer.has(guxi)
            && guxi.hasTag("flag:status.is_sleeping")) {
            addSleepTimer(guxi);
        }
    }
}, 5, 5);

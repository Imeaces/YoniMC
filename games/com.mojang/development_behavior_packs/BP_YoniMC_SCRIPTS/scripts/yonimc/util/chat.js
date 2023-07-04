import { Command } from "yoni-mcscripts-lib";
import { EventListener } from "yoni-mcscripts-lib";
import { EntityBase } from "yoni-mcscripts-lib";
import { Minecraft } from "yoni-mcscripts-lib";
const { MinecraftEffectTypes } = Minecraft;
const regex = /@(?:all|here)\b/m;
EventListener.register("beforeEvents.chatSend", (event) => {
    let runner = EntityBase.getYoniEntity(event.sender);
    if (regex.test(event.message) && !event.sender.getEffect(MinecraftEffectTypes["darkness"])) {
        Command.fetchExecute(runner, "title @a title @s");
        Command.fetchExecute(runner, "title @a subtitle @了所有人");
        runner.addEffect(MinecraftEffectTypes["darkness"], 20 * 15, 0, true);
        runner.sendMessage("§7你@了所有人");
    }
});

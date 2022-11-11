import { Command } from "yoni/command.js";
import { EventListener } from "yoni/event.js";
import { YoniEntity } from "yoni/entity.js";
import { ChatCommand } from "yoni/command/ChatCommand.js";
import { Minecraft } from "yoni/basis.js";
const { MinecraftEffectTypes } = Minecraft;

const regex = /@(?:all|here)\b/m;

EventListener.register("chat", (event) => {
    let runner = YoniEntity.from(event.sender);
    if (regex.test(event.message)){
        Command.fetchExecute(runner, "title @a title @s");
        Command.fetchExecute(runner, "title @a subtitle @了所有人");
        runner.addEffect(MinecraftEffectTypes["darkness"], 1000, 3, true);
        runner.sendMessage("§7你@了所有人");
    }
});

import { Command } from "scripts/yoni/command.js";
import { EventListener } from "scripts/yoni/event.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { MinecraftEffectTypes } from "mojang-minecraft";
import { ChatCommand } from "scripts/yoni/command/ChatCommand.js";

const regex = /@(?:all|here)\b/m;

EventListener.register("chat", (event) => {
    let runner = YoniEntity.from(event.sender);
    if (regex.test(event.message)){
        Command.execute(runner, "title @a title @s")
        .next("title @a subtitle @了所有人");
        runner.addEffect(MinecraftEffectTypes["darkness"], 1000, 3, true);
        runner.sendMessage("§7你@了所有人");
    }
});

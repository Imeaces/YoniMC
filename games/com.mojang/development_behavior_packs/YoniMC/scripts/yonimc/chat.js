import Command from "scripts/yoni/command.js";
import { EventListener } from "scripts/yoni/event.js";
import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import { MinecraftEffectTypes } from "mojang-minecraft";

ChatCommand.registerPrefixCommand("", "@all", (runner, command, label, args) => {
    Command.execute(runner, "title @a title @s")
    .next("title @a subtitle @了所有人");
    runner.addEffect(MinecraftEffectTypes["darkness"], 1000, 3, true);
});

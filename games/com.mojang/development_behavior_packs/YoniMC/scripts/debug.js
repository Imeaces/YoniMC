import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim
    } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
import { EntityDamageCause } from "mojang-minecraft";

ChatCommand.registerPrefixCommand("$", "function", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(JSON.stringify(Function(rawCommand.slice(rawCommand.indexOf("\x20"))).call(this)));
});
ChatCommand.registerPrefixCommand("$", "gfunction", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(JSON.stringify(Function(rawCommand.slice(rawCommand.indexOf("\x20")))));
});
ChatCommand.registerPrefixCommand("$", "geval", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(JSON.stringify(globalThis.eval(rawCommand.slice(rawCommand.indexOf("\x20")))));
});
ChatCommand.registerPrefixCommand("$", "eval", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(
        JSON.stringify(
            eval(
                rawCommand.slice(rawCommand.indexOf("\x20")))
        )
    );
});

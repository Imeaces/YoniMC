import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import { Minecraft, dim, VanillaWorld, Gametest } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { send, say } from "scripts/yoni/util/utils.js";
import { isDebug } from "scripts/yoni/config.js";
import Command from "scripts/yoni/command.js";
import Scoreboard from "scripts/yoni/scoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
import { getErrorMsg } from "scripts/yoni/util/console.js";

if (isDebug()){

ChatCommand.registerPrefixCommand("$", "eval", (sender, rawCommand, label, args) => {
    let code = rawCommand.slice(label.length+1);
    console.error(rawCommand);
    sender.sendMessage(code);
    sender.sendMessage(eval(code));
});

ChatCommand.registerPrefixCommand("$", "exec", (sender, rawCommand, label, args) => {
    sender.sendMessage(
        JSON.stringify(
            Command.execute(sender, rawCommand.slice(label.length+2))
        )
    );
});

}

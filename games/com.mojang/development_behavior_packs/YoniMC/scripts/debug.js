import { ChatCommand } from "yoni/command/ChatCommand.js";
import { Command } from "yoni/command.js";
import { Minecraft, dim, VanillaWorld, Gametest } from "yoni/basis.js";
import { YoniEntity } from "yoni/entity.js";
import { send, say } from "yoni/util/utils.js";
import { isDebug } from "yoni/config.js";
import Scoreboard from "yoni/scoreboard.js";
import { EventListener } from "yoni/event.js";
import { getErrorMsg } from "yoni/util/console.js";

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

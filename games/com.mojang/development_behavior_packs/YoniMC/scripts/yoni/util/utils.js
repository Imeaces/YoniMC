import { Command } from "scripts/yoni/command.js";
import { dim, VanillaWorld } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { getErrorMsg } from "./console.js";
import { log } from "./Logger.js";

import { debug } from "scripts/yoni/config.js";

export function say(msg = "", displayNameOrSender="commands.origin.script"){
    let runner;
    let senderDisplayName;
    
    if (displayNameOrSender?.constructor === String){
        runner = dim(0);
        senderDisplayName = { translate: displayNameOrSender };
    } else {
        runner = displayNameOrSender;
        senderDisplayName = { selector: "@s" };
    }
    let rawtext = [
        {
            translate: "chat.type.announcement",
            with: {
                rawtext: [
                    senderDisplayName,
                    { text: String(msg) }
                ]
            }
        }
    ]
    Command.execute(runner, `tellraw @a ${JSON.stringify({rawtext})}`);
}

export function send(receiver, message){
     return YoniEntity.from(receiver).sendMessage(message);
}

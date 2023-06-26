import { VanillaWorld, overworld } from "../basis.js";
import { Command } from "../command.js";
import { dealWithCmd } from "../lib/utils.js";

export async function say(msg = "", displayNameOrSender="commands.origin.script"){
    let runner;
    let senderDisplayName;
    
    if (typeof displayNameOrSender === "string"){
        runner = overworld;
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
    return await Command.fetchExecute(runner, `tellraw @a ${JSON.stringify({rawtext})}`);
}

export async function send(receiver, message){
    if (receiver.sendMessage){ return receiver.sendMessage(dealWithCmd(message, message)); };
    let rawtext = JSON.stringify({rawtext:[{text: message}]}, dealWithCmd);
    await Command.addExecute(Command.PRIORITY_HIGH, receiver, `tellraw @s ${rawtext}`);
}

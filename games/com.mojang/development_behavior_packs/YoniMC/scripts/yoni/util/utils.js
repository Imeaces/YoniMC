import { dim, VanillaWorld, overworld, fetchCmd, fetchCmdParams } from "yoni/basis.js";


export async function say(msg = "", displayNameOrSender="commands.origin.script"){
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
    return await fetchCmd(runner, `tellraw @a ${JSON.stringify({rawtext})}`);
}

export async function send(receiver, message){
    let rawtext = JSON.stringify({rawtext:[{translate: String(message)}]})
    return await fetchCmd(receiver, `tellraw @s ${rawtext}`);
}

import { Command } from "yoni-mcscripts-lib";
import { LegacyEventListener } from "yoni-mcscripts-lib";
import { EntityBase } from "yoni-mcscripts-lib";
import { ChatCommand } from "yoni-mcscripts-lib";
import { Minecraft, YoniPlayer } from "yoni-mcscripts-lib";
const { EffectTypes } = Minecraft;

const regex = /@(?:all|here)\b/m;

LegacyEventListener.register("beforeEvents.chatSend", (event: Minecraft.ChatSendBeforeEvent) => {
    let runner = EntityBase.getYoniEntity(event.sender) as YoniPlayer;
    if (regex.test(event.message) && !event.sender.getEffect(EffectTypes.get("darkness") as Minecraft.EffectType)){
        Command.fetchExecute(runner, "title @a title @s");
        Command.fetchExecute(runner, "title @a subtitle @了所有人");
        runner.addEffect(EffectTypes.get("darkness") as Minecraft.EffectType, 20*15, 0, true);
        runner.sendMessage("§7你@了所有人");
    }
});

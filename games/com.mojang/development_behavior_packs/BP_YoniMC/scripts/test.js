import { ChatCommand } from "yoni/command/ChatCommand.js";
import { Command } from "yoni/command.js";
import { Minecraft, dim, VanillaWorld, VanillaEvents, VanillaScoreboard, Gametest, runTask } from "yoni/basis.js";
import { EventListener } from "yoni/event.js";
import { getErrorMsg } from "yoni/util/console.js";
import { YoniEntity, Player as YoniPlayer } from "yoni/entity.js";
import { send, say } from "yoni/util/utils.js";
import { Logger } from "yoni/util/Logger.js";
import { isDebug } from "yoni/debug.js";
import Scoreboard from "yoni/scoreboard.js";
const { EntityTypes } = Minecraft;

const logger = new Logger("TEST");
let num = 0;

if (isDebug())
ChatCommand.registerCommand("test", async (sender, rawCommand, label, args)=>{
    for (let i = 0; i< 3000; i++){
        Command.fetchExecute({}, "scoreboard players set va var_0 0");
    }
    sender.sendMessage("ok");
});

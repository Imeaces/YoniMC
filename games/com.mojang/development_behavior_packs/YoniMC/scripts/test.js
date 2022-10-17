import { ChatCommand } from "yoni/command/ChatCommand.js";
import { Command } from "yoni/command.js";
import { Minecraft, dim, VanillaWorld, VanillaEvents, VanillaScoreboard, Gametest } from "yoni/basis.js";
import { EventListener } from "yoni/event.js";
import { getErrorMsg } from "yoni/util/console.js";
import { YoniEntity } from "yoni/entity.js";
import { send, say } from "yoni/util/utils.js";
import { isDebug } from "yoni/debug.js";
import Scoreboard from "yoni/scoreboard.js";
const { EntityTypes } = Minecraft;

if (isDebug())
ChatCommand.registerCommand("test", (sender, rawCommand, label, args)=>{
        say(`欢迎${sender.name}游玩本服务器`, "服务器");
});

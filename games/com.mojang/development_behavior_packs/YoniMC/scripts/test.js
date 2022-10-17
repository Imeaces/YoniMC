import { ChatCommand } from "scripts/yoni/command/ChatCommand.js";
import { Command } from "scripts/yoni/command.js";
import { Minecraft, dim, VanillaWorld, VanillaEvents, VanillaScoreboard, Gametest } from "scripts/yoni/basis.js";
import { EventListener } from "scripts/yoni/event.js";
import { getErrorMsg } from "scripts/yoni/util/console.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { send, say } from "scripts/yoni/util/utils.js";
import { isDebug } from "scripts/yoni/debug.js";
import Scoreboard from "scripts/yoni/scoreboard.js";
const { EntityTypes } = Minecraft;

if (isDebug())
ChatCommand.registerCommand("test", (sender, rawCommand, label, args)=>{
        say(`欢迎${sender.name}游玩本服务器`, "服务器");
});

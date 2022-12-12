//导出各种东西
//同时修改globalThis
import "./WatchBird.js";
import {
    Entity,
    Player,
    SimulatedPlayer,
    YoniEntity,
    YoniPlayer,
    YoniSimulatedPlayer
} from "./entity.js";
import {
    Minecraft,
    Gametest,
    MinecraftGui,
    VanillaWorld,
    VanillaScoreboard,
    VanillaEvents,
    dim,
    runTask
} from "./basis.js";
import { Logger, log } from "./util/Logger.js";
import { World } from "./world.js";
import { Command } from "./command.js";
import {
    EventListener,
    EventTypes,
    EventSignal
} from "./event.js";
import { Scoreboard, Entry, Objective } from "./scoreboard.js";
import {
    Schedule,
    YoniScheduler
} from "./schedule.js";
import { isDebug } from "./debug.js";
import * as YoniUtilUtils from "./util/utils.js";
import FastScoreboard from "./util/FastScoreboard.js";
import { ChatCommand } from "./util/ChatCommand.js";
import { Location } from "./Location.js";

globalThis.Yoni = {
    isDebug
};
globalThis.dim = dim;
globalThis.runTask = runTask;
globalThis.Logger = Logger;
globalThis.world = World;
globalThis.Entity = Entity;
globalThis.YoniEntity = Entity;
globalThis.Player = Player;
globalThis.SimulatedEntity = SimulatedPlayer;
globalThis.EventTypes = EventTypes;
globalThis.EventListener = EventListener;
globalThis.Command = Command;
globalThis.Scoreboard = Scoreboard;
globalThis.ScoreboardEntry = Entry;
globalThis.ScoreboardObjective = Objective;
globalThis.YoniScheduler = YoniScheduler;
globalThis.Schedule = Schedule;
globalThis.ChatCommand = ChatCommand;
globalThis.Minecraft = Minecraft;

globalThis.Vanilla = {
    Minecraft,
    MinecraftGui,
    Gametest,
    world: VanillaWorld,
    EventTypes: VanillaEvents,
    Scoreboard: VanillaScoreboard
}

globalThis.Location = Location;

const Utils = (()=>{
    let obj = {};
    for (let key in YoniUtilUtils){
        obj[key] = YoniUtilUtils[key];
    }
    return obj;
})()
Utils.FastScoreboard = FastScoreboard;
globalThis.YoniUtils = Utils;

export {
    isDebug,
    
    EventTypes,
    EventListener,
    EventSignal,
    
    Scoreboard,
    Objective,
    Entry,
    
    World,
    
    dim,
    Minecraft,
    MinecraftGui,
    Gametest,
    VanillaWorld,
    VanillaEvents,
    VanillaScoreboard,
    runTask,
    
    Logger,
    log,
    
    YoniScheduler,
    Schedule,
    
    Command,
    ChatCommand,
    
    Player,
    Entity,
    SimulatedPlayer,
    YoniEntity,
    YoniPlayer,
    YoniSimulatedPlayer,
    
    Utils,
    Location
}
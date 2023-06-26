//导出各种东西
//同时修改globalThis

//防止被狗咬死（实际测试中，发现如果游戏很卡，还是会被咬死（掉到1tps的时候）
import "./WatchBird.js";
import {
    EntityBase,
    Entity,
    Player,
    SimulatedPlayer,
    YoniEntity,
    YoniPlayer,
    YoniSimulatedPlayer,
} from "./entity.js";
import {
    Minecraft,
    Gametest,
    MinecraftGui,
    VanillaWorld,
    VanillaScoreboard,
    VanillaEvents,
    dim,
    runTask,
} from "./basis.js";
import { Logger, log, console } from "./util/Logger.js";
import { World } from "./world.js";
import { Command } from "./command.js";
import {
    EventListener,
    EventTypes,
    EventSignal,
    events,
} from "./event.js";
import { Scoreboard, Entry, Objective } from "./scoreboard.js";
import {
    Schedule,
    YoniScheduler
} from "./schedule.js";
import { debug, injectGlobal } from "./config.js";
import * as YoniUtils from "./util/utils.js";
import { ChatCommand } from "./util/ChatCommand.js";
import { Location, ILocation, Vector3, DimensionLikeValue } from "./Location.js";
import { assignAllPropertiesWithoutOverride } from "./lib/ObjectUtils.js";
import { Dimension, YoniDimension } from "./dimension.js";
import { system } from "./system.js";
import { ObjectUtils } from "./lib/ObjectUtils.js";
import { ScoreboardAccessor } from "./scoreboard/ScoreboardAccessor.js";
import { EntityValue } from "./entity/EntityTypeDefs.js";
import { EntryValueType, EntryType } from "./scoreboard/EntryType.js";
export { TPSCounter } from "./util/TPSCounter.js";

//@ts-ignore
const Utils: (typeof YoniUtils) = (()=>{
    let obj = {};
    assignAllPropertiesWithoutOverride(obj, YoniUtils);
    return obj;
})();

const Yoni = {
    isDebug: () => debug,
    injectGlobal,
    debug,
}

const Vanilla = {
    Minecraft,
    MinecraftGui,
    Gametest,
    world: VanillaWorld,
    EventTypes: VanillaEvents,
    Scoreboard: VanillaScoreboard
}

const global: any = globalThis;

export {
    YoniPlayer,
    YoniEntity,
    YoniSimulatedPlayer,
    YoniDimension,
    EntryValueType,
    EntityValue,
}

export {
    EventTypes,
    EventListener,
    EventSignal,
    events,
    
    Scoreboard,
    Objective,
    Entry,
    ScoreboardAccessor,
    EntryType,
    
    World,
    Dimension,
    system,
    
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
    console,
    Location,
    DimensionLikeValue,
    Vector3,
    ILocation,
    
    YoniScheduler,
    Schedule,
    
    Command,
    ChatCommand,
    
    EntityBase,
    Player,
    Entity,
    SimulatedPlayer,
    
    Utils,
    Yoni,
    ObjectUtils,
    Vanilla,
    
    //@ts-ignore
    global as globalThis,
}

if (injectGlobal){
    // @ts-ignore
    globalThis.Yoni = Yoni;
    // @ts-ignore
    globalThis.dim = dim;
    // @ts-ignore
    globalThis.runTask = runTask;
    // @ts-ignore
    globalThis.Logger = Logger;
    // @ts-ignore
    globalThis.world = World;
    // @ts-ignore
    globalThis.EntityBase = EntityBase;
    // @ts-ignore
    globalThis.Entity = Entity;
    // @ts-ignore
    globalThis.Player = Player;
    // @ts-ignore
    globalThis.SimulatedEntity = SimulatedPlayer;
    // @ts-ignore
    globalThis.EventTypes = EventTypes;
    // @ts-ignore
    globalThis.EventListener = EventListener;
    // @ts-ignore
    globalThis.Command = Command;
    // @ts-ignore
    globalThis.Scoreboard = Scoreboard;
    // @ts-ignore
    globalThis.ScoreboardEntry = Entry;
    // @ts-ignore
    globalThis.ScoreboardObjective = Objective;
    // @ts-ignore
    globalThis.YoniScheduler = YoniScheduler;
    // @ts-ignore
    globalThis.Schedule = Schedule;
    // @ts-ignore
    globalThis.ChatCommand = ChatCommand;
    // @ts-ignore
    globalThis.Minecraft = Minecraft;
    
    // @ts-ignore
    globalThis.Vanilla = Vanilla;
    
    // @ts-ignore
    globalThis.Location = Location;
    // @ts-ignore
    globalThis.YoniUtils = Utils;
    // @ts-ignore
    globalThis.system = system;
}

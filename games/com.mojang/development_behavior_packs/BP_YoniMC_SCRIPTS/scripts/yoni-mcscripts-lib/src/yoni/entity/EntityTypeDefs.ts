import { YoniPlayer, Player } from "./Player.js";
import { YoniSimulatedPlayer, SimulatedPlayer } from "./SimulatedPlayer.js";
import { YoniEntity, Entity } from "./Entity.js";
import { Minecraft, Gametest } from "../basis.js";
import { EntityBase } from "./EntityBase.js";

export type YoniEntityValue = YoniEntity | YoniPlayer | YoniSimulatedPlayer | Entity | Player | SimulatedPlayer

export type MinecraftEntityValue = 
    Minecraft.Entity | Minecraft.Player | Gametest.SimulatedPlayer

export type EntityValue = MinecraftEntityValue | YoniEntityValue

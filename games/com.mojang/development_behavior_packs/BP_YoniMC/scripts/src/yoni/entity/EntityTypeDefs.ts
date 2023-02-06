import YoniPlayer from "./Player.js";
import YoniSimulatedPlayer from "./SimulatedPlayer.js";
import YoniEntity from "./Entity.js";
import { Minecraft, Gametest } from "../basis.js";

export type YoniEntityType = 
    YoniEntity
    | YoniPlayer
    | YoniSimulatedPlayer

export type MinecraftEntityType = 
    Minecraft.Entity
    | Minecraft.Player
    | Gametest.SimulatedPlayer

export type EntityType = MinecraftEntityType | YoniEntityType

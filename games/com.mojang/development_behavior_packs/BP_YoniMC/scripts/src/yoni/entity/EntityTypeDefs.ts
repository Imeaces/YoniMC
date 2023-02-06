import { Player } from "./Player.js";
import { SimulatedPlayer } from "./SimulatedPlayer.js";
import { Entity } from "./Entity.js";
import { Minecraft, Gametest } from "../basis.js";

export type YoniEntityType = 
    Entity
    | Player
    | SimulatedPlayer

export type MinecraftEntityType = 
    Minecraft.Entity
    | Minecraft.Player
    | Gametest.SimulatedPlayer

export type EntityType = MinecraftEntityType | YoniEntityType

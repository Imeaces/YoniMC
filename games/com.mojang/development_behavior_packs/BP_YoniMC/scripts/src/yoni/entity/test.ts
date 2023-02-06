import { Player } from "./Player.js";

// @ts-ignore
let p: Player = {};

p.kill();

p.teleport({location: {x:87,y:829,z:828}}, true);

p.vanillaPlayer.tell("awa");

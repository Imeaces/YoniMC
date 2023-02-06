import { YoniPlayer } from "./Player.js";

// @ts-ignore
let p: YoniPlayer = {};

p.kill();

p.teleport({location: {x:87,y:829,z:828}}, true);

p.vanillaPlayer.tell("awa");

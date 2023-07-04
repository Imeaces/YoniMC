import { system, world } from "yoni-mcscripts-lib";
import { func_5 } from "./a.js";

system.setIntervalTick(function tick(){

world.getAllPlayers().forEach(player => {
    if (!player.hasFamily("sil")) return;
    
    let l, u, cam;
    let loc = player.getHeadLocation();
    let { x: hx, y: hy, z: hz } = loc;
    
    try {
        let block = player.getBlockFromViewDirection();
        let { x, y, z } = block;
        
        x += 0.5;
        y += 0.5;
        z += 0.5;
        
        let ofx = Math.abs(hx-x);
        let ofy = Math.abs(hy-y);
        let ofz = Math.abs(hz-z);
        /*
        if (ofx > ofy && ofx > ofz)
            ofx-=1;
        else if (ofy > ofx && ofy > ofz)
            ofy-=1;
        else
            ofz-=1;
        */
        l = Math.sqrt(ofx**2 + ofy**2 + ofz**2);
    } catch {
        l = 2.5;
    }
    
    u = hy - player.location.y - 0.4;
    
    if (player.dimension.getBlock(loc)?.isSolid())
        cam = player.getRotation().x;
    else
        cam = -func_5(-player.getRotation().x, l, u);

    
    let deg = `l: ${l} u: ${u} cam: ${cam} rel: ${player.getRotation().x}`;
    player.onScreenDisplay.setActionBar(deg);
    
    //player.runCommandAsync(`execute rotated ~ 0 positioned ^ ^0.4 ^0.2 run camera @s set minecraft:free ease 0.2 out_circ pos ~ ~ ~ rot ${cam} ~`);
    player.runCommandAsync(`camera @s set yonimc:free_first_person_noeffect ease 0.2 out_circ pos ~ ~0.4 ~ rot ${cam} ~`);
    //你说我直接facing会不会快一点
});

}, 1);
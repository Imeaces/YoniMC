import { system, world, YoniPlayer, Minecraft } from "yoni-mcscripts-lib";
import { func_5 } from "./a.js";

let pls = new WeakSet<YoniPlayer>();

system.setIntervalTick(function tick(){

world.getAllPlayers().forEach(player => {
    if (player.hasFamily("sil")){
        pls.add(player);
    } else {
         if (pls.has(player)){
             player.fetchCommand("camera @s clear");
             pls.delete(player);
         }
         return;
    }
    let l, u, cam;
    let loc = player.getHeadLocation();
    let { x: hx, y: hy, z: hz } = loc;
    
    let cameraId = "minecraft:free ease 0.2 out_circ";
    
    try {
        let blockHit = player.getBlockFromViewDirection();
        if (!blockHit)
            throw "e";
        
        let { x, y, z } = blockHit.block as Minecraft.Block;
        
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
    
    if (player.dimension.getBlock(loc)?.isSolid()){
        cam = player.rotation.x;
        cameraId = "minecraft:third_person";
    } else {
        cam = -func_5(-player.rotation.x, l, u);
    }
    
    let deg = `l: ${l} u: ${u} cam: ${cam} rel: ${player.rotation.x}`;
    player.onScreenDisplay.setActionBar(deg+"\n"+`camera @s set ${cameraId} pos ~ ~0.4 ~ rot ${cam} ~`);
    
    //player.runCommandAsync(`execute rotated ~ 0 positioned ^ ^0.4 ^0.2 run camera @s set minecraft:free ease 0.2 out_circ pos ~ ~ ~ rot ${cam} ~`);
    player.runCommandAsync(`camera @s set ${cameraId} pos ~ ~0.4 ~ rot ${cam} ~`);
    //player.runCommandAsync(`camera @s set ${cameraId} pos ~ ~0.4 ~ rot ${cam} ~`);
    //你说我直接facing会不会快一点
});

}, 1);
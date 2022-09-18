import { world } from "mojang-minecraft";

let playerJoining = new Set();

world.events.playerJoin.subscribe((event)=>{
    let player = event.player;
    console.warn(`Player ${player.name} joining the game.`);
    playerJoining.add(player);
    player.runCommand("give @s barrier 190");
});

world.events.tick.subscribe(()=>{
    if (playerJoining.size < 1) return;
    for (let player of world.getPlayers()){
        if (playerJoining.has(player)){
            console.warn(`Player ${player.name} joined the game.`);
            player.runCommand("give @s bedrock 190");
            playerJoining.delete(player);
        }
    }
});

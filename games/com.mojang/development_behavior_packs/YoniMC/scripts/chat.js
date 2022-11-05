import { world, Location } from "@minecraft/server";

//距离
const maxDistance = 23;

const send = async function send(receiver, message){
    const rawtext = JSON.stringify({
        rawtext: [
            {
                text: String(message).replaceAll(/[“”]/g, "\"")
            }
        ]
    });
    receiver.runCommandAsync(`tellraw @s ${rawtext}`);
}

world.events.beforeChat.subscribe((event)=>{
    const { sender } = event;
    const { dimension, location } = sender;
    const targets = Array.from(dimension.getEntities({
        location: new Location(location.x, location.y, location.z),
        maxDistance, type: "minecraft:player" }));
    event.targets = targets;
    event.sendToTargets = true;
    
    //debug代码
    let dbgmsg = "您的消息将会被发送到这些玩家:";
    for (const pl of targets){
        dbgmsg += pl.name;
    }
    send(sender, dbgmsg);
    //debug代码结束
});

/* 这段代码需要超过30分钟的时间才能写完，所以暂时不用这个办法
const A_SPECIAL_TAG = "§T§H§E§_§P§L§A§Y§E§R§_§W§I§L§L§_§R§E§C§E§I§V§E§_§M§E§S§S§A§G§E";

world.events.beforeChat.subscribe((event)=>{
    const { sender } = event;
    const { dimension, location } = sender;
    const sameDimPlayers = new Set();
    Array.from(world.getPlayers()).forEach(pl=>{
        if (pl.dimension.id === dimension.id){
            sameDimPlayers.add(pl);
        }
    });
    const playerLocs = new Map();
    Array.from(sameDimPlayers).forEach(pl=>{
        playerLocs.set(pl, pl.location);
    });
    const nearPlayers
    
    
    
    const targets = [...world.getPlayers({
        location: location,
        maxDistance: maxDistance
    })].map((player)=>{
        if (player.dimension.id === dimension.id)
            return player;
        else
            return;
    });
    
    //debug代码
    let dbgmsg = "您的消息将会被发送到这些玩家:";
    for (const pl of targets){
        dbgmsg += pl.name;
    }
    send(sender, dbgmsg);
    //debug代码结束
    
    event.sendToTargets = true;
});
*/
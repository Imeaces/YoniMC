import { ChatCommand,
    EventListener,
    Command,
    Utils,
    EntityBase,
    Location,
    Minecraft, Logger,
    YoniPlayer } from "../yoni/index.js";

import { Dimension, YoniDimension } from "../yoni/dimension.js";
import { Vector3 } from "../yoni/Location.js";
import { FakePlayerManager, YonimcFakePlayer } from "./FakePlayer.js";


const logger = new Logger("ChainDestroy");




const Config = new (class Config {
    maxRadius = 4;
    maxChainCount = 100;
});
ChatCommand.registerCommand("setchainradius", (sender, command, label, args)=>{
    if (isFinite(Number(args[0])))
        Config.maxRadius = Number(args[0]);
    else
        sender.sendMessage("不是数字");
});
ChatCommand.registerCommand("setchaincount", (sender, command, label, args)=>{
    if (isFinite(Number(args[0])))
        Config.maxChainCount = Number(args[0]);
    else
        sender.sendMessage("不是数字");
});



let digBlock: (blockLocation: Location, gamemode: Minecraft.GameMode) => Promise<void>;

//////////////////////
// dig block method 1
//////////////////////
digBlock = async function digBlock1(location: Location, gamemode: Minecraft.GameMode){
    return Command.addExecuteParams(
        Command.PRIORITY_LOW,
        location.dimension,
        "setblock",
        location.x, location.y, location.z,
        "air", 0, "destroy")
    .then(rt => {
        if (rt.statusCode !== 0){
            throw new Error(rt.statusMessage);
        }
    });
}

//////////////////////
//  block break listener  ///
//////////////////////
EventListener.register("blockBreak", (event: any) => {
    let { player, dimension, block, brokenBlockPermutation } : { player: Minecraft.Player, dimension: YoniDimension, block: Minecraft.Block, brokenBlockPermutation: Minecraft.BlockPermutation } = event;
    dimension = Dimension.dim(dimension);
    
    if (!player.isSneaking) return;
    
    startChainDestroy1(new Location(block), 
        brokenBlockPermutation.type,
        <Minecraft.GameMode>(<YoniPlayer>EntityBase.from(player)).gamemode,
    ).catch(logger.error);
});
    
    
    
//////////////////////
//  chain method 1  ///
//////////////////////
function f0(v: number){
    if (v > 0){
        return 1;
    } else if (v < 0){
        return -1;
    } else {
        return 0;
    }
}
async function startChainDestroy1(center: Location, blockType: Minecraft.BlockType, gamemode: Minecraft.GameMode, radius = Config.maxRadius){
    let blockStack: ({
        offset: [number, number, number],
        depth: number,
        canNextOffsets: Array<[number, number, number]>
    })[] = [];
    
    function addOffset(offset: [number, number, number], depth: number){
        let offsetInfo: {
            offset: [number, number, number],
            depth: number,
            canNextOffsets: Array<[number, number, number]>
        } = { offset, depth, canNextOffsets: [] };
        // x y z
        if (Math.abs(offset[0]) === depth){
            offsetInfo.canNextOffsets.push([f0(offset[0]), 0, 0]);
        }
        if (Math.abs(offset[1]) === depth){
            offsetInfo.canNextOffsets.push([0, f0(offset[1]), 0]);
        }
        if (Math.abs(offset[2]) === depth){
            offsetInfo.canNextOffsets.push([0, 0, f0(offset[2])]);
        }
        
        // xy xz yz
        if (Math.abs(offset[0]) === depth
        && Math.abs(offset[1]) === depth){
            offsetInfo.canNextOffsets.push([f0(offset[0]), f0(offset[1]), 0]);
        }
        if (Math.abs(offset[0]) === depth
        && Math.abs(offset[2]) === depth){
            offsetInfo.canNextOffsets.push([f0(offset[0]), 0, f0(offset[2])]);
        }
        if (Math.abs(offset[1]) === depth
        && Math.abs(offset[2]) === depth){
            offsetInfo.canNextOffsets.push([0, f0(offset[1]), f0(offset[2])]);
        }
        
        // xyz
        if (Math.abs(offset[0]) === depth
        && Math.abs(offset[1]) === depth
        && Math.abs(offset[2]) === depth){
            offsetInfo.canNextOffsets.push([f0(offset[0]), f0(offset[1]), f0(offset[2])]);
        }
        
        blockStack.push(offsetInfo);
    }
    
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            for (let k = -1; k <= 1; k++){
                if (i === 0 && j === 0 && k === 0)
                    continue;
                addOffset([i, j, k], 1);
            }
        }
    }
    let commands = [];
    
    while (blockStack.length > 0){
        // @ts-ignore
        let offsetInfo: {
            offset: [number, number, number],
            depth: number,
            canNextOffsets: Array<[number, number, number]>
        } = blockStack.shift();
        
        let location = center.offset(...offsetInfo.offset);
        let block;
        try {
            block = location.getBlock();
        } catch {
            continue;
        }
        //logger.debug(location.toString());
        if (block.type !== blockType){
           // logger.debug("方块类型不同, {} !== {} ", block.type.id, blockType.id);
            continue;
        }
        
        commands[commands.length] = digBlock(location, gamemode);
        
        if (offsetInfo.depth >= radius)
            continue;
        
        for (let ofinfo of offsetInfo.canNextOffsets){
            // @ts-ignore
            let offset: [number, number, number] = Array.from(offsetInfo.offset);
            offset[0] += ofinfo[0];
            offset[1] += ofinfo[1];
            offset[2] += ofinfo[2];
            
            addOffset(offset, offsetInfo.depth + 1);
        }
        
        if (commands.length > 72){
            await Promise.all(commands);
            commands.length = 0;
        }
    }
}




//////////////////////
//  chain method 2  ///
//////////////////////
function getLocStr(v: Vector3){
    return `${v.x},${v.y},${v.z}`;
}
function getStrLoc(v: string){
    return new Location(<[number, number, number]>v.split(",").map(Number));
}
function getSurroundingLocs(v: Vector3): Location[]{
    let rt = [];
    let v2 = new Location(v);
    for (let ox = -1; ox < 2; ox++){
        for (let oy = -1; oy < 2; oy++){
            for (let oz = -1; oz<2; oz++){
                if (ox==0 && oy==0 && oz==0)
                    continue;
                rt.push(v2.offset(ox, oy, oz));
            }
        }
    }
    return rt;
}

async function startChainDestroy2(center: Location, blockType: Minecraft.BlockType, gamemode: Minecraft.GameMode, chainCount = Config.maxChainCount){
    //存储方块坐标字符串
    let detectBlockStack: string[] = [];
    let detectedLocs = new Set<string>();
    let dimension = center.dimension;
    
    detectBlockStack.push(...getSurroundingLocs(center).map(v=>getLocStr(v)));
    
    let commands = [];
    
    while (detectBlockStack.length > 0 && chainCount >= detectedLocs.size){
        let dPos = detectBlockStack.shift();
        
        if (detectedLocs.has(<string>dPos))
            continue;
        
        let location = getStrLoc(<string>dPos).setDimension(dimension);
        
        detectedLocs.add(<string>dPos);
        
        let block;
        try {
            block = location.getBlock();
        } catch {
            continue;
        }
        
        if (block.type !== blockType)
            continue;
            
        commands[commands.length] = digBlock(location, gamemode);
        
        detectBlockStack.push(...getSurroundingLocs(location).map(v=>getLocStr(v)));
        
        if (commands.length > 72){
            await Promise.all(commands);
            commands.length = 0;
        }
    }
    
}
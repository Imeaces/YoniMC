import { ChatCommand,
    LegacyEventListener,
    Command,
    YoniUtils as Utils,
    EntityBase,
    Location,
    Minecraft, Logger,
    YoniPlayer } from "yoni-mcscripts-lib";

import { Dimension, YoniDimension } from "yoni-mcscripts-lib";
import { Vector3 } from "yoni-mcscripts-lib";
import { FakePlayerManager, YonimcFakePlayer } from "./../fakePlayer/FakePlayer.js";

//////////////////////
//     config       ///
//////////////////////
const logger = new Logger("ChainDestroy");

const Config = new (class Config {
    maxRadius = 4;
    maxChainCount = 100;
});

//////////////////////
//  listener        ///
//////////////////////
LegacyEventListener.register("minecraft:afterEvents.blockBreak", (event: any) => {
    let { player, dimension, block, brokenBlockPermutation } : { player: Minecraft.Player, dimension: YoniDimension, block: Minecraft.Block, brokenBlockPermutation: Minecraft.BlockPermutation } = event;
    dimension = Dimension.toDimension(dimension);
    
    if (!player.isSneaking) return;
    
    let yplayer = <YoniPlayer>EntityBase.from(player);
    
    if (isChainDestoryTool(
        yplayer.getInventory().getItem(yplayer.selectedSlot)?.typeId)
    )
     
    startChainDestroy2(new Location(block), 
        yplayer,
        brokenBlockPermutation.type,
    ).catch(logger.error);
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

//////////////////
// fake player ///
//////////////////

/**
 * 返回准备好了的fp
 */
async function getDiggerPlayer() {
    let digger: YonimcFakePlayer;
    try {
        digger = FakePlayerManager.getFakePlayer(
            "§§DiggerHelper"
        );
    } catch {
        digger = await FakePlayerManager.createFakePlayer(
            0,
            {x: 0, y: 0, z: 0},
            "§§DiggerHelper"
        );
        await digger.fetchCommand("function yonimc/lock_inventory");
    }
    return digger;
}

let holdingPros = new Promise((re: any) => re());
async function holdDiggerPlayer(){
    await holdingPros;
    
    //@ts-ignore
    let result: { player: YonimcFakePlayer, release: (v: void) => void } = {};
    //@ts-ignore
    holdingPros = holdingPros.then(new Promise(re => result.release = () => {
           // result.player.teleport(diggerPlayerIdleLocation);
    //@ts-ignore
            logger.info("release digger"); re() }));
    
    result.player = await getDiggerPlayer();
    
    logger.info("hold digger");
    
    return result;
}

const { EffectTypes } = Minecraft;

async function makeDiggerPlayer(digger: YonimcFakePlayer, player: YoniPlayer){
    if (digger.gamemode !== player.gamemode){
        await Command.fetchExecuteParams(digger, "gamemode", player.gamemode);
        digger.say("§egamemode: "+digger.gamemode);
    } else {
        digger.say("§agamemode: "+digger.gamemode);
    }
    
    await digger.fetchCommand("function yonimc/lock_inventory");
    digger.teleport(player.location);
    setMainHandItem(digger, getMainHandItem(player));
    try {
        let comp = <Minecraft.EntityScaleComponent>digger.getComponent("scale");
        comp.value = 0.0001;
    } catch {}
    digger.addEffect(EffectTypes.get("haste") as Minecraft.EffectType, 20000000, 127, true);
    digger.addEffect(EffectTypes.get("instant_health") as Minecraft.EffectType, 20000000, 127, true);
    digger.addEffect(EffectTypes.get("resistance") as Minecraft.EffectType, 20000000, 127, true);
    digger.addEffect(EffectTypes.get("fireResistance") as Minecraft.EffectType, 20000000, 127, true);
    digger.addEffect(Minecraft.EffectTypes.get("invisibility") as Minecraft.EffectType, 20000000, 127, true);
}

const diggerPlayerIdleLocation = new Location("overworld", 0, -99, 0);

async function digBlock(digger: YonimcFakePlayer, location: Location, player: YoniPlayer, gamemode: Minecraft.GameMode){
    if (gamemode !== Minecraft.GameMode.creative){
        setMainHandItem(digger, getMainHandItem(player))
    }
    digger.teleport(location.offset(0, 0.5, 0));
    await digger.breakBlock(location.getVanillaBlockLocation());
    if (gamemode !== Minecraft.GameMode.creative){
        setMainHandItem(player, getMainHandItem(digger))
    }
}


//////////////////////
//  chain method 1  ///
//////////////////////
function getOneDimensionDirection(v: number){
    if (v > 0){
        return 1;
    } else if (v < 0){
        return -1;
    } else {
        return 0;
    }
}
interface OffsetInfo {
    offset: [number, number, number],
    depth: number,
    canNextOffsets: Array<[number, number, number]>
}
function ChainDestroy1_addOffset(blockStack: OffsetInfo[], offset: [number, number, number], depth: number){
    let offsetInfo: {
        offset: [number, number, number],
        depth: number,
        canNextOffsets: Array<[number, number, number]>
    } = { offset, depth, canNextOffsets: [] };
    
    let [x, y, z] = offset;
    
    let dx = getOneDimensionDirection(offset[0]);
    let dy = getOneDimensionDirection(offset[1]);
    let dz = getOneDimensionDirection(offset[2]);
    
    let abx = Math.abs(x);
    let aby = Math.abs(z);
    let abz = Math.abs(z);
    
    let { canNextOffsets } = offsetInfo;
    
    // x y z
    if (abx === depth){
        canNextOffsets.push([dx, 0, 0]);
    }
    if (aby === depth){
        canNextOffsets.push([0, dy, 0]);
    }
    if (abz === depth){
        canNextOffsets.push([0, 0, dz]);
    }
    
    // xy xz yz
    if (abx === depth
    && aby === depth){
        canNextOffsets.push([dx, dy, 0]);
    }
    if (abx === depth
    && abz === depth){
        canNextOffsets.push([dx, 0, dz]);
    }
    if (aby === depth
    && abz === depth){
        canNextOffsets.push([0, dy, dz]);
    }
    
    // xyz
    if (abx === depth
    && aby === depth
    && abz === depth){
        canNextOffsets.push([dx, dy, dz]);
    }
    
    blockStack.push(offsetInfo);
}
async function startChainDestroy1(center: Location, player: YoniPlayer, blockType: Minecraft.BlockType, radius = Config.maxRadius){
    let blockStack: OffsetInfo[] = [];
    
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            for (let k = -1; k <= 1; k++){
                if (i === 0 && j === 0 && k === 0)
                    continue;
                ChainDestroy1_addOffset(blockStack, [i, j, k], 1);
            }
        }
    }
    
    let _startTime = Date.now();
    let fakePlayerReq = await holdDiggerPlayer();
    
    if (Date.now() - _startTime > 5000){
        fakePlayerReq.release();
        throw new Error("超时");
    }
    
    let digger = fakePlayerReq.player;
    
    await (async (fakePlayerReq) => {
        await makeDiggerPlayer(digger, player);
        await chainDestroy1(digger, player, center, blockStack, blockType, radius);
        player.getInventory().setItem(player.selectedSlot,
            digger.getInventory().getItem(digger.selectedSlot)
        );
        digger.teleport(diggerPlayerIdleLocation);
    })()
    .catch(logger.error)
    .finally(fakePlayerReq.release);
    
}
async function chainDestroy1(digger: YonimcFakePlayer, player: YoniPlayer, center: Location, blockStack: OffsetInfo[], blockType: Minecraft.BlockType, radius: number){
    let gamemode = player.gamemode;
    
    while (blockStack.length > 0){
        let offsetInfo: OffsetInfo = <OffsetInfo>blockStack.shift();
        
        let location = center.offset(...offsetInfo.offset);
        
        let block;
        
        try {
            block = location.getBlock();
        } catch {
            continue;
        }
        
        if (block.type !== blockType){
            continue;
        }
        
        await digBlock(digger, location, player, gamemode);
        
        if (offsetInfo.depth >= radius)
            continue;
        
        for (let ofinfo of offsetInfo.canNextOffsets){
            // @ts-ignore
            let offset: [number, number, number] = Array.from(offsetInfo.offset);
            offset[0] += ofinfo[0];
            offset[1] += ofinfo[1];
            offset[2] += ofinfo[2];
            
            ChainDestroy1_addOffset(blockStack, offset, offsetInfo.depth + 1);
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
async function startChainDestroy2(center: Location, player: YoniPlayer, blockType: Minecraft.BlockType, chainCount = Config.maxChainCount){
    
    logger.debug("startChainDestroy2:: center: {}", center.toString());
    
    //存储方块坐标字符串
    let detectBlockStack: string[] = [];
    let detectedLocs = new Set<string>();
    let dimension = center.dimension;
    
    detectBlockStack.push(...getSurroundingLocs(center).map(v=>getLocStr(v)));
    
    let BlockTypeGroup: Set<string> = getBlockTypeGroup(blockType.id);
    
    let _startTime = Date.now();
    let fakePlayerReq = await holdDiggerPlayer();
    
    if (Date.now() - _startTime > 5000){
        fakePlayerReq.release();
        throw new Error("超时");
    }
    
    let digger = fakePlayerReq.player;
    let gamemode = player.gamemode;
    
    await (async (fakePlayerReq) => {
        await makeDiggerPlayer(digger, player);
        while (detectBlockStack.length > 0 && chainCount >= detectedLocs.size){
            let dPos = <string>detectBlockStack.shift();
            
            if (detectedLocs.has(<string>dPos))
                continue;
            
            let location = getStrLoc(dPos).setDimension(dimension);
            detectedLocs.add(dPos);
            
            let block;
            try {
                block = location.getBlock();
            } catch {
                continue;
            }
            
            if (!BlockTypeGroup.has(block.type.id))
                continue;
            
            await digBlock(digger, location, player, gamemode);
            
            detectBlockStack.push(...getSurroundingLocs(location).map(v=>getLocStr(v)));
        }
        
        digger.teleport(diggerPlayerIdleLocation);
    })()
    .catch(logger.error)
    .finally(fakePlayerReq.release);
    
    
}

function getBlockTypeGroup(id: string){
    let group = new Set<string>();
    group.add(id);
    for (let gin of group_blocktype_definitions){
        if (gin.includes(id))
            gin.forEach(t => group.add(t));
    }
    return group;
}
const group_blocktype_definitions: string[][] = [
    ["minecraft:redstone_ore", "minecraft:lit_redstone_ore","minecraft:deepslate_redstone_ore","minecraft:lit_deepslate_redstone_ore"],
    ["minecraft:deepslate_lapis_ore","minecraft:lapis_ore"],
    ["minecraft:gold_ore", "minecraft:deepslate_gold_ore"],
    ["minecraft:iron_ore", "minecraft:deepslate_iron_ore"],
    ["minecraft:coal_ore", "minecraft:deepslate_coal_ore"],
    ["minecraft:copper_ore", "minecraft:deepslate_copper_ore"],
];
function isChainDestoryTool(id?: string){
    id = id ?? "minecraft:air";
    return id.match(
        /^(.+_((pick)?axe|hoe|sowrd|shovel))|shears$/) !== null
}
function getMainHandItem(player: YoniPlayer|YonimcFakePlayer){
    return player.getInventory().getItem(player.selectedSlot);
}
function setMainHandItem(player: YoniPlayer|YonimcFakePlayer, item?: Minecraft.ItemStack){
    return player.getInventory().setItem(player.selectedSlot, item);
}
/*

function fffff000(player, blockStack, fakePlayer){
    
    
}


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
    
}*/
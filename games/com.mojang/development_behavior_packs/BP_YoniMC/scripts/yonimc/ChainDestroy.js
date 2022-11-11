import "yoni/index.js";

const chainBlockList=[
  "minecraft:diamond_ore"
]
let chainCount = 400;

ChatCommand.registerCommand("setchaincount", (sender, command, label, args)=>{
    if (isFinite(Number(args[0])))
        chainCount = Number(args[0]);
    else
        sender.sendMessage("不是数字");
});

EventListener.register("blockBreak", async (event)=>{
    return;
    let blocksThatToBreak = [];
    let blocksThatToDetect = [];
    let blocksThatToDetectInPos = [];
    let blocksThatDetected = [];
    let dim = event.dimension;
    let chainBlockType = null;
    const bloc = (block)=>{
        return `${block.location.x},${block.location.y},${block.location.z}`;
    };
    const detectBlockRound = (block) => {
        blocksThatDetected.push(bloc(block));
        let nearBlocks = [];
        for (let ox = -1; ox < 2; ox++){
            for (let oy = -1; oy<2; oy++){
                for (let oz = -1; oz<2; oz++){
                    if (ox!=0 && oy!=0 && oz!=0){
                        continue;
                    } else {
                        nearBlocks.push(dim.getBlock(block.location.offset(ox,oy,oz)));
                    }
                }
            }
        }
        for (let block of nearBlocks){
            if (block?.typeId != null && block.typeId == chainBlockType && !blocksThatToDetectInPos.includes(`${block.location.x},${block.location.y},${block.location.z}`)){
                blocksThatToDetect.push(block);
                blocksThatToDetectInPos.push(bloc(block));
                if (!blocksThatToBreak.includes(bloc(block)))
                    blocksThatToBreak.push(bloc(block));
            }
        }
    }
    //if (chainBlockList.includes(event.brokenBlockPermutation.type.typeId)){
        blocksThatToDetect.push(event.block);
        chainBlockType = event.brokenBlockPermutation.type.id;
    //}

    let blocksDetectCount = 0;
    for (let i = 0; i< blocksThatToDetect.length; i++){
        if (blocksDetectCount > chainCount){
            await YoniUtils.send(event.player, "to much block "+ blocksThatToDetect.length);
            break;
        } else {
            blocksDetectCount++;
        }

        let block = blocksThatToDetect[i];
        
        if (blocksThatDetected.includes(bloc(block)))
            continue;
        
        detectBlockRound(block);
        //blocksThatToDetect.splice(0,1);
        
    }
    for (let pos of new Set(blocksThatToBreak)){
        Command.fetchExecute(dim, `setblock ${pos.replaceAll(/,/g, "\x20")} air 0 destroy`);
    }
    event.player.onScreenDisplay.setTitle(`${blocksThatToBreak.length}`);
    event.player.onScreenDisplay.updateSubtitle(`${blocksDetectCount}`);
});
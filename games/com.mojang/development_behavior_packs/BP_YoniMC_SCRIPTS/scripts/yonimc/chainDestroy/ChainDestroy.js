import { ChatCommand, EventListener, Command, YoniUtils as Utils, Location } from "yoni-mcscripts-lib";
const chainBlockList = [
    "minecraft:diamond_ore"
];
let chainCount = 120;
ChatCommand.registerCommand("setchaincount", (sender, command, label, args) => {
    if (isFinite(Number(args[0])))
        chainCount = Number(args[0]);
    else
        sender.sendMessage("不是数字");
});
EventListener.register("minecraft:afterEvents.blockBreak", async (event) => {
    const { player, dimension, block, brokenBlockPermutation } = event;
    if (!player.isSneaking || player.selectedSlot !== 2)
        return;
    let blocksThatToBreak = [];
    let blocksThatToDetect = [];
    let blocksThatToDetectInPos = [];
    let blocksThatDetected = [];
    let dim = dimension;
    let chainBlockType = null;
    const bloc = (block) => {
        return `${block.location.x},${block.location.y},${block.location.z}`;
    };
    const detectBlockRound = async (block) => {
        blocksThatDetected.push(bloc(block));
        let nearBlocks = [];
        for (let ox = -1; ox < 2; ox++) {
            for (let oy = -1; oy < 2; oy++) {
                for (let oz = -1; oz < 2; oz++) {
                    if (ox != 0 && oy != 0 && oz != 0) {
                        continue;
                    }
                    else {
                        nearBlocks.push(dim.getBlock(new Location(block).offset(ox, oy, oz)));
                    }
                }
            }
        }
        for (let block of nearBlocks) {
            if (block?.typeId != null && block.typeId == chainBlockType && !blocksThatToDetectInPos.includes(`${block.location.x},${block.location.y},${block.location.z}`)) {
                blocksThatToDetect.push(block);
                blocksThatToDetectInPos.push(bloc(block));
                if (!blocksThatToBreak.includes(bloc(block)))
                    blocksThatToBreak.push(bloc(block));
            }
        }
    };
    //if (chainBlockList.includes(brokenBlockPermutation.type.typeId)){
    blocksThatToDetect.push(block);
    chainBlockType = brokenBlockPermutation.type.id;
    //}
    let blocksDetectCount = 0;
    for (let i = 0; i < blocksThatToDetect.length; i++) {
        if (blocksDetectCount > chainCount) {
            Utils.send(player, "to much block " + blocksThatToDetect.length);
            break;
        }
        else {
            blocksDetectCount++;
        }
        let block = blocksThatToDetect[i];
        if (blocksThatDetected.includes(bloc(block)))
            continue;
        await detectBlockRound(block);
        //blocksThatToDetect.splice(0,1);
    }
    for (let pos of new Set(blocksThatToBreak)) {
        Command.fetchExecute(dim, `setblock ${pos.replaceAll(/,/g, "\x20")} air [] destroy`);
    }
    player.onScreenDisplay.setTitle(`${blocksThatToBreak.length}`);
    player.onScreenDisplay.updateSubtitle(`${blocksDetectCount}`);
});

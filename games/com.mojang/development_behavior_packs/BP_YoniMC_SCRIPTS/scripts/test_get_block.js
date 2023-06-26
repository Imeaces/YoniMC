import { Minecraft } from "yoni-mcscripts-lib";
const blockMap = new Map();
function getBlockLocationBetween(point1, point2) {
    let x0 = Math.min(point1.x, point2.x);
    let y0 = Math.min(point1.y, point2.y);
    let z0 = Math.min(point1.z, point2.z);
    let x1 = Math.max(point1.x, point2.x);
    let y1 = Math.max(point1.y, point2.y);
    let z1 = Math.max(point1.z, point2.z);
    x0 = Math.floor(x0);
    y0 = Math.floor(y0);
    z0 = Math.floor(z0);
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    z1 = Math.floor(z1);
    let results = [];
    for (let x = x0; x <= x1; x++) {
        for (let y = y0; y <= y1; y++) {
            for (let z = z0; z <= z1; z++) {
                results.push({ x, y, z });
            }
        }
    }
    return results;
}
globalThis.getBlockLocationBetween = getBlockLocationBetween;
globalThis.blockMap = blockMap;
(async function () {
    const overworld = Minecraft.world.getDimension("overworld");
    const blockLocationList = getBlockLocationBetween({ x: 0, y: -64, z: 0 }, { x: 15, y: 319, z: 15 });
    //globalThis.blockLocationList = blockLocationList;
    const startTime = Date.now();
    let interval = 700;
    while (blockLocationList.length > 0) {
        if (interval-- < 0) {
            await 1;
            interval = 700;
        }
        const block = overworld.getBlock(blockLocationList.shift());
        const { x, y, z } = block;
        const locStr = [x, y, z].join(",");
        blockMap.set(locStr, block);
    }
    const endTime = Date.now();
    console.log(endTime - startTime);
})();

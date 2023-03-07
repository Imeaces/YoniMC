import { Minecraft } from "../../basis.js";
import Location, { DimensionLike, Vector3 } from "../../Location.js";
import YoniScheduler from "../../schedule.js";
import Scoreboard, { Objective } from "../../scoreboard.js";

class YMFS {
  dataObjective: Objective = Scoreboard.getObjective("fs:data") ?? Scoreboard.addObjective("fs:data");
  async loop() {
    
  }
  init() {
    if (this.#inited) return;

    let isinited = this.dataObjective.getScore("inited");
    if (isinited === undefined || isinited === 0) {
      this.#doinit();
      this.#inited = true;
    }
  }
  #inited = false;
  #areasize = new Minecraft.BlockAreaSize(16, 16, 16);
  #workLocation: Minecraft.Vector3 | null = null;
  #doinit() {
    this.#workLocation = new Location(565288, 0, 565288);
  }
  static #instance: YMFS;
  static get instance() {
    if (!YMFS.#instance)
      YMFS.#instance = new YMFS();
    return YMFS.#instance;
  }
}

YoniScheduler.runCycleTickTask(
  YMFS.instance.loop.bind(YMFS.instance),
  1,
  1,
  true
);

YMFS.instance.init();

class Volume {
    #volumeArea;
    constructor(dimension: DimensionLike, beginPoint: Vector3, endPoint: Vector3){
        let beginLocation = new Location(dimension, beginPoint).toBlockLocation();
        dimension = beginLocation.dimension;
        
        beginPoint = beginLocation;
        endPoint = new Location(dimension, endPoint).toBlockLocation();
        
        let bX = Math.min(beginPoint.x, endPoint.x);
        let bY = Math.min(beginPoint.y, endPoint.y);
        let bZ = Math.min(beginPoint.z, endPoint.z);
        
        let eX = Math.max(beginPoint.x, endPoint.x);
        let eY = Math.max(beginPoint.y, endPoint.y);
        let eZ = Math.max(beginPoint.z, endPoint.z);
        
        this.#volumeArea = {
            dimension: dimension,
            begin: new Location(bX, bY, bZ),
            x: (eX - bX) + 1,
            y: (eY - bY) + 1,
            z: (eZ - bZ) + 1,
        };
    }
    
    get size(){
        let { x, y, z } = this.#volumeArea;
        return x * y * z;
    }
    
    getChunk(position: number){
        let { x, y, z } = this.#volumeArea;
        let baseLocation = this.#volumeArea.begin.clone();
        
        let nX = (position % x) >>> 0;
        let nY = (position / x % y) >>> 0;
        let nZ = (position / x / y % z) >>> 0;
        
        if (nZ > z){
            throw new RangeError("chunk position "+position+" out of volume size");
        }
        
        return baseLocation.add([nX, nY, nZ]).getBlock();
    }
    
}

class Chunk {
    constructor(location: Location){
    
    }
    #blockMap = new Map<number, Block>();
    getBlock(position: number){
        let block = this.#blockMap.get(position);
        if (block === undefined){
            block = new Block(this, position);
        }
    }
    setData(position: number, data: string){}
    setLength(position: number, length: number | bigint){}
}

class BlockProxyClass {
    
}

class Block extends Array {
    constructor(chunk: Chunk, index: number){
        super();
        //Object.defineProperties();
    }
}

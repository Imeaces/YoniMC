import { Minecraft } from "../basis.js";
import { YoniDimension } from "../dimension.js";
import { Location, Vector3, DimensionLike } from "../Location.js";
import { VolumeArea } from "./VolumeArea.js";
import { Chunk } from "./Chunk.js";


export class Volume {
    get size(){
        let { x, y, z } = this.volumeArea;
        return x * y * z;
    }
    volumeArea: VolumeArea;
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
        
        this.volumeArea = {
            dimension: dimension as YoniDimension,
            begin: new Location(bX, bY, bZ),
            x: (eX - bX) + 1,
            y: (eY - bY) + 1,
            z: (eZ - bZ) + 1,
        };
        
        this.getChunk(0);
        this.getChunk(this.size - 1);
    }
    #chunks = new Map<string, Chunk>();
    getChunk(position: number): Chunk{
        let location = Volume.position2Location(position, this.volumeArea);
        let locationStr = location.toString();
        if (this.#chunks.has(locationStr))
            return this.#chunks.get(locationStr) as Chunk;
        
        let chunk = new Chunk(location);
        this.#chunks.set(locationStr, chunk);
        
        return chunk;
    }
    static position2Location(position: number, area: VolumeArea){
        let { x, y, z } = area;
        let baseLocation = area.begin.clone();
        
        let nX = (position % x) >>> 0;
        let nY = (position / x % y) >>> 0;
        let nZ = (position / x / y % z) >>> 0;
        
        if (nZ > z){
            throw new RangeError("chunk position "+position+" out of volume size");
        }
        
        return baseLocation.add([nX, nY, nZ]);
    }
}


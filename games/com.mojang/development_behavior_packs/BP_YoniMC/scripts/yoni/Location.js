import { dim, Minecraft } from "./basis.js";

function makeNumber(v){
    v = Number(v);
    if (!isFinite(v))
        throw new Error("Number not finite");
    return v;
}

/**
 * 一个复杂点的Location类
 */
class Location {
    /**
     * @param {number} v
     * @returns {number}
     */
    static normalizePitch(v){
        v = makeNumber(v);
        v += 180;
        v = v % 360;
        v -= 180;
        return v;
    }
    /**
     * @param {number} v
     * @returns {number}
     */
    static normalizeYaw(v){
        v = makeNumber(v);
        v += 180;
        v = v % 360;
        v -= 180;
        return v;
    }
    
    #x = NaN;
    /**
     * @type {number}
     */
    get x(){
        return this.#x;
    }
    set x(v){
        v = makeNumber(v);
        this.#x = v;
    }
    
    #y = NaN;
    /**
     * @type {number}
     */
    get y(){
        return this.#y;
    }
    set y(v){
        v = makeNumber(v);
        this.#y = v;
    }
    
    #z = NaN;
    /**
     * @type {number}
     */
    get z(){
        return this.#z;
    }
    set z(v){
        v = makeNumber(v);
        this.#z = v;
    }
    
    #rx = 0;
    /**
     * @type {number}
     */
    get rx(){
        return this.#rx;
    }
    set rx(v){
        this.#rx = Location.normalizePitch(v);
    }
    
    #ry = 0;
    /**
     * @type {number}
     */
    get ry(){
        return this.#ry;
    }
    set ry(v){
        this.#ry = Location.normalizeYaw(v);
    }
    
    // @ts-ignore
    #dimension;
    /**
     * @type {Minecraft.Dimension}
     */
    get dimension(){
        return this.#dimension;
    }
    /**
     * @param {number|string|Minecraft.Dimension} v
     */
    set dimension(v){
        v = fromValueGetDimension(v);
        this.#dimension = v;
    }
    
    /**
     * 代表一个MC中的位置，其中包括维度，坐标，旋转角
     * 参数顺序一般遵循以下规则
     * 先维度，后坐标，最后旋转角
     * 坐标先x，之后是y，最后是z
     * 旋转角先是rx，后是ry
     * 以下列出了所有的可能的参数形式，参数中不存在的内容将会以默认值补全
     * dimension, x, y, z, rx, ry
     * x, y, z, rx, ry
     * dimension, x, y, z
     * x, y, z
     * dimension, {x, y, z}, {rx, ry}
     * dimension, [x, y, z], {rx, ry}
     * dimension, {x, y, z}, [rx, ry]
     * dimension, [x, y, z], [rx, ry]
     * {dimension, x, y, z}, {rx, ry}
     * [dimension, x, y, z], {rx, ry}
     * {dimension, x, y, z}, [rx, ry]
     * [dimension, x, y, z], [rx, ry]
     * {x, y, z}, {rx, ry}
     * [x, y, z], {rx, ry}
     * {x, y, z}, [rx, ry]
     * [x, y, z], [rx, ry]
     * dimension, {x, y, z, rx, ry}
     * dimension, {x, y, z}
     * dimension, [x, y, z, rx, ry]
     * dimension, [x, y, z]
     * {location: {x, y, z}, dimension, rotation: {x, y}}
     * {location: {x, y, z}, dimension}
     * {location: {x, y, z}, rotation: {x, y}}
     * {location: {x, y, z}}
     * {x, y, z, rx, ry, dimension}
     * {x, y, z, rx, ry}
     * {x, y, z, dimension}
     * {x, y, z}
     * [dimension, x, y, z, rx, ry]
     * [x, y, z, rx, ry]
     * [dimension, x, y, z]
     * [x, y, z]
     * @param {LocationParams} values
     */
    constructor(...values){
        let { x, y, z, rx, ry, dimension } = makeLocation(values);
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        if (rx !== undefined){
            if (isFinite(rx))
                this.rx = rx;
            else
                throw new Error("rx not finite");
        }
        if (ry !== undefined){
            if (isFinite(ry))
                this.ry = ry;
            else
                throw new Error("rx not finite");
        }
        
        if (dimension == null){
            this.dimension = dim.overworld;
        } else {
            this.dimension = dimension;
        }
    }
    /**
     * @param {LocationParams} values
     */
    add(...values){
        let { x, y, z } = makeLocation(values);
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    /**
     * @param {LocationParams} values
     */
    subtract(...values){
        let { x, y, z } = makeLocation(values);
        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }
    /**
     * @param {LocationParams} values
     */
    multiply(...values){
        let { x, y, z } = makeLocation(values);
        this.x *= x;
        this.y *= y;
        this.z *= z;
        return this;
    }
    /**
     * 将坐标设置为原点
     */
    zero(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    }
    
    /**
     * @param {Location1Arg} loc
     */
    distance(loc){
        let distance = this.distancrSquared(loc);
        return Math.sqrt(distance);
    }
    /**
     * @param {Location1Arg} loc
     */
    distancrSquared(loc){
        let fromLocation = makeLocation([loc]);
        /*if (this.dimension !== fromValueGetDimension(fromLocation.dimension)){
            throw new Error("different dimension");
        }*/
        let { x, y, z } = this;
        let distance = 0;
        distance += Math.abs(fromLocation.x ** 2 - x ** 2);
        distance += Math.abs(fromLocation.y ** 2 - y ** 2);
        distance += Math.abs(fromLocation.z ** 2 - z ** 2);
        return distance;
    }
    getLength(){
        throw new Error("not implemented yet");
    }
    getLengthSquared(){
        throw new Error("not implemented yet");
    }
    
    toVector(){
        throw new Error("not implemented yet");
    }
    getDirection(){
        throw new Error("not implemented yet");
    }
    setDirection(){
        throw new Error("not implemented yet");
    }
    
    /**
     * @returns {Minecraft.Block} 此位置上的方块
     */
    getBlock(){
        return this.dimension.getBlock(this.getVanillaBlockLocation());
    }
    getBlockX(){
        throw new Error("not implemented yet");
    }
    getBlockY(){
        throw new Error("not implemented yet");
    }
    getBlockZ(){
        throw new Error("not implemented yet");
    }
    /**
     * 返回一个取整后的坐标，且旋转角为0
     */
    toBlockLocation(){
        let { x, y, z, dimension } = this;
        return new Location(dimension, [Math.floor(x), Math.floor(y), Math.floor(z)]);
    }
    /**
     * 返回一个在此坐标上偏移指定坐标的Location
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    offset(x, y, z){
        const location = this.clone();
        location.x += x;
        location.y += y;
        location.z += z;
        return location;
    }
    
    /**
     * @returns {Minecraft.BlockLocation} 根据此位置创建一个原版的Minecraft.BlockLocation
     */
    getVanillaBlockLocation(){
        let { x, y, z } = this;
        return new Minecraft.BlockLocation(Math.floor(x), Math.floor(y), Math.floor(z));
    }
    /**
     * @returns {Minecraft.Location} 根据此位置创建一个原版的Minecraft.Location
     */
    getVanillaLocation(){
        let { x, y, z } = this;
        return new Minecraft.Location(x, y, z);
    }
    
    isLoaded(){
        throw new Error("not implemented yet");
    }
    getChunk(){
        throw new Error("not implemented yet");
    }
    
    checkFinite(){
        throw new Error("not implemented yet");
    }
    /**
     * @param {Location1Arg} loc
     */
    equals(loc){
        let fromLocation = new Location(loc);
        let { x, y, z, rx, ry, dimension } = this;
        if (fromLocation.x === x
        && fromLocation.y === y
        && fromLocation.z === z
        && fromLocation.rx === rx
        && fromLocation.ry === ry
        && fromLocation.dimension === dimension){
            return true;
        } else {
            return false;
        }
    }
    clone(){
        return new Location(this);
    }
    
    toString(){
        return "Location: " + JSON.stringify(this.toJSON());
    }
    toJSON(){
        let { x, y, z, rx, ry } = this;
        let dimension = this.dimension.id;
        return { x, y, z, rx, ry, dimension };
    }
    
    /**
     * 将一个Location对象转换为一段字符串
     * @param {Location} v 
     * @returns {string}
     */
    static serialize(v) {
        return JSON.stringify(v);
    }
    /**
     * 将一段由Location对象转换后的字符串转换为Location对象
     * @param {string} v 
     * @returns {Location}
     */
    static deserialize(v) {
        return new Location(JSON.parse(v));
    }
}

const DimensionValues = {
    "minecraft:nether": dim.nether,
    "nether": dim.nether,
    "-1": dim.nether,
    "minecraft:overworld": dim.overworld,
    "overworld": dim.overworld,
    "0": dim.overworld,
    "minecraft:the_end": dim.theEnd,
    "the_end": dim.theEnd,
    "the end": dim.theEnd,
    "theEnd": dim.theEnd,
    "1": dim.theEnd
}
/**
 * @param {any} value
 */
function fromValueGetDimension(value){
    if (value instanceof Minecraft.Dimension){
        return value;
    } else if (value in DimensionValues){
        return DimensionValues[value];
    } else {
        throw new Error("unknown dimension");
    }
}

/**
 * @typedef {-1|'minecraft:nether'|'nether'} NetherDimensionLike
 * @typedef {0|'minecraft:overworld'|'overworld'} OverworldDimensionLike
 * @typedef {1|'minecraft:the_end'|'the_end'|'theEnd'|'the end'} TheEndDimensionLike
 * @typedef {NetherDimensionLike|OverworldDimensionLike|TheEndDimensionLike|Minecraft.Dimension} DimensionLike
 */
/**
 * @typedef {{x: number, y: number, z: number, rx?: number, ry?: number, dimension?: DimensionLike}} ILocation
 * @typedef {[number, number, number]|[number, number, number, number, number]|[DimensionLike, number, number, number]|[DimensionLike, number, number, number, number, number]} ILocationArray
 */
/**
 * @typedef {{x: number, y: number, z: number}} ILocationCoords
 * @typedef {{x: number, y: number, z: number, dimension: DimensionLike}} ILocationCoordsWithDimension
 * @typedef {{x: number, y: number, z: number, rx: number, ry: number}} ILocationCoordsWithRotation
 * @typedef {[number, number, number]} ILocationCoordsArray
 * @typedef {[DimensionLike, number, number, number]} ILocationCoordsArrayWithDimension
 * @typedef {[number, number, number, number, number]} ILocationCoordsArrayWithRotation
 */
/**
 * @typedef {{rx: number, ry: number}} ILocationRotation
 * @typedef {{x: number, y: number}} ILocationRotationValue
 * @typedef {[number, number]} ILocationRotationArray
 */
/**
 * @typedef {{location: ILocationCoords, rotation: ILocationRotationValue, dimension: DimensionLike}} ILocationOfObject
 */
/**
 * @typedef {ILocationOfObject|ILocation|ILocationArray} Location1Arg
 * @typedef {[Location1Arg]} LocationArgs1Params
 */
/**
 * @typedef {[DimensionLike, ILocationCoords|ILocationCoordsWithRotation|ILocationCoordsArray|ILocationCoordsArrayWithRotation]|[ILocationCoords|ILocationCoordsArray|ILocationCoordsWithDimension|ILocationCoordsArrayWithDimension, ILocationRotation|ILocationRotationArray]} LocationArgs2Params
 */
/**
 * @typedef {[DimensionLike, ILocationCoords|ILocationCoordsArray, ILocationRotation|ILocationRotationArray]|ILocationCoords} LocationArgs3Params
 */
/**
 * @typedef {ILocationArray} LocationArgsMoreParams
 */
/**
 * @typedef {LocationArgs1Params|LocationArgs2Params|LocationArgs3Params|LocationArgsMoreParams} LocationParams
 */
/**
 * @param {LocationParams} values
 * @returns {ILocation}
 */
function makeLocation(values){
    let x, y, z, rx, ry, dimension = null;
    const matchILocationArray = (value)=>{
        let baseIdx = 0;
        let hasRotation = false;
        if (value.length === 4 || value.length === 6){
            baseIdx = 1;
            dimension = value[0];
        }
        if (value.length >= 5){
            rx = value[baseIdx+3];
            ry = value[baseIdx+4];
            hasRotation = true;
        }
        if (value.length >= 3){
            x = value[baseIdx+0];
            y = value[baseIdx+1];
            z = value[baseIdx+2];
            if (hasRotation){
                if (baseIdx === 1){
                    return {x, y, z, rx, ry, dimension};
                }
                return {x, y, z, rx, ry};
            } else if (baseIdx === 1){
                return {x, y, z, dimension};
            }
            return {x, y, z};
        } else {
            throw new Error("传入的参数未能匹配任何可能额形式");
        }
    }
    if (values.length === 1){
        const value = values[0];
        if (hasKeys(value, "location")){
            const location = value.location;
            x = location.x;
            y = location.y;
            z = location.z;
            if (hasKeys(value, "rotation")){
                const rotation = value.rotation;
                rx = rotation.x;
                ry = rotation.y;
                if (hasKeys(value, "dimension")){
                    dimension = value.dimension;
                    return {x, y, z, rx, ry, dimension};
                }
                return {x, y, z, rx, ry};
            }
            if (hasKeys(value, "dimension")){
                dimension = value.dimension;
                return {x, y, z, dimension};
            }
            return {x, y, z};
        } else if (hasKeys(value, "x", "y", "z")){
            x = value.x;
            y = value.y;
            z = value.z;
            if (hasKeys(value, "rx", "ry")){
                rx = value.rx;
                ry = value.ry;
                if (hasKeys(value, "dimension")){
                    dimension = value.dimension;
                    return {x, y, z, rx, ry, dimension};
                }
                return {x, y, z, rx, ry};
            }
            if (hasKeys(value, "dimension")){
                dimension = value.dimension;
                return {x, y, z, dimension};
            }
            return {x, y, z};
        } else if (Array.isArray(value) && value.length >= 3){
            return matchILocationArray(value);
        }
        throw new Error("未能匹配到下列可能的形式"
            + "\n{location: {x, y, z}, dimension, rotation: {x, y}}"
            + "\n{location: {x, y, z}, dimension}"
            + "\n{location: {x, y, z}, rotation: {x, y}}"
            + "\n{location: {x, y, z}}"
            + "\n{x, y, z, rx, ry, dimension}"
            + "\n{x, y, z, rx, ry}"
            + "\n{x, y, z, dimension}"
            + "\n{x, y, z}"
            + "\n[dimension, x, y, z, rx, ry]"
            + "\n[x, y, z, rx, ry]"
            + "\n[dimension, x, y, z]"
            + "\n[x, y, z]"
        );
    } else if (values.length === 2){
        const value0 = values[0];
        const value1 = values[1];
        let hasDimension = false;
        if (hasKeys(value0, "x", "y", "z")){
            x = value0.x;
            y = value0.y;
            z = value0.z;
            if (hasKeys(value0, "dimension")){
                dimension = value0.dimension;
                hasDimension = true;
            }
        } else if (Array.isArray(value0) && value0.length >= 3){
            let baseIdx = 0;
            if (value0.length === 4){
                dimension = value0[0];
                hasDimension = true;
                baseIdx = 1;
            }
            x = value0[baseIdx+0];
            y = value0[baseIdx+1];
            z = value0[baseIdx+2];
        } else {
            dimension = value0;
            if (hasKeys(value1, "x", "y", "z")){
                x = value1.x;
                y = value1.y;
                z = value1.z;
                if (hasKeys(value1, "rx", "ry")){
                    rx = value1.rx;
                    ry = value1.ry;
                    return {dimension, x, y, z, rx, ry};
                }
                return {dimension, x, y, z};
            } else if (Array.isArray(value1) && value1.length >= 3){
                x = value1[0];
                y = value1[1];
                z = value1[2];
                if (value1.length === 5){
                    rx = value1[3];
                    ry = value1[4];
                    return {dimension, x, y, z, rx, ry};
                }
                return {dimension, x, y, z};
            }
            throw new Error("未能匹配到下列可能的形式"
                + "\ndimension, {x, y, z, rx, ry}"
                + "\ndimension, {x, y, z}"
                + "\ndimension, [x, y, z, rx, ry]"
                + "\ndimension, [x, y, z]"
            );
        }
        if (hasKeys(value1, "rx", "ry")){
            rx = value1.rx;
            ry = value1.ry;
        } else if (Array.isArray(value1) && value1.length === 2){
            rx = value1[0];
            ry = value1[1];
        } else {
            throw new Error("未能匹配到下列可能的形式"
                + "\n{dimension, x, y, z}, {rx, ry}"
                + "\n[dimension, x, y, z], {rx, ry}"
                + "\n{dimension, x, y, z}, [rx, ry]"
                + "\n[dimension, x, y, z], [rx, ry]"
                + "\n{x, y, z}, {rx, ry}"
                + "\n[x, y, z], {rx, ry}"
                + "\n{x, y, z}, [rx, ry]"
                + "\n[x, y, z], [rx, ry]"
            );
        }
        if (hasDimension){ 
            return {dimension, x, y, z, rx, ry};
        }
        return {x, y, z, rx, ry};
    } else if (values.length === 3){
        const value0 = values[0];
        const value1 = values[1];
        const value2 = values[2];
        if (typeof value0 === "number" && typeof value1 === "number" && typeof value1 === "number"){
            x = value0;
            y = value1;
            z = value2;
            return {x, y, z};
        }
        dimension = value0;
        if (hasKeys(value1, "x", "y", "z")){
            x = value1.x;
            y = value1.y;
            z = value1.z;
        } else if (Array.isArray(value1) && value1.length === 3){
            x = value1[0];
            y = value1[1];
            z = value1[2];
        } else {
            throw new Error("未能匹配到下列可能的形式"
                + "\nx, y, z"
                + "\ndimension, {x, y, z}, {rx, ry}"
                + "\ndimension, [x, y, z], {rx, ry}"
                + "\ndimension, {x, y, z}, [rx, ry]"
                + "\ndimension, [x, y, z], [rx, ry]"
            );
        }
        if (hasKeys(value2, "rx", "ry")){
            rx = value2.rx;
            ry = value2.ry;
            return {dimension, x, y, z, rx, ry};
        } else if (Array.isArray(value2) && value2.length === 2){
            rx = value2[1];
            ry = value2[2];
            return {dimension, x, y, z, rx, ry};
        }
        throw new Error("未能匹配到下列可能的形式"
            + "\nx, y, z"
            + "\ndimension, {x, y, z}, {rx, ry}"
            + "\ndimension, [x, y, z], {rx, ry}"
            + "\ndimension, {x, y, z}, [rx, ry]"
            + "\ndimension, [x, y, z], [rx, ry]"
        );
    } else if (values.length < 7 && values.length > 0){
        try {
            return matchILocationArray(values);
        } catch {
            //匹配失败
        }
    }
    throw new Error("传入的参数无法被认为是可能的Location"
        + "\n最少需要1个参数，最多可以有6个参数"
        + "\n未能匹配到下列可能的形式"
        + "\ndimension, x, y, z, rx, ry"
        + "\nx, y, z, rx, ry"
        + "\ndimension, x, y, z"
        + "\nx, y, z"
    );
}

/**
 * @param {Object} value
 * @param {...string} keys
 * @returns {boolean}
 */
function hasKeys(value, ...keys){
    let type = typeof value;
    if (type !== "object" && type !== "function"){
        return false;
    }
    for (let k of keys){
        if (!(k in value)){
            return false;
        }
    }
    return true;
}

export default Location;
export { Location };

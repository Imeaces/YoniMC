import { dim, Minecraft, VanillaWorld, overworld } from "./basis.js";
/**
 * 一个复杂点的Location类
 */
class Location {
    /**
     * @param {number} v
     * @returns {number}
     */
    static normalizePitch(v){
        if (!isFinite(v))
            throw new Error("Number not finite");
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
        if (!isFinite(v))
            throw new Error("Number not finite");
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
        if (!isFinite(v))
            throw new Error("Number not finite");
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
        if (!isFinite(v))
            throw new Error("Number not finite");
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
        if (!isFinite(v))
            throw new Error("Number not finite");
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
    
    #dimension = null;
    /**
     * @type {Minecraft.Dimension}
     */
    get dimension(){
        return this.#dimension;
    }
    set dimension(v){
        v = fromValueGetDimension(v);
        this.#dimension = v;
    }
    
    /**
     * 必须可以匹配到x, y, z
     * 目前可以匹配以下类型的位置
     * dimension, x, y, z, rx, ry
     * x, y, z, rx, ry
     * dimension, x, y, z
     *
     * dimension, {x, y, z}, {rx, ry}
     * dimension, [x, y, z], [rx, ry]
     * dimension, {x, y, z}, [rx, ry]
     * x, y, z
     *
     * {dimension, x, y, z} [rx, ry]
     * {dimension, x, y, z} {rx, ry}
     * dimension, [ x, y, z, rx, ry]
     * dimension, {x, y, z, rx, ry}
     * dimension, {x, y, z}
     * dimension, [x, y, z]
     *
     * {dimension, x, y, z, rx, ry}
     * [dimension, x, y, z, rx, ry]
     * {x, y, z, rx, ry}
     * {x, y, z}
     * [x, y, z, rx, ry]
     * [x, y, z]
     * {dimension, location, rotation}
     * {dimension, location}
     * @param {LocationDataParams1|LocationDataParams2|LocationDataParams2_1|LocationDataParams2_2|LocationDataParams3|LocationDataParams3_1|LocationDataParams4|LocationDataParams5|LocationDataParams6} values
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
     * @param {LocationDataParams1|LocationDataParams2|LocationDataParams2_1|LocationDataParams2_2|LocationDataParams3|LocationDataParams3_1|LocationDataParams4|LocationDataParams5|LocationDataParams6} values
     */
    add(...values){
        let { x, y, z } = makeLocation(values);
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    /**
     * @param {LocationDataParams1|LocationDataParams2|LocationDataParams2_1|LocationDataParams2_2|LocationDataParams3|LocationDataParams3_1|LocationDataParams4|LocationDataParams5|LocationDataParams6} values
     */
    subtract(...values){
        let { x, y, z } = makeLocation(values);
        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }
    /**
     * @param {LocationDataParams1|LocationDataParams2|LocationDataParams2_1|LocationDataParams2_2|LocationDataParams3|LocationDataParams3_1|LocationDataParams4|LocationDataParams5|LocationDataParams6} values
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
     * @param {LocationDataParams1_01} loc
     */
    distance(loc){
        let distance = this.distancrSquared(loc);
        return Math.sqrt(distance);
    }
    /**
     * @param {LocationDataParams1_01} loc
     */
    distancrSquared(loc){
        let fromLocation = makeLocation([loc]);
        if (this.dimension !== fromValueGetDimension(fromLocation.dimension)){
            throw new Error("different dimension");
        }
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
     * @param {LocationDataParams1_01} loc
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
    
    static serialize(v){
        throw new Error("not implemented yet");
    }
    static deserialize(v){
        throw new Error("not implemented yet");
    }
}

function fromValueGetDimension(value){
    let validValues = ["overworld", "the_end", "the end", "nether", "theEnd", 0, -1, 1];
    if (value instanceof Minecraft.Dimension){
        return value;
    } else if (Object.values(Minecraft.MinecraftDimensionTypes).includes(value) || validValues.includes(value)){
        return dim(value);
    } else {
        throw new Error("unknown dimension");
    }
}

/**
 * {x, y, z, rx?, ry?, dimension?}
 * @interface
 * @typedef ILocationValue01
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} [rx]
 * @property {number} [ry]
 * @property {Minecraft.Dimension} [dimension]
 */
/**
 * {x, y, z, rx?, ry?, **dimension**?}
 * @interface
 * @typedef ILocationValue01_1
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} [rx]
 * @property {number} [ry]
 * @property {string|nunber} [dimension] - 一个可以代表某个维度的值
 */
/**
 * [dimension, x, y, z, rx?, ry?]
 * @typedef {[Minecraft.Dimension, number, number, number]|[Minecraft.Dimension, number, number, number, number, number]} ILocationValue01_2
 */
/**
 * [**dimension**, x, y, z, rx?, ry?]
 * @typedef {[string, number, number, number]|[number, number, number, number]|[string, number, number, number, number, number]|[number, number, number, number, number, number]} ILocationValue01_3
 */
/**
 * [dimension, x, y, z, rx, ry]
 * @typedef {[Minecraft.Dimension, number, number, number, number, number]} ILocationValue01_4
 */
/**
 * [**dimension**, x, y, z, rx, ry]
 * @typedef {[string, number, number, number, number, number]|[number, number, number, number, number, number]} ILocationValue01_5
 */

/**
 * {location, dimension?, rotation?}
 * @interface
 * @typedef ILocationValue1
 * @property {ILocationValue_Location} location
 * @property {ILocationValue_Rotation} [rotation]
 * @property {Minecraft.Dimension} [dimension]
 */
/**
 * {location, dimension?, rotation?}
 * @interface
 * @typedef ILocationValue1_1
 * @property {ILocationValue_Location} location
 * @property {ILocationValue_Rotation} [rotation]
 * @property {string|number} [dimension] - 一个可以代表某个维度的值
 */

/**
 * {x, y, z}
 * @interface
 * @typedef ILocationValue_Location
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */
/**
 * [x, y, z]
 * @typedef {[number, number, number]} ILocationValue_Location_1
 */
/**
 * {x, y, z, dimension}
 * @interface
 * @typedef ILocationValue_Location_2
 * @property {Minecraft.Dimension} dimension
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */
/**
 * {x, y, z, **dimension**}
 * @interface
 * @typedef ILocationValue_Location_3
 * @property {string|number} dimension - 一个可以代表某个维度的值
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */
/**
 * [dimension, x, y, z]
 * @typedef {[Minecraft.Dimension, number, number, number]} ILocationValue_Location_4
 */
/**
 * [**dimension**, x, y, z]
 * @typedef {[string, number, number, number]|[number, number, number, number]} ILocationValue_Location_5
 */
/**
 * {x, y, z, rx?, ry?}
 * @interface
 * @typedef ILocationValue_Location_6
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} [rx]
 * @property {number} [ry]
 */
/**
 * [x, y, z, rx?, ry?]
 * @typedef {[number, number, number]|[number, number, number, number, number]} ILocationValue_Location_7
 */
/**
 * [x, y, z, rx, ry]
 * @typedef {[number, number, number, number, number]} ILocationValue_Location_8
 */

/**
 * {rx, ry}
 * @interface
 * @typedef ILocationValue_Rotation
 * @property {number} rx
 * @property {number} ry
 */
/**
 * [rx, ry]
 * @typedef {[number, number]} ILocationValue_Rotation_1
 */

//++++++++++++++++++++++++++base end-------------------------------
/**
 * @typedef {[ILocationValue01|ILocationValue01_1|ILocationValue01_2|ILocationValue01_3|ILocationValue1|ILocationValue1_1|ILocationValue_Location|ILocationValue_Location_1|ILocationValue_Location_2|ILocationValue_Location_3|ILocationValue_Location_4|ILocationValue_Location_5]} LocationDataParams1
 */
/**
 * @typedef {ILocationValue01|ILocationValue01_1|ILocationValue01_2|ILocationValue01_3|ILocationValue1|ILocationValue1_1|ILocationValue_Location|ILocationValue_Location_1|ILocationValue_Location_2|ILocationValue_Location_3|ILocationValue_Location_4|ILocationValue_Location_5} LocationDataParams1_01
 */

/**
 * @typedef {[Minecraft.Dimension, ILocationValue_Location_6|ILocationValue_Location_7]} LocationDataParams2
 */
/**
 * @typedef {[string|number, ILocationValue_Location_6|ILocationValue_Location_7]} LocationDataParams2_1
 */
/**
 * @typedef {[ILocationValue_Location_3|ILocationValue_Location_2|ILocationValue_Location_1|ILocationValue_Location, ILocationValue_Rotation|ILocationValue_Rotation_1]} LocationDataParams2_2
 */

/**
 * @typedef {[Minecraft.Dimension, ILocationValue_Location|ILocationValue_Location_1, ILocationValue_Rotation|ILocationValue_Rotation_1]} LocationDataParams3
 */
/**
 * @typedef {ILocationValue_Location_1} LocationDataParams3_1
 */
/**
 * [dimension, x, y, z]
 * @typedef {ILocationValue_Location_4} LocationDataParams4
 */
/**
 * [x, y, z, rx, ry]
 * @typedef {ILocationValue_Location_8} LocationDataParams5
 */
/**
 * [dimension, x, y, z, rx, ry]
 * @typedef {ILocationValue01_4|ILocationValue01_5} LocationDataParams6
 */
 
/**
 * @param {LocationDataParams1|LocationDataParams2|LocationDataParams2_1|LocationDataParams2_2|LocationDataParams3|LocationDataParams3_1|LocationDataParams4|LocationDataParams5|LocationDataParams6} values
 */
function makeLocation(values){
    let x, y, z, rx, ry, dimension = null;
    const value0 = values[0];
    const value1 = values[1];
    const value2 = values[2];
    const value3 = values[3];
    const value4 = values[4];
    const value5 = values[5];
    if (values.length > 3 && values.length < 7){
        let hasDim = false;
        let hasRotation = false;
        if (values.length > 5 || values.length === 4){
            dimension = values.shift();
            hasDim = true;
        }
        x = values[0];
        y = values[1];
        z = values[2];
        if (values.length >= 4){
            rx = values[3];
            ry = values[4];
            hasRotation = true;
        }
        if (hasRotation){
            if (hasDim){
                return {x,y,z,rx,ry,dimension};
            }
            return {x,y,z,rx,ry};
        }
        if (hasDim){
            return {x,y,z,dimension};
        }
        return {x,y,z};
    } else if (values.length === 3){
        dimension = value0;
        if (hasKeys(value1, "x", "y", "z") || value1?.length === 3){
            if (value1?.length === 3){
                x = value1[0];
                y = value1[1];
                z = value1[2];
            } else {
                x = value1.x;
                y = value1.y;
                z = value1.z;
            }
            if (hasKeys(value2, "rx", "ry")){
                rx = value2.rx;
                ry = value2.ry;
                return {x,y,z,rx,ry,dimension};
            } else if (value2?.length === 2){
                rx = value2[0];
                ry = value2[1];
                return {x,y,z,rx,ry,dimension};
            } else {
                return {x, y, z, dimension}
            }
        } else if (isFinite(value0)
        && isFinite(value1)
        && isFinite(value2)){
            x = value0;
            y = value1;
            z = value2;
            return {x, y, z};
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\ndimension, {x, y, z}, {rx, ry}"
            + "\ndimension, [x, y, z], [rx, ry]"
            + "\ndimension, {x, y, z}, [rx, ry]"
            + "\nx, y, z"
        );
    } else if (values.length === 2){
        if (hasKeys(value0, "x", "y", "z")){
            x = value0.x;
            y = value0.y;
            z = value0.z;
            if (hasKeys(value1, "rx", "ry")){
                rx = value1.rx;
                ry = value1.ry;
                if (hasKeys(value0, "dimension")){
                    dimension = value0.dimension;
                    return {x,y,z,rx,ry,dimension};
                }
                return {x,y,z,rx,ry};
            } else if (value1?.length === 2){
                rx = value1[0];
                ry = value1[1];
                if (hasKeys(value0, "dimension")){
                    dimension = value0.dimension;
                    return {x,y,z,rx,ry,dimension};
                }
                return {x,y,z,rx,ry};
            }
        } else {
            dimension = value0;
            if (hasKeys(value1, "x", "y", "z")){
                x = value1.x;
                y = value1.y;
                z = value1.z;
                if (hasKeys(value1, "rx", "ry")){
                    rx = value1.rx;
                    ry = value1.ry;
                    return {x,y,z,rx,ry,dimension};
                }
                return {x,y,z,dimension};
            } else if (value1?.length === 5){
                x = value1[0];
                y = value1[1];
                z = value1[2];
                rx = value1[3];
                ry = value1[4];
                return {x,y,z,rx,ry,dimension};
            } else if (value1?.length === 3){
                x = value1[0];
                y = value1[1];
                z = value1[2];
                return {x,y,z,dimension};
            }
        }
        
        throw new Error("未能匹配到以下任何一种形式"
            + "\n{dimension, x, y, z} [rx, ry]"
            + "\n{dimension, x, y, z} {rx, ry}"
            + "\n{x, y, z} [rx, ry]"
            + "\n{x, y, z} {rx, ry}"
            + "\ndimension, [x, y, z, rx, ry]"
            + "\ndimension, {x, y, z, rx, ry}"
            + "\ndimension, {x, y, z}"
            + "\ndimension, [x, y, z]"
        );
    } else if (values.length === 1){
        values = value0;
        if (hasKeys(values, "x", "y", "z")){ //必须有x y z
            x = values.x;
            y = values.y;
            z = values.z;
            
            if (hasKeys(values, "dimension")){
                dimension = values.dimension;
                if (hasKeys(values, "rx", "ry")){
                    rx = values.rx;
                    ry = values.ry;
                    return {x, y, z, rx, ry, dimension};
                }
                return {x, y, z, dimension};
            }
            if (hasKeys(values, "rx", "ry")){
                rx = values.rx;
                ry = values.ry;
                return {x, y, z, rx, ry};
            }
            
            return {x, y, z};
        } else if (typeof values === "string"){
            let json;
            try {
                json = JSON.parse(values);
                return makeLocation([json]);
            } catch {
                throw new Error("指定的字符串无法转换为位置");
            }
        } else if (values?.length > 3){
            return makeLocation(values);
        } else if (hasKeys(values, "location")){
            let loc = values.location;
            x = loc.x;
            y = loc.y;
            z = loc.z;
            
            let hasDim = false;
            let hasRotation = false;
            
            if (hasKeys(values, "dimension")){
                dimension = values.dimension;
                hasDim = true;
            }
            
            if ("rotation" in values){
                let roc = values.rotation;
                rx = roc.x;
                ry = roc.y;
                hasRotation = true;
            }
            
            if (hasRotation){
                if (hasDim){
                    return {x,y,z,rx,ry,dimension};
                }
                return {x,y,z,rx,ry};
            }
            
            if (hasDim){
                return {x,y,z,dimension};
            }
            return {x,y,z};
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\n{dimension, x, y, z, rx, ry}"
            + "\n{x, y, z, rx, ry}"
            + "\n{x, y, z}"
            + "\n[dimension, x, y, z, rx, ry]"
            + "\n[x, y, z, rx, ry]"
            + "\n[x, y, z]"
            + "\n{dimension, location, rotation}"
            + "\n{dimension, location}"
            + "\n{rotation, location}"
            + "\n{location}"
        );
    }
    throw new Error("未能匹配到以下任何一种形式"
        + "\ndimension, x, y, z, rx, ry"
        + "\nx, y, z, rx, ry"
        + "\ndimension, x, y, z"
        + "以及其他的18种（详情请在代码中查看）"
    );
}

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
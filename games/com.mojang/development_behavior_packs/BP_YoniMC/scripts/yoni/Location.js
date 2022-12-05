import { dim, Minecraft, VanillaWorld, overworld } from "./basis.js";
/**
 * 一个复杂点的Location类
 */
class Location {
    static normalizePitch(v){
        if (!isFinite(v))
            throw new Error("Number not finite");
        v += 180;
        v = v % 360;
        v -= 180;
        return v;
    }
    static normalizeYaw(v){
        if (!isFinite(v))
            throw new Error("Number not finite");
        v += 180;
        v = v % 360;
        v -= 180;
        return v;
    }
    
    #x = NaN;
    get x(){
        return this.#x;
    }
    set x(v){
        if (!isFinite(v))
            throw new Error("Number not finite");
        this.#x = v;
    }
    
    #y = NaN;
    get y(){
        return this.#y;
    }
    set y(v){
        if (!isFinite(v))
            throw new Error("Number not finite");
        this.#y = v;
    }
    
    #z = NaN;
    get z(){
        return this.#z;
    }
    set z(v){
        if (!isFinite(v))
            throw new Error("Number not finite");
        this.#z = v;
    }
    
    #rx = 0;
    get rx(){
        return this.#rx;
    }
    set rx(v){
        this.#rx = Location.normalizePitch(v);
    }
    
    #ry = 0;
    get ry(){
        return this.#ry;
    }
    set ry(v){
        this.#ry = Location.normalizeYaw(v);
    }
    
    #dimension = null;
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
    add(...values){
        let { x, y, z } = makeLocation(values);
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    subtract(...values){
        let { x, y, z } = makeLocation(values);
        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }
    multiply(...values){
        let { x, y, z } = makeLocation(values);
        this.x *= x;
        this.y *= y;
        this.z *= z;
        return this;
    }
    zero(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    }
    
    distance(loc){
        let distance = this.distancrSquared(loc);
        return Math.sqrt(distance);
    }
    distancrSquared(loc){
        let fromLocation = makeLocation(loc);
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
    
    getBlock(){
        return this.dimension.getBlock({x: this.x, y: this.y, z: this.z});
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
    toBlockLocation(){
        let { x, y, z, dimension } = this;
        return new Location(dimension, [Math.floor(x), Math.floor(y), Math.floor(z)]);
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
    equals(loc){
        let fromLocation = makeLocation(loc);
        let { x, y, z, rx, ry, dimension } = this;
        if (fromLocation.x === x
        && fromLocation.y === y
        && fromLocation.z === z
        && fromLocation.rx === rx
        && fromLocation.ry === ry
        && fromValueGetDimension(fromLocation.dimension) === dimension){
            return true;
        } else {
            return false;
        }
    }
    clone(){
        return new Location(this);
    }
    
    toString(){
        return Object.prototype.valueOf.call(this.toJSON());
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
    } else if (Object.values(MinecraftDimensionTypes).includes(value) || validValues.includes(value)){
        return dim(v);
    } else {
        throw newError("unknown dimension");
    }
}

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
                dimension = values.dimemsion;
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
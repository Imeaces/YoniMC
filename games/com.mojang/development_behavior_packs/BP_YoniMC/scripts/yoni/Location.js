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
    console.warn("测试用消息，提示这个说明你正在new一个Location");
    let x, y, z, rx, ry, dimension = null;
    const value0 = value[0];
    const value1 = value[1];
    const value2 = value[2];
    const value3 = value[3];
    const value4 = value[4];
    const value5 = value[5];
    if (values.length > 3 && values.length < 7){
        if (values.length > 5 || values.length === 4){
            dimension = values.shift();
        }
        x = values[0];
        y = values[1];
        z = values[2];
        if (values.length >= 4){
            rx = values[3];
            ry = values[4];
        }
        return {x,y,z,rx,ry,dimension};
    } else if (values.length === 3){
        dimension = values0;
        if (hasKeys(values1, "x", "y", "z")){
            x = values1.x;
            y = values1.y;
            z = values1.z;
            if (hasKeys(values2, "rx", "ry")){
                rx = values2.rx;
                ry = values2.ry;
                return {x,y,z,rx,ry,dimension};
            } else if (values2?.length === 2){
                rx = values2[0];
                ry = values2[1];
                return {x,y,z,rx,ry,dimension};
            }
        } else if (isFinite(values0)
        && isFinite(values1)
        && isFinite(values2)){
            x = values0;
            y = values1;
            z = values2;
            return {x, y, z};
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\ndimension, {x, y, z}, {rx, ry}"
            + "\ndimension, [x, y, z], [rx, ry]"
            + "\ndimension, {x, y, z}, [rx, ry]"
            + "\nx, y, z"
        );
    } else if (values.length === 2){
        if (hasKeys(value0, "x", "y", "z", "dimension")){
            x = values0.x;
            y = values0.y;
            z = values0.z;
            dimension = values[0].dimension;
            if (hasKeys(values1, "rx", "ry")){
                rx = values1.rx;
                ry = values1.ry;
                return {x,y,z,rx,ry,dimension};
            } else if (values1?.length === 1){
                rx = values1[0];
                ry = values1[1];
                return {x,y,z,rx,ry,dimension};
            }
        } else {
            dimension = values0;
            if (hasKeys(values1, "x", "y", "z")){
                x = values1.x;
                y = values1.y;
                z = values1.z;
                if (hasKeys(values1, "rx", "ry")){
                    rx = values1.rx;
                    ry = values1.ry;
                    return {x,y,z,rx,ry,dimension};
                }
                return {x,y,z,dimension};
            } else if (values1?.length === 5){
                x = values1[0];
                y = values1[1];
                z = values1[2];
                rx = values1[3];
                ry = values1[4];
                return {x,y,z,rx,ry,dimension};
            } else if (values1?.length === 3){
                x = values1[0];
                y = values1[1];
                z = values1[2];
                return {x,y,z,dimension};
            }
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\n{dimension, x, y, z} [rx, ry]"
            + "\n{dimension, x, y, z} {rx, ry}"
            + "\ndimension, [ x, y, z, rx, ry]"
            + "\ndimension, {x, y, z, rx, ry}"
            + "\ndimension, {x, y, z}"
            + "\ndimension, [x, y, z]"
        );
    } else if (values.length === 1){
        console.error("这是一个测试用消息，表明你只传了一个参数");
        values = values0;
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
            
            console.error("这是一个测试用消息，表明你用{x, y, z}弄出来了一个Location，希望你没传null");
            return {x, y, z};
        } else if (values?.length === 6){
            return makeLocation(values);
        } else if (values?.length >= 3){
            x = values[0];
            y = values[1];
            z = values[2];
            if (values.length === 5){
                rx = values[3];
                ry = values[4];
                return {x, y, z, rx, ry};
            }
            return {x, y, z};
        } else if (hasKeys(values, "dimension", "location")){
            dimension = values.dim;
            let loc = values.location;
            x = loc.x;
            y = loc.y;
            z = loc.z;
            if ("rotation" in values){
                let roc = values.rotation;
                rx = roc.x;
                ry = roc.y;
                return {x, y, z, rx, ry, dimension};
            }
            return {x, y, z, dimension};
        } else if (typeof values === "string"){
            let json;
            try {
                json = JSON.parse(values);
                return makeLocation(json);
            } catch {
                throw new Error("指定的字符串无法转换为位置");
            }
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\n{dimension, x, y, z, rx, ry}"
            + "\n[dimension, x, y, z, rx, ry]"
            + "\n{x, y, z, rx, ry}"
            + "\n{x, y, z}"
            + "\n[x, y, z, rx, ry]"
            + "\n[x, y, z]"
            + "\n{dimension, location, rotation}"
            + "\n{dimension, location}"
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
import { dim } from "./basis.js";

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
     * dimension, {x, y, z}, {rx, ry}
     * dimension, [x, y, z], [rx, ry]
     * dimension, {x, y, z}, [rx, ry]
     *
     * {dimension, x, y, z} [rx, ry]
     * {dimension, x, y, z} {rx, ry}
     * dimension, [ x, y, z, rx, ry]
     * dimension, {x, y, z, rx, ry}
     *
     * {dimension, x, y, z, rx, ry}
     * [dimension, x, y, z, rx, ry]
     * {x, y, z, rx, ry}
     * {x, y, z}
     * [x, y, z, rx, ry]
     * [x, y, z]
     * {dimension, location, rotation}
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
        
        if (dimension === null){
            this.dimension = dim.overworld;
        } else {
            this.dimension = dimension;
        }
    }
    add(){}
    subtract(){}
    multiply(){}
    zero(){}
    
    distance(){}
    distancrSquared(){}
    getLength(){}
    getLengthSquared(){}
    
    toVector(){}
    getDirection(){}
    setDirection(){}
    
    getBlock(){}
    getBlockX(){}
    getBlockY(){}
    getBlockZ(){}
    toBlockLocation(){}
    
    isLoaded(){}
    getChunk(){}
    
    checkFinite(){}
    equals(){}
    clone(){}
    
    toString(){}
    toJSON(){}
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
    let x, y, z, rx, ry, dimension;
    if (values.length === 6){
        dimension = values[0];
        x = values[1];
        y = values[2];
        z = values[3];
        rx = values[4];
        ry = values[5];
        return {x,y,z,rx,ry,dimension};
    } else if (values.length === 3){
        dimension = values[0];
        if ("x" in values[1] && "y" in values[1] && "z" in values[1]){
            x = values[1].x;
            y = values[1].y;
            z = values[1].z;
            if ("rx" in values[2] && "ry" in values[2]){
                rx = values[2].rx;
                ry = values[2].ry;
                return {x,y,z,rx,ry,dimension};
            } else if (values[2].length === 2){
                rx = values[2][0];
                ry = values[2][1];
                return {x,y,z,rx,ry,dimension};
            }
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\ndimension, {x, y, z}, {rx, ry}"
            + "\ndimension, [x, y, z], [rx, ry]"
            + "\ndimension, {x, y, z}, [rx, ry]"
        );
    } else if (values.length === 2){
        if ("x" in values[0]
        && "y" in values[0]
        && "z" in values[0]
        && "dimension" in values[0]){
            x = values[0].x;
            y = values[0].y;
            z = values[0].z;
            dimension = values[0].dimension;
            if ("rx" in values[1] && "ry" in values[1]){
                rx = values[1].rx;
                ry = values[1].ry;
                return {x,y,z,rx,ry,dimension};
            } else if (values[1].length === 1){
                rx = values[1][0];
                ry = values[1][1];
                return {x,y,z,rx,ry,dimension};
            }
        } else {
            dimension = values[0];
            if ("x" in values[1]
            && "y" in values[1]
            && "z" in values[1]
            && "rx" in values[1]
            && "ry" in values[1]){
                x = values[1].x;
                y = values[1].y;
                z = values[1].z;
                rx = values[1].rx;
                ry = values[1].ry;
                return {x,y,z,rx,ry,dimension};
            } else if (values[1].length === 5){
                x = values[1][0];
                y = values[1][1];
                z = values[1][2];
                rx = values[1][3];
                ry = values[1][4];
                return {x,y,z,rx,ry,dimension};
            }
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\n{dimension, x, y, z} [rx, ry]"
            + "\n{dimension, x, y, z} {rx, ry}"
            + "\ndimension, [ x, y, z, rx, ry]"
            + "\ndimension, {x, y, z, rx, ry}"
        );
    } else if (values.length === 1){
        values = values[0];
        if ("x" in values
        && "y" in values
        && "z" in values){ //必须有x y z
            x = values.x;
            y = values.y;
            z = values.z;
            if ("rx" in values
            && "ry" in values){ //可以有rx ry
                rx = values.rx;
                ry = values.ry;
            }
            if ("dimension" in values){ //可以有dimension
                dimension = values.dimension;
            }
            
            if ("rx" in values
            && "ry" in values
            && "dimension" in values){
                return {x, y, z, rx, ry, dimension};
            }
            
            if ("rx" in values
            && "ry" in values){
                return {x, y, z, rx, ry};
            }
            
            if ("dimension" in values){
                return {x, y, z, dimension};
            }
        } else if (values.length === 6){
            return makeLocation(values);
        } else if (values.length >= 3){
            x = values[0];
            y = values[1];
            z = values[2];
            if (values.length === 5){
                rx = values[3];
                ry = values[4];
                return {x, y, z, rx, ry};
            }
            return {x, y, z};
        } else if ("dimension" in values
        && "location" in values
        && "rotation" in values){
            let loc = values.location;
            let roc = values.rotation;
            dimension = values.dim;
            x = loc.x;
            y = loc.y;
            z = loc.z;
            return {x, y, z, rx, ry};
        }
        throw new Error("未能匹配到以下任何一种形式"
            + "\n{dimension, x, y, z, rx, ry}"
            + "\n[dimension, x, y, z, rx, ry]"
            + "\n{x, y, z, rx, ry}"
            + "\n{x, y, z}"
            + "\n[x, y, z, rx, ry]"
            + "\n[x, y, z]"
            + "\n{dimension, location, rotation}"
        );
    }
}

export Location;

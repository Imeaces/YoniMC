import { Minecraft } from "./basis.js";
import { Dimension, YoniDimension } from "./dimension.js";
import { YoniBlock } from "./block.js";

function makeNumber(v: any){
    v = Number(v);
    if (!isFinite(v))
        throw new Error("Number not finite");
    return v;
}

/**
 * 代表Minecraft中的特定位置，包含维度，坐标，旋转角。
 */
class Location implements ILocation {
    /**
     * 处于零点的Location对象。
     */
    static get zero(){
        return new Location(0, 0, 0);
    }
    
    /**
     * @param {Location} location
     */
    static #checkReadOnly(location: Location){
        if (location.#readOnly){
            throw new TypeError("Read-only Location Object");
        }
    }
    
    /**
     * @param {number} num
     * @returns {number}
     */
    static normalizePitch(num: number){
        num = makeNumber(num);
        num += 180;
        num = num % 360;
        num -= 180;
        return num;
    }
    /**
     * @param {number} num
     * @returns {number}
     */
    static normalizeYaw(num: number){
        num = makeNumber(num);
        num += 180;
        num = num % 360;
        num -= 180;
        return num;
    }
    
    #readOnly = false;
    
    #x: number = NaN;
    /**
     * @type {number}
     */
    get x(): number {
        return this.#x;
    }
    set x(x){
        this.setX(x);
    }
    /**
     * 设置此位置对应的 z 轴坐标。
     * @param {number} x
     */
    setX(x: any){
        Location.#checkReadOnly(this);
        this.#x = makeNumber(x);
        return this;
    }
    
    #y = NaN;
    /**
     * @type {number}
     */
    get y(): number {
        return this.#y;
    }
    set y(y){
        this.setY(y);
    }
    /**
     * 设置此位置对应的 z 轴坐标。
     * @param {number} y
     */
    setY(y: any){
        Location.#checkReadOnly(this);
        this.#y = makeNumber(y);
        return this;
    }
    
    #z: number = NaN;
    /**
     * @type {number}
     */
    get z(){
        return this.#z;
    }
    set z(z){
        this.setZ(z);
    }
    /**
     * 设置此位置对应的 z 轴坐标。
     * @param {number} z
     */
    setZ(z: any){
        Location.#checkReadOnly(this);
        this.#z = makeNumber(z);
        return this;
    }
    
    /**
     * 设置此位置对应的坐标。
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    setPosition(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    
    #rx = 0;
    /**
     * @type {number}
     */
    get rx(): number {
        return this.#rx;
    }
    set rx(rx){
        this.setRx(rx);
    }
    /**
     * 设置此位置对应的 pitch 角。
     * @param {number} v
     */
    setRx(rx: any){
        Location.#checkReadOnly(this);
        this.#rx = Location.normalizePitch(rx);
        return this;
    }
    
    #ry = 0;
    /**
     * 此位置对应的 yaw 角。
     * @type {number}
     */
    get ry(){
        return this.#ry;
    }
    set ry(ry){
        this.setRy(ry);
    }
    /**
     * 设置此位置对应的 yaw 角。
     * @param {number} v
     */
    setRy(ry: any){
        Location.#checkReadOnly(this);
        this.#ry = Location.normalizeYaw(ry);
        return this;
    }
    
    /** @ts-ignore 它识别不出来我已经初始化了这个变量，所以只能忽略 */
    #dimension: YoniDimension;
    /**
     * 此位置所在的维度。
     * @type {YoniDimension}
     */
    get dimension(): YoniDimension {
        return this.#dimension;
    }
    set dimension(dim){
        this.setDimension(dim);
    }
    /**
     * 设置此位置所在的维度
     * @param {DimensionLikeValue} dim
     */
    setDimension(dim: DimensionLikeValue){
        Location.#checkReadOnly(this);
        this.#dimension = Dimension.dim(dim);
        return this;
    }
    /**
     * 创建一个代表MC中特定位置的对象。其中包括维度，坐标，旋转角。
     
     * 可以以多种形式传递参数来构造一个Location。
     * 例如，大部分原版中需要一个位置的值。（Block, Entity）
     * 符合${link Vector3}的对象也可以传入。
     *
     * 参数传递顺序一般遵循以下规则。
     *
     * 先维度，后坐标，最后旋转角。
     *
     * 坐标先x，之后是y，最后是z
     *
     * 旋转角先是rx，后是ry
     * 
     * 如果传入的参数中并不能读取到特定的值，则使用默认值补充。
     * 
     * 注意，现在允许的参数类型中，包含尚未支持的类型 {@link Rotation}，这是因为我想支持这种，但是还没支持，先写了上去。
     */
    constructor(dimension: DimensionLikeValue, x: number, y: number, z: number, rx: number, ry: number);
    constructor(x: number, y: number, z: number, rx: number, ry: number);
    constructor(dimension: DimensionLikeValue, x: number, y: number, z: number);
    // 暂未实现 constructor(dimension: DimensionLikeValue, coords: Coords | CoordsArray, rx: number, ry: number);
    constructor(x: number, y: number, z: number);
    constructor(dimension: DimensionLikeValue, coords: Coords | CoordsArray, rotation: LocationRotation | Rotation | RotationArray);
    constructor(info1: CoordsDimensionInfo
        | DimensionCoordsArray
        | LocationCoords
        | CoordsArray,
    info2: LocationRotation
        | RotationArray);
    constructor(dimension: DimensionLikeValue,
    locationInfo: LocationCoords
        | CoordsRotationInfo
        | CoordsArray
        | CoordsRotationArray);
    constructor(locationInfo: LocationInfoObject
        | LocationInfo
        | LocationArray
        | DimensionCoordsArray
        | CoordsRotationArray
        | CoordsArray);
    constructor(...values: LocationParams){
        
        
        if (values.length === 1 && values[0] instanceof Location)
            return values[0].clone();
        
        let { x, y, z, rx, ry, dimension } = makeLocation(values);
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        if (rx !== undefined){
            this.rx = rx;
        }
        if (ry !== undefined){
            this.ry = ry;
        }
        
        if (dimension == null){
            this.setDimension("minecraft:overworld");
        } else {
            this.dimension = dimension;
        }
    }
    /**
     * @param {Location1Arg} value
     */
    add(value: Location1Arg){
        let { x, y, z } = makeLocation([value]);
        let location = this.clone();
        location.x += x;
        location.y += y;
        location.z += z;
        return location;
    }
    /**
     * @param {Location1Arg} value
     */
    subtract(value: Location1Arg){
        let { x, y, z } = makeLocation([value]);
        let location = this.clone();
        location.x -= x;
        location.y -= y;
        location.z -= z;
        return location;
    }
    /**
     * @param {Location1Arg} value
     */
    multiply(value: Location1Arg){
        let { x, y, z } = makeLocation([value]);
        let location = this.clone();
        location.x *= x;
        location.y *= y;
        location.z *= z;
        return location;
    }
    /**
     * 复制一个Location对象，然后将坐标设置为原点。
     */
    zero(){
        let location = this.clone();
        location.x = 0;
        location.y = 0;
        location.z = 0;
        return location;
    }
    
    /**
     * 计算此坐标与指定位置的距离。
     * @param {Location1Arg} loc
     */
    distance(loc: Location1Arg){
        let distance = this.distanceSquared(loc);
        return Math.sqrt(distance);
    }
    /**
     * @param {Location1Arg} loc
     */
    distanceSquared(loc: Location1Arg){
        let fromLocation = makeLocation([loc]);
        let { x, y, z } = this;
        let distance = 0;
        distance += Math.abs(fromLocation.x ** 2 - x ** 2);
        distance += Math.abs(fromLocation.y ** 2 - y ** 2);
        distance += Math.abs(fromLocation.z ** 2 - z ** 2);
        return distance;
    }
    getLength(){
        return this.distance(Location.zero);
    }
    getLengthSquared(){
        return this.distanceSquared(Location.zero);
    }
    
    /**
     * @param {number} v
     */
    toFixed(v: number){
        let { dimension, x, y, z, rx, ry } = this;
        let loc = this.clone();
        return loc.setX(x.toFixed(v))
            .setY(y.toFixed(v))
            .setZ(z.toFixed(v))
            .setRx(rx.toFixed(v))
            .setRy(ry.toFixed(v));
    }
    toVector(){
        return this.getVanillaVector();
    }
    getDirection(){
        throw new Error("not implemented yet");
    }
    setDirection(){
        throw new Error("not implemented yet");
    }
    
    /**
     * @returns {YoniBlock} 此位置上的方块。
     */
    getBlock(): YoniBlock {
        return this.dimension.getBlock(this);
    }
    getBlockX(){
        return Math.floor(this.x);
    }
    getBlockY(){
        return Math.floor(this.y);
    }
    getBlockZ(){
        return Math.floor(this.z);
    }
    /**
     * 返回一个取整后的坐标，且旋转角为0
     */
    toBlockLocation(){
        let { x, y, z, dimension } = this;
        return new Location(dimension, [Math.floor(x), Math.floor(y), Math.floor(z)]);
    }
    /**
     * 返回一个在此坐标上进行指定偏移后的Location
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    offset(x: number, y: number, z: number){
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
        x = Math.floor(x);
        y = Math.floor(y);
        z = Math.floor(z);
        return { x, y, z };
    }
    /**
     * @returns {Minecraft.Location} 根据此位置创建一个原版的Minecraft.Location
     */
    getVanillaLocation(){
        let { x, y, z } = this;
        return { x, y, z };
    }
    getVanillaVector(){
        let { x, y, z } = this;
        return new Minecraft.Vector(x, y, z);
    }
    isLoaded(){
        try {
            this.getBlock();
            return true;
        } catch {
            return false;
        }
    }
    getChunk(){
        throw new Error("not implemented yet");
    }
    
    checkFinite(){
        throw new Error("not implemented yet");
    }
    /**
     * 判断传入的位置是否与此位置对象代表的位置相同。
     * @param {Location1Arg} loc
     */
    equals(loc: Location1Arg){
        let fromLocation = new Location(loc);
        let { x, y, z, rx, ry, dimension } = this;
        
        return fromLocation.x === x
        && fromLocation.y === y
        && fromLocation.z === z
        && fromLocation.rx === rx
        && fromLocation.ry === ry
        && fromLocation.dimension === dimension;
    }
    /**
     * 判断传入的位置的坐标是否与此位置对象代表的坐标相同。
     * @param {Location1Arg} loc
     */
    equalsPosition(loc: Location1Arg){
        let fromLocation = new Location(loc);
        let { x, y, z } = this;
        
        return fromLocation.x === x
        && fromLocation.y === y
        && fromLocation.z === z;
    }
    clone(){
        return new Location(this);
    }
    
    toString(){
        return "Location: " + JSON.stringify(this);
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
    static serialize(v: Location){
        return JSON.stringify(v);
    }
    /**
     * 将一段由Location对象转换后的字符串转换为Location对象
     * @param {string} v 
     * @returns {Location}
     */
    static deserialize(v: string){
        return new Location(JSON.parse(v) as unknown as Location1Arg);
    }
    
    /**
     * 创建一个只读的Location对象。
     * @returns {Readonly<Location>}
     */
    static createReadonly(dimension: DimensionLikeValue, x: number, y: number, z: number, rx: number, ry: number) : Readonly<Location>;
    static createReadonly(x: number, y: number, z: number, rx: number, ry: number) : Readonly<Location>;
    static createReadonly(dimension: DimensionLikeValue, x: number, y: number, z: number) : Readonly<Location>;
    static createReadonly(x: number, y: number, z: number) : Readonly<Location>;
    static createReadonly(dimension: DimensionLikeValue, coords: Coords | CoordsArray, rotation: LocationRotation | Rotation | RotationArray) : Readonly<Location>;
    static createReadonly(info1: CoordsDimensionInfo
        | DimensionCoordsArray
        | LocationCoords
        | CoordsArray,
    info2: LocationRotation
        | RotationArray) : Readonly<Location>;
    static createReadonly(dimension: DimensionLikeValue,
    locationInfo: LocationCoords
        | CoordsRotationInfo
        | CoordsArray
        | CoordsRotationArray) : Readonly<Location>;
    static createReadonly(locationInfo: LocationInfoObject
        | LocationInfo
        | LocationArray
        | DimensionCoordsArray
        | CoordsRotationArray
        | CoordsArray) : Readonly<Location>;
    static createReadonly(...values: LocationParams){
        let location = new Location(
            // @ts-ignore 我不知道该怎么解决这个问题，所以只好忽略了
            ...values);
        location.#readOnly = true;
        return location as unknown as Readonly<Location>;
    }
    /**
     * 使用Location创建创建一个只读的Location对象。
     * @param {Location} location
     * @returns {Readonly<Location>}
     */
    static makeReadonly(location: Location){
        location = location.clone();
        location.#readOnly = true;
        return location as unknown as Readonly<Location>;
    }
    /**
     * @param {Location1Arg} start
     * @param {Location1Arg} end
     * @returns {Location[]}
     */
    static blocksBetween(start: Location1Arg, end: Location1Arg){
        let startPoint = new Location(start).toBlockLocation();
        let endPoint = new Location(end).toBlockLocation();
        
        let { x0, x1, y0, y1, z0, z1 } = (function (){
            let { x: x2, y: y2, z: z2 } = startPoint;
            let { x: x3, y: y3, z: z3 } = endPoint;
            
            let x0, x1, y0, y1, z0, z1;
            
            x0 = Math.min(x2, x3);
            y0 = Math.min(y2, y3);
            z0 = Math.min(z2, z3);

            x1 = Math.max(x2, x3);
            y1 = Math.max(y2, y3);
            z1 = Math.max(z2, z3);
            
            return { x0, x1, y0, y1, z0, z1 };
        })();
        
        let offset = Location.zero;
        
        startPoint = startPoint.zero()
            .add([x0, y0, z0]);
        endPoint = endPoint.zero()
            .add([x1, y1, z1]);
        
        let areaSize = endPoint.subtract(startPoint)
            .add([1, 1, 1]);
        
        let blocks = [];
        for (let x = 0; x < areaSize.x; x++){
            for (let y = 0; y < areaSize.y; y++){
                for (let z = 0; z < areaSize.z; z++){
                    blocks.push(startPoint.add([x, y, z]));
                }
            }
        }
        
        return blocks;
    }
}

function makeLocation(values: any): any {
    let x: any, y: any, z: any, rx: any, ry: any, dimension: any = null;
    const matchILocationArray = (value: any) => {
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
function hasKeys(value: {}, ...keys: string[]): boolean {
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

export type NetherDimensionLikeValue = -1 | 'minecraft:nether' | 'nether';
export type OverworldDimensionLikeValue = 0 | 'minecraft:overworld' | 'overworld';
export type TheEndDimensionLikeValue = 1 | 'minecraft:the_end' | 'the_end' | 'theEnd' | 'the end';
export type DimensionLikeValue =
    NetherDimensionLikeValue
    | OverworldDimensionLikeValue
    | TheEndDimensionLikeValue
    | Minecraft.Dimension
    | YoniDimension;

export interface ILocation extends LocationCoords, LocationRotation {
    dimension: YoniDimension;
}
export interface LocationCoords {
    x: number;
    y: number;
    z: number;
}
export interface LocationRotation {
    rx: number;
    ry: number;
}

export interface Coords {
    x: number;
    y: number;
    z: number;
}
export interface Rotation {
    x: number;
    y: number;
}

//这三种暂时没有作用，只是写在了这里
export type CoordsGetter = {
    getLocation(): Coords;
}
export type RotationGetter = {
    getRotation(): Rotation;
}
export type DimensionGetter = {
    getDimension(): DimensionLikeValue;
}

export type CoordsAccessor = {
    location: Coords;
}
export type RotationAccessor = {
    rotation: Rotation;
}
export type DimensionAccessor = {
    dimension: DimensionLikeValue;
}

export type LocationCoordsAccessor = {
    location: LocationCoords;
}
export type LocationRotationAccessor = {
    rotation: LocationRotation;
}
export type LocationDimensionAccessor = {
    dimension: DimensionLikeValue;
}

export type LocationInfoObject = 
    (CoordsAccessor & DimensionAccessor & RotationAccessor)
    | (CoordsAccessor & DimensionAccessor)
    | (CoordsAccessor & RotationAccessor)
    | CoordsAccessor;

export type CoordsRotationInfo = LocationCoordsAccessor & LocationRotationAccessor;
export type CoordsDimensionInfo = LocationCoordsAccessor & LocationDimensionAccessor;

export type CoordsArray = [number, number, number];
export type RotationArray = [number, number];
export type DimensionCoordsArray = [DimensionLikeValue, number, number, number];
export type CoordsRotationArray = [number, number, number, number, number];
export type LocationArray = [DimensionLikeValue, number, number, number, number, number];

export type LocationInfo = {
    x: number;
    y: number;
    z: number;
    dimension?: DimensionLikeValue;
    rx?: number;
    ry?: number;
}

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export type Location1Arg = LocationInfoObject
    | LocationInfo
    | LocationArray
    | DimensionCoordsArray
    | CoordsRotationArray
    | CoordsArray;
    
export type LocationArgs1Params = [Location1Arg];
export type LocationArgs2Params = 
[
    CoordsDimensionInfo
        | DimensionCoordsArray
        | LocationCoords
        | CoordsArray,
    LocationRotation
        | RotationArray
] | [
    DimensionLikeValue,
    LocationCoords
        | CoordsRotationInfo
        | CoordsArray
        | CoordsRotationArray
];
export type LocationArgs3Params = [DimensionLikeValue, LocationCoords | CoordsArray, LocationRotation | Rotation | RotationArray] | CoordsArray;
export type LocationArgsMoreParams = LocationArray | CoordsRotationArray | DimensionCoordsArray;
export type LocationParams = LocationArgs1Params | LocationArgs2Params | LocationArgs3Params | LocationArgsMoreParams;

export { DimensionLikeValue as DimensionLike };

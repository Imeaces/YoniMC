export class Config {
    #configMap: ConfigMap = Object.create(null);
    /**
     * 根据指定的键获取一个 Config 对象。
     * @param key - 配置键。
     * @returns Config 对象或 null（如果未找到键）。
     * @throws 如果配置键链接到的值不是 Config 对象，抛出 `TypeError`。
     */
    getConfig(key: string): Config | null {
        const value = this.get(key, undefined);
        if (value === undefined)
            return null;
        
        if (value instanceof Config || value === null)
            return value;
        else
            throw new TypeError("the value that key linked doesn't a config map");
    }
    /**
     * 根据指定的键获取布尔值。
     * @param key - 配置键。
     * @param defaultValue - 如果未找到键时的默认值。默认值为 false。
     * @returns 键的布尔值。
     */
    getBoolean(key: string, defaultValue: boolean = false): boolean {
        const value = this.get(key, undefined);
        if (value === undefined){
            return defaultValue;
        } else {
            return (!!value);
        }
    }
    /**
     * 根据指定的键获取 bigint 值。
     * @param key - 配置键。
     * @param defaultValue - 如果未找到键时的默认值。默认值为 0。
     * @returns 键的 bigint 值。
     * @throws 如果不支持 bigint，则抛出 SyntaxError。
     */
    getBigInt(key: string, defaultValue?: bigint): bigint {
        if (!BigInt)
            throw new SyntaxError("bigint not support");
        
        const value = this.get(key, undefined);
        if (value === undefined){
            return defaultValue ?? BigInt(0);
        }

        if (typeof value === "bigint"){
            return value;
        } else {
            try {
                return BigInt(String(value));
            } catch {
                return BigInt(0);
            }
        }
    }
    /**
     * 根据指定的键获取整数值。
     * @param key - 配置键。
     * @param defaultValue - 如果未找到键时的默认值。默认值为 NaN。
     * @returns 键的整数值。
     */
    getInt(key: string, defaultValue: number = NaN): number {
        const value = this.get(key, undefined);
        if (value === undefined){
            return defaultValue;
        } else {
            return parseInt(String(value));
        }
    }
    /**
     * 根据指定的键获取浮点数值。
     * @param key - 配置键。
     * @param defaultValue - 如果未找到键时的默认值。默认值为 NaN。
     * @returns 键的浮点数值。
     */
    getFloat(key: string, defaultValue: number = NaN): number {
        const value = this.get(key, undefined);
        if (value === undefined){
            return defaultValue;
        } else {
            return parseFloat(String(value));
        }
    }
    /**
     * 根据指定的键获取数字值。
     * @param key - 配置键。
     * @param defaultValue - 如果未找到键时的默认值。默认值为 NaN。
     * @returns 键的数字值。
     */
    getNumber(key: string, defaultValue: number = NaN): number {
        const value = this.get(key, undefined);
        if (value === undefined){
            return defaultValue;
        } else {
            return Number(value);
        }
    }
    /**
     * 根据指定的键获取字符串值。
     * @param key - 配置键。
     * @param defaultValue - 如果未找到键时的默认值。默认值为空字符串。
     * @returns 键的字符串值。
     */
    getString(key: string, defaultValue: string = ""): string {
        const value = this.get(key, undefined);
        if (value === undefined){
            return defaultValue;
        } else {
            return String(value);
        }
    }
    /**
     * 根据指定的键获取值。
     * @param key - 配置键。
     * @returns 键的值。
     */
    get(key: string): ConfigValue;
    /**
     * 根据指定的键获取值。
     * @param key - 配置键。
     * @param defaultValue - 在指定的配置名没有配置时返回的默认值。
     * @returns 键的值。
     */
    get(key: string, defaultValue: any): ConfigValue | typeof defaultValue;
    get(key: string, defaultValue?: any){
        let map = this.#configMap;
        let value = null;
        for (const oneKey of Config.getConfigKeys(key)){
            if (typeof map === "object" && oneKey in map)
                value = map[oneKey];
            else
                return arguments.length >= 2 ? defaultValue : null;
            
            map = value as ConfigMap;
        }
        if (typeof value === "object" && value !== null)
            return Config.createFromConfigMap(value as ConfigMap);
        else
            return value;
    }
    /**
     * 设置指定键的 Config 对象。
     * @param key - 配置键。
     * @param config - 要设置的 Config 对象。
     * @throws 如果提供的值不是 Config 对象，则抛出错误。
     */
    setConfig(key: string, config: Config){
        if (config instanceof Config)
            this.set(key, config);
        else
            throw new TypeError("not a config");
    }
    /**
     * 设置指定键的布尔值。
     * @param key - 配置键。
     * @param value - 要设置的布尔值。
     */
    setBoolean(key: string, value: boolean){
        this.set(key, !!value);
    }
    /**
     * 设置指定键的 bigint 值。
     * @param key - 配置键。
     * @param value - 要设置的 bigint 值。
     * @throws 如果不支持 bigint，则抛出 SyntaxError。
     * @throws 如果提供的值不是 bigint，则抛出 TypeError。
     */
    setBigInt(key: string, value: bigint){
        if (!BigInt)
            throw new SyntaxError("bigint not support");
            
        if (typeof value !== "bigint")
            throw new TypeError("not a BigInt");
        
        this.set(key, value);
    }
    /**
     * 设置指定键的整数值。
     * @param key - 配置键。
     * @param value - 要设置的整数值。
     */
    setInt(key: string, value: number){
        this.set(key, parseInt(String(value)));
    }
    /**
     * 设置指定键的浮点数值。
     * @param key - 配置键。
     * @param value - 要设置的浮点数值。
     */
    setFloat(key: string, value: number){
        this.set(key, parseFloat(String(value)));
    }
    /**
     * 设置指定键的数字值。
     * @param key - 配置键。
     * @param value - 要设置的数字值。
     */
    setNumber(key: string, value: number){
        if (typeof value === "bigint")
            value = Number((value as unknown as bigint).toString());
        else
            value = Number(value);
        this.set(key, value);
    }
    /**
     * 设置指定键的字符串值。
     * @param key - 配置键。
     * @param value - 要设置的整数值。
     */
    setString(key: string, value: string){
        this.set(key, String(value));
    }
    /**
     * 设置指定键的值。
     * @param key - 配置键。
     * @param value - 要设置的值。
     * @returns 配置的旧值。
     */
    set(key: string, value: ConfigValue): ConfigValue {
        let lastVal;
        if (value instanceof Config){
            lastVal = this.#set(key, value.#configMap);
        } else {
            switch (typeof value){
                case "string":
                case "boolean":
                case "bigint":
                case "number":
                    break;
                case "undefined":
                    value = null;
                    break;
                case "object":
                    if (value === null)
                        break;
                
                default:
                    throw new TypeError("unsupported value type: "+typeof value);
            }
            lastVal = this.#set(key, value);
        }
        
        let returnVal: ConfigValue;
        if (typeof lastVal === "object" && lastVal !== null)
            returnVal = Config.createFromConfigMap(lastVal);
        else
            returnVal = lastVal;
        
        (async function emit(co: Config){
            co.#onConfigChangedCallbacks.slice(0).forEach(async function onConfigChanged(cb){
                cb(key, value, returnVal, co);
            });
        })(this);
        
        return returnVal;
    }
    #set(key: string, value: PlainValue | ConfigMap | undefined): PlainValue | ConfigMap {
        let map = this.#configMap;
        const keys: string[] = Config.getConfigKeys(key);
        while (keys.length > 0){
            const oneKey = keys.shift() as string;
            if (keys.length === 0){
                const lastVal = oneKey in map
                    ? map[oneKey] : null;
                
                if (value === undefined)
                    delete map[oneKey];
                else
                    map[oneKey] = value;
                
                return lastVal;
            }
            
            if (map[oneKey] === undefined || map[oneKey] === null){
                map[oneKey] = Object.create(null);
            }
            if (typeof map[oneKey] !== "object"){
                throw new Error("不允许间接覆盖一个非空值");
            }
            
            map = map[oneKey] as ConfigMap;
        }
        
        // 正常情况下不可能执行到这里
        return null;
    }
    /**
     * 设置指定键的 Config 对象。
     * @param key - 配置键。
     * @param config - 要设置的 Config 对象。
     * @returns 返回调用对象自身以允许链式调用。
     * @throws 如果提供的值不是 Config 对象，则抛出错误。
     */
    addConfig(key: string, config: Config): Config {
        this.setConfig(key, config);
        return this;
    }
    /**
     * 设置指定键的布尔值。
     * @param key - 配置键。
     * @param value - 要设置的布尔值。
     * @returns 返回调用对象自身以允许链式调用。
     */
    addBoolean(key: string, value: boolean): Config {
        this.setBoolean(key, value);
        return this;
    }
    /**
     * 设置指定键的 bigint 值。
     * @param key - 配置键。
     * @param value - 要设置的 bigint 值。
     * @returns 返回调用对象自身以允许链式调用。
     * @throws 如果不支持 bigint，则抛出 SyntaxError。
     * @throws 如果提供的值不是 bigint，则抛出 TypeError。
     */
    addBigInt(key: string, value: bigint): Config {
        this.setBigInt(key, value);
        return this;
    }
    /**
     * 设置指定键的整数值。
     * @param key - 配置键。
     * @param value - 要设置的整数值。
     * @returns 返回调用对象自身以允许链式调用。
     */
    addInt(key: string, value: number): Config {
        this.setInt(key, value);
        return this;
    }
    /**
     * 设置指定键的浮点数值。
     * @param key - 配置键。
     * @param value - 要设置的浮点数值。
     * @returns 返回调用对象自身以允许链式调用。
     */
    addFloat(key: string, value: number): Config {
        this.setFloat(key, value);
        return this;
    }
    /**
     * 设置指定键的数字值。
     * @param key - 配置键。
     * @param value - 要设置的数字值。
     * @returns 返回调用对象自身以允许链式调用。
     */
    addNumber(key: string, value: number): Config {
        this.setNumber(key, value);
        return this;
    }
    /**
     * 设置指定键的字符串值。
     * @param key - 配置键。
     * @param value - 要设置的整数值。
     * @returns 返回调用对象自身以允许链式调用。
     */
    addString(key: string, value: string): Config {
        this.setString(key, value);
        return this;
    }
    /**
     * 设置指定键的值。
     * @param key - 配置键。
     * @param value - 要设置的值。
     * @returns 返回调用对象自身以允许链式调用。
     */
    add(key: string, value: ConfigValue): Config {
        this.set(key, value);
        return this;
    }
    /**
     * 检查指定的配置键是否为一个对象。
     * @param key - 配置键。
     */
    hasConfig(key: string): boolean {
        const value = this.get(key);
        return typeof value === "object" && value !== null;
    }
    /**
     * 检查指定的配置键是否为一个布尔值。
     * @param key - 配置键。
     */
    hasBoolean(key: string): boolean {
        return typeof this.get(key) === "boolean";
    }
    /**
     * 检查指定的配置键是否为一个 bigint 值。
     * @param key - 配置键。
     */
    hasBigInt(key: string): boolean {
        return typeof this.get(key) === "bigint";
    }
    /**
     * 检查指定的配置键是否为一个整数值。
     * @param key - 配置键。
     */
    hasInt(key: string): boolean {
        const value = this.get(key);
        return typeof value === "number"
          && parseInt(String(value)) === value;
    }
    /**
     * 检查指定的配置键是否为一个浮点数值。
     * @param key - 配置键。
     */
    hasFloat(key: string): boolean {
        const value = this.get(key);
        return typeof value === "number"
          && parseFloat(String(value)) === value;
    }
    /**
     * 检查指定的配置键是否为一个数字值（这包括 `NaN`、`Infinity` 以及它们的负数形式）。
     * @param key - 配置键。
     */
    hasNumber(key: string): boolean {
        return typeof this.get(key) === "number";
    }
    /**
     * 检查指定的配置键是否为一个字符串值。
     * @param key - 配置键。
     */
    hasString(key: string): boolean {
        return typeof this.get(key) === "string";
    }
    /**
     * 检查指定的配置键是否已经设置为某个值。
     * @param key - 配置键。
     */
    has(key: string): boolean {
        return this.get(key, undefined) !== undefined;
    }
    /**
     * 检查指定的配置键是否已经设置为 `null`。
     * @param key - 配置键。
     */
    isNull(key: string): boolean {
        return this.get(key, undefined) === null;
    }
    /**
     * 从 ConfigMap 中删除配置键。
     * @returns key - 指定配置键的值是否被移除。
     */
    delete(key: string): boolean {
        if (this.has(key)){
            this.#set(key, undefined);
            return !(this.has(key));
        }
        return false;
    }
    /**
     * 从 JSON 反序列化得到其对象后，使用此对象作为 ConfigMap 创建新的 Config 对象。
     * @param configJSON - 配置JSON。
     */
    constructor(configJSON: string)
    /**
     * 创建新的 Config 对象，并读取 configMap 中的键值设定到新创建的对象中。
     * @param configMap - 配置。
     */
    constructor(configMap: Map<string, ConfigValue>)
    constructor()
    constructor(config?: Map<string, ConfigValue> | string){
        if (!config)
            return;
        
        if (typeof config === "string"){
            Object.assign(this.#configMap, JSON.parse(config));
        } else {
            for (const kv of config){
                this.set(kv[0], kv[1]);
            }
        }
    }
    /**
     * 创建新的 Config 对象，将 `configMap` 作为其内部的 ConfigMap。
     * @param configMap - 配置映射对象。
     * @returns 新创建的 Config 对象。
     */
    static createFromConfigMap(configMap: ConfigMap){
        const config = new Config();
        config.#configMap = configMap;
        return config;
    }
    static fromConfigObject(object: {}){
        return new Config(JSON.stringify(object));
    }
    /**
     * 读取配置键名为一个数组。
     * @param key - 配置键。
     * @returns 配置的键数组。
     */
    static getConfigKeys(key: string){
        //@ts-ignore
        let chain = String.prototype.split.call(key, ".");
        if (chain.includes(""))
            throw new Error("invalid key");
        return chain;
    }
    /**
     * 克隆此 Config。
     * @returns 新的 Config 对象。
     */
    clone(){
        return new Config(this.toJSON());
    }
    toJSON(){
        return JSON.stringify(this.#configMap);
    }
    #onConfigChangedCallbacks: ConfigChangeCallbackFunc[] = [];
    onceConfigChanged(cb: ConfigChangeCallbackFunc): typeof cb {
        const autoRemove = () => {
            this.offConfigChanged(autoRemove, cb);
        };
        this.onConfigChanged(autoRemove);
        this.onConfigChanged(cb);
        return cb;
    }
    onConfigChanged(cb: ConfigChangeCallbackFunc): typeof cb {
        this.#onConfigChangedCallbacks.push(cb);
        return cb;
    }
    offConfigChanged(...cbs: ConfigChangeCallbackFunc[]): void {
        this.#onConfigChangedCallbacks = this.#onConfigChangedCallbacks.filter(icb => !cbs.includes(icb));
    }
}

type ConfigChangeCallbackFunc = (key: string, newVal: ConfigValue, lastVal: ConfigValue, config: Config) => void;

/**
 * 表示一个配置映射对象。
 */
export interface ConfigMap {
    [key: string]: ConfigMap | PlainValue;
}
export type PlainValue = string | number | bigint | boolean | null;
/**
 * 配置值的类型。
 */
export type ConfigValue = Config | PlainValue;

//文档注释由ChatGPT生成，毕竟写这东西挺费劲的


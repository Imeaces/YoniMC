/**
 * 得到一个对象上的所有键值
 * @param {any} object
 * @param {any} [endPrototype] - 如果键值是继承而来的，从什么原型的位置结束继承，默认为Object.prototype，即从Object原型方法上断开继承
 */
export function getKeys(object, endPrototype){
    if (arguments.length === 1){
        endPrototype = Object.prototype;
    }
    //为了更强的兼容性，使用了var
    var sa = object;
    var keys = new Set();
    var saKeys;
    var idx;
    var key;
    while (sa !== null && sa !== endPrototype){
        saKeys = Object.getOwnPropertyNames(sa);
        for (idx = 0; idx < saKeys.length; idx ++){
            key = saKeys[idx];
            if (keys.has(key)){
                continue;
            }
            keys.add(key);
        }
        sa = Object.getPrototypeOf(sa);
    }
    return Array.from(keys);
}
export function dealWithCmd(key, value){
    if (typeof value === "string"){
        value = value.replaceAll(/[“”]/g, "\"");
        value = value.replaceAll(/[‘’]/g, "'");
    }
    return value;
}

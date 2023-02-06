/**
 * 所有的ScoreboardTypedArray都只是访问记分项的一个接口对象，它与JavaScript的TypedArray类似，但是实际上并不相同
 * 此类型数组长度可变
 */
class ScoreboardInt32Array {
    constructor(objective){
        let self = {};
        Object.assign(self, Array.prototype, this);
        if (false){
        }
        return new Proxy({}, {
            get(_t, k){
                if (k in self){
                    if (typeof self[k] === "function"){
                        return 
                    }
                }
            }
        });
    }
}

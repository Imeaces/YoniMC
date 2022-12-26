export function copyPropertiesWithoutOverride(target, src, accessKey){
    if ((typeof accessKey !== "string" && typeof accessKey !== "symbol") || accessKey === ""){
        throw new TypeError("accessKey not valid");
    }
    for (let key in src){
        if (key in target || key === accessKey){
            continue;
        }
        
        let propertyDescriptor = Object.getOwnPropertyDescriptor(src, key);
        if ("value" in propertyDescriptor && typeof propertyDescriptor.value === "function"){
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: false,
                writable: false,
                value: function (){
                    return this[accessKey][key].apply(this[accessKey], arguments);
                }
            });
        } else {
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: false,
                get: function (){
                    return this[accessKey][key];
                },
                set: function (value){
                    this[accessKey][key] = value;
                }
            });
        }
    }
}

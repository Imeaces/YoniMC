/*export function logFuncCall(): FunctionAnnotation {
  return function (target, propertyKey, descriptor) {
    if (typeof descriptor.value === "function") {
      let value: Function = descriptor.value;
      // @ts-ignore
      descriptor.value = function (...args: any) {
        console.log(`${Date()} ${target.constructor.name}["${String(propertyKey)}"] be Called`);
        return value.call(this, ...args);
      };
    }
  };
}
*/

const console: any = globalThis.console;
export function AbuseWarning(message?: string){
    let hasBeenWarned = false;
    return function warnAbuseMessageAndContinue(target: any, propKey: string | symbol | number, propDesc: PropertyDescriptor){
        if (hasBeenWarned)
            return;
        
        const propKeyStr = String(propKey);
        hasBeenWarned = true;
        if (message){
            console.warning(message);
        } else if (typeof propDesc.value === "function"){
            console.warning(`警告：方法 ${target.constructor.name}[${propKeyStr}]() 被滥用`);
        } else {
            console.warning(`警告：${target.constructor.name}[${propKeyStr}] 被滥用`);
        }
    }
}
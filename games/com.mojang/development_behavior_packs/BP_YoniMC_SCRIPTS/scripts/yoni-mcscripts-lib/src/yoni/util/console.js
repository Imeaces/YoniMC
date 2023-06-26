export function printError(...args){
    let { msg, errMsg } = getErrorMsg(...args);
    console.error(msg+"\n"+errMsg);
}
export const formatStr = {
    black: "§0",
    dark_blue: "§1",
    dark_green: "§2",
    dark_aqua: "§3",
    dark_red: "§4",
    dark_purple: "§5",
    gold: "§6",
    gray: "§7",
    dark_gray: "§8",
    blue: "§9",
    green: "§a",
    aqua: "§b",
    red: "§c",
    light_purple: "§d",
    yellow: "§e",
    white: "§f",
    minecoin_gold: "§g",
    obfuscated: "§k",
    bold: "§l",
    italic: "§o",
    reset: "§r",
    unknownVal: "§c[unknown]",
};
/*
export function visualizeFunction(func){
}
function insertElementIntoArray(array: {[n: number]: any}, index, ...elements){
    //let oldElements = Array.prototype.slice.call(array);
    let lastElements = Array.prototype.splice.call(array, index, array.length);
    elements.forEach((element) => {
        Array.prototype.push.call(array, element);
    });
    Array.prototype.forEach.call(lastElements, (element) => {
        Array.prototype.push.call(array, element);
    });
    return array;
}

export function visualizeValue(anyV, maxDepth = 3){
    let valueStack = [];
    valueStack.splice(0, 1, [false, 0, anyV]);
    
    let stackPoint = 0;
    while (valueStack.length > 0){
        let entry = valueStack[stackPoint];
        
        let [deconstruction, depth, value] = entry;
        
        if (deconstruction){
            stackPoint += 1;
        }
        
        switch (typeof value){
            case "symbol":
                value = `[${value.toString()}]`;
            case "number":
            case "string":
                value = String(value);
                deconstruction = true;
                break;
        }
        
        if (deconstruction){
            valueStack.splice(stackPoint, 1, [deconstruction, depth, value]);
        }
        
        return [deconstruction, depth+1, visualizeObject(value)];
    });
}
type ObjectPropRec {
    names: ObjectValuePath;
    object: ({})[];
    value: any;
}

class VisualValue {
    value; any;
    "type": string;
    objectProto: {} | null | undefined
    visualText: string | undefined;
    constructor(value: any){
        this.value = value;
        this.visualText = VisualValue.visualizeBaseValue(value);
        this.type = (value === null) ? "null" : typeof value;
        try {
          this.objectProto = Object.getPrototypeOf(value);
        } catch {
          this.objectProto = undefined;
        }
    }
    [n: string]: any;
    static visualizeBaseValue(value): string | undefined {
      let valueType = value === null ? "null" : typeof value;
      let valueStr = "";
      let visualised = true;
      switch (valueType){
          case "boolean":
          case "number":
          case "null":
          case "undefined":
              valueStr = String(value);
              break;
          case "bigdecimal":
              valueStr = value.toString() + "m";
              break;
          case "bigint":
              valueStr = value.toString() + "n";
              break;
          case "string":
              valueStr = "\""+value.replace(/"/g, "\\\"")+"\"";
              break;
          case "symbol":
              valueStr = `[${value.toString()}]`
              break;
          default:
              visualised = false;
      }
      if (visualised) return valueStr;
    }
}

function visualizeObject(object, maxDepth = 3){
    let objectPropRecArr = [];
    let generatedPropRec = [];
    let propTree = [];
    function genPropRec(object, names = [], recs = []){
        ObjectUtils.getOwnProperties(object).forEach(k => {
            if (!Object.prototype.propertyIsEnumerable.call(object, k))
                return;
            let v = object[k];
            let nameStack = names.slice();
            let recsCopy = recs.slice();
            if (!recsCopy.includes(v)){
                nameStack.push(k);
                recsCopy.push(v);
                let proprec = {
                    names: nameStack,
                    objects: recsCopy,
                    value: v,
                    valueType: v === null ? "null" : typeof v,
                };
                objectPropRecArr.push(proprec);
            }
        });
    }
    genPropRec(object);
    while(objectPropRecArr.length > 0){
        let proprecInArr = objectPropRecArr.pop();
        let { names, objects, value, valueType } = proprecInArr;
        switch (valueType){
            case "boolean":
            case "number":
            case "string":
            case "symbol":
            case "bigint":
            case "bigdecimal":
            case "null":
            case "undefined":
                generatedPropRec.push(proprecInArr);
                continue;
                break;
            default:
                propTree.push(proprecInArr);
        }
        genPropRec(value, names, objects);
    }
    
    let propVisual = generatedPropRec.map(proprec => {
        let { names, objects, value, valueType } = proprec;
        let valueStr = value;
        switch (valueType){
            case "boolean":
            case "number":
            case "bigint":
            case "null":
            case "undefined":
            case "bigdecimal":
                valueStr = String(value);
                break;
            case "string":
                valueStr = "\""+value.replace("\""g, "\\\"")+"\"";
                break;
            case "symbol":
                valueStr = `[${value.toString()}]`
                break;
            default:
        }
        return [names, valueStr];
    });
    
    return propVisual;
}

function leftpad(str, len, ch = " "){
  str = String(str);
  if (str.length >= len) return str;
  let chs = "";
  let nlen = len;
  while (nlen-- > 0){
    chs += ch;
  }
  let c = String(chs+str);
  return c.slice(str.length, c.length);
}
function leftpadMult(str, len, ch = " "){
  str = String(str);
  let chs = "";
  let nlen = len;
  while (nlen-- > 0){
    chs += ch;
  }
  return str.split("\n")
    .map(str => {
      if (str.length >= len) return str;
      let c = String(chs+str);
      return c.slice(str.length, c.length);
    })
    .join("\n");
}

export 
export function visualizeError(){
}
export function visualizeArray(){
}*/
/*
URIError
TypeError
SyntaxError
RangeError
ReferenceError
InternalError
EvalError
AggregateError*/
function visualizeBaseValue(value){
   let valueType = value === null ? "null" : typeof value;
   let valueStr = "";
   let visualised = true;
   switch (valueType){
       case "boolean":
       case "number":
       case "null":
       case "undefined":
           valueStr = String(value);
           break;
       case "bigdecimal":
           valueStr = value.toString() + "m";
           break;
       case "bigint":
           valueStr = value.toString() + "n";
           break;
       case "string":
           valueStr = "\""+value.replace(/("|\\)/g, "\\$1")+"\"";
           break;
       case "symbol":
           valueStr = `[${value.toString()}]`
           break;
       default:
           visualised = false;
   }
   if (visualised) return valueStr;
}

function visualizePlainObject(value, maxDepth, option){
   let { depth, objectChain, circularRecord, showEnumerableOnly, maxItemPerObject: itemCountLimit, recursiveQuery } = option;
   
   let objectTypeName = "";
   let objectExtraInfo = "";
   let objectTypeFullName = "";
   let objectToStringTag = value[Symbol.toStringTag] ?? "";
   
   if (value instanceof Array){
     objectTypeName = objectToStringTag === "" ? "Array" : objectToStringTag;
     objectExtraInfo = `[${value.length}]`;
     objectTypeFullName = `[ ${objectTypeName}${objectExtraInfo} ]`;
   } else if (value instanceof Set){
     objectTypeName = objectToStringTag;
     objectExtraInfo = `[${value.size}]`;
     objectTypeFullName = `{ ${objectTypeName}${objectExtraInfo} }`;
   } else if (value instanceof Map){
     objectTypeName = objectToStringTag;
     objectExtraInfo = `[${value.size}]`;
     objectTypeFullName = `{ ${objectTypeName}${objectExtraInfo} }`;
   } else if (typeof value === "function"){
     objectTypeName = `Function ${value.name === "" ? '(anonymous)' : value.name}()`;
     objectTypeFullName = `[ ${objectTypeName} ]`;
   } else if (value instanceof Error){
     objectTypeName = getErrorMsg(value).errMsg;
     objectTypeFullName = `{ ${objectTypeName} }`;
   } else {
     try {
       let objectProto = Object.getPrototypeOf(value);
       objectTypeName = value[Symbol.toStringTag] ?? "Object";
       if (objectTypeName === "Object" && objectProto !== Object.prototype){
         objectTypeName = value.constructor?.name ?? "unknown";
         objectTypeFullName = `{ ${objectTypeName} [folded] }`;
       } else if (objectTypeName === "Object" && objectProto === Object.prototype){
         objectTypeName = "";
         objectTypeFullName = "{ [folded] }";
       }
     } catch {
         try {
             objectTypeName = value.constructor?.name ?? "unknown";
         } catch {
             objectTypeName = "{unknown Proto}";
         }
     }
   }
   
   if (maxDepth < depth)
       return objectTypeFullName;
   
   let isCircularBase = (objectChain.lastIndexOf(value) === objectChain.indexOf(value));
   let isCircular = false;
   if (!isCircularBase){
      //circulared
      visualizeValue_setCirculared(circularRecord, value);
      isCircular = true;
   }
   
   let objectItems = (recursiveQuery ? getProperties(value, null) : getOwnProperties(value))
       .filter(k => (!showEnumerableOnly) || Object.prototype.propertyIsEnumerable.call(value, k))
       .map((key, curPos, keys) => {
           let suffix = ",";
           if (curPos+1 === keys.length)
               suffix = "";
           
           let nv = undefined;
           let valueStr = undefined;
           let isAccessed = true;
           try {
               nv = value[key];
               valueStr = visualizeValue_getCircularTag(circularRecord, nv);
           } catch {
               isAccessed = false;
           }
           
           if (valueStr)
               valueStr = `[Circular ${valueStr}]`;
           else if (isAccessed)
               valueStr = visualizeValue(nv, maxDepth, {
                 depth, objectChain, circularRecord, showEnumerableOnly, maxItemPerObject: itemCountLimit, recursiveQuery
               });
           else
              valueStr = "[unknown value]";
           
           let keyStr = typeof key === "symbol" ? `[${key.toString()}]` : key;
           return `${keyStr}: ${valueStr}${suffix}`
       });
   
   if (itemCountLimit >= 0 && objectItems.length > itemCountLimit){
       let lessItems = objectItems.splice(itemCountLimit, objectItems.length-itemCountLimit);
       objectItems.push(`[ ${lessItems.length} more ... ]`);
   }
   
   let connectBySpace = objectItems.join(" ");
   let shouldNextLine = connectBySpace.length > 30;
   
   let objectPropStr = "";
   if (shouldNextLine)
       objectPropStr = ("{\n"
       + objectItems.map(v => indent(v, 3*depth))
           .join("\n")
       + "\n" + indent("}",  Math.max(0, 3*depth-3)));
   else
       objectPropStr = "{ " + connectBySpace + " }";
   
   let refTag = visualizeValue_getCircularTag(circularRecord, value);
   
   if (refTag && isCircularBase)
       refTag = `<ref ${refTag}> `;
   else if (refTag || isCircular)
       return `[Circular ${refTag}]`;
   return (refTag??"") + objectTypeName + objectExtraInfo + objectPropStr;
}
function indentMult(str, inC, ch = " "){
  let chs = "";
  while (inC-- > 0)
    chs += ch;
  return str.split("\n")
    .map(str => chs + str)
    .join("\n");
}
function indent(str, inC, ch = " "){
    return indentMult("", inC, ch) + str;
}
function getProperties(object, endPrototype) {
    if (arguments.length === 1) {
        endPrototype = Object.prototype;
    }
    //为了更强的兼容性，使用了var
    var sa = object;
    var keys = new Set();
    var saKeys;
    var idx;
    var key;
    while (sa !== null && sa !== endPrototype) {
        saKeys = Object.getOwnPropertyNames(sa);
        for (idx = 0; idx < saKeys.length; idx++) {
            key = saKeys[idx];
            if (keys.has(key)) {
                continue;
            }
            keys.add(key);
        }
        saKeys = Object.getOwnPropertySymbols(sa);
        for (idx = 0; idx < saKeys.length; idx++) {
            key = saKeys[idx];
            if (keys.has(key)) {
                continue;
            }
            keys.add(key);
        }
        sa = Object.getPrototypeOf(sa);
    }
    return Array.from(keys);
}
function getOwnProperties(object) {
    return getProperties(object, Object.getPrototypeOf(object));
}

function visualizeValue_getCircularTag(circularRecord, value){
    return circularRecord.get(value);
}
function visualizeValue_setCirculared(circularRecord, value){
    if (circularRecord.has(value)) return;
    
    let tag = `*${circularRecord.size+1}`;
    circularRecord.set(value, tag);
}

/** 我也不知道它怎么运行的，反正你传参就对了
传重复参数可能会出现一些问题，忍着 */
export function visualizeValue(value, maxDepth = 3, applyOption = {}, option = {
  depth: 0,
  circularRecord: new Map(),
  showEnumerableOnly: true,
  objectChain: [],
  maxItemPerObject: 10,
  recursiveQuery: false,
}){
   let { depth, circularRecord, objectChain, showEnumerableOnly,
     recursiveQuery,
     maxItemPerObject,
    } = Object.assign(option, applyOption);
   
   let valueStr = visualizeBaseValue(value);
   if (valueStr) return valueStr;
   
   option = {
     depth: depth + 1,
     circularRecord,
     objectChain: objectChain.slice(),
     showEnumerableOnly,
     recursiveQuery,
     maxItemPerObject,
   };
   option.objectChain.push(value);
   return visualizePlainObject(value, maxDepth, option)
}
/**
 * @param {any} msg
 * @param {any} err
 */
export function getErrorMsg(msg="", err=msg){
    let errMsg = "";
    if (err instanceof Error){
        errMsg += `${err.name}: ${err.message}`;
        if (err.stack !== undefined)
            errMsg += `\n${err.stack}`;
    } else {
        errMsg = String(err);
    }
    return { msg: msg, errMsg: errMsg };
}
export default class Memory {
  #memories = {};
  #memoriesTypes;
  #memoriesList = [];
  static memoryTypes = {
    NUMBER: 0,
    STRING: 1,
    ARRAY: 2,
    OTHER: 3,
    UNDEFINED: -1
  }
  static TYPE_NUMBER = this.memoryTypes.NUNBER;
  static TYPE_STRING = this.memoryTypes.STRING;
  static TYPE_ARRAY = this.memoryTypes.ARRAY;
  static TYPE_OTHER = this.memoryTypes.OTHER;
  static TYPES = this.memoryTypes.OTHER;

  constructor(memories){
    if (memories){
      try {
        let memoriesToCheck = JSON.parse(memorys);
        memories = memoriesToCheck;
      } catch {
        throw "无法将数据读取入内存";
      }
    }
  }
  
  get memories() {
    return JSON.stringify(this.#memories);
  }
    
  #checkValueType(value){
    let type = typeof value;
    switch (type){
      case "number":
        return this.memoryTypes.NUMBER;
      case "string":
        return this.memoryTypes.STRING;
      case "object":
        if (Object.prototype.toString.call(value) == "[object Array]"){
          return this.memoryTypes.ARRAY;
        } else {
          return this.memoryTypes.OTHER;
        }
      case "undefined":
        return this.memoryTypes.UNDEFINED;
      default:
        return this.memoryTypes.OTHER;
    }
  }
  getMemory(name){
    return this.#memories[name];
  }
  putMemory(name, value){
    if (typeof this.#memoriesList.indexOf(name) == -1){
      throw "没有找到"+name;
    }
    let valueType = this.#checkValueType(value);
    let storedValueType = this.#memoriesTypes[name];
    if (valueType == -1){
      this.valueTypes[name] = undefined;
    } else if (storedValueType != valueType){
      this.valueTypes[name] = valueType;
    }
    this.#memories[name] = value;
  }
  dropMemory(name){
    this.#memoriesList.splice(this.#memoriesList.indexOf(name), 1);
    this.#memoriesTypes[name] = undefined;
    this.#memories[name] = undefined;
  }
  newMemory(name, value, type){
    if (typeof name != "string" || name == ""){
      throw "未指定正确的字段名！需要非空字符串"
    } else if (this.#memoriesList.indexOf(name) != -1){
      throw "已经有这样的字段了！"
    }
    this.#memoriesList.push(name);
    typeArgType = this.#checkValueType(type);
    if (typeArgType != this.memoryTypes.UNDEFINED){
      this.valueTypes[name] = typeArgType;
    }
    this.putMemory(name, value);
  }
}

class RawMemory {
  memories = {};
}

export { Memory, RawMemory };

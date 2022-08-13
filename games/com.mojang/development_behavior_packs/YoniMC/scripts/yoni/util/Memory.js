export default class Memory {
  nameStringify(name){
    if (typeof name == "undefined"){
      throw new Error("字段为空");
    }
    let str = "" + name;
    if (str == "")
      throw new Error("字段为空");
    return str;
  }

//存储记忆用的
  #memoriesStores = []; //主存储
  #memoriesTypeStores = []; //类型存储
  #memoriesListStores = []; //字段存储
  /* 
    @params {String} 可选，json字符串，若指定，将会存储数据到记忆
   */
  constructor(memoryData){
    if (memoryData){
      try {
        let memory = JSON.parse(memoryData);
        let { stores, types, list } = memory;
        this.#memoriesStores = stores;
        this.#memoriesTypeStores = types;
        this.#memoriesListStores = list;
      } catch {
        throw "无法将数据读取入内存";
      }
    }
  }
  //getter .memories
  get memories() {
    let memory = {
      stores: this.#memoriesStores,
      types: this.#memoriesTypeStores,
      list: this.#memoriesListStores
    };
    return JSON.stringify(memory);
  }
    
  getMemory(name, expectType){
    this.#checkNameExisted(name);
    let nameIndex = this.#getIndexOfName(name);
    if (expectType){
      if (expectType != this.#memoriesTypeStores[nameIndex]){
        throw new TypeError("记忆"+name+"的类型与预期类型不符！")
      }
    }
    return this.#memoriesStores[nameIndex];
  }
  putMemory(name, value){
    this.#checkNameExisted(name);
    let nameIndex = this.#getIndexOfName(name);
    let valueType = MemoryType.checkValueType(value);
    let storedValueType = this.#memoriesTypeStores[nameIndex];
    if (valueType == MemoryType.UNDEFINED){
      this.#memoriesTypeStores[nameIndex] = MemoryType.UNDEFINED;
    } else if (storedValueType != valueType){
      this.#memoriesTypeStores[nameIndex] = valueType;
    }
    this.#memoriesStores[nameIndex] = value;
  }
  dropMemory(name){
    this.#checkNameExisted(name);
    let nameIndex = this.#getIndexOfName(name);
    this.#memoriesListStores.splice(nameIndex, 1);
    this.#memoriesTypeStores.splice(nameIndex, 1);
    this.#memoriesStores.splice(nameIndex, 1);
  }
  newMemory(name, value, ...values){
    name = this.nameStringify(name);
    if (this.#getIndexOfName(name) != -1){
      throw new SyntaxError("已经存在字段"+name);
    }
    this.#memoriesListStores.push(name);
    let nameIndex = this.#getIndexOfName(name);
    let valueType = MemoryType.checkValueType(value);
    this.#memoriesTypeStores[nameIndex] = valueType;
    this.putMemory(name, value);
  }
  checkIfNameExisted(name){ //检测字段是否存在
    let result = true;
    try {
      this.#checkNameExisted(name);
    } catch {
      result = false;
    }
    return result;
  }
  #checkNameExisted(name){ //检查字段是否存在
    let nameIndex = this.#getIndexOfName(name);
    if (nameIndex == -1)
      throw new ReferenceError("没有找到"+name);
  }
  #getIndexOfName(name){ //获取字段名位置
    let nameIndex = this.#memoriesListStores.indexOf(this.nameStringify(name));
    return nameIndex;
  }
//aliases
  new(...args){
    return newMemory(...args);
  }
  get(...args){
    return getMemory(...args);
  }
  put(...args){
    return putMemory(...args);
  }
  drop(...args){
    return dropMemory(...args);
  }
}

class MemoryType {
//定义记忆类型（没啥作用，练习兼耍帅
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
  static UNDEFINED = this.memoryTypes.UNDEFINED;
  static checkValueType(value){
    let type = typeof value;
    switch (type){
      case "number":
        return this.TYPE_NUMBER;
      case "string":
        return this.TYPE_STRING;
      case "object":
        if (Object.prototype.toString.call(value) == "[object Array]"){
          return this.TYPE_ARRAY;
        } else {
          return this.TYPE_OTHER;
        }
      case "undefined":
        return this.memoryTypes.UNDEFINED;
      default:
        return this.TYPE_OTHER;
    }
  }
}

class RawMemory {
  memories = {};
}

export { Memory, MemoryType, RawMemory };

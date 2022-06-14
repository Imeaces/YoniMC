export default class Memory {
  #raw = new RawMemory();
  #memories = this.#raw.memories;
  constructor(memories){
    if (memories){
      try {
        let memoriesToCheck = JSON.parse(memorys);
      } catch {
        throw "无法将数据读取入内存";
      }
    }
  }
  
  get memories() {
    return JSON.stringify(this.#memories);
  }
  
  set raw(...args) {
    console.log(args);
  }
  
  #isNameExist(){
  }
  
  putMemories(type, values){
    if (!this.fileExist(name)){
      
    }
  }
}

class RawMemory {
  memories = {};
}

export { Memory, RawMemory };

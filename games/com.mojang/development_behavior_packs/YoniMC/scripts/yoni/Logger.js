export default class Logger {
  #name;
  maxLength = 65536;
  get name(){
    return this.#name;
  }
  set name(){
    throw new Error("Not allow to change name after initial");
  }
  constructor(name){
    this.#name = String(name);
  }
  fatal(){}
  error(){}
  warn(){}
  info(){}
  debug(){}
  trace(){}
}
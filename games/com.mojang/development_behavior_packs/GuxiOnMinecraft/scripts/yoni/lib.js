import * as mc from "mojang-minecraft";
const debug = false;

class Data {
  static database = {};
  static put(obj,val){
    this.database[obj] = val;
  }
  static get(obj){
    return this.database[obj];
  }
}
const world = mc.world;
const events = mc.world.events;
function dim(dimid){
  switch (dimid) {
    case -1:
    case "nether":
      return world.getDimension("nether");
      break;
    case 1:
    case "the end":
    case "the_end":
      return world.getDimension("the end");
      break;
    default:
      return world.getDimension("overworld");
  }
}
function getLoadedEntities(){
  let entities = [];
  for (let dimid of [0,-1,1]){
    for (let e of dim(dimid).getEntities()){
      entities.push(e);
    }
  }
  return entities;
}
function say(msg = "",obj){
  let cmd = "say § " + msg;
  runCmd(cmd,obj);
}
function log(msg = "",obj){
  if (!debug)
    return
  let cmd = "say § [log]" + msg;
  if (typeof obj == "undefined"){
    dim(0).runCommand(cmd);
  } else {
    try {
      obj.runCommand(cmd);
    } catch(err) {
      log(JSON.stringify(err))
    };
  }
  return;
}
function runCmd(cmd = "",obj){
  let status = true;
  if (typeof obj == "undefined"){
    try {
      dim(0).runCommand(cmd);
    } catch(err) {
      log(JSON.stringify(err))
      status = false;
    };
  } else {
    try {
      obj.runCommand(cmd);
    } catch(err) {
      log(JSON.stringify(err))
      status = false;
    };
  }
  return status;
}
function scbObjAdd(obj = "",objName = ""){
  if (obj === ''){
    throw "必须为新建记分项指定名称！\nYou must specify a name for new objectives";
  }
  runCmd(`scoreboard objectives add "${obj}" dummy "${objName}"`);
}
function scbObjRem(obj = ""){
  if (obj === ''){
    throw "必须为移除记分项指定名称！\nYou must specify a objectives to remove";
  }
  runCmd(`scoreboard objectives remove "${obj}"`);
}

export { Data, world, events, dim, getLoadedEntities, log, say, runCmd, scbObjAdd, scbObjRem };
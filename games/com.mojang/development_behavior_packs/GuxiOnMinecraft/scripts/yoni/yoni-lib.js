import * as mc from "mojang-minecraft";

const debug = true;

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

function runCmd(cmd = "",obj){
  let status;
  if (typeof obj == "undefined"){
    try {
      status = dim(0).runCommand(cmd);
    } catch(err) {
      status = err;
    };
  } else {
    try {
      obj.runCommand(cmd);
    } catch(err) {
      status = err;
    };
  }
  return status;
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
  if (typeof msg == "object")
    msg = JSON.stringify(msg).replace(/\[|\]/g, "");
  let cmd = "say § " + msg;
  runCmd(cmd,obj);
}

function log(msg,obj){
  if (!debug)
    return
  if (typeof msg == "object")
    msg = JSON.stringify(msg).replace(/\[|\]/g, "");
  let cmd = "say § [debug]" + msg;
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

function getEntityLocaleName(entity){
  let id = "";
  let name = "";
  try {
    if (entity.nameTag){
      name = entity.nameTag;
    }
    if (entity.id){
      id = entity.id;
    }
    if (id == "minecraft:player"){
      name = entity.name;
    } else if (name == ""){
      if (id.startsWith("minecraft:")){
        name = "entity."+ id.slice(10) +".name";
      } else {
        name = "entity."+ id +".name";
      }
    }
  } catch {
    return "未知生物";
  }
  return name;
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

export { getEntityLocaleName, world, events, dim, getLoadedEntities, log, say, runCmd, scbObjAdd, scbObjRem };

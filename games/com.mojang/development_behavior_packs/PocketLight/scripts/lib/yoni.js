import * as gt from "mojang-gametest";
import * as gui from "mojang-minecrart-ui";
import * as mc from "mojang-minecraft";

export { gt, gui, mc };

const world = mc.world;
const events = mc.world.events;
const scoreboard = mc.world.scoreboard;

export { world, events, scoreboard };

function dim(dimid = "overworld"){
  switch (dimid) {
    case -1:
    case "nether":
      return world.getDimension("nether");
    case 1:
    case "the end":
    case "the_end":
      return world.getDimension("the end");
    default:
      return world.getDimension("overworld");
  }
}

function runCmd(command = "", commandRunner){
  if (typeof commandRunner == "undefined"){
    try {
      return dim(0).runCommand(command);
    } catch(err) {
      return err;
    };
  } else {
    try {
      return commandRunner.runCommand(command);
    } catch(err) {
      return err;
    };
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
  let rawtext = [
    {
      translate: "chat.type.announcement",
      with: {
        rawtext: [
          { translate: "commands.origin.script" },
          { text: ""+msg }
        ]
      }
    }
  ]

  let status;
  if (typeof obj == "object"){
    try {
      status = obj.runCommand("tellraw @a " + JSON.stringify({rawtext}));
    } catch(err){
      log(err, "ERROR");
      return err;
    }
    try {
      if (typeof msg == "object")
        obj.runCommand("tellraw @a " + JSON.stringify({rawtext:[{text:JSON.stringify(msg)}]}));
    } catch(err){
      log(err, "WARN");
    }
    return status;
  } else if (!text.isNullString(obj)){
    rawtext[0].with.rawtext[0] = { text: ""+obj };
  }
  try {
    status = dim(0).runCommand("tellraw @a " + JSON.stringify({rawtext}));
    if (typeof msg == "object")
      dim(0).runCommand("tellraw @a " + JSON.stringify({rawtext:[{text:JSON.stringify(msg)}]}));
  } catch {}
  return status;
}


function tell(obj, msg = ""){
  let rawtext = [
    {
      translate: "chat.type.announcement",
      with: {
        rawtext: [
          { translate: "commands.origin.script" },
          { text: ""+msg }
        ]
      }
    }
  ]

  let status;
  if (typeof obj == "object"){
    try {
      status = obj.runCommand("tellraw @s " + JSON.stringify({rawtext}));
    } catch(err){
      log(err, "WARN");
      return err;
    }
    try {
      if (typeof msg == "object")
        obj.runCommand("tellraw @s " + JSON.stringify({rawtext:[{text:JSON.stringify(msg)}]}));
    } catch(err){
      log(err, "WARN");
    }
  } else { //如果不是实体则返回-1
    status = -1;
  }
  return -1;
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
    return "entity.unknown.name";
  }
  return name;
}

function scbObjAdd(obj = "",objName = ""){
  if (obj === ''){
    log("必须为新建记分项指定名称！\nYou must specify a name for new objectives", "ERROR");
    throw "必须为新建记分项指定名称！\nYou must specify a name for new objectives";
  }
  runCmd(`scoreboard objectives add "${obj}" dummy "${objName}"`);
}
function scbObjRem(obj = ""){
  if (obj === ''){
    log("必须为移除记分项指定名称！\nYou must specify a objectives to remove", "ERROR");
    throw "必须为移除记分项指定名称！\nYou must specify a objectives to remove";
  }
  runCmd(`scoreboard objectives remove "${obj}"`);
}

function entitiesHasAnyFamily(entity, ...families){
  let flag = false;
  for (let family of families){
    try {
      entity.runCommand("testfor @s[family="+family+"]");
    } catch {
      continue;
    }
    flag = true;
    break;
  }
  return flag;
}

function entitiesHasAllFamily(entity, ...families){
  let flag = true;
  for (let family of families){
    try {
      entity.runCommand("testfor @s[family="+family+"]");
    } catch {
      flag = false;
      break;
    }
  }
  return flag;
}

export {
  entitiesHasAnyFamily,
  entitiesHasAllFamily
};
export {
  getEntityLocaleName,
  getLoadedEntities,
  runCmd,
  say,
  tell
};
export {
  world,
  events,
  dim
};
export {
  log,
  logLevels,
  logLevel,
  defaultLogLevel
};
export {
  scbObjAdd,
  scbObjRem
};

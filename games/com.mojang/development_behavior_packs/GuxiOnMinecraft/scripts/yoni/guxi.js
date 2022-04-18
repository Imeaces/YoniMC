import * as mc from "mojang-minecraft";
var world = mc.world;
var events = mc.world.events;

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

function runCmd(cmd){
  let status = true;
  try {
    dim(0).runCommand(cmd);
  } catch {
    status = false;
  };
  return status;
}

function scbObjAdd(obj,objName){
  if (typeof obj === "undefined" || obj === ''|| obj === null){
    throw "必须为新建记分项指定名称！\nYou must specify a name for new objectives";
  }
  obj = obj.toString();
  try {
    objName = obj.toString();
  } catch (err) {/* do nothing */}
  runCmd(`scoreboard objectives add "${obj}" dummy ${objName}`);
}

function scbObjRem(obj){
  if (typeof obj === "undefined" || obj === ''|| obj === null){
    throw "必须为移除记分项指定名称！\nYou must specify a objectives to remove";
  }
  obj = obj.toString();
  runCmd(`scoreboard objectives add "${obj}" dummy ${objName}`);
}

events.beforeChat.subscribe(event => {
  if (event.message == "!suicide"){
    event.cancel = true; 
    event.sender.kill();
  }
  if (event.sender.hasTag("guxi")) {
    event.message = "咕西";
  }
  return event;
});

events.entityHurt.subscribe(event => {
  if (event.damage == 0){
    return
  }
  if (event.hurtEntity.id == "minecraft:player"){
    event.hurtEntity.runCommand(`tellraw @s  {"rawtext":[{"text":"受到${event.damage}点伤害"}]}`);
  }
});

events.tick.subscribe(eventToDoSomething => {
  let entities = [];
  let index = 0;
  for (let dimid of [0,-1,1]){
    for (let e of dim(dimid).getEntities()){
      entities[index] = e;
      index ++;
    }
  }
  
  for (let e of entities){
    if (e.hasTag("test:health")){
      scbObjAdd("HEALTH");
      let health = Math.floor(e.getComponent("minecraft:health").current);
      e.runCommand(`scoreboard players set @s HEALTH ${health}`);
    }
  }
});

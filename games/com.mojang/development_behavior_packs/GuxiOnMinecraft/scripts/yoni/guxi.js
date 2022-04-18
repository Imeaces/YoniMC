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

events.tick.subscribe(event => {
  for (let dimid of [0,-1,1]){
    for (let e of dim(dimid).getEntities()){
      if (e.hasTag("test:health")){
        try {
          dim(0).runCommand("scoreboard objectives add health dummy");
        } catch (err){
          //do nothing
        }
        let health = Math.floor(e.getComponent("minecraft:health").current);
        e.runCommand(`scoreboard players set @s health ${health}`);
      }
    }
  }
});

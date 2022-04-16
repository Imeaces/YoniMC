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


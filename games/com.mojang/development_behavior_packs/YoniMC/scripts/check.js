import * as mc from "mojang-minecraft";
var world = mc.world;
var events = mc.world.events;
var dimensions = [
  "overworld",
  "nether",
  "the end"
];

/* test code 1 
events.tick.subscribe(event => {
  for (let dim of dimensions){
    // let opt = new EntityQueryOptions();
    // opt.maxDistance = 10000000;
    let ents = world.getDimension(dim).getEntities();
    for (let e of ents){
      e.addTag("test");
    }
  }
});
*/

events.chat.subscribe(event => {
  if (event.message == "!suicide"){
    event.sender.kill();
  }
});

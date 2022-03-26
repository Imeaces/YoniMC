import * as mc from "mojang-minecraft";
var world = mc.world;
var events = mc.world.events;

events.tick.subscribe(event => {
  dimensions = [
    "overworld",
    "nether",
    "the end"
  ];
  for (dim in dimensions){
    opt = new EntityQueryOptions();
    opt.maxDistance = 10000000;
    ents = world.getDimension(dim).getEntities(opt);
    for (e in ents){
        e.addTag("test");
    }
  }
});
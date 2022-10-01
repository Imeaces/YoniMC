import * as mc from "mojang-minecraft";

const { world, Events, system } = mc;

const overworld = world.getDimension("overworld");

const say = function (text){
    overworld.runCommand("say "+text);
}

for (let s in world.events){
    say (s);
}
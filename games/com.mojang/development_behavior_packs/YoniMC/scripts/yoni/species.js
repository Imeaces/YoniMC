import { Data } from "../lib/Data.js";
import { ChatCommand } from "../lib/ChatCommand.js";
import * as yoni from "../lib/yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "../lib/yoni-lib.js";
import { Callback } from "../lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

const speciesList = [
  {
    name: minecraft_player,
    id: 42
  },
  {
    yoni_guxi: 2695
  }
]

Callback.addCallback("tick", () => {
  runCmd("scoreboard objectives add species dummy 物种");
  runCmd("scoreboard players add @a species 0");
  for (let pl of world.getPlayers()){
    if (world.getObjective("species").getScore(pl.scoreboard).score == 0){
      log("为"+pl.name+"分配物种id");
      randomSpecies(pl);
    }
  }
});

function randomSpecies(entity){
  let rand = Math.floor(Math.random()*speciesList.length);
  let species = speciesList[rand];
  runCmd("scoreboard players set @s species "+species.
}
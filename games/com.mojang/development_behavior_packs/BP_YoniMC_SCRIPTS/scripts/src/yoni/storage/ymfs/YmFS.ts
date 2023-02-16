import { Minecraft } from "yoni/basis.js";
import Location from "yoni/Location.js";
import YoniScheduler from "yoni/schedule.js";
import Scoreboard, { Objective } from "../../scoreboard.js";

class YMFS {
  dataObjective: Objective = Scoreboard.getObjective("fs:data") ?? Scoreboard.addObjective("fs:data");
  async loop() {
    
  }
  init() {
    if (this.#inited) return;

    let isinited = this.dataObjective.getScore("inited");
    if (isinited === undefined || isinited === 0) {
      this.#doinit();
      this.#inited = true;
    }
  }
  #inited = false;
  #areasize = new Minecraft.BlockAreaSize(16, 16, 16);
  #workLocation: Minecraft.Vector3 | null = null;
  #doinit() {
    this.#workLocation = new Location(565288, 0, 565288);
  }
  static #instance: YMFS;
  static get instance() {
    if (!YMFS.#instance)
      YMFS.#instance = new YMFS();
    return YMFS.#instance;
  }
}

YoniScheduler.runCycleTickTask(
  YMFS.instance.loop.bind(YMFS.instance),
  1,
  1,
  true
);

YMFS.instance.init();

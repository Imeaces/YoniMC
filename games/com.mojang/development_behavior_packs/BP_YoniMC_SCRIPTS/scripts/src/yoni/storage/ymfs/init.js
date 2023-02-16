import Scoreboard from "../scoreboard.js";
import Command from "../command.js";
import { fsBlockArea } from "./config.js";

const promise = (async function (){
    let x1, x2, y1, y2, z1, z2;
    let { dimension, name } = fsBlockArea;
    
    x1 = fsBlockArea.begin.x;
    y1 = fsBlockArea.begin.y;
    z1 = fsBlockArea.begin.z;
    x2 = fsBlockArea.end.x;
    y2 = fsBlockArea.end.y;
    z2 = fsBlockArea.end.z;
    
    await Promise.all([
        Command.addExecuteParams(Command.PRIORITY_HIGHEST, dimension, "tickingarea remove", name),
        Command.addExecuteParams(Command.PRIORITY_HIGHEST, dimension, "tickingarea add", x1, y1, z1, x2, y2, z2, name)
    ]);
    
})();

export default promise;
export { promise };

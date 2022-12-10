import { Logger, log } from "yoni/util/Logger.js";
import { load } from "yoni/loader.js";

const loadList = [
    //"test.js",
    "yonimc/main.js"
];
let logger = new Logger("MAIN");

load(loadList)
.finally(()=>logger.info("scripts main end"));

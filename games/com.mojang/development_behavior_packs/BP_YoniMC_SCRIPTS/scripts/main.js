import { Logger } from "yoni-mcscripts-lib";
let logger = new Logger("MAIN");
const loadList = [
    "./test.js",
    "./test/wait_debug.js",
    "./yonimc/main.js",
];
Promise.allSettled(loadList
    .map(path => import(path))
    .map(pro => pro.catch(logger.error)))
    .finally(() => logger.info("scripts MAIN end"));

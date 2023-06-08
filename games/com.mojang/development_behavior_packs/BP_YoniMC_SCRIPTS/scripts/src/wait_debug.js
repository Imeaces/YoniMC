import { EventListener, Logger, Location, EntityBase } from "yoni-mcscripts-lib";

const logger = new Logger("WaitDebug");

EventListener.register("minecraft:entityHurt", (event) => {
    if (event.cause !== "charging")
        return;
    
    logger.fatal("§l§4出现了！！！charging伤害出现了！！！");
    
    let hurtEntity = EntityBase.from(hurtEntity);
    
    logger.fatal(hurtEntity.location.toString());
    
});
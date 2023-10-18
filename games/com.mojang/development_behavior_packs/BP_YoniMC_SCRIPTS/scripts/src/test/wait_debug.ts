import { listenEvent, Minecraft, Logger, Location, EntityBase } from "yoni-mcscripts-lib";

const logger = new Logger("WaitDebug");

listenEvent(Minecraft.EntityHurtAfterEvent, 
function onHurt(event){
    if (event.damageSource.cause !== "charging")
        return;
    
    logger.fatal("§l§4出现了！！！charging伤害出现了！！！");
    
    let hurtEntity = EntityBase.getYoniEntity(event.hurtEntity);
    
    logger.fatal(hurtEntity.location.toString());
    
});
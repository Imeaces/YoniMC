import "yoni-mcscripts-lib";
import { VanillaEvents, Minecraft } from "yoni-mcscripts-lib";
import { say } from "yoni-mcscripts-lib";
import { log } from "yoni-mcscripts-lib";

VanillaEvents.worldInitialize.subscribe((event)=>{
    const { propertyRegistry } = event;
    const props = new Minecraft.DynamicPropertiesDefinition();
    props.defineString("yoni:test_1", 9984);
    propertyRegistry.registerWorldDynamicProperties(props);
    const props1 = new Minecraft.DynamicPropertiesDefinition();
    props1.defineString("yoni:test_1", 984);
    //props.defineBoolean("yoni:test_prop");
    //props.defineNumber("yoni:test_prop");
    
    //world str: 10000 ((id编码为utf8之后的byteLength) + 2 + stringByteLength <= 10000)
    //entity str: 1000 ((id编码为utf8之后的byteLength) + 2 + stringByteLength <= 1000)
    propertyRegistry.registerEntityTypeDynamicProperties(props1,
        Minecraft.MinecraftEntityTypes.player);
    
   // log("测试完了");
});

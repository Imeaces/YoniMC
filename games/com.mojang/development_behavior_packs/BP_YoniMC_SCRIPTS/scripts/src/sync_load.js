import "./yoni/util/WatchBird.js";
import { VanillaEvents, Minecraft } from "./yoni/basis.js";
import { say } from "./yoni/util/utils.js";
import { log } from "./yoni/util/Logger.js";

VanillaEvents.worldInitialize.subscribe((event)=>{
    const { propertyRegistry } = event;
    const props = new Minecraft.DynamicPropertiesDefinition();
    props.defineString("yoni:test_🐋", 9984);
    const props1 = new Minecraft.DynamicPropertiesDefinition();
    props1.defineString("yoni:test_🐋", 984);
    //props.defineBoolean("yoni:test_prop");
    //props.defineNumber("yoni:test_prop");
    
    //world str: 10000 ((id编码为utf8之后的byteLength) + 2 + stringByteLength <= 10000)
    propertyRegistry.registerWorldDynamicProperties(props);
    //entity str: 1000 ((id编码为utf8之后的byteLength) + 2 + stringByteLength <= 1000)
    propertyRegistry.registerEntityTypeDynamicProperties(props1,
        Minecraft.MinecraftEntityTypes.player);
});

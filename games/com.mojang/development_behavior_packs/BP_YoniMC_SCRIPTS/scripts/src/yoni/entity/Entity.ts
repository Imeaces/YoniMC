import { Minecraft } from "../basis.js";
import { Location, Location1Arg, DimensionLike, Vector3 } from "../Location.js";
import { Dimension } from "../dimension.js";
import { Block, YoniBlock } from "../block.js";
import { Command } from "../command.js";
import { Entry } from "../scoreboard/Entry.js";
import { copyPropertiesWithoutOverride } from "../lib/ObjectUtils.js";

import { EntityBase } from "./EntityBase.js";
import { EntityClassRegistry } from "./EntityClassRegistry.js";

const { EntityTypes } = Minecraft;

/**
 * 代表一个实体
 */
class Entity extends EntityBase {
    
    get [Symbol.toStringTag](){
        if (this instanceof Entity)
            return `Entity: { type: ${this.typeId} }`;
        return "Object (Entity)";
    }
    
    get id() {
        return this.vanillaEntity.id;
    }

    get typeId() {
        return this.vanillaEntity.typeId;
    }

    get velocity() {
        return this.getVelocity();
    }
    
    get rotation(){
        return this.vanillaEntity.getRotation();
    }
    
    get entityType() {
        return EntityTypes.get(this.typeId);
    }
    
    get dimension() {
        return Dimension.dim(this.vanillaEntity.dimension);
    }

    get location() : Location {
        let rotation: Minecraft.XYRotation = this.vanillaEntity.getRotation();
        let { dimension, location } = this.vanillaEntity;
        return new Location({dimension, location, rotation});
    }
    
    //这东西其实也可以说是历史遗留问题
    //本来想自己给实体弄个唯一id的，然后……官方加了
    get uniqueId(){
        return this.id;
    }
    
    get scoreboard(): Entry {
        return Entry.findEntry({entity: this});
    }
    
    isAliveEntity(){
        return EntityBase.isAliveEntity(this);
    }
    
    isAlive(){
        return EntityBase.isAlive(this);
    }
    
    /**
     * 获取实体的当前血量。
     */
    getCurrentHealth(){
        return EntityBase.getCurrentHealth(this);
    }
    
    /**
     * 获取实体的血量组件。
     */
    getHealthComponent(){
        return EntityBase.getHealthComponent(this);
    }
    
    /**
     * 获取实体的物品栏容器。
     */
    getInventory(){
        return EntityBase.getInventory(this);
    }
    
    /**
     * 获取实体的最大血量。
     */
    getMaxHealth(){
        return EntityBase.getMaxHealth(this);
    }
    
    /**
     * 检测实体是否为某一族。
     * @abc
     * @param {string} family
     */
    hasFamily(family: string){
        return EntityBase.hasAnyFamily(this, family);
    }
    /**
     * 检测实体是否有指定的多个族中的一个。
     * @param {...string} families 
     * @returns {boolean}
     */
    hasAnyFamily(...families: string[]){
        return EntityBase.hasAnyFamily(this, ...families);
    }
    
    /**
     * 请求以此实体的上下文执行命令。
     * @param {string} cmd 
     * @returns {Promise<Minecraft.CommandResult>}
     */
    fetchCommand(cmd: string){
        return Command.fetchExecute(this, cmd);
    }
    
    /**
     * @param {string} message
     */
    say(message: string){
        let command = "say " + message;
        return Command.fetchExecute(this, command);
    }
    
    /**
     * @param {number} v
     */
    setCurrentHealth(v: number){
        return EntityBase.setCurrentHealth(this, v);
    }
    
    /**
     * 传入位置，将实体传送到指定位置
     * 允许两种长度的参数，由于此特性，补全提示可能会出现一些错误，已在补全中尝试修复。
     * 当传入了1个参数，被认为是yoni的方法  
     * 当传入了2个参数，被认为是yoni的方法  
     * 当传入了4个参数，被认为是原版的方法   
     * 当传入了5个参数，被认为是原版的方法  
     * yoni方法中，第一个参数认为是位置，第二个参数认为是keepVelocity
     * 原版方法中参数顺序为[location, dimension, rx, ry, keepVelocity?=null]
     * 所以你可以直接传入实体对象、方块对象、或者普通位置对象，或者接口
     * @param {import("./Location.js").Location1Arg|Minecraft.Vector3} argLocation
     * @param {Minecraft.Dimension} [argDimension]
     * @param {number} [argRx]
     * @param {number} [argRy]
     * @param {boolean} [keepVelocity]
     */
    //@ts-ignore
    teleport(...args:
        [Location1Arg]
        | [Location1Arg, boolean]
        | [Vector3, DimensionLike, number, number]
        | [Vector3, DimensionLike, number, number, boolean]
    ){
        
        let destinateLocation;
        let keepVelocity: any;
        if (args.length > 2){
            //@ts-ignore
            destinateLocation = new Location(args[1], args[0], args[2], args[3]);
            keepVelocity = args[4];
        } else {
            destinateLocation = new Location(args[0]);
            
            keepVelocity = args[1];
        }
        
        let { rx, ry } = destinateLocation;
        let dimension = destinateLocation.dimension.vanillaDimension;
        this.vanillaEntity.teleport(
            destinateLocation.getVanillaLocation(),
            //@ts-ignore
            dimension,
            rx, ry, !!keepVelocity);
        
    }
    
    /*
    以下类型注释复制自 https://github.com/XeroAlpha/sapi-typedoc 的d.ts文件
    */
    /**
     * @beta
     * Given name of the entity.
     */
    get nameTag(){
        return this.vanillaEntity.nameTag;
    }
    set nameTag(name){
        this.vanillaEntity.nameTag = name;
    }
    /**
     * @beta
     * Retrieves or sets an entity that is used as the target of
     * AI-related behaviors, like attacking.
     * @throws This property can throw when used.
     */
    get target(){
        return EntityBase.from(this.vanillaEntity.target) as unknown as Entity;
    }
    /**
     * @beta
     * @remarks
     * Adds an effect, like poison, to the entity.
     * @param effectType
     * Type of effect to add to the entity.
     * @param duration
     * Amount of time, in ticks, for the effect to apply.
     * @param amplifier
     * Optional amplification of the effect to apply.
     * @param showParticles
     * @throws This function can throw errors.
     * @example addEffect.js
     * ```typescript
     *        const villagerId = "minecraft:villager_v2<minecraft:ageable_grow_up>";
     *        const villagerLoc: mc.Vector3 = { x: 1, y: 2, z: 1 };
     *        const villager = test.spawn(villagerId, villagerLoc);
     *        const duration = 20;
     *
     *        villager.addEffect(MinecraftEffectTypes.poison, duration, 1);
     *
     *
     * ```
     * @example quickFoxLazyDog.ts
     * ```typescript
     *        const fox = overworld.spawnEntity("minecraft:fox", {
     *          x: targetLocation.x + 1,
     *          y: targetLocation.y + 2,
     *          z: targetLocation.z + 3,
     *        });
     *        fox.addEffect(mc.MinecraftEffectTypes.speed, 10, 20);
     *        log("Created a fox.");
     *
     *        const wolf = overworld.spawnEntity("minecraft:wolf", {
     *          x: targetLocation.x + 4,
     *          y: targetLocation.y + 2,
     *          z: targetLocation.z + 3,
     *        });
     *        wolf.addEffect(mc.MinecraftEffectTypes.slowness, 10, 20);
     *        wolf.isSneaking = true;
     *        log("Created a sneaking wolf.", 1);
     *
     *
     * ```
     */
    addEffect(effectType: Minecraft.EffectType, duration: number, amplifier?: number, showParticles?: boolean): void {
        //@ts-ignore
        return this.vanillaEntity.addEffect.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Adds a specified tag to an entity.
     * @param tag
     * Content of the tag to add.
     * @throws This function can throw errors.
     */
    addTag(tag: string): boolean {
        //@ts-ignore
        return this.vanillaEntity.addTag.apply(this.vanillaEntity, arguments);
    }
    applyDamage(amount: number, source?: Minecraft.EntityDamageSource): boolean {
        //@ts-ignore
        return this.vanillaEntity.applyDamage.apply(this.vanillaEntity, arguments);
    }
    applyImpulse(vector: Vector3): void {
        //@ts-ignore
        return this.vanillaEntity.applyImpulse.apply(this.vanillaEntity, arguments);
    }
    applyKnockback(directionX: number, directionZ: number, horizontalStrength: number, verticalStrength: number): void {
        //@ts-ignore
        return this.vanillaEntity.applyKnockback.apply(this.vanillaEntity, arguments);
    }
    clearVelocity(): void {
        //@ts-ignore
        return this.vanillaEntity.clearVelocity.apply(this.vanillaEntity, arguments);
    }
    extinguishFire(useEffects?: boolean): boolean {
        //@ts-ignore
        return this.vanillaEntity.extinguishFire.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Returns the first intersecting block from the direction that
     * this entity is looking at.
     * @param options
     * @throws This function can throw errors.
     */
    getBlockFromViewDirection(options?: Minecraft.BlockRaycastOptions): Block {
        //@ts-ignore
        return new Block(this.vanillaEntity.getBlockFromViewDirection.apply(this.vanillaEntity, arguments));
    }
    /**
     * @beta
     * @remarks
     * Gets a component (that represents additional capabilities)
     * for an entity.
     * @param componentId
     * The identifier of the component (e.g., 'minecraft:rideable')
     * to retrieve. If no namespace prefix is specified,
     * 'minecraft:' is assumed. If the component is not present on
     * the entity, undefined is returned.
     */
    getComponent(componentId: string): Minecraft.IEntityComponent {
        //@ts-ignore
        return this.vanillaEntity.getComponent.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Returns all components that are both present on this entity
     * and supported by the API.
     */
    getComponents(): Minecraft.IEntityComponent[] {
        //@ts-ignore
        return this.vanillaEntity.getComponents.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Returns a property value.
     * @param identifier
     * @returns
     * Returns the value for the property, or undefined if the
     * property has not been set.
     * @throws This function can throw errors.
     */
    getDynamicProperty(identifier: string): boolean | number | string | undefined {
        //@ts-ignore
        return this.vanillaEntity.getDynamicProperty.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Returns the effect for the specified EffectType on the
     * entity, or undefined if the effect is not present.
     * @param effectType
     * @returns
     * Effect object for the specified effect, or undefined if the
     * effect is not present.
     * @throws This function can throw errors.
     */
    getEffect(effectType: Minecraft.EffectType): Minecraft.Effect {
        //@ts-ignore
        return this.vanillaEntity.getEffect.apply(this.vanillaEntity, arguments);
    }
    getEffects(): Minecraft.Effect[] {
        //@ts-ignore
        return this.vanillaEntity.getEffects.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Returns a potential set of entities from the direction that
     * this entity is looking at.
     * @param options
     * @throws This function can throw errors.
     */
    getEntitiesFromViewDirection(options?: Minecraft.EntityRaycastOptions): Entity[] {
        //@ts-ignore
        return this.vanillaEntity.getEntitiesFromViewDirection.apply(this.vanillaEntity, arguments);
    }
    getHeadLocation(): Vector3 {
        //@ts-ignore
        return this.vanillaEntity.getHeadLocation.apply(this.vanillaEntity, arguments);
    }
    getRotation(): Minecraft.XYRotation {
        //@ts-ignore
        return this.vanillaEntity.getRotation.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Returns all tags associated with an entity.
     * @throws This function can throw errors.
     */
    getTags(): string[] {
        //@ts-ignore
        return this.vanillaEntity.getTags.apply(this.vanillaEntity, arguments);
    }
    getVelocity(): Vector3 {
        //@ts-ignore
        return this.vanillaEntity.getVelocity.apply(this.vanillaEntity, arguments);
    }
    getViewDirection(): Vector3 {
        //@ts-ignore
        return this.vanillaEntity.getViewDirection.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Returns true if the specified component is present on this
     * entity.
     * @param componentId
     * The identifier of the component (e.g., 'minecraft:rideable')
     * to retrieve. If no namespace prefix is specified,
     * 'minecraft:' is assumed.
     */
    hasComponent(componentId: string): boolean {
        //@ts-ignore
        return this.vanillaEntity.hasComponent.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Tests whether an entity has a particular tag.
     * @param tag
     * Identifier of the tag to test for.
     * @throws This function can throw errors.
     */
    hasTag(tag: string): boolean {
        //@ts-ignore
        return this.vanillaEntity.hasTag.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Kills this entity. The entity will drop loot as normal.
     * @throws This function can throw errors.
     */
    kill(): void {
        //@ts-ignore
        return this.vanillaEntity.kill.apply(this.vanillaEntity, arguments);
    }
    playAnimation(animationName: string, options?: Minecraft.PlayAnimationOptions): void {
        //@ts-ignore
        return this.vanillaEntity.playAnimation.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Removes a specified property.
     * @param identifier
     * @throws This function can throw errors.
     */
    removeDynamicProperty(identifier: string): boolean {
        //@ts-ignore
        return this.vanillaEntity.removeDynamicProperty.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Removes a specified tag from an entity.
     * @param tag
     * Content of the tag to remove.
     * @throws This function can throw errors.
     */
    removeTag(tag: string): boolean {
        //@ts-ignore
        return this.vanillaEntity.removeTag.apply(this.vanillaEntity, arguments);
    }
    /**
     * @remarks
     * Runs a particular command asynchronously from the context of
     * this entity. Note that there is a maximum queue of 128
     * asynchronous commands that can be run in a given tick.
     * @param commandString
     * Command to run. Note that command strings should not start
     * with slash.
     * @returns
     * For commands that return data, returns a JSON structure with
     * command response values.
     * @throws This function can throw errors.
     */
    runCommandAsync(commandString: string): Promise<Minecraft.CommandResult> {
        //@ts-ignore
        return this.vanillaEntity.runCommandAsync.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Sets a specified property to a value.
     * @param identifier
     * @param value
     * Data value of the property to set.
     * @throws This function can throw errors.
     */
    setDynamicProperty(identifier: string, value: boolean | number | string): void {
        //@ts-ignore
        return this.vanillaEntity.setDynamicProperty.apply(this.vanillaEntity, arguments);
    }
    setOnFire(seconds: number, useEffects?: boolean): boolean {
        //@ts-ignore
        return this.vanillaEntity.setOnFire.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Sets the main rotation of the entity.
     * @param degreesX
     * @param degreesY
     * @throws This function can throw errors.
     */
    setRotation(degreesX: number, degreesY: number): void {
        //@ts-ignore
        return this.vanillaEntity.setRotation.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Teleports the selected entity to a new location, and will
     * have the entity facing a specified location.
     * @param location
     * New location for the entity.
     * @param dimension
     * Dimension to move the selected entity to.
     * @param facingLocation
     * Location that this entity will be facing.
     * @param keepVelocity
     * @throws This function can throw errors.
     */
    teleportFacing(location: Vector3, dimension: Minecraft.Dimension, facingLocation: Vector3, keepVelocity?: boolean): void {
        //@ts-ignore
        return this.vanillaEntity.teleportFacing.apply(this.vanillaEntity, arguments);
    }
    /**
     * @beta
     * @remarks
     * Triggers an entity type event. For every entity, a number of
     * events are defined in an entities' definition for key entity
     * behaviors; for example, creepers have a
     * minecraft:start_exploding type event.
     * @param eventName
     * Name of the entity type event to trigger. If a namespace is
     * not specified, minecraft: is assumed.
     * @throws This function can throw errors.
     */
    triggerEvent(eventName: string): void {
        //@ts-ignore
        return this.vanillaEntity.triggerEvent.apply(this.vanillaEntity, arguments);
    }
}

/* 修补 */
//copyPropertiesWithoutOverride(Entity.prototype, Minecraft.Entity.prototype, "vanillaEntity");
/*修复结束*/

EntityClassRegistry.register(Entity, Minecraft.Entity);

export default Entity;
export { Entity as YoniEntity, Entity };

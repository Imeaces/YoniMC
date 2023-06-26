import { VanillaWorld, Minecraft } from "./basis.js";

import {
    Location,
    Location1Arg,
    DimensionLike,
    Vector3 } from "./Location.js";

import { Block } from "./block.js";
import { EntityBase } from "./entity/EntityBase.js";
import { Command } from "./command.js";

import { DimensionValues } from "./dim.js";

import { Entity } from "./entity/Entity.js";
import { Player } from "./entity/Player.js";
import { debug } from "./config.js";

class Dimension {
    static #dimMap = new WeakMap();
    
    static dim(dimid: DimensionLike): Dimension {
        let dim: Minecraft.Dimension | null = null;
        if (typeof dimid === "string" || typeof dimid === "number"){
            dim = DimensionValues[dimid];
            if (dim == null){
                try {
                    // @ts-ignore
                    dim = VanillaWorld.getDimension(dimid);
                } catch (e){
                    // @ts-ignore
                    throw new Error(e);
                }
            }
        } else if (dimid instanceof Dimension){
            return dimid;
        } else if (dimid instanceof Minecraft.Dimension){
            dim = dimid;
        }
        
        if (dim == null){
            throw new Error("specific identifier doesn't refer to a dimension");
        }
        let dimV = Dimension.#dimMap.get(dim);
        if (dimV === undefined){
            dimV = new Dimension(dim);
            Dimension.#dimMap.set(dim, dimV);
        }
        return dimV;
    }

    static isDimension(object: any): object is (Minecraft.Dimension | Dimension){
        return object instanceof Minecraft.Dimension || object instanceof Dimension;
    }
    
    // @ts-ignore
    readonly vanillaDimension: Minecraft.Dimension;
    /**
     * Identifier of the dimension.
     * @throws This property can throw when used.
     */
    // @ts-ignore
    readonly id: string;
    
    /**
     * @hideconstructor
     * @param {Minecraft.Dimension}
     */
    constructor(vanillaDimension: Minecraft.Dimension){
        Object.defineProperty(this, "vanillaDimension", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: vanillaDimension
        });
        Object.defineProperty(this, "id", {
            configurable: true,
            enumerable: false,
            get(){
                return this.vanillaDimension.id;
            },
            set(v: any){
                // @ts-ignore
                this.vanillaDimension.id = v;
            }
        });
    }
    /**
     * @beta
     * @remarks
     * Returns a block instance at the given location. This method
     * was introduced as of version 1.17.10.21.
     * @param location
     * The location at which to return a block.
     * @returns
     * Block at the specified location.
     * @throws This function can throw errors.
     */
    getBlock(location: Location1Arg): Block {
        let loc: Location;
        if (location instanceof Location){
            loc = location;
        } else {
            loc = new Location(location);
        }
        let vanillaBlock = this.vanillaDimension.getBlock(loc.getVanillaBlockLocation());
        if (vanillaBlock)
            return Block.from(vanillaBlock);
        else if (debug)
            throw new Error("This location has not been loaded\n"+loc.toString());
        else
            throw new Error("This location has not been loaded");
    }
    /**
     * @beta
     * @remarks
     * Creates an explosion at the specified location.
     * @param location
     * The location of the explosion.
     * @param radius
     * Radius, in blocks, of the explosion to create.
     * @param explosionOptions
     * Additional configurable options for the explosion.
     * @throws This function can throw errors.
     * @example createExplosion.ts
     * ```typescript
     *          overworld.createExplosion(targetLocation, 10, new mc.ExplosionOptions());
     * ```
     * @example createFireAndWaterExplosions.ts
     * ```typescript
     *        const explosionLoc: mc.Vector3 = { x: targetLocation.x + 0.5, y: targetLocation.y + 0.5, z: targetLocation.z + 0.5 };
     *
     *        const fireExplosionOptions = new mc.ExplosionOptions();
     *
     *        // Explode with fire
     *        fireExplosionOptions.causesFire = true;
     *
     *        overworld.createExplosion(explosionLoc, 15, fireExplosionOptions);
     *        const waterExplosionOptions = new mc.ExplosionOptions();
     *
     *        // Explode in water
     *        waterExplosionOptions.allowUnderwater = true;
     *
     *        const belowWaterLoc: mc.Vector3 = { x: targetLocation.x + 3, y: targetLocation.y + 1, z: targetLocation.z + 3 };
     *
     *        overworld.createExplosion(belowWaterLoc, 10, waterExplosionOptions);
     *
     * ```
     * @example createNoBlockExplosion.ts
     * ```typescript
     *        const explosionOptions = new mc.ExplosionOptions();
     *
     *        // Start by exploding without breaking blocks
     *        explosionOptions.breaksBlocks = false;
     *
     *        const explodeNoBlocksLoc: mc.Vector3 = {
     *          x: Math.floor(targetLocation.x + 1),
     *          y: Math.floor(targetLocation.y + 2),
     *          z: Math.floor(targetLocation.z + 1),
     *        };
     *
     *        overworld.createExplosion(explodeNoBlocksLoc, 15, explosionOptions);
     *
     * ```
     */
    createExplosion(location: Vector3, radius: number, explosionOptions?: Minecraft.ExplosionOptions): void {
        //@ts-ignore
        return this.vanillaDimension.createExplosion.apply(this.vanillaDimension, arguments);
    }
    fillBlocks(begin: Vector3, end: Vector3, block: Minecraft.BlockPermutation | Minecraft.BlockType, options?: Minecraft.BlockFillOptions): number {
        //@ts-ignore
        return this.vanillaDimension.fillBlocks.apply(this.vanillaDimension, arguments);
    }
    /**
     * @beta
     * @remarks
     * Gets the first block that intersects with a vector emanating
     * from a location.
     * @param location
     * @param direction
     * @param options
     * Additional options for processing this raycast query.
     * @throws This function can throw errors.
     */
    getBlockFromRay(location: Vector3, direction: Vector3, options?: Minecraft.BlockRaycastOptions): Block {
        //@ts-ignore
        return Block.from(this.vanillaDimension.getBlockFromRay.apply(this.vanillaDimension, arguments));
    }
    /**
     * @beta
     * @remarks
     * Returns a set of entities based on a set of conditions
     * defined via the EntityQueryOptions set of filter criteria.
     * @param getEntities
     * @returns
     * An entity array.
     * @throws This function can throw errors.
     * @example testThatEntityIsFeatherItem.ts
     * ```typescript
     *        const query = {
     *          type: "item",
     *          location: targetLocation,
     *        };
     *        const items = overworld.getEntities(query);
     *
     *        for (const item of items) {
     *          const itemComp = item.getComponent("item") as any;
     *
     *          if (itemComp) {
     *            if (itemComp.itemStack.id.endsWith("feather")) {
     *              console.log("Success! Found a feather", 1);
     *            }
     *          }
     *        }
     *
     * ```
     */
    * getEntities<Entity>(getEntities?: Minecraft.EntityQueryOptions) {
        //@ts-ignore
        for (let ent of this.vanillaDimension.getEntities.apply(this.vanillaDimension, arguments)){
            yield EntityBase.from(ent);
        }
    }
    /**
     * @beta
     * @remarks
     * Returns a set of entities at a particular location.
     * @param location
     * The location at which to return entities.
     * @returns
     * Zero or more entities at the specified location.
     */
    getEntitiesAtBlockLocation(location: Vector3): Entity[] {
        //@ts-ignore
        return this.vanillaDimension.getEntitiesAtBlockLocation.apply(this.vanillaDimension, arguments).map(EntityBase.from);
    }
    /**
     * @beta
     * @remarks
     * Gets entities that intersect with a specified vector
     * emanating from a location.
     * @param location
     * @param direction
     * @param options
     * Additional options for processing this raycast query.
     * @throws This function can throw errors.
     */
    getEntitiesFromRay(location: Vector3, direction: Vector3, options?: Minecraft.EntityRaycastOptions): Entity[] {
        //@ts-ignore
        return this.vanillaDimension.getEntitiesFromRay.apply(this.vanillaDimension, arguments).map(EntityBase.from);
    }
    /**
     * @beta
     * @remarks
     * Returns a set of players based on a set of conditions
     * defined via the EntityQueryOptions set of filter criteria.
     * @param getPlayers
     * @returns
     * A player array.
     * @throws This function can throw errors.
     */
    * getPlayers<Player>(getPlayers?: Minecraft.EntityQueryOptions) {
        //@ts-ignore
        for (let pl of this.vanillaDimension.getPlayers.apply(this.vanillaDimension, arguments)){
            yield EntityBase.from(pl);
        }
    }
    /**
     * @remarks
     * Runs a particular command asynchronously from the context of
     * the broader dimension.  Note that there is a maximum queue
     * of 128 asynchronous commands that can be run in a given
     * tick.
     * @param commandString
     * Command to run. Note that command strings should not start
     * with slash.
     * @returns
     * For commands that return data, returns a CommandResult with
     * an indicator of command results.
     * @throws This function can throw errors.
     */
    runCommandAsync(commandString: string): Promise<Minecraft.CommandResult> {
        //@ts-ignore
        return this.vanillaDimension.runCommandAsync.apply(this.vanillaDimension, arguments);
    }
    fetchCommand(commandString: string){
        return Command.fetchExecute(this, commandString);
    }
    /**
     * @beta
     * @remarks
     * Creates a new entity (e.g., a mob) at the specified
     * location.
     * @param identifier
     * Identifier of the type of entity to spawn. If no namespace
     * is specified, 'minecraft:' is assumed.
     * @param location
     * The location at which to create the entity.
     * @returns
     * Newly created entity at the specified location.
     * @throws This function can throw errors.
     * @example createOldHorse.ts
     * ```typescript
     *          // create a horse and trigger the 'ageable_grow_up' event, ensuring the horse is created as an adult
     *          overworld.spawnEntity("minecraft:horse<minecraft:ageable_grow_up>", targetLocation);
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
     * ```
     * @example trapTick.ts
     * ```typescript
     *          let ticks = 0;
     *
     *          mc.world.events.tick.subscribe((event: mc.TickEvent) => {
     *            ticks++;
     *
     *            // Minecraft runs at 20 ticks per second
     *            if (ticks % 1200 === 0) {
     *              overworld.runCommand("say Another minute passes...");
     *            }
     *          });
     * ```
     */
    spawnEntity(identifier: string, location: Vector3): Entity {
        //@ts-ignore
        return EntityBase.from(this.vanillaDimension.spawnEntity.apply(this.vanillaDimension, arguments));
    }
    /**
     * @beta
     * @remarks
     * Creates a new item stack as an entity at the specified
     * location.
     * @param item
     * @param location
     * The location at which to create the item stack.
     * @returns
     * Newly created item stack entity at the specified location.
     * @throws This function can throw errors.
     * @example itemStacks.ts
     * ```typescript
     *        const oneItemLoc: mc.Vector3 = { x: 3, y: 2, z: 1 };
     *        const fiveItemsLoc: mc.Vector3 = { x: 1, y: 2, z: 1 };
     *        const diamondPickaxeLoc: mc.Vector3 = { x: 2, y: 2, z: 4 };
     *
     *        const oneEmerald = new mc.ItemStack(mc.MinecraftItemTypes.emerald, 1, 0);
     *        const onePickaxe = new mc.ItemStack(mc.MinecraftItemTypes.diamondPickaxe, 1, 0);
     *        const fiveEmeralds = new mc.ItemStack(mc.MinecraftItemTypes.emerald, 5, 0);
     *
     *        overworld.spawnItem(oneEmerald, oneItemLoc);
     *        overworld.spawnItem(fiveEmeralds, fiveItemsLoc);
     *        overworld.spawnItem(onePickaxe, diamondPickaxeLoc);
     *
     * ```
     * @example spawnItem.ts
     * ```typescript
     *          const featherItem = new mc.ItemStack(mc.MinecraftItemTypes.feather, 1, 0);
     *
     *          overworld.spawnItem(featherItem, targetLocation);
     *          log("New feather created!");
     * ```
     */
    spawnItem(item: Minecraft.ItemStack, location: Vector3): Entity {
        //@ts-ignore
        return EntityBase.getYoniEntity(this.vanillaDimension.spawnItem.apply(this.vanillaDimension, arguments));
    }
    /**
     * @beta
     * @remarks
     * Creates a new particle emitter at a specified location in
     * the world.
     * @param effectName
     * Identifier of the particle to create.
     * @param location
     * The location at which to create the particle emitter.
     * @param molangVariables
     * A set of additional, customizable variables that can be
     * adjusted for this particle emitter.
     * @returns
     * Newly created entity at the specified location.
     */
    spawnParticle(effectName: string, location: Vector3, molangVariables: Minecraft.MolangVariableMap): void {
        //@ts-ignore
        return this.vanillaDimension.spawnParticle.apply(this.vanillaDimension, arguments);
    }
}

export { Dimension, Dimension as YoniDimension };
export default Dimension;

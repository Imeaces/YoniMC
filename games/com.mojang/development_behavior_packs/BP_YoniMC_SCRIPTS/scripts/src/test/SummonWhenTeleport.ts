import { Entity, Player, Vector, world, system, Vector3, Dimension } from "@minecraft/server";

function isMoving(entity: Entity){
    const velocity = entity.getVelocity();
    const { x, y, z } = velocity;
    return Math.sqrt(x**2 + y**2 + z**2) !== 0;
}

const positionRecord = new WeakMap<Entity, LocationObject>();
function isPositionChangedSinceLast(entity: Entity){
    const curPosition = getLocation(entity);
    const lastPosition = positionRecord.get(entity);
    positionRecord.set(entity, curPosition);
    
    if (! lastPosition){
        return false;
    }
    
    const { dimension: dim0, x: x0, y: y0, z: z0 } = lastPosition;
    const { dimension: dim1, x: x1, y: y1, z: z1 } = curPosition;
    
    if (dim0 !== dim1 || x0 !== x1 || y0 !== y1 || z0 !== z1)
        return true;
    
    return false;
}

type LocationObject = {
    x: number, y: number, z: number,
    rx: number, ry: number,
    dimension: Dimension,
}

function getLocation(entity: Entity): LocationObject {
    const location = entity.location;
    const dimension = entity.dimension;
    const rotation = entity.getRotation();
    
    const { x, y, z } = location;
    const { x: rx, y: ry } = rotation;
    
    return {
        x, y, z,
        rx, ry,
        dimension,
    };
}

system.run(function ticking(){
    system.run(ticking);
    
    const hasBeenTeleportedPlayers: Player[] = [];
    world.getAllPlayers().forEach(player => {
        if (isMoving(player))
            return;
        
        if (!isPositionChangedSinceLast(player))
            return;
        
        hasBeenTeleportedPlayers.push(player);
    });
    
    hasBeenTeleportedPlayers.forEach(summonMobAround);
});

function summonMobAround(player: Player){
}

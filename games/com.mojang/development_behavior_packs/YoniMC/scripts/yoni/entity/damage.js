
export const DamageSourceInterface = {
  none: -1,
  override: 0,
  contact: 1,
  attack: 2,
  projectile: 3,
  suffocation: 4,
  fall: 5,
  fire: 6,
  fire_tick: 7,
  lava: 8,
  drowning: 9,
  block_explosion: 10,
  entity_explosion: 11,
  void: 12,
  suicide: 13,
  magic: 14,
  wither: 15,
  starve: 16,
  anvil: 17,
  thorns: 18,
  falling_block: 19,
  piston: 20,
  fly_into_wall: 21,
  magma: 22,
  fireworks: 23,
  lightning: 24,
  charging: 25,
  temperature: 26,
  freezing: 27,
  stalactite: 28,
  stalagmite: 29,
  all: 31
}

export const DamageSource = {
  none: -1,
  override: 0,
  contact: 1,
  entity_attack: 2,
  projectile: 3,
  suffocation: 4,
  fall: 5,
  fire: 6,
  fire_tick: 7,
  lava: 8,
  drowning: 9,
  block_explosion: 10,
  entity_explosion: 11,
  void: 12,
  suicide: 13,
  magic: 14,
  wither: 15,
  starve: 16,
  anvil: 17,
  thorns: 18,
  falling_block: 19,
  piston: 20,
  fly_into_wall: 21,
  magma: 22,
  fireworks: 23,
  lightning: 24,
  charging: 25,
  temperature: 26,
  freezing: 27,
  stalactite: 28,
  stalagmite: 29,
  fatal: 31
}

export default class DamageData {
  cause;
  damage;
  constructor(cause, damage) {
    //判断伤害类型是否存在
    let hasDefinedCause = false;
    if (DamageSource[cause] != null){
      hasDefinedCause = true;
      this.cause = cause;
    } else {
      for (let a in DamageSource){
        if (cause == DamageSource[a]){
          this.cause = a;
          hasDefinedCause = true;
          break;
        }
      }
    }
    if (!hasDefinedCause){
      throw new TypeError();
    }
    
    damage = new Number(damage);
    if (isNaN(damage) || damage <= 0){
      throw new RangeError();
    }
    this.damage = damage;
  }
}

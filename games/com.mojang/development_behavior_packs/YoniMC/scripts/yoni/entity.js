import { Minecraft, dim } from "scripts/yoni/basis.js";
import { Command } from "scripts/yoni/command.js";

//need more info

export default class Entity {
  #entity;
  /*get entity(){
    return this.#entity;
  }
  set entity(){
    //throw new Error();
    return null;
  }
  */
  constructor(entity){
    if (isYoniEntity(entity)) //如果已经封装为YoniEntity，则直接返回原实体
      return entity;
    if (!isMinecraftEntity(entity)) //如果不是MCEntity则报错
      throw new TypeError();
    this.#entity = entity; //如果是MCEntity则保存
  }
  isEntity(){
    return isEntity(this.#entity);
  }
  isAliveEntity(){
    return isAliveEntity(this.#entity);
  }
  hasFamily(family){
    return hasFamily(this.#entity, familiy);
  }
  hasAnyFamily(...families){
    return hasAnyFamily(this.#entity, ...families);
  }

  static isEntity(object){
    return isEntity(object);
  }
  static isAliveEntity(object){
    return isAliveEntity(object);
  }
  static hasFamily(entity, family){
    return hasFamily(entity, family);
  }
  static hasAnyFamily(entity, ...families){
    return hasAnyFamily(entity, ...families);
  }
  static resolveTargetSelector(selector){
    return resolveTargetSelector(selector);
  }
  static resolveTargetSelectors(...selectors){
    return resolveTargetSelectors(...selectors);
  }
  static getLoadedEntities(){
    return getLoadedEntities();
  }
}


function isEntity(object){
  if (isYoniEntity(object))
    return true;
  if (isMinecraftEntity(object))
    return true;
  return false;
}

function isMinecraftEntity(object){
  if (object instanceof Minecraft.Entity)
    return true;
  if (object instanceof Minecraft.Player)
    return true;
  return false
}

function isYoniEntity(object){
  if (object instanceof Entity)
    return true;
}

function isAliveEntity(entity){
  if (!isEntity(object))
    return false;
  if (typeof object != "object")
    return false;
  getLoadedEntities().forEach((entity)=>{
    if (object === entity)
      return true;
  });
  return false;
}

function isSameEntity(ent1, ent2){
  try {
    let ent1 = getMinecraftEntity(ent1);
    let ent2 = getMinecraftEntity(ent2);
  } catch (err){
    return false;
  }
  if (ent1 === ent2)
    return true;
  return false;
}


function getMinecraftEntity(object){
  if (isMinecraftEntity(object))
    return object;
  else if (isYoniEntity(object))
    return object.entity;
  else
    throw new TypeError("Not a entity");
}

// get vanilla health component
// internal function for YoniEntity
function getHealthComponent(entity){
  try {
    return entity.getComponent("minecraft:health");
  } catch {
    return null;
  }
}



function isAlive(entity){
  let vanillaEntity = getMinecraftEntity(entity);
  try {
    return getCurrentHealth(vanillaEntity) > 0;
  } catch {
    return false;
  }
}

function hasFamily(entity, family){
  return hasAnyFamily(entity, family);
}

function getCurrentHealth(entity){
  let vanillaEntity = getMinecraftEntity(entity);
  try {
    let component = getHealthComponent(vanillaEntity);
    return getHealthComponent(vanillaEntity).current;
  } catch {
    return 0;
  }
}

function getMaxHealth(entity){
  let vanillaEntity = getMinecraftEntity(entity);
  let component = getHealthComponent(vanillaEntity);
  
  let currentHealth = component.current;
  component.setToMax();
  let maxHealth = component.current;
  component.setToValue(currentHealth);
  return maxHealth;
}

function hasAnyFamily(entity, ...families){
  entity = getMinecraftEntity(entity);
  for (let fam of families){
    fam = String(fam);
    let command = "execute if entity @s[family="+fam+"]";
    if (Command.execute(entity, command).statusCode == 0)
      return true;
  }
  return false;
}



function resolveTargetSelectors(...selectors){
  let selectedEntities = [];
  selectors.forEach((selector) => {
    resolveTargetSelector(selector).forEach((entity) => {
      if (selectedEntities.indexOf(entity) == -1)
        selectedEntities.push(entity);
    });
  });
}

function resolveTargetSelector(selector){
  let selectedEntities = [];

  try {
    let tag = String(Math.random());
    Command.run(`tag ${selector} add "${tag}"`);
    getLoadedEntities().forEach((entity) => {
      if (entity.hasTag(tag))
        selectedEntities.push(entity);
    });
    Command.run(`tag ${selector} remove "${tag}"`);

  } catch {
    selectedEntities = [];
  }

  return selectedEntities;
}

function getLoadedEntities(){
  let loadedEntities = [];
  let dimid = [0,-1,1];
  dimid.forEach((id) => {
    dim(id).getEntities().forEach((entity) => {
      loadedEntities.push(new Entity(entity));
    });
  });
  return loadedEntities;
}

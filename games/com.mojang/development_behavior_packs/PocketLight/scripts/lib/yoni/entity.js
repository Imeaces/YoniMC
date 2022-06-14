import { dim } from "scripts/lib/yoni/basis.js";
import Command from "scripts/lib/yoni/command.js";

//need more info

export default class Entity {
  #entity;
  constructor(entity){
    if (!isEntity(entity))
      throw new Error();
    this.#entity = entity;
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
  //function not implemented
  return true;
}

function isAliveEntity(entity){
  if (typeof object == "object"){
    getLoadedEntities().forEach((entity)=>{
      if (object === entity)
        return true;
    });
  }
  return false;
}



function isAlive(entity){
  try {
    return entity.getComponent("minecraft:health").currnet > 0;
  } catch {
    return false;
  }
}

function hasFamily(entity, family){
  return hasAnyFamily(entity, family);
}

function hasAnyFamily(entity, ...families){
  families.forEach((conditionFamily)=> {
    conditionFamily = String(conditionFamily);
    let command = "execute if entity @s[family="+conditionFamily+"]";
    if (Command.run(command).statusCode == 0)
      return true;
  });
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
      loadedEntities.push(entity);
    });
  });
  return loadedEntities;
}

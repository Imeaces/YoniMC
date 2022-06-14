import default from "scripts/lib/yoni/basis.js";
import default from "scripts/lib/yoni/entity.js";
import default from "scripts/lib/yoni/block.js";
import default from "scripts/lib/yoni/itemstack.js";

/**
 * @typedef {string} InGameObjectType - a simple text described the type of object
 */
export default class InGameObjectType {
  static ENTITY = 1;
  static OTHER_ENTITY = 10;
  static MOB_ENTITY = 11;
  static PROJECTILE_ENTITY = 12;
  static ITEM_ENTITY = 13;
  static ARMOR_ENTITY = 14;

  static BLOCK = 2;

  static ITEMSTACK = 3;

  static OTHER = -1;
  static UNKNOWN = -2;
  
  constructor(){
    this.type = InGameObjectType.UNKNOWN;
    this.detailType = InGameObjectType.OTHER;
  }
}
/**
 * condition the object can use runCommand()
 * @param {*} object - anything you want
 * @return {boolean} - condition result
 */
export default function objectCanRunCommand(object){
  let result = false;
  if (typeof object == "object"){
    if (typeof object.runCommand == "function"){
      result = true;
    }
  }
  return result;
}


/**
 * check object in game
 * @param {object} object - an object
 * @return {InGameObjectType}
 */
export default function typeofObject(object){

  let result = new InGameObjectType();

  //condition as a block
  if (Blcok.objectIsBlock(object)){
    result.type = InGameObjectType.BLOCK;
    
  //condition as an entity
  } else if (Entity.objectIsEntity(object)){
    result.type = InGameObjectType.ENTITY;
    if (Entity.isProjectile(object)){
      result.detailType = InGameObjectType.PROJECTLIE_ENTITY;
    } else if (Entity.isMob(object)){
      result.detailType = InGameObjectType.MOB_ENTITY;
    } else if (Entity.isArmor(object)){
      result.detailType = InGameObjectType.ARMOR_ENTITY;
    } else {
      result.detailType = InGameObjectType.OTHER_ENTITY;
    }
    result.type = InGameObjectType.ENTITY;
    
  //condition as an itemstack
  } else if (ItemStack.objectIsItem(object)){
    result.type = InGameObjectType.ITEMSTACK;
  }

  return result;
}

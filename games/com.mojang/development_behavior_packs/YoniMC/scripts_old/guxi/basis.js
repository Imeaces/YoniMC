import Entity from "scripts/lib/yoni/entity.js";

export function isGuxi(entity){
  return Entity.hasFamily(entity, "guxi");
}

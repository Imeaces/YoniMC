import { world } from "mojang-minecraft";
import { string2Byte } from "./text.js";
const overworld = world.getDimension("overworld"); 
const maxObjectiveLength = 16;
const maxDisplayNameLength = 32;

getByteLength(str){
  return string2Byte(str).length;
}

runCommand(command = ""){
  const cmd = "scoreboard " + command;
  overworld.runCommand(cmd);
}
//只会报错或返回字符串
//在类型为null，或未定义时报错
rationalize(val){
  if (typeof val == "undefined" || val == null)
    throw new Error("无法处理字段：" + val);
  let str = "" + val;
  return str;
}

format(str){
  return str.replace(/"/g,"\\\"").replace(/\\/g,"\\\\");
}

isEmptyString(val){
  if (typeof val == "undefined" || val == null || val.replace(/\s/g,"") == "")
    return true;
  return false;
}

addObjective(objective, displayName){
  let cmd = "objectives add ";
  objective = rationalize(objective);
  if (getByteLength(objective) > maxObjectiveLength)
    throw new Error("记分项的名称不允许超过"+maxObjectiveLength+"个字节");
  cmd += format(objective) + " dummy";
  try {
    displayName = rationalize(displayName);
  } catch {
    displayName = "";
  }
  if (getByteLength(displayName) > 0){
    cmd += " " + format(displayName)
  }
      throw new Error("记分项的显示名称不允许超过"+maxDisplayNameLength+"个字节");
  }
  runCommand(cmd);
}

removeObjective(obj, objName){
  let cmd = "";
  objStr = rationalize(obj);
  if (getByteLength(objStr) > 16){
    throw new Error("记分项的名称不允许超过16个字节");
  cmd = `objectives add "${formot(objStr)}" dummy`;
  if (!isEmptyString(objName))
    cmd += ` ${objName}`
  runCommand(cmd);
}

export { addObjective, removeObjective };

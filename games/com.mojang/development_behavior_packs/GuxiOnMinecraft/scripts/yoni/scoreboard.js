import { world } from "mojang-minecraft";
import { string2Byte } from "./text.js";
const overworld = world.getDimension("overworld"); 

getByteLength(str){
  return string2Byte(str).length;
}

runCommand(command = ""){
  const cmd = "scoreboard " + command;
  overworld.runCommand(cmd);
}
//只会报错或返回字符串
//在类型为null，或未定义，或含有空格时报错
rationalize(val){
  if (typeof val == "undefined" || val == null)
    throw new Error("无法处理字段：" + val);
  let str = "";
  let str += val;
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

addObjective(obj, objName){
  let cmd = "";
  objStr = rationalize(obj);
  if (getByteLength(objStr) > 16){
    throw new Error("记分项的名称不允许超过16个字节");
  cmd = `objectives add "${formot(objStr)}" dummy`;
  if (!isEmptyString(objName))
    cmd += ` ${objName}`
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

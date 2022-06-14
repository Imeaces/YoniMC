import { Entity } from "scripts/lib/yoni/entity.js";
import { scoreboard, dim, execCmd } from "scripts/lib/yoni/basis.js";

class Command {
  command = "scoreboard";
  arguments = [];
  constructor(object){
    if (object == "objectives")
      this.arguments.push("objectives")
    else if (object == "players")
      this.arguments.push("players")
    else
      throw new Error();
  }
  pushArguments(...args){
    this.push(...args);
  }
  push(...args){
    args.forEach((arg) => {
      arg = String(arg);
      this.arguments.push(arg);
    });
  }
  runCommand(){
    this.run();
  }
  printLine(){
    let commandLine = command;
    this.arguments.forEach((arg) => {
      arg = arg.replace(/([\"\\])/, "\\$1");
      commandLine += "\u0020" + arg;
    });
    return commandLine
  }
  run(){
    dim(0).runCommand(this.printLine());
  }
}
export class Scoreboard {
  //objective operation
  static addObjective(objective, displayName){
    objective = String(objective);
    let hasDisplayName = false;
    if (typeof displayName != "undefined" && displayName != null)
      displayName = String(displayName);
      hasDisplayName = true;
    if (string2Byte(objective).length > 16)
      throw new Error()
    if (string2Byte(displayName).length > 32)
      throw new Error()
    
    let command = ["scoreboard", "objectives", "add", objective, "dummy"];
    if (hasDisplayName){
      command.push(displayName);
    
    execCmd(dim(0), ...command);
  
  }
  static listObjectives(){}
  static removeObjective(objective){}
  static renameObjective(objective, newName){}
  static resetObjective(objective){}
  static setDisplay(type, objective, sequence){}
  static setDisplayName(objective, newName){}

  //score operation
  static addScore(objective, object, score){}
  static getScore(objective, object){}
  static getScores(object){}
  static removeScore(objective, object, score){}
  static resetScore(object){}
  static setScore(objective, object, score){}
  //expand
  static listScores(object){}
  
  //expand Participants operation
  static getParticipants(objective){}
  static addParticipant(objective, object){}
  static removeParticipant(objective, object){}
}
export class ScoreboardObjective {
  //constructor
  constructor(objective){}
  
  //objective operation
  removeObjective(){}
  renameObjective(newName){}
  resetObjective(){}
  setDisplayName(newName){}
  
  //score operation
  addScore(object, score){}
  getScore(object){}
  removeScore(object, score){}
  resetScore(object){}
  setScore(object, score){}
  
  //expand
  getScores(...filters){}
  
  //expand Participants operation
  getParticipants(){}
  addParticipant(object){}
  removeParticipant(object){}
}

export class ScoreboardParticipant{
  constructor(object){}
  
  resetScore(objective){}
  resetScores(){}
  
  addScore(objective){}
  removeScore(objective){}
  setScore(objective){}
  getScore(objective){}
  getScores(){}
  operationScore(operator, object, objective){}
  
}

export function addObjective(objective, displayName){
  objective = String(objective);
  displayName = String(displayName);
  if (string2Byte(objective).length > 16)
    throw new Error()
  if (string2Byte(displayName).length > 32)
    throw new Error()
  
  command = new Command("objectives");
  command.push("add", objective, "dummy");
  if (displayName != ""){
    command.push(displayName);
  }
  
  command.run();
  
}

function removeObjective(objective){
  //let status = "succeed";
  
  objective = String(objective);
  if (string2Byte(objective).length > 16)
    return  "nonexistent"
  if (string2Byte(objective).length < 1)
    return "nonexistent"
  
  command = new Command("objectives");
  command.push("remove", objective);
  
  command.run();
  
}

function hasObjective(objective){
  objective = String(objective);
  if (string2Byte(objective).length > 16){
    return false;
  }
  try {
    scoreboard.getObjective(objective);
  } catch {
    return false;
  }
  return true;
}

function getObjective(objective){
  objective = String(objective);
  if (string2Byte(objective).length > 16){
    return null;
  }
  try {
    return scoreboard.getObjective(objective);
  } catch {
    return null;
  }
}

function isObjective(object){
  try {
    if (getObjective(object.id) === object){
      return true;
    }
  } catch {
    return false;
  }
}
function isIdentity(object){
  let participants = scoreboard.getParticipants();
  participants.forEach((part) => {
    if (part === object){
      return true;
    }
  });
  return false;
}

/**
 * @param {Number} or {Entity}
 * @return {ScoreboardIdentity}
 */
function objectToIdentity(object){
  if (isIdentity(object)){
    return object;
  }
  if (Entity.isEntity(object)){
    if (isIdentity(object.scoreboard)){
      return object.scoreboard;
    }
  } else if (!isNaN(Number(object))){
    let participants = scoreboard.getParticipants();
    participants.forEach((part) => {
      if (part.id == object){
        return part;
      }
    });
  }
  return null;
}

/**
 * @param {String} or {ScoreboardObjective}
 * @return {ScoreboardObjective}
 */
function objectToObjective(object){
  if (isObjective(object)){
    return object;
  }
  if (hasObjective(object)){
    return getObjective(object);
  }
  return null;
}
import { ScoreboardIdentityType } from "mojang-minecraft";

function setScore(objective, object, score){
  objective = objectToObjective(objective);
  object = objectToIdentity(object);
  if (object.type == ScoreboardIdentityType.player ||
    object.type == ScoreboardIdentityType.entity){
    let entity = object.getEntity();
    let command = new Command("players");
    command.push("set", "@s", objective.id, score);
    entity.runCommand(command.printLine());
  } else if (object.type == ScoreboardIdentityType.fakeplayer){
    for (let pl of world.getPlayers()){
      if (pl.name == object.displayName){
        throw new Error();
      }
    }
    let command = new Command("players");
    command.push("set", object.displayName, objective.id, score);
    command.run();
  } else {
    throw new Error("Unknown identify type: " + object.type);
  }
}

function getScore(objective, object){
  objective = objectToObjective(objective);
  object = objectToIdentity(object);
  if (objective == null){
    return null;
  }
  if (object == null){
    return null;
  }
  return objective.getScore(object);
}

function addScore(objective, object, score){
  let currentScore = getScore(objective, object);
  let appendScore = Number(score);
  let finalScore = currentScore
  if (!isNaN(appendScore)){
    finalScore += appendScore;
  }
  if (currentScore == finalScore){
    return true;
  }
  setScore(objective, object, finalScore);
}

function removeScore(objective, object, score){
  let appendScore = score * -1;
  addScore(objective, object, appendScore);
}

function resetScore(objective, object){
  objective = objectToObjective(objective);
  object = objectToIdentity(object);
  if (
    object.type == ScoreboardIdentityType.player ||
    object.type == ScoreboardIdentityType.entity
  ){
    let entity = object.getEntity();
    let command = new Command("players");
    command.push("reset", "@s", objective.id);
    entity.runCommand(command.printLine());
  } else if (object.type == ScoreboardIdentityType.fakeplayer){
    for (let pl of world.getPlayers()){
      if (pl.name == object.displayName){
        throw new Error();
      }
    }
    let command = new Command("players");
    command.push("reset", object.displayName, objective.id);
    command.run();
  } else {
    throw new Error("Unknown identify type: " + object.type);
  }
}

function resetScores(object){
  objective = objectToObjective(objective);
  object = objectToIdentity(object);
  if (
    object.type == ScoreboardIdentityType.player ||
    object.type == ScoreboardIdentityType.entity
  ){
    let entity = object.getEntity();
    let command = new Command("players");
    command.push("reset", "@s");
    entity.runCommand(command.printLine());
  } else if (object.type == ScoreboardIdentityType.fakeplayer){
    for (let pl of world.getPlayers()){
      if (pl.name == object.displayName){
        throw new Error();
      }
    }
    let command = new Command("players");
    command.push("reset", object.displayName);
    command.run();
  } else {
    throw new Error("Unknown identify type: " + object.type);
  }
}

function operationScore(objective, object){
  throw new Error("Function not implemented");
}

export default class Scoreboard {
  constructor(){
  }
  
  static getScore(...args){
    return getScore(...args);
  }
}





















function string2Byte(data) {

    let parsedData = [];

    for (let i = 0, l = data.length; i < l; i++) {
        let byteArray = [];
        // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码，返回值是 0 - 65535 
        // 之间的整数，表示给定索引处的 UTF-16 代码单元。
        let code = data.charCodeAt(i);

    // 十六进制转十进制：0x10000 ==> 65535  0x800 ==> 2048  0x80 ==> 128
    if (code > 0x10000) { // 4个字节
        // 0xf0 ==> 11110000 
        // 0x80 ==> 10000000

        byteArray[0] = 0xf0 | ((code & 0x1c0000) >>> 18); // 第 1 个字节
        byteArray[1] = 0x80 | ((code & 0x3f000) >>> 12); // 第 2 个字节
        byteArray[2] = 0x80 | ((code & 0xfc0) >>> 6); // 第 3 个字节
        byteArray[3] = 0x80 | (code & 0x3f); // 第 4 个字节

    } else if (code > 0x800) { // 3个字节
        // 0xe0 ==> 11100000
        // 0x80 ==> 10000000

        byteArray[0] = 0xe0 | ((code & 0xf000) >>> 12);
        byteArray[1] = 0x80 | ((code & 0xfc0) >>> 6);
        byteArray[2] = 0x80 | (code & 0x3f);

    } else if (code > 0x80) { // 2个字节
        // 0xc0 ==> 11000000
        // 0x80 ==> 10000000

        byteArray[0] = 0xc0 | ((code & 0x7c0) >>> 6);
        byteArray[1] = 0x80 | (code & 0x3f);

    } else { // 1个字节

        byteArray[0] = code;
    }

        parsedData.push(byteArray);
    }

    parsedData = Array.prototype.concat.apply([], parsedData);
    return parsedData;
}

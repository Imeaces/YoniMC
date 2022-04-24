import * as mc from "mojang-minecraft";
var world = mc.world;
var events = mc.world.events;

var itemUsePlayers = [];

function dim(dimid){
  switch (dimid) {
    case -1:
    case "nether":
      return world.getDimension("nether");
      break;
    case 1:
    case "the end":
    case "the_end":
      return world.getDimension("the end");
      break;
    default:
      return world.getDimension("overworld");
  }
}
function getLoadedEntities(){
  let entities = [];
  for (let dimid of [0,-1,1]){
    for (let e of dim(dimid).getEntities()){
      entities.push(e);
    }
  }
  return entities;
}
function say(msg,obj){
  let cmd = "say §§";
  if (typeof msg != "undefined"){
    cmd += msg;
  }
  runCmd(cmd,obj);
}
function runCmd(cmd,obj){
  let status = true;
  if (typeof obj == "undefined"){
    try {
      dim(0).runCommand(cmd);
    } catch {
      status = false;
    };
  } else {
    try {
      obj.runCommand(cmd);
    } catch {
      status = false;
    };
  }
  return status;
}
function scbObjAdd(obj,objName){
  if (typeof obj === "undefined" || obj === ''|| obj === null){
    throw "必须为新建记分项指定名称！\nYou must specify a name for new objectives";
  }
  obj = obj.toString();
  try {
    objName = obj.toString();
  } catch {/* do nothing */}
  runCmd(`scoreboard objectives add "${obj}" dummy ${objName}`);
}
function scbObjRem(obj){
  if (typeof obj === "undefined" || obj === ''|| obj === null){
    throw "必须为移除记分项指定名称！\nYou must specify a objectives to remove";
  }
  obj = obj.toString();
  runCmd(`scoreboard objectives remove "${obj}" dummy ${objName}`);
}
function chatCommand(event,command){
  /* 处理命令和参数 begin */
  let cmd = "";
  let arg = "";
  let args = [];
  if (typeof command != "undefined" && command != "" && command != null){
    command = command.toString();
    let split = 0;
    split = command.indexOf(" ");
    if (split == -1){
      cmd = command;
    } else {
      cmd = command.slice(0,split);
      arg = command.slice(split+1);
      split = 0;
      while (true){
        let context = "";
        let index = arg.indexOf(" ",split+1);
        if (index == -1){
          context = arg.slice(split+1);
        } else {
          context = arg.slice(split+1,index);
        }
        if (context.length != 0){
          args.push(context);
        }
        split = arg.indexOf(" ",split+1);
        if (split == -1){
          break;
        }
      }
    }
  }
  /* 处理命令和参数 end */
  
  //输出得到的命令参数
  say(`[!]${cmd} ${args}`);
  //执行命令
  switch (cmd){
    case "suicide":
      event.sender.kill();
      break;
    case "say":
      say(arg,event.sender);
      break;
    case "getEntitiesFromViewVector":
      say("执行getEntitiesFromViewVector");
      try {
        say("正在获取");
        let ents = event.sender.getEntitiesFromViewVector();
        for (let e of ents){
          say("正在转化");
          let text = JSON.stringify(e);
          say(`输出：${text}`);
          say(`输出：${e.id}`);
        }
      } catch(err) {
        say(`[err]${JSON.stringify(err)}`);
        say("执行getEntitiesFromViewVector失败");
      }
      say("执行结束");
      break;
    case "eval":
      say(`[eval][!]${arg}`);
      try {
        let result = eval(arg);
        say("[eval]执行成功");
        if (typeof result == "undefined"){
          say("[eval]没有返回结果")
        } else if (typeof result == "object"){
          say("[eval]返回object，尝试转换为json文本")
          say(`[eval][result]${JSON.stringify(result)}`);
        } else {
          say(`[eval][result]${result}`);
        }
      } catch(err){
        say(`[eval][err]${err}`);
      }
      break;
    default:
      if (cmd == ""){
        say(`[!]没有可以执行的命令`);
      } else {
        say(`[!]未知的命令:${command}`);
      }
  }
  return event;
}

events.beforeChat.subscribe(event => {
  if (event.message.startsWith("!")){
    let command = event.message.substring(1);
    event.cancel = true;
    mc.world.getDimension("overworld").runCommand("say @s");
    say("调用chatCommand()处理命令");
    try {
      chatCommand(event,command);
      say("调用chatCommand()正常结束");
    } catch(err){
      say(`[err]${err}`);
      say("调用chatCommand()异常结束");
    }
  }
  if (event.sender.hasTag("guxi")) {
    event.message = "咕西";
  }
  say("beforeChat处理完毕");
  return event;
});

events.entityHurt.subscribe(event => {
  if (event.damage == 0){
    return
  }
  if (event.hurtEntity.id == "minecraft:player"){
    runCmd(`tellraw @s  {"rawtext":[{"text":"受到${event.damage}点伤害"}]}`,event.hurtEntity);
  }
});

events.itemUse.subscribe(event => {
  itemUsePlayers.push(event.source);
  say("使用物品事件被触发",event.source);
});

events.tick.subscribe(eventToDoSomething => {
  //如果实体tag=test:health，为它设置血量
  for (let e of getLoadedEntities()){
    if (e.hasTag("test:health")){
      scbObjAdd("HEALTH");
      let health = Math.floor(e.getComponent("minecraft:health").current);
      runCmd(`scoreboard players set @s HEALTH ${health}`,e);
    }
  }
  
  //为使用了物品的玩家添加标签
  for (let pl of world.getPlayers()){
    if (pl.hasTag("event:itemUse")){
      runCmd("tag @s remove event:itemUse",pl);
    }
  }
  for (let pl of itemUsePlayers){
    runCmd("tag @s add event:itemUse",pl);
  }
  itemUsePlayers = [];

});

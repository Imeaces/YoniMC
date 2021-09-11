import {Commands, World} from 'Minecraft';

World.events.beforeChat.subscribe((event) => {
  Commands.run(`say "${event}"`);
  const {message} = event;
  const playerName = event.sender.name;
  const playerTagStr = Commands.run(`tag "${playerName}" list`).statusMessage.toString();
  var A = 0;
  var Z = 0;
  A = A + playerTagStr.indexOf("A_Nick_");
  Z = Z + playerTagStr.indexOf("_Nick_Z");
  var playerNick = "";
  playerNick = playerTagStr.substring(A+7,Z);
  var oldNick = "";
  oldNick = "A_Nick_"+playerNick+"_Nick_Z";
  const newNick = "A_Nick_"+message.replaceAll("来个头衔","")+"_Nick_Z";
  if (message.startsWith('来个头衔')){
    Commands.run(`tag "${event.sender.name}" add "${newNick}"`);
    const nick = JSON.stringify({"rawtext":[{"text":playerName+"获得了新头衔"+message.replaceAll("来个头衔","")}]});
    Commands.run(`tellraw @a ${nick}`);
    Commands.run(`tag "${event.sender.name}" remove "${oldNick}"`);
    event.canceled = true;
    return event;
  };
  playerNick = playerNick+message;
  playerNick = JSON.stringify({"rawtext":[{"text":playerNick}]});
  if (playerTagStr.indexOf("A_Nick_") > -1){
    Commands.run(`tellraw @a ${playerNick}`);
    event.canceled = true;
    return event;
  };
});
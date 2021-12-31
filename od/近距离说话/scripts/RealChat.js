import * as Minecraft from "mojang-minecraft";

const commandRunningDimension = Minecraft.World.getDimension('the end');
const chatRange = 16;
const translation = "chat.type.text";

Minecraft.World.events.beforeChat.subscribe((chatEventData) => {
  const playerName = chatEventData.sender.name;
  const message = chatEventData.message;

  const rawtext = JSON.stringify({
    "rawtext": [{
      "translate": translation,
      "with": [playerName, message]
    }]
  });

  Minecraft.Command.run(`execute @a[name="${playerName}"] ~ ~ ~ tellraw @a[r=${chatRange}] ${rawtext}`, commandRunningDimension);
  Minecraft.Command.run("say 执行成功！", commandRunningDimension);
  
  chatEventData.cancel = true;
  return chatEventData;
});

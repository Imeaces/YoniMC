import {Commands, World} from 'Minecraft';

World.events.beforeChat.subscribe((event) => {
  const {message} = event;
  const playerName = event.sender.name;
  const msg = JSON.stringify({"rawtext":[{"translate":"chat.type.text","with":[playerName,message]}]});
  Commands.run(`execute @a[name="${playerName}"] ~ ~ ~ tellraw @a ${msg}`);
  event.canceled = true;
  return event;
});
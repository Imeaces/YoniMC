import {Commands, World} from 'Minecraft';

World.events.beforeChat.subscribe((event) => {
  let rawtext = JSON.stringify({"rawtext":[{"translate":"chat.type.text","with":[event.sender.name,"咕西"]}]});
  Commands.run(`tellraw @a ${rawtext}`);
  event.canceled = true;
  return event;
});
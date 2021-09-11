import {Commands, World} from 'Minecraft';

World.events.beforeChat.subscribe((event) => {
  const message = event;
//  const playerName = event.sender.name;
  try{
    if(message == '坐标'){
      const position = [
        event.sender.location.x,
        event.sender.location.y,
        event.sender.location.z
      ];
       const text = "坐标：" + position[0] + " " + position[1] + " " + position[2]
      //  const position = JSON.stringify({"rawtext":[{"text":po}]});
      Commands.run(`me ${text}`);
      event.canceled = true;
      return event;
    };
  }catch(err){
    Commands.run(`me ${err}`);
  };
});

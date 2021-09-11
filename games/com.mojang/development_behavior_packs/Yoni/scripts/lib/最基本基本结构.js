import {Commands, World} from 'Minecraft';

World.events.beforeChat.subscribe((event) => {
  const {message} = event;
  const playerName = event.sender.name;
  try{
    if(message == '坐标'){
      const po = event.sender.location.x.toFixed(3) + "##" + event.sender.location.y.toFixed(3) + "##" + event.sender.location.z.toFixed(3);
      //  const position = JSON.stringify({"rawtext":[{"text":po}]});
      Commands.run(`me ${po}`);
      Commands.run(`me 怪`);
      event.canceled = true;
      return event;
    };
  }catch(err){
    Commands.run(`me ${err}`);
  };
});

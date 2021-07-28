import * as Minecraft from 'Minecraft'
import FORMATTINGS from './format.js'

class MINECRAFTLogger
{
    logs = "";
    onlyLog = {};
    onlyWarning = {};
    onlyError = {};
    onlyEvent = {};
    time = 0;


   ClearLog()
   {
        this.time = 0;
        this.log = "";
        this.onlyLog = {};
        this.onlyWarning = {};
        this.onlyError = {};
        this.onlyEvent = {};
        return;
   }

   RawLogger(message, sended = true)
   {
        this.time += 1;
        this.onlyLog[this.time] = {level: 0, message: message, type: {name: "log", event: "log"}};
        message = `${FORMATTINGS.Gray}<log>${FORMATTINGS.Reset}${message}`.replace("\n",`\n${FORMATTINGS.Gray}<log>${FORMATTINGS.Reset}`);
        this.log += `${this.time}:${message}`;
        if(sended)
        {return Minecraft.Commands.run(`tellraw @a {"rawtext": [{"text": "${message}"}]}`);}
        else {return this.onlyLog;}
   }

   /**
    * 
    * @param  message 
    * @param  sended Being true to dipaly message to players, or not.
    * @param  type Message type
    * @returns 
    */
   WarningLogger(message, sended = true, type = undefined)
   {
        this.time += 1;
        this.onlyWarning[this.time] = {level: 1, message: message, type: {name: "warning", event: type}};
        message = `${FORMATTINGS.Yellow}<warning>${FORMATTINGS.Gold}${message}`.replace
        ("\n",`\n${FORMATTINGS.Yellow}<warning>${FORMATTINGS.Gold}`);
        this.log += `${this.time}:${message}`;
        if(sended)
        {return Minecraft.Commands.run(`tellraw @a {"rawtext": [{"text": "${message}"}]}`);}
        else {return this.onlyWarning;}

   }

   /**
    * 
    * @param  message 
    * @param  sended Being true to dipaly message to players, or not.
    * @param  type Message type,example: "error:failed_to_execute"
    * @returns 
    */
   ErrorLogger(message, sended = true, type = undefined)
   {
        this.time += 1;
        this.onlyError[this.time] = {level: 2, message: message, type: {name: "error", event: type}};
        message = `${FORMATTINGS.DarkRed}<error>${FORMATTINGS.Red}${message}`.replace
        ("\n",`\n${FORMATTINGS.DarkRed}<error>${FORMATTINGS.Red}`);
        this.log += `${this.time}:${message}`;
        if(sended)
        {return Minecraft.Commands.run(`tellraw @a {"rawtext": [{"text": "${message}"}]}`);}
        else {return this.onlyError;}
   }

   EventLogger(message, sended = true, type = undefined)
   {
        this.time += 1;
        this.onlyEvent[this.time] = {level: 0, message: message, type: {name: "event", event: type}};
        message = `<event>${message}`.replace("\n","\n<event>");
        this.log += `${this.time}:${message}`;
        if(sended)
        {return Minecraft.Commands.run(`tellraw @a {"rawtext": [{"text": "${message}"}]}`);}
        else {return this.onlyEvent;}
   }

   RemoveLog(type, number)
   {
        if(type == "Log")
        {this.onlyLog[number] = null;this.time-=1;}
        else if(type == "Warning")
        {this.onlyWarning[number] = null;this.time-=1;}
        else if(type == "Error")
        {this.onlyError[number] = null;this.time-=1;}
        else if(type == "Event")
        {this.onlyEvent[number] = null;this.time-=1;}
        return;
   }

   constructor(name)
   {
        this.name = name;
   }
}


class MINECRAFTConsole
{
    broadcast = function(message, parameters = [])
     {
        Minecraft.Commands.run(`tellraw @a {"rawtext":[{"translate": ${message}}, "with": ${parameters}}]}`)
     }

    log = function(message)
     {
        message = `${message}`.replace("\n","\n<log>");
        return Minecraft.Commands.run(`telllraw @a {"rawtext": [{"text": "<log>${message}"}]`);
     }
     mute = function()
     {
          Minecraft.Events.beforeChat.subscribe((eventData) =>
          {
               eventData.targets = [];
               eventData.cancel = true;
               return eventData;
          });
     }
    logger = MINECRAFTLogger;
    constructor() {}
    
}

export var minecraftConsole = new MINECRAFTConsole();
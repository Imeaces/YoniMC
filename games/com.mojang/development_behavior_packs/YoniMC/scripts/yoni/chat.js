import { dim } from "./basis.js";

function log(){
  return
}

export default class Chat {
  static say(msg = "",obj){
    let rawtext = [
      {
        translate: "chat.type.announcement",
        with: {
          rawtext: [
            { translate: "commands.origin.script" },
            { text: ""+msg }
          ]
        }
      }
    ]

    let status;
    if (typeof obj == "object"){
      try {
        status = obj.runCommand("tellraw @a " + JSON.stringify({rawtext}));
      } catch(err){
        log(err, "ERROR");
        return err;
      }
      try {
        if (typeof msg == "object")
          obj.runCommand("tellraw @a " + JSON.stringify({rawtext:[{text:JSON.stringify(msg)}]}));
      } catch(err){
        log(err, "WARN");
      }
      return status;
    } else if (!text.isNullString(obj)){
      rawtext[0].with.rawtext[0] = { text: ""+obj };
    }
    try {
      status = dim(0).runCommand("tellraw @a " + JSON.stringify({rawtext}));
      if (typeof msg == "object")
        dim(0).runCommand("tellraw @a " + JSON.stringify({rawtext:[{text:JSON.stringify(msg)}]}));
    } catch {}
    return status;
  }

  static tell(obj, msg = ""){
    let rawtext = [
      {
        translate: "chat.type.announcement",
        with: {
          rawtext: [
            { translate: "commands.origin.script" },
            { text: ""+msg }
          ]
        }
      }
    ]

    let status;
    if (typeof obj.runCommand == "function"){
      try {
        status = obj.runCommand("tellraw @s " + JSON.stringify({rawtext}));
      } catch(err){
        log(err, "WARN");
        return err;
      }
      try {
        if (typeof msg == "object")
          obj.runCommand("tellraw @s " + JSON.stringify({rawtext:[{text:JSON.stringify(msg)}]}));
      } catch{ /* do nothing */ }
    } else { //如果不是实体则返回-1
      status = -1;
    }
    return -1;
  }

}

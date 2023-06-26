"use strict";
world.events.chat.subscribe(event => {
    const { message } = event;
    const args = message.slice(" ");
    if (args[0] !== "#set") {
        return;
    }
    else if (args.filter(v => v.trim() !== "").length < 3) {
        sender.sendMessage("参数不足");
        return;
    }
    args.shift();
    let variableNameElemIndex = args.slice(1).findIndex((elem, index, arr) => {
        return elem !== "";
    });
    let variableName = args[valueNameElemIndex];
    let value = args.slice(valueNameElemIndex).join(" ");
    eval(variableName + "=" + value);
});
world.events.chat.subscribe(args => {
    var player = args.sender;
    var msg = args.message;
    if (msg.startsWith("#set")) {
        var list = msg.split(/\s/);
        var command = list.slice(1);
        var value = list.slice(0);
        try {
            eval(command + "=" + value);
        }
        catch (error) {
            world.sendMessage(`${error}`);
        }
    }
});

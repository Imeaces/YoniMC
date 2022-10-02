import ChatCommand from "yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim,
    VanillaWorld,
    Gametest
    } from "yoni/basis.js";
import { YoniEntity } from "yoni/entity.js";
import { tell, say } from "yoni/util/yoni-lib.js";
import Command from "yoni/command.js";
import SimpleScoreboard from "yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "yoni/event.js";
const { EntityDamageCause } = Minecraft;

ChatCommand.registerPrefixCommand("$", "function", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(JSON.stringify(Function(rawCommand.slice(label.length+1)).call(this)));
});
ChatCommand.registerPrefixCommand("$", "gfunction", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(JSON.stringify(Function(rawCommand.slice(label.length+1))));
});
ChatCommand.registerPrefixCommand("$", "geval", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(JSON.stringify(globalThis.eval(rawCommand.slice(label.length+1))));
});
ChatCommand.registerPrefixCommand("$", "eval", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    let code = rawCommand.slice(label.length+1);
    console.error(rawCommand);
    sender.sendMessage(code);
    sender.sendMessage(
        JSON.stringify(eval(code))
    );
});

ChatCommand.registerPrefixCommand("$", "exec", (sender, rawCommand, label, args) => {
    sender = new YoniEntity(sender);
    sender.sendMessage(
        JSON.stringify(
            Command.execute(sender, rawCommand.slice(label.length+1))
        )
    );
});

ChatCommand.registerPrefixCommand("$", "spawnplayer", (sender) =>{
    Gametest.register("SimulatedPlayerTests", "spawn_player", (test) => {
        const spawnLoc = sender.location;
        const landLoc = new BlockLocation(1, 10000, 1);
        const playerName = "Steve";
        const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
        test.assertEntityPresent("player", spawnLoc);
        test.succeedWhen(() => {
            test.assertEntityPresent("player", landLoc);
        });
    })
    .tag(Gametest.Tags.suiteDefault)
    .maxTicks(999999);
    
});

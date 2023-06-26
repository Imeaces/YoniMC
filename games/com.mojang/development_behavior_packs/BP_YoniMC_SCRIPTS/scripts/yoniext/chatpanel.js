import { EventListener } from "yoni-mcscripts-lib";
import { YoniEntity } from "yoni-mcscripts-lib";
import { Scoreboard } from "yoni-mcscripts-lib";
import { Location } from "yoni-mcscripts-lib";
import { MinecraftGui } from "yoni-mcscripts-lib";
class ChatPanel {
    defaultChatDistance = 20;
    //player's chat distance (in 0.01)
    chatDistanceObjective = Scoreboard.getObjective("chatpanel:data0", true);
    constructor() {
        this.chatDistance =
            EventListener.register("minecraft:beforeChat", (event) => {
                let { message, sender } = event;
                event.cancel = true;
                this.onChat(sender, message).catch(console.error);
            });
        EventListener.register("minecraft:itemUse", (event) => {
            console.log("cond itemuse");
            if (event.source.typeId !== "minecraft:player") {
                console.log("cond not player");
                return;
            }
            if (event.item.nameTag !== "聊天") {
                console.log("cond not chat");
                return;
            }
            this.openChatListGui(event.source).catch(console.error);
        });
    }
    messageSequence = new Array();
    messageReceiverRecords = new WeakMap();
    async openChatListGui(sender) {
        const vanillaPlayer = YoniEntity.getMinecraftEntity(sender);
        const gui = new MinecraftGui.ActionFormData();
        const messages = this.getChatMessages(sender);
        gui.title("聊天");
        let body = "";
        let count = 50;
        for (let msg of messages.reverse()) {
            if (count-- < 0)
                break;
            let ctext = "";
            if (YoniEntity.isSameEntity(msg.sender, sender)) {
                body += "§e[我]：" + msg.valueOf();
            }
            else {
                let name;
                try {
                    name = msg.sender.name;
                }
                catch {
                    name = "§7[未知玩家]§f";
                }
                body += `§f${name}：${msg.valueOf()}`;
            }
            body += "\n";
        }
        if (count < 0)
            body += "§7[更多的聊天已经遗忘]";
        gui.body(body);
        gui.button("编写新消息……");
        gui.show(vanillaPlayer).then(response => this.responseChatList(sender, response)).catch(console.error);
    }
    async responseChatList(sender, response) {
        if (response.canceled)
            return;
        if (response.selection != null) {
            this.openChatWriteGui(sender).catch(console.error);
        }
    }
    async responseChatWrite(sender, response) {
        if (response.canceled)
            return;
        if (response.formValues[0].trim() === "") {
            new MinecraftGui.MessageFormData()
                .body("你什么也没说，所以自然没有人听到你在说什么")
                .show(YoniEntity.getMinecraftEntity(sender))
                .then((response) => {
                if (response.canceled)
                    return;
                if (response.selection === 1) {
                    this.openChatWriteGui(sender).catch(console.error);
                }
            });
        }
        this.onChat(sender, response.formValues[0]).catch(console.error);
    }
    async openChatWriteGui(sender, defaultMessage = "") {
        const vanillaPlayer = YoniEntity.getMinecraftEntity(sender);
        const gui = new MinecraftGui.ModalFormData();
        gui.title("新的消息正在编写……");
        gui.textField("想说点什么呢？", "\x20", defaultMessage);
        gui.show(vanillaPlayer).then(response => this.responseChatWrite(sender, response)).catch(console.error);
    }
    async onChat(sender, message) {
        sender = YoniEntity.from(sender);
        message = new Object(String(message));
        let maxDistance = this.queryChatDistance(sender);
        let playersThatCanReceive;
        let location = new Location(sender);
        if (maxDistance === 0) {
            playersThatCanReceive = YoniEntity.getDimensionEntities(sender.dimension, {
                location: location.getVanillaLocation(),
                type: "minecraft:player"
            });
        }
        else {
            playersThatCanReceive = YoniEntity.getDimensionEntities(sender.dimension, {
                location: location.getVanillaLocation(),
                maxDistance: maxDistance,
                type: "minecraft:player"
            });
        }
        playersThatCanReceive = Array.from(playersThatCanReceive);
        message.sender = sender;
        this.messageSequence.push(message);
        this.messageReceiverRecords.set(message, playersThatCanReceive);
        this.noticePlayers(playersThatCanReceive, "§e有新消息").catch(console.error);
    }
    /**
     * @param {Player[]} players
     */
    async noticePlayers(players, notice = "") {
        Array.prototype.map
            .call(players, YoniEntity.from)
            .forEach(player => player.onScreenDisplay.setActionBar(notice));
    }
    //设置距离，最大21474836.47
    setChatDistance(sender, distance) {
        distance = Number(distance) * 100;
        if (distance > 2147483647) {
            throw new TypeError("距离太大了，不能大于21474836.47");
        }
        this.chatDistanceObjective.postSetScore(sender, distance).catch(console.error);
    }
    //重置
    resetChatDistance(sender) {
        this.chatDistanceObjective.postResetScore(sender);
    }
    //-1为无限，如果未设置则使用默认
    queryChatDistance(sender) {
        let s = this.chatDistanceObjective.getScore(sender);
        if (s === undefined) {
            return this.defaultChatDistance;
        }
        if (s < 0) {
            return 0;
        }
        return s / 100;
    }
    getChatMessages(receiver) {
        let messages = new Array();
        for (let msg of this.messageSequence) {
            let msgRecs = this.messageReceiverRecords.get(msg);
            if (msgRecs.includes(YoniEntity.getMinecraftEntity(receiver)))
                messages.push(msg);
        }
        return messages;
    }
}
const chatPanel = new ChatPanel();

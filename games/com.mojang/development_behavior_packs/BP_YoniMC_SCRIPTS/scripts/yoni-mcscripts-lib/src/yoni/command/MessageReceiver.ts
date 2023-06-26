export interface MessageReceiver {
    sendMessage(msg: string): void;
}
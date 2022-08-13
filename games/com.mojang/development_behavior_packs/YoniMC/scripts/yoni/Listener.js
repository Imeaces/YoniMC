export function Listener(event, callback, ...args){
    event.subscribe(callback, ...args);
}
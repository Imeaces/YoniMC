export default function Listener(event, callback, ...args){
    event.subscribe(callback, ...args);
}
export { Listener }
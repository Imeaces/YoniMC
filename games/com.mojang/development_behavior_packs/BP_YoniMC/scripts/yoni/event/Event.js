/**
 * @typedef {(event: Event) => void} EventCallback
 */

export class Event {
    constructor(...values) {
        Object.assign(this, ...values);
    }
}
export default Event;

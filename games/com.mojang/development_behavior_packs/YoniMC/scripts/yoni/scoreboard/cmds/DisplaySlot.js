export default class DisplaySlot {
    #slot;
    constructor(slot){
        this.#slot = slot;
    }
    static SIDEBAR = new DisplaySlot("sidebar");
    static LIST = new DisplaySlot("list");
    static BELOW_NAME = new DisplaySlot("belowname");
}

import {
	Commands,
} from "Minecraft";
import {
	Callback,
	BlockSource
} from "./lib/Callback.js";

const dimColors = ["§2", "§4", "§5"];
Callback.addCallback("beforeChat", eventData => {
	eventData.cancel = true;
	eventData.canceled = true;
	let dim = new BlockSource(eventData.sender).getDimension();
	let color = dimColors[dim];
	Commands.run(`/tellraw @a {"rawtext": [{"text": "<${color}["}, {"translate": "dimension.dimensionName${dim}"}, {"text": "]${"§r" + eventData.sender.name}> ${eventData.message}"}]}`);
});
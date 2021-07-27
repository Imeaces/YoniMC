import { Commands } from 'Minecraft';
import { FORMATTINGS } from './format.js';

export const INFO = 0b00000001;
export const ERROR = 0b00000010;
export const WARN = 0b00000100;

export class Logger {
	name; level;
	
	check(level) {
		return (this.level & level) != 0;
	};
	
	remove(level) {
		this.level &= ~level;
	};
	
	add(level) {
		this.level |= level;
	};
	
	e(message) {
		if (this.check(ERROR))
			this.log(`[${this.name}] [${FORMATTINGS.Red}ERROR${FORMATTINGS.Reset}] ${message}`);
	};
	
	i(message) {
		if (this.check(INFO))
			this.log(`[${this.name}] [${FORMATTINGS.Green}INFO${FORMATTINGS.Reset}] ${message}`);
	};
	
	w(message) {
		if (this.check(WARN))
			this.log(`[${this.name}] [${FORMATTINGS.Yellow}WARN${FORMATTINGS.Reset}] ${message}`);
	};
	
	log(message) {
	 	message = JSON.stringify({"rawtext":[{"text":message}]});
		Commands.run(`tellraw @a[m=c] ${message}`);
	};
	
	constructor(name, level) {
		this.name = name;
		this.level = level;
	};
}
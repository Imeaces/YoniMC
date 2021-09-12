import { Commands } from 'Minecraft';
import { decode } from './decode.js';
import { encode } from './encode.js';

export function getIntTag(playerName, tagName) {
	let tags = regExpMatch(playerName, new RegExp(`I${tagName}_([0-9|a-f]{1,8})`));
	if (tags == null) {
		return null;
	}
	return parseInt(tags[1], 16);
};

export function putIntTag(playerName, tagName, value) {
	let tags = regExpMatch(playerName, new RegExp(`I${tagName}_([0-9|a-f]{1,8})`));
	let str = value.toString(16);
	if (tags != null) {
		if (tags[1] == str) {
			return false;
		}
		Commands.run(`tag "${playerName}" remove ${tags[0]}`);
	}
	Commands.run(`tag "${playerName}" add I${tagName}_${str}`);
	return true;
};
/*
@Deprecated use getIntTag() / 100 instead of
export function getFloatTag(playerName, tagName) {
	let tags = regExpMatch(playerName, new RegExp(`F${tagName}_([0-9|e|\.]+)`));
	if (tags == null) {
		return null;
	}
	return parseFloat(tags[1]);
};

export function putFloatTag(playerName, tagName, value) {
	let tags = regExpMatch(playerName, new RegExp(`F${tagName}_([0-9|e|\.]+)`));
	let str = value.toString();
	if (tags != null && tags[1] != str) {
		Commands.run(`tag "${playerName}" remove ${tags[0]}`);
	}
	Commands.run(`tag "${playerName}" add F${tagName}_${str}`);
};
*/

export function getStrTag(playerName, tagName) {
	let tags = regExpMatch(playerName, new RegExp(`S${tagName}_([0-9a-z_]+)`));
	if (tags == null) {
		return null;
	}
	return decode(tags[1]);
};

export function putStrTag(playerName, tagName, value) {
	
	let tags = regExpMatch(playerName, new RegExp(`S${tagName}_([0-9a-z_]+)`));
	value = encode(value);
	if (tags != null) {
		if (tags[1] == value) {
			return false;
		}
		Commands.run(`tag "${playerName}" remove ${tags[0]}`);
	}
	Commands.run(`tag "${playerName}" add S${tagName}_${value}`);
	return true;
};


function regExpMatch(playerName, regExp) {
	try {
		return Commands.run(`tag "${playerName}" list`).statusMessage.match(regExp);
	} catch (e) {
		
		return null;
	}
};
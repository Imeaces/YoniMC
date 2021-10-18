import { World, Commands} from 'Minecraft';

const targetMap = [];
const TICK = 20;

const TIMEOUT = 10 * TICK;

/* string name => array (string name, int timeout) */

function teleport(playerName, targetName) {
	try {
		Commands.run(`tp '${playerName}' '${targetName}'`);
	} catch (e) {
		
	}
}

function tellraw(playerName, message) {
	try {
		message = JSON.stringify({'rawtext':[{'text':message}]});
		Commands.run(`tellraw "${playerName}" ${message}`);
	} catch (e) {
	}
}

function deleteRequest(playerName) {
	delete targetMap[playerName];
}

World.events.chat.subscribe((event) => {
	if (event.message.startsWith('tpa ')) {
		event.cancel = true;
		const name = event.message.substr(4).trim();
		if (name == event.sender.name) {
			tellraw(name, '= =');
			return;
		}
		targetMap[event.sender.name] = {target : name, timeout : TIMEOUT};
		tellraw(event.sender.name, '传送请求已发送');
	} else if (event.message == 'tpaccept') {
		event.cancel = true;
		const name = event.sender.name;
		for (let playerName in targetMap) {
			if (targetMap[playerName].target == name) {
				teleport(playerName, name);
				deleteRequest(playerName);
				tellraw(playerName, `你对${name}的传送请求被接受`);
				tellraw(name, `成功接受${playerName}的传送请求`);
				return;
			}
		}
		tellraw(name, '你目前没有传送请求可以接受');
	} else if (event.message == 'tpdeny') {
		event.cancel = true;
		const name = event.sender.name;
		for (let playerName in targetMap) {
			if (targetMap[playerName].target == name) {
				deleteRequest(playerName);
				tellraw(playerName, `你对${name}的传送请求被拒绝`);
				return;
			}
		}
		tellraw(name, '你目前没有传送请求可以拒绝');
	}
});

World.events.tick.subscribe(() => {
	for (let playerName in targetMap) {
		if (targetMap[playerName].timeout-- <= 0) {
			tellraw(playerName, `你对${targetMap[playerName].target}的传送请求已超时`);
			deleteRequest(playerName);
		}
	}
});
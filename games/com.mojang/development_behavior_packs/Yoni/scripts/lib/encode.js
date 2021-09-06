export function encode(message) {
	let result = [];
	for (let i = 0, len = message.length; i < len; i++) {
		result.push(message.charCodeAt(i).toString(32));
	}
	return result.join('_');
}
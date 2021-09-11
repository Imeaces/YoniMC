export function decode(message) {
	let result = '';
	for (let value of message.split('_')) {
		result += String.fromCharCode(parseInt(value, 32));
	}
	return result;
}
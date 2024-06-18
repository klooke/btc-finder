// BigInt
export function bigIntToBuffer(value) {
	const bytes = bigIntToUint8Array(value, 64);
	return Buffer.from(bytes);
}

export function bigIntToUint8Array(value, length = 0) {
	if (typeof value !== "bigint") value = BigInt(value);

	value = value.toString(16);

	if (!length) length = value.length % 2 ? value.length + 1 : value.length;

	value = value.padStart(length, "0");

	let idx = 0;
	const bytes = new Uint8Array(length / 2);
	for (let i = 0; i < length; i += 2) {
		bytes[idx++] = parseInt(value.substring(i, i + 2), 16);
	}

	return bytes;
}

//Randoms
export function getRandomByte(min, max) {
	let value = crypto.getRandomValues(new Uint8Array(1))[0] % max;

	if (!value) value = max;
	if (value < min) value = min;

	return value;
}

export function getRandomKey(min, max) {
	const minHeader = bigIntToUint8Array(min);
	const maxHeader = bigIntToUint8Array(max);

	let key = "0x";
	for (let i = 0; i < minHeader.length; i++) {
		const byte = getRandomByte(minHeader[i], maxHeader[i]);
		key += byte.toString(16).padStart(2, "0");
	}

	return BigInt(key);
}

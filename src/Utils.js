// BigInt
export function bigIntToBuffer(value) {
	const bytes = bigIntToUint8Array(value, 64);
	return Buffer.from(bytes);
}

export function bigIntToUint8Array(value, length = 0) {
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

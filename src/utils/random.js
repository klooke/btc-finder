import { bigIntToUint8Array } from "./index.js";

export function getRandomByte(min = 0x00, max = 0xff) {
	const range = max - min;

	const randomByte = new Uint8Array(1);

	crypto.getRandomValues(randomByte);

	randomByte[0] %= range;

	return min + randomByte[0];
}

export function getRandomBigInt(min, max) {
	const range = max - min;

	const rangeBytes = bigIntToUint8Array(range);
	const randomBytes = new Uint8Array(rangeBytes.length);

	crypto.getRandomValues(randomBytes);

	let randomBigInt = 0n;

	for (let i = 0; i < randomBytes.length; i++) {
		randomBigInt <<= 8n;
		randomBigInt += BigInt(randomBytes[i]);
	}

	randomBigInt %= range;

	return min + randomBigInt;
}

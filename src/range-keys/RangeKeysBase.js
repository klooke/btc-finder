export default class RangeKeysBase {
	constructor(range) {
		this.from = BigInt(range.from);
		this.to = BigInt(range.to);

		this.current = this.from;
	}

	_rangeKeyMax = 100_000_000;

	static bigIntToBuffer(value) {
		const bytes = RangeKeysBase.bigIntToUint8Array(value, 64);
		return Buffer.from(bytes);
	}

	static bigIntToUint8Array(value, length = 0) {
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

	getRandomByte(min, max) {
		let value = crypto.getRandomValues(new Uint8Array(1))[0] % max;

		if (!value) value = max;
		if (value < min) value = min;

		return value;
	}

	getRandomKey() {
		const minHeader = RangeKeysBase.bigIntToUint8Array(this.from);
		const maxHeader = RangeKeysBase.bigIntToUint8Array(this.to);

		let key = "0x";
		for (let i = 0; i < minHeader.length; i++) {
			const byte = this.getRandomByte(minHeader[i], maxHeader[i]);
			key += byte.toString(16).padStart(2, "0");
		}

		return BigInt(key);
	}

	// Iterator
	[Symbol.iterator] = () => this;
}

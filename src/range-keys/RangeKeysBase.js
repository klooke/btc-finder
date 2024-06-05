export default class RangeKeysBase {
	constructor(range) {
		this.from = BigInt(range.from);
		this.to = BigInt(range.to);

		this.current = this.from;
	}

	static bigIntToBuffer(key) {
		if (typeof key !== "bigint") key = BigInt(key);

		key = key.toString(16).padStart(64, "0");

		let idx = 0;
		const bytes = [];
		for (let i = 0; i < key.length; i += 2) {
			bytes[idx++] = parseInt(key.substring(i, i + 2), 16);
		}

		return Buffer.from(bytes);
	}

	getRandomKey() {
		const min = RangeKeysBase.bigIntToBuffer(this.from);
		const max = RangeKeysBase.bigIntToBuffer(this.to);

		const key =
			"0x" +
			Array(min.length)
				.fill()
				.map((_, i) => {
					return Math.floor(Math.random() * (max[i] - min[i] + 1) + min[i])
						.toString(16)
						.padStart(2, "0");
				})
				.join("");

		return BigInt(key);
	}

	// Iterator
	[Symbol.iterator] = () => this;
}

export default class RangeKeys {
	constructor({ from, to, type }) {
		this.from = BigInt(from);
		this.to = BigInt(to);
		this.current = this.from;
	}

	#toBuffer(key) {
		if (typeof key !== "bigint") key = BigInt(key);

		key = key.toString(16).padStart(64, "0");

		let idx = 0;
		const bytes = [];
		for (let i = 0; i < key.length; i += 2) {
			bytes[idx++] = parseInt(key.substring(i, i + 2), 16);
		}

		return Buffer.from(bytes);
	}
	// Iterator
	[Symbol.iterator] = () => this;

	next() {
				if (this.current < this.to)
					return { value: this.#toBuffer(this.current++), done: false };
		return { done: true };
	}
}

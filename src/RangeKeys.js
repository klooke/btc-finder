export default class RangeKeys {
	constructor({ from, to, type }) {
		this.from = BigInt(from);
		this.to = BigInt(to);
		this.current = this.from;
		this.type = type;
		this.countKeys = -1;
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

	#generateRandomKey() {
		const min = this.#toBuffer(this.from);
		const max = this.#toBuffer(this.to);

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

	// Random Iterator
	#nextRandom() {
		this.current = this.#generateRandomKey();
		return { value: this.#toBuffer(this.current), done: false };
	}

	// Iterator
	[Symbol.iterator] = () => this;

	next() {
		switch (this.type) {
			case "random+sequential": {
				if (
					this.countKeys > 1000000 ||
					this.countKeys < 0 ||
					this.current > this.to
				) {
					this.countKeys = 0;
					this.current = this.#generateRandomKey();
				}

				this.countKeys++;
				return { value: this.#toBuffer(this.current++), done: false };
			}
			case "random":
				return this.#nextRandom();
			default: {
				if (this.current < this.to)
					return { value: this.#toBuffer(this.current++), done: false };
			}
		}

		return { done: true };
	}
}

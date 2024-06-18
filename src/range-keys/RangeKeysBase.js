export default class RangeKeysBase {
	constructor(range) {
		this.from = BigInt(range.from);
		this.to = BigInt(range.to);

		this.current = this.from;
	}

	_rangeKeyMax = 1_000_000;

	// Iterator
	[Symbol.iterator] = () => this;
}

export default class RangeKeysBase {
	_rangeKeyMax = 1_000_000;
	
	constructor(range) {
		this.from = BigInt(range.from);
		this.to = BigInt(range.to);

		this.current = this.from;
	}

	// Iterator
	[Symbol.iterator] = () => this;
}

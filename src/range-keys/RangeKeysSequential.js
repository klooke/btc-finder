import RangeKeysBase from "./RangeKeysBase.js";

export default class RangeKeysSequential extends RangeKeysBase {
	constructor(range) {
		super(range);
	}

	next() {
		if (this.current < this.to)
			return {
				value: RangeKeysBase.bigIntToBuffer(this.current++),
				done: false,
			};

		return { done: true };
	}
}

import RangeKeysBase from "./RangeKeysBase.js";

export default class RangeKeysRandom extends RangeKeysBase {
	constructor(range) {
		super(range);
	}

	next() {
		this.current = this.getRandomKey();

		return { value: RangeKeysBase.bigIntToBuffer(this.current), done: false };
	}
}

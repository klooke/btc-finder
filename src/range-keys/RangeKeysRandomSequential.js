import { bigIntToBuffer, getRandomKey } from "../Utils.js";
import RangeKeysBase from "./RangeKeysBase.js";

export default class RangeKeysRandomSequential extends RangeKeysBase {
	constructor(range) {
		super(range);

		this.countKeys = -1;
	}

	next() {
		if (
			this.countKeys > this._rangeKeyMax ||
			this.countKeys < 0 ||
			this.current > this.to
		) {
			this.countKeys = 0;
			this.current = getRandomKey(this.from, this.to);
		}

		this.countKeys++;
		return { value: bigIntToBuffer(this.current++), done: false };
	}
}

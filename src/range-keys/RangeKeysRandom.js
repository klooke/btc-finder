import { bigIntToBuffer, getRandomKey } from "../Utils.js";
import RangeKeysBase from "./RangeKeysBase.js";

export default class RangeKeysRandom extends RangeKeysBase {
	constructor(range) {
		super(range);
	}

	next() {
		this.current = getRandomKey(this.from, this.to);

		return { value: bigIntToBuffer(this.current), done: false };
	}
}

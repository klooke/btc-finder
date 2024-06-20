import { bigIntToBuffer, getRandomBigInt } from "../utils/index.js";
import RangeKeysBase from "./base.js";

export default class RangeKeysRandom extends RangeKeysBase {
	constructor(range) {
		super(range);
	}

	next() {
		this.current = getRandomBigInt(this.from, this.to);

		return { value: bigIntToBuffer(this.current), done: false };
	}
}

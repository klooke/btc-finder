import { bigIntToBuffer, getRandomBigInt } from "../Utils.js";
import { getRandomBigInt } from "../utils/randoms.js";
import RangeKeysBase from "./RangeKeysBase.js";

export default class RangeKeysRandom extends RangeKeysBase {
	constructor(range) {
		super(range);
	}

	next() {
		this.current = getRandomBigInt(this.from, this.to);

		return { value: bigIntToBuffer(this.current), done: false };
	}
}

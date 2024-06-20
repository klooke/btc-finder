import { bigIntToBuffer } from "../utils/index.js";
import RangeKeysBase from "./base.js";
export default class RangeKeysSequential extends RangeKeysBase {
	constructor(range) {
		super(range);
	}
	next() {
		if (this.current > this.to) return { done: true };

		return {
			value: bigIntToBuffer(this.current++),
			done: false,
		};
	}
}
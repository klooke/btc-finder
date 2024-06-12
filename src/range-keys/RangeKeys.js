import RangeKeysRandom from "./RangeKeysRandom.js";
import RangeKeysSequential from "./RangeKeysSequential.js";
import RangeKeysRandomSequential from "./RangeKeysRandomSequential.js";

export default class RangeKeys {
	constructor(type, range) {
		switch (type) {
			case "random":
				return new RangeKeysRandom(range);
			case "random_sequential":
				return new RangeKeysRandomSequential(range);
			default:
				return new RangeKeysSequential(range);
		}
	}
}

import RangeKeysRandom from "./random.js";
import RangeKeysSequential from "./sequential.js";
import RangeKeysRandomSequential from "./random-sequential.js";

export default class RangeKeys {
	constructor(type, range) {
		switch (type) {
			case "random":
				return new RangeKeysRandom(range);
			case "random_sequential":
				return new RangeKeysRandomSequential(range);
			case "sequential":
			default:
				return new RangeKeysSequential(range);
		}
	}
}

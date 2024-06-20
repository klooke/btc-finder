import { bigIntToBuffer, loadData, saveData } from "../utils/index.js";
import RangeKeysBase from "./base.js";

const fileData = "./last-key.txt";

export default class RangeKeysSequential extends RangeKeysBase {
	constructor(range) {
		super(range);

		const { current } = loadData(fileData);

		if (current !== undefined) this.current = BigInt(current);

		process.on("exit", (code) => saveData(fileData, this.progress()));
	}
	next() {
		if (this.current > this.to) return { done: true };

		return {
			value: bigIntToBuffer(this.current++),
			done: false,
		};
	}
}

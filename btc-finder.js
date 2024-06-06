import { readFileSync } from "fs";
import SearchEngine from "./src/SearchEngine.js";
import * as RangeKeys from "./src/range-keys/RangeKeys.js";

async function main() {
	const { wallet, range, type } = loadConfig();

	const search = new SearchEngine();
	const rangeKeys = new RangeKeys[type](range);

	if (await search.searchWallet(wallet, rangeKeys)) {
		const data = search.result();
		console.log(`\n Carteira encontrada!!! -> ${data.publicAddress}`);
	}
}

function loadConfig() {
	return JSON.parse(readFileSync("./config.json"));
}

export default main();

//var searchEngine = require("./src/SearchEngine");
import { readFileSync } from "fs";
import SearchEngine from "./src/SearchEngine.js";
import * as RangeKeys from "./src/range-keys/RangeKeys.js";

function main() {
	const config = loadConfig();
	const search = new SearchEngine();

	search.searchWallet(config.wallet, new RangeKeys[config.type](config.range));
}

function loadConfig() {
	return JSON.parse(readFileSync("./config.json"));
}

export default main();

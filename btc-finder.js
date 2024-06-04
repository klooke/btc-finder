//var searchEngine = require("./src/SearchEngine");
import { readFileSync } from "fs";
import SearchEngine from "./src/SearchEngine.js";
import RangeKeys from "./src/RangeKeys.js";

function main() {
	const config = loadConfig();
	const search = new SearchEngine();

	search.searchWallet(config.wallet, new RangeKeys(config.range));
}

function loadConfig() {
	return JSON.parse(readFileSync("./config.json"));
}

export default main();

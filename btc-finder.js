import { readFileSync, writeFileSync } from "fs";

import SearchEngine from "./src/search-engine/SearchEngine.js";
import RangeKeys from "./src/range-keys/RangeKeys.js";

async function main() {
	const { wallet, range, type } = loadConfig();

	const search = new SearchEngine(6);
	const rangeKeys = new RangeKeys(type, range);

	if (await search.searchWallet(wallet, rangeKeys)) {
		const data = search.result();
		console.log(`\n Carteira encontrada!!! -> ${data.publicAddress}`);

		saveData(`./wallets-found/${data.publicAddress}.txt`, data);

		process.exit(0);
	}
}

function loadConfig() {
	return JSON.parse(readFileSync("./config.json"));
}

function saveData(path, data) {
	writeFileSync(path, JSON.stringify(data));
}

export default main();

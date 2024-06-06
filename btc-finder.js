import { readFileSync, writeFileSync } from "fs";
import SearchEngine from "./src/SearchEngine.js";
import * as RangeKeys from "./src/range-keys/RangeKeys.js";

async function main() {
	const { wallet, range, type } = loadConfig();

	const search = new SearchEngine();
	const rangeKeys = new RangeKeys[type](range);

	if (await search.searchWallet(wallet, rangeKeys)) {
		const data = search.result();
		console.log(`\n Carteira encontrada!!! -> ${data.publicAddress}`);
		
		saveData(`./wallets-found/${data.publicAddress}.txt`, data);
	}
}

function loadConfig() {
	return JSON.parse(readFileSync("./config.json"));
}

function saveData(path, data) {
	writeFileSync(path, JSON.stringify(data));
}

export default main();

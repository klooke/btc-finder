
import SearchEngine from "./src/search-engine/SearchEngine.js";
import RangeKeys from "./src/range-keys/RangeKeys.js";
import { loadData, saveData } from "./src/utils/file.js";

async function main() {
	const { wallet, range, type } = loadData("./config.json");

	const search = new SearchEngine(6);
	const rangeKeys = new RangeKeys(type, range);

	if (await search.searchWallet(wallet, rangeKeys)) {
		const data = search.result();
		console.log(`\n Carteira encontrada!!! -> ${data.publicAddress}`);

		saveData(`./wallets-found/${data.publicAddress}.txt`, data);

		process.exit(0);
	}
}

export default main();

import SearchEngine from "../search-engine/index.js";
import RangeKeys from "../range-keys/index.js";
import { loadData, saveData } from "../utils/index.js";
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

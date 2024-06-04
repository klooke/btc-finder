import CoinKey from "coinkey";

export default class SearchEngine {
	#equals(wallet, genWallet) {
		if (wallet === "" || typeof wallet !== "string") return false;
		else if (genWallet === "" || typeof genWallet !== "string") return false;
		return wallet === genWallet;
	}

	#generateWallet(privateKey) {
		const _key = new CoinKey(privateKey);
		_key.compressed = true;
		return _key.publicAddress;
	}

	searchWallet(wallet, range) {
		for (const key of range) {
			const genWallet = this.#generateWallet(key);

			console.log(key.toString("hex"), genWallet);

			if (this.#equals(wallet, genWallet)) {
				console.log(`Key encontrada: ${key.toString("hex")} ${genWallet}`);

				break;
			}
		}
	}
}

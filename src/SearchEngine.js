import CoinKey from "coinkey";

export default class SearchEngine {
	#timer = 0;
	#counterKeys = 0;
	#data = {
		lastKey: "",
		genWallet: "",

		set(keyBuffer, genWallet) {
			this.lastKey = keyBuffer.toString("hex");
			this.genWallet = genWallet;
		},
	};

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

	// Every 1000 ms, mark how many keys were covered!
	#perfomanceCount() {
		this.#counterKeys++;

		if (performance.now() - this.#timer > 1000) {
			console.clear();
			console.log(this.toString(), `(${this.#counterKeys} keys\\s)`);

			this.#counterKeys = 0;
			this.#timer = performance.now();
		}
	}

	async searchWallet(wallet, range) {
		this.#timer = performance.now();

		for (const key of range) {
			const genWallet = this.#generateWallet(key);

			this.#data.set(key, genWallet);

			if (this.#equals(wallet, genWallet)) return true;

			this.#perfomanceCount();
		}

		return false;
	}

	result() {
		return {
			privateKey: this.#data.lastKey,
			publicAddress: this.#data.genWallet,
		};
	}

	toString() {
		return `${this.#data.lastKey} -> ${this.#data.genWallet}`;
	}
}

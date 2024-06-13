import CoinKey from "coinkey";

export default class SearchEngine {
	#timer = 0;
	#countKeys = 0;
	#data = {
		lastPrivKey: "",
		lastPubKey: "",

		set(keyBuffer, publicAddress) {
			this.lastPrivKey = keyBuffer.toString("hex");
			this.lastPubKey = publicAddress;
		},
	};

	#equals(stringA, stringB) {
		if (typeof stringA !== "string") JSON.stringify(stringA);
		if (typeof stringB !== "string") JSON.stringify(stringB);
		return stringA === stringB;
	}

	#generateWallet(privateKey) {
		const wallet = new CoinKey(privateKey);
		wallet.compressed = true;
		return wallet;
	}

	// Every 1000 ms, mark how many keys were covered!
	#perfomanceCount() {
		this.#countKeys++;

		if (performance.now() - this.#timer > 1000) {
			console.clear();
			console.log(this.toString(), `(${this.#countKeys} keys\\s)`);

			this.#countKeys = 0;
			this.#timer = performance.now();
		}
	}

	async searchWallet(wallet, range) {
		this.#timer = performance.now();

		for (const privateKey of range) {
			const { publicAddress } = this.#generateWallet(privateKey);

			this.#data.set(privateKey, publicAddress);

			if (this.#equals(wallet, publicAddress)) return true;

			this.#perfomanceCount();
		}

		return false;
	}

	result() {
		return {
			privateKey: this.#data.lastPrivKey,
			publicAddress: this.#data.lastPubKey,
		};
	}

	toString() {
		return `${this.#data.lastPrivKey} -> ${this.#data.lastPubKey}`;
	}
}

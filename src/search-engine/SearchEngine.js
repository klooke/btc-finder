import WorkerManager from "./WorkerManager.js";

export default class SearchEngine extends WorkerManager {
	constructor(numThreads = 1) {
		if (typeof numThreads !== "number" || numThreads <= 0) numThreads = 1;
		super("./src/search-engine/SearchEngineWorker.js", numThreads);
	}

	#timer = 0;
	#countKeys = 0;
	#data = {
		lastPrivKey: "",
		lastPubAddress: "",

		set(privateKey, publicAddress) {
			this.lastPrivKey = Buffer.from(privateKey).toString("hex");
			this.lastPubAddress = publicAddress;
		},
	};
	#resolve = [];
	#found = false;

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

	_onMessage({ workerID, privateKey, publicAddress, isMatch }) {
		this.#resolve[workerID]();

		if (this.#found) return;

		this.#data.set(privateKey, publicAddress);

		this.#perfomanceCount();

		this.#found = isMatch;
	}

	async searchWallet(wallet, range) {
		this.#timer = performance.now();

		let done = false;
		while (!done) {
			const promises = [];
			for (let i = 0; i < this.workers.length; i++) {
				const privateKey = range.next();

				if ((done = privateKey.done)) break;

				promises.push(
					new Promise((resolve) => {
						this.#resolve[this.workerID] = resolve;

						this.postMessage({
							workerID: this.workerID,
							privateKey: privateKey.value,
							wallet,
						});
					})
				);
			}

			await Promise.all(promises);

			if (this.#found) return true;
		}

		return false;
	}

	result() {
		return {
			privateKey: this.#data.lastPrivKey,
			publicAddress: this.#data.lastPubAddress,
		};
	}

	toString() {
		return `${this.#data.lastPrivKey} -> ${this.#data.lastPubAddress}`;
	}
}

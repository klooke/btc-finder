import { Worker } from "worker_threads";

export default class WorkerManager {
	constructor(workerFile, numWorkers) {
		this.workerFile = workerFile;
		this.workerID = 0;
		this.workers = [];

		this.#init(numWorkers);
	}

	#init(numWorkers) {
		for (let i = 0; i < numWorkers; i++) {
			const worker = new Worker(this.workerFile);
			worker.on("message", this._onMessage.bind(this));
			worker.on("messageerror", this._onError.bind(this));
			worker.on("error", this._onError.bind(this));

			this.workers.push(worker);
		}
	}

	_onMessage(value) {
		console.log(value);
	}

	_onError(err) {
		console.error(err);

		process.exit(1);
	}

	postMessage(data) {
		this.workers[this.workerID++].postMessage(data);
		this.workerID %= this.workers.length;
	}
}

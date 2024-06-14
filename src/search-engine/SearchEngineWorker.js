import { parentPort } from "worker_threads";
import CoinKey from "coinkey";

function generateWallet(privateKey) {
	const wallet = new CoinKey(privateKey);
	wallet.compressed = true;
	return wallet;
}

function equals(stringA, stringB) {
	if (typeof stringA !== "string") JSON.stringify(stringA);
	if (typeof stringB !== "string") JSON.stringify(stringB);
	return stringA === stringB;
}

function executeTask(workerID, privateKey, wallet) {
	const { publicAddress } = generateWallet(privateKey);
	const isMatch = equals(wallet, publicAddress);

	parentPort?.postMessage({ workerID, privateKey, publicAddress, isMatch });
}

parentPort?.on("message", ({ workerID, privateKey, wallet }) => {
	executeTask(workerID, privateKey, wallet);
});

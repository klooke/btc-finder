const CoinKey = require("coinkey");
const Cache = require("./btc-cache");

const wallet = "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so";
const cache = new Cache();
const switchTimer = 180 * 1000; // milesegundos.

async function searchWallet({ min: minKey, max: maxKey }, wallet) {
	let _curKey = minKey;
	let _timer = 0; // milesegundos.

	while (true) {
		_curKey += BigInt(1);

		let _privKey = _curKey.toString(16).padStart(64, "0");
		let _pubKey = generatePublic(_privKey);

		console.log(_privKey, _pubKey);

		if (_curKey > maxKey || _timer > switchTimer) break; // Entra no modo recursivo.

		if (_pubKey == wallet) {
			await cache.makeBackup(_curKey, maxKey); // salva o backup

			console.log("ACHEI!!!! 🎉🎉🎉🎉🎉");

			await Cache.saveData("./wallet-found.txt", {
				wallet: wallet,
				public: _pubKey,
				private: _privKey,
			});

			return; // Encerra o programa.
		}

		_timer++;
	}

	await cache.makeBackup(_curKey, maxKey); // salva o backup

	// Modo recursivo, carrega outra range no arquivo cache.
	searchWallet(cache.getRandomRange(), wallet);
}

function generatePublic(privateKey) {
	let _key = new CoinKey(Buffer.from(privateKey, "hex"));
	_key.compressed = true;
	return _key.publicAddress;
}


module.exports = searchWallet(cache.getRandomRange(), wallet);

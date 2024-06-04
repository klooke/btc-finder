const CoinKey = require("coinkey");

const min = 0x2126875fd00000000
const max = 0x3ffffffffffffffff
const wallet = "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so";

function searchWallet({ min: minKey, max: maxKey }, wallet) {
	let _curKey = minKey;

	while (true) {
		_curKey += BigInt(1);

		let _privKey = _curKey.toString(16).padStart(64, "0");
		let _pubKey = generatePublic(_privKey);

		console.log(_privKey, _pubKey);


		if (_pubKey == wallet) {
			console.log("ACHEI!!!! 🎉🎉🎉🎉🎉");
			return; // Encerra o programa.
		}
	}
}

function toBuffer(key) {
	if (typeof key !== "bigint") key = BigInt(key);

	key = key.toString(16).padStart(64, "0");

	let idx = 0;
	const bytes = [];
	for (let i = 0; i < key.length; i += 2) {
		bytes[idx++] = parseInt(key.substring(i, i + 2), 16);
	}

	return Buffer.from(bytes);
}

function generatePublic(privateKey) {
	const buffeKey = toBuffer(privateKey);
	
	let _key = new CoinKey(buffeKey);
	_key.compressed = true;
	return _key.publicAddress;
}


module.exports = searchWallet({min, max}, wallet);

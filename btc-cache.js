var fs = require("fs");

const path = "./cache.json";
const min = BigInt(0x20000000000000000n);
const max = BigInt(0x3ffffffffffffffffn);

class Cache {
	constructor(size = 255) {
		if (!(this instanceof Cache)) return new Cache(size);

		this._idx = 0;
		this._size = size;
	}
	static rangeHexToBigInt(min, max) {
		return {
			min: BigInt(min),
			max: BigInt(max),
		};
	}
	static rangeBigIntToHex(min, max) {
		return {
			min: "0x" + min.toString(16),
			max: "0x" + max.toString(16),
		};
	}
	static generate(path, minKey, maxKey, numRange) {
		const _size = (maxKey - minKey) / BigInt(numRange);
		const _cache = { keys: [] };

		let _min = minKey;
		let _max = minKey + _size;

		for (var i = 0; i < numRange; i++) {
			let _fixedMax = _max - BigInt(1);

			_cache.keys[i] = Cache.rangeBigIntToHex(_min, _fixedMax);

			_min = _max;
			_max += _size;
		}

		Cache.saveData(path, _cache);
		return _cache;
	}
	static loadData(path) {
		return JSON.parse(fs.readFileSync(path));
	}
	static async saveData(path, data) {
		let _strData = typeof data === "string" ? data : JSON.stringify(data);

		try {
			await fs.promises.writeFile(path, _strData);
			console.log(" - Salvo com sucesso!");
		} catch (error) {
			console.error(" - Ocorreu um erro ao salvar ", error.code);
		}
	}
	getRandomRange() {
		this._idx = Math.floor(Math.random() * this._size);

		let { min, max } = this._getData().keys[this._idx];

		return Cache.rangeHexToBigInt(min, max);
	}
	async makeBackup(min, max) {
		let _tmpData = this._getData();

		_tmpData.keys[this._idx] = Cache.rangeBigIntToHex(min, max);

		await Cache.saveData(path, _tmpData);
	}
	_getData() {
		if (fs.existsSync(path)) return Cache.loadData(path);
		else return Cache.generate(path, min, max, this._size);
	}
}

module.exports = Cache;

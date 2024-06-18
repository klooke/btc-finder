import { readFileSync, writeFileSync } from "fs";

export function loadData(path) {
	return JSON.parse(readFileSync(path));
}

export function saveData(path, data) {
	writeFileSync(path, JSON.stringify(data));
}

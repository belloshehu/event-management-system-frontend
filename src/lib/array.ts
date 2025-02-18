export function arrayRotate(arr: any[]) {
	arr.push(arr.shift());
	return arr;
}

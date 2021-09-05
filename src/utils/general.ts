export function groupBy<T>(xs: T[], key) {
	return xs.reduce((rv, x) => {
		const v = key instanceof Function ? key(x) : x[key];
		(rv[v] = rv[v] || []).push(x);
		return rv;
	}, {});
}

export const uniqueHour = (date: Date) =>
	`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}`;

export function average(xs: number[]): number {
	return sum(xs) / xs.length;
}

export function sum(xs: number[]): number {
	return xs.reduce((acc, x) => acc + x, 0);
}

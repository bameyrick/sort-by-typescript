export function sort(property: string, map?: Function): any {
	let sortOrder = 1;

	if (property[0] === '-') {
		sortOrder = -1;
		property = property.substr(1);
	}

	const apply =
		map ||
		function(_key: string, value: any): any {
			return value;
		};

	return (a: any, b: any): number => {
		let result: number = 0;

		const mappedA = apply(property, objectPath(a, property));
		const mappedB = apply(property, objectPath(b, property));

		if (mappedA < mappedB) {
			result = -1;
		} else if (mappedA > mappedB) {
			result = 1;
		}

		return result * sortOrder;
	};
}

export function sortBy(...properties: Array<string | Function>): any {
	return (obj1: any, obj2: any): number => {
		const props = <string[]>properties.filter(prop => typeof prop === 'string');
		const map = <Function>properties.filter(prop => typeof prop === 'function')[0];
		let i = 0;
		let result = 0;

		const numberOfProperties = props.length;

		while (result === 0 && i < numberOfProperties) {
			result = sort(props[i], map)(obj1, obj2);
			i++;
		}

		return result;
	};
}

function objectPath(object: Object, path: string): any {
	const pathParts = path.split('.');

	let result: any = object;

	pathParts.forEach(part => {
		result = result[part];
	});

	return result;
}

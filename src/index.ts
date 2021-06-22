export type SortMappingFunction = (_key: string, value: any) => any;

/**
 * Sorts an array of items by a given property keys. {@link https://github.com/bameyrick/sort-by-typescript#readme | View documentation}
 */
export function sortBy(...properties: Array<string | SortMappingFunction>): (obj1: any, obj2: any) => number {
  return (obj1: any, obj2: any): number => {
    let props = properties.filter(prop => typeof prop === 'string') as string[];
    const map = properties.filter(prop => typeof prop === 'function')[0] as typeof Function;

    let i = 0;
    let result = 0;

    if (props.length) {
      props = props.map(prop => (prop.replace('-', '').length ? prop : '-^'));
    } else {
      props = ['^'];
    }

    const numberOfProperties = props.length;

    while (result === 0 && i < numberOfProperties) {
      result = sort(props[i], map)(obj1, obj2);
      i++;
    }

    return result;
  };
}

/**
 * Does the sort calculation for an item
 */
function sort(property: string, map?: SortMappingFunction): any {
  let sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  if (property[property.length - 1] === '^') {
    property = property.substr(0, property.length - 1);

    map = (_key: string, value: any): any => (typeof value === 'string' ? value.toLowerCase() : value);
  }

  let apply: SortMappingFunction;

  if (map) {
    apply = map;
  } else {
    apply = (_key: string, value: any): any => value;
  }

  return (a: any, b: any): number => {
    let result: number = 0;

    const mappedA = cast(apply(property, property ? objectPath(a, property) : a));
    const mappedB = cast(apply(property, property ? objectPath(b, property) : b));

    if (mappedA < mappedB) {
      result = -1;
    } else if (mappedA > mappedB) {
      result = 1;
    }

    return result * sortOrder;
  };
}

/**
 * Navigates to the part of the object using the path provided
 */
function objectPath(object: object, path: string): any {
  const pathParts = path.split('.');

  let result: any = object;

  pathParts.forEach(part => {
    result = result[part] || '';
  });

  return result;
}

/**
 * Takes a value and casts it for more effective sorting.
 */
function cast(value: any): any {
  // If the value is a number as a string, cast back to an actual number to sort
  if (typeof value === 'string' && !!value.trim().length && !isNaN(value as any)) {
    return parseFloat(value);
  }

  return value;
}

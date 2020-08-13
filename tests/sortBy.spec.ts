import { sortBy } from '../src';

/**
 * Maps a result to a string
 */
// tslint:disable-next-line: no-any
function toString(array: any[]): string {
  return array
    .map(item => {
      let result = `${item.x}-${item.y}`;

      if (array[0].z) {
        result = `${result}-${item.z.a}-${item.z.b}`;
      }
      return result;
    })
    .join('-');
}

describe('sortBy() ', () => {
  it('returns a function', () => {
    // Arrange
    const expected = 'function';

    const result = typeof sortBy();

    // Assert
    expect(result).toBe(expected);
  });
});

describe('sortBy(prop) ', () => {
  it('sorts an array of objects by a property', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
      { x: '', y: 7 },
      { x: undefined, y: 6 },
      { x: null, y: 5 },
    ];

    const expected = [
      { x: '', y: 7 },
      { x: undefined, y: 6 },
      { x: null, y: 5 },
      { x: 'a', y: 4 },
      { x: 'b', y: 2 },
      { x: 'b', y: 1 },
      { x: 'b', y: 3 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
    ];

    const result = source.sort(sortBy('x'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array of objects by a property in reverse', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
      { x: '', y: 7 },
      { x: undefined, y: 6 },
      { x: null, y: 5 },
    ];

    const expected = [
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 2 },
      { x: 'b', y: 1 },
      { x: 'b', y: 3 },
      { x: 'a', y: 4 },
      { x: '', y: 7 },
      { x: undefined, y: 6 },
      { x: null, y: 5 },
    ];

    const result = source.sort(sortBy('-x'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array of objects by a property in reverse (number)', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
      { x: '', y: 7 },
      { x: undefined, y: 6 },
      { x: null, y: 5 },
    ];

    const expected = [
      { x: '', y: 7 },
      { x: undefined, y: 6 },
      { x: null, y: 5 },
      { x: 'a', y: 4 },
      { x: 'b', y: 3 },
      { x: 'b', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'b', y: 1 },
      { x: 'c', y: 1 },
    ];

    const result = source.sort(sortBy('-y^'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array case-insensitively by applying a function', () => {
    // Arrange
    const source = [
      { x: 'B', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'C', y: 2 },
      { x: 'c', y: 2 },
      { x: 'C', y: 1 },
      { x: 'b', y: 3 },
    ];

    const expected = [
      { x: 'a', y: 4 },
      { x: 'B', y: 2 },
      { x: 'b', y: 1 },
      { x: 'b', y: 3 },
      { x: 'C', y: 2 },
      { x: 'c', y: 2 },
      { x: 'C', y: 1 },
    ];

    const result = source.sort(
      sortBy('x', (_key, value) => {
        if (typeof value === 'string') {
          return value.toLowerCase();
        } else {
          return value;
        }
      })
    );

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array case-insensitively by using ^ operator', () => {
    // Arrange
    const source = [
      { x: 'B', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'C', y: 2 },
      { x: 'c', y: 2 },
      { x: 'C', y: 1 },
      { x: 'b', y: 3 },
    ];

    const expected = [
      { x: 'a', y: 4 },
      { x: 'B', y: 2 },
      { x: 'b', y: 1 },
      { x: 'b', y: 3 },
      { x: 'C', y: 2 },
      { x: 'c', y: 2 },
      { x: 'C', y: 1 },
    ];

    const result = source.sort(sortBy('x^'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });
});

describe('sortBy(prop, prop) ', () => {
  it('sorts an array of objects by multiple properties (ascending, ascending)', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
    ];

    const expected = [
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'b', y: 2 },
      { x: 'b', y: 3 },
      { x: 'c', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
    ];

    const result = source.sort(sortBy('x', 'y'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array of objects by multiple properties (descending, ascending)', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
    ];

    const expected = [
      { x: 'c', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'b', y: 1 },
      { x: 'b', y: 2 },
      { x: 'b', y: 3 },
      { x: 'a', y: 4 },
    ];

    const result = source.sort(sortBy('-x', 'y'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array of objects by multiple properties (ascending, descending)', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
    ];

    const expected = [
      { x: 'a', y: 4 },
      { x: 'b', y: 3 },
      { x: 'b', y: 2 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
    ];

    const result = source.sort(sortBy('x', '-y'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array of objects by multiple properties (descending, descending)', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2 },
      { x: 'a', y: 4 },
      { x: 'b', y: 1 },
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
    ];

    const expected = [
      { x: 'c', y: 2 },
      { x: 'c', y: 2 },
      { x: 'c', y: 1 },
      { x: 'b', y: 3 },
      { x: 'b', y: 2 },
      { x: 'b', y: 1 },
      { x: 'a', y: 4 },
    ];

    const result = source.sort(sortBy('-x', '-y'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });
});

describe('sortBy(prop.prop) ', () => {
  it('sorts an array of objects by a nested property', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
    ];

    const expected = [
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
    ];

    const result = source.sort(sortBy('z.a'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array of objects by a nested property descending', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
    ];

    const expected = [
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
    ];

    const result = source.sort(sortBy('-z.a'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });
});

describe('sortBy(prop, prop.prop) ', () => {
  it('sorts an array of objects by a property and a nested property (ascending, ascending)', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
    ];

    const expected = [
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
    ];

    const result = source.sort(sortBy('y', 'z.a'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });

  it('sorts an array of objects by a property and a nested property (descending, descending)', () => {
    // Arrange
    const source = [
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
    ];

    const expected = [
      { x: 'c', y: 2, z: { a: 2, b: 'z' } },
      { x: 'c', y: 2, z: { a: 4, b: 'z' } },
      { x: 'c', y: 1, z: { a: 3, b: 'y' } },
      { x: 'b', y: 1, z: { a: 3, b: 'y' } },
      { x: 'a', y: 4, z: { a: 1, b: 'y' } },
      { x: 'b', y: 2, z: { a: 3, b: 'x' } },
      { x: 'b', y: 3, z: { a: 3, b: 'x' } },
    ];

    const result = source.sort(sortBy('-z.b', '-x'));

    // Assert
    expect(toString(result)).toBe(toString(expected));
  });
});

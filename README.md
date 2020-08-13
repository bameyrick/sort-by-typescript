# sort-by-typescript

[![GitHub release](https://img.shields.io/github/release/bameyrick/sort-by-typescript.svg)](https://github.com/bameyrick/sort-by-typescript/releases)
[![Travis tests](https://img.shields.io/travis/bameyrick/sort-by-typescript.svg)](https://travis-ci.org/bameyrick/sort-by-typescript)
[![codecov](https://codecov.io/gh/bameyrick/sort-by-typescript/branch/master/graph/badge.svg)](https://codecov.io/gh/bameyrick/sort-by-typescript)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8b6d49c17ee647c6a356318c3d8da6b9)](https://www.codacy.com/manual/bameyrick/sort-by-typescript)

## Install

You can install via npm or yarn.

### npm

```bash
npm install --save sort-by-typescript
```

### yarn

```bash
yarn add sort-by-typescript
```

## Usage

### Importing

You can import using ES6 imports. If you are using typescript this package includes a typings file.

```typescript
import { sortBy } from 'sort-by-typescript';
```

### Examples

In all examples this array of customers will be used.

```typescript
const customers = [
  {
    id: 0,
    name: 'Bob',
    age: 33,
    contactDetails: {
      email: 'Bob@gmail.com',
    },
  },
  {
    id: 1,
    name: 'Alex',
    age: 45,
    contactDetails: {
      email: 'alex@gmail.com',
    },
  },
  {
    id: 2,
    name: 'Alex',
    age: 20,
    contactDetails: {
      email: 'Alex@gmail.com',
    },
  },
];
```

## sortBy(prop)

To sort by name in ascending order:

```typescript
customers.sort(sortBy('name'));

/* Result
[
	{
		id: 1,
		name: 'Alex',
		age: 45,
		contactDetails: {
			email: 'alex@gmail.com',
		},
	},
	{
		id: 2,
		name: 'Alex',
		age: 20,
		contactDetails: {
			email: 'Alex@gmail.com',
		},
	},
	{
		id: 0,
		name: 'Bob',
		age: 33,
		contactDetails: {
			email: 'Bob@gmail.com',
		},
	},
]
*/
```

To sort by age in descending order:

```typescript
customers.sort(sortBy('-age'));

/* Result
[
	{
		id: 1,
		name: 'Alex',
		age: 45,
		contactDetails: {
			email: 'alex@gmail.com',
		},
	},
	{
		id: 0,
		name: 'Bob',
		age: 33,
		contactDetails: {
			email: 'Bob@gmail.com',
		},
	},
	{
		id: 2,
		name: 'Alex',
		age: 20,
		contactDetails: {
			email: 'Alex@gmail.com',
		},
	},
]
*/
```

## sortBy(prop, prop)

To sort by name then age ascending order:

```typescript
customers.sort(sortBy('name', 'age'));

/* Result
[
	{
		id: 2,
		name: 'Alex',
		age: 20,
		contactDetails: {
			email: 'Alex@gmail.com',
		},
	},
	{
		id: 1,
		name: 'Alex',
		age: 45,
		contactDetails: {
			email: 'alex@gmail.com',
		},
	},
	
	{
		id: 0,
		name: 'Bob',
		age: 33,
		contactDetails: {
			email: 'Bob@gmail.com',
		},
	},	
]
*/
```

To sort by name descending order then age ascending order:

```typescript
customers.sort(sortBy('-name', 'age'));

/* Result
[
	{
		id: 0,
		name: 'Bob',
		age: 33,
		contactDetails: {
			email: 'Bob@gmail.com',
		},
	},
	{
		id: 2,
		name: 'Alex',
		age: 20,
		contactDetails: {
			email: 'Alex@gmail.com',
		},
	},
	{
		id: 1,
		name: 'Alex',
		age: 45,
		contactDetails: {
			email: 'alex@gmail.com',
		},
	},	
]
*/
```

## sortBy(prop.prop)

To sort by nested prop:
_(Note: uppercase letters will be sorted before lowercase letters)_

```typescript
customers.sort(sortBy('contactDetails.email'));

/* Result
[
	{
		id: 2,
		name: 'Alex',
		age: 20,
		contactDetails: {
			email: 'Alex@gmail.com',
		},
	},
	{
		id: 0,
		name: 'Bob',
		age: 33,
		contactDetails: {
			email: 'Bob@gmail.com',
		},
	},
	{
		id: 1,
		name: 'Alex',
		age: 45,
		contactDetails: {
			email: 'alex@gmail.com',
		},
	},
]
*/
```

## sortBy - case insensitive

As we saw above, sorting the email addresses did not necessarily return the result we expected, because uppercase letters are sorted before lowecase letters. To combat this we can add a `^` to the end of our prop.

```typescript
customers.sort(sortBy('contactDetails.email^'));

/* Result
[
	{
		id: 1,
		name: 'Alex',
		age: 45,
		contactDetails: {
			email: 'alex@gmail.com',
		},
	},
	{
		id: 2,
		name: 'Alex',
		age: 20,
		contactDetails: {
			email: 'Alex@gmail.com',
		},
	},
	{
		id: 0,
		name: 'Bob',
		age: 33,
		contactDetails: {
			email: 'Bob@gmail.com',
		},
	},
]
*/
```

## sortBy - passing in a function to modify values before sorting

You can also pass in functions to modify our sort values before sorting.
In this example we pass in our own function to do a case insensitive sort;

```typescript
customers.sort(
  sortBy('contactDetails.email', (_key, value) => {
    if (typeof value === 'string') {
      return value.toLowerCase();
    } else {
      return value;
    }
  })
);

/* Result
[
	{
		id: 1,
		name: 'Alex',
		age: 45,
		contactDetails: {
			email: 'alex@gmail.com',
		},
	},
	{
		id: 2,
		name: 'Alex',
		age: 20,
		contactDetails: {
			email: 'Alex@gmail.com',
		},
	},
	{
		id: 0,
		name: 'Bob',
		age: 33,
		contactDetails: {
			email: 'Bob@gmail.com',
		},
	},
]
*/
```

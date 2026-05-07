# Building Reusable, Strictly Typed Code with Generics in TypeScript

## Introduction

Modern applications deal with many different data shapes: arrays of numbers, lists of users, API responses, and more. Without a good abstraction, you might end up copying the same function logic for each type, which leads to duplication and bugs. TypeScript’s generics let you write a single reusable function or component that adapts to whatever type you pass in while staying fully type safe.

In this post, we will explore how generics work, see how they help you avoid duplication, and look at some practical examples with functions, interfaces, and classes.

## What Are Generics?

Generics are like “type parameters” for functions, interfaces, and classes. Just as a function can accept a value parameter, it can also accept a type parameter. Instead of fixing a specific type, you write the function once and let the caller decide the concrete type.

```ts
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);   // T is number
const str = identity<string>("Hi"); // T is string
```

Here, `T` is a placeholder for “some type.” When we call `identity<number>`, `T` becomes `number`, and when we call `identity<string>`, `T` becomes `string`. TypeScript infers types in most cases, so you can often skip explicit `<number>` or `<string>`.

```ts
const num2 = identity(10);      // T inferred as number
const text = identity("Hello"); // T inferred as string
```

This gives you one implementation that stays type safe for many types.

## Generic Functions in Practice

Generics are especially useful for common operations like working with arrays. For example, imagine writing a function that returns the first element of an array:

```ts
function firstElement<T>(list: T[]): T | undefined {
  return list;
}

const firstNumber = firstElement([1][2][3]);          // number | undefined
const firstUser = firstElement([{ id: 1 }, { id: 2 }]); // { id: number } | undefined
```

Because of the generic `T`, TypeScript knows that:

- If you pass `number[]`, the return type is `number | undefined`.
- If you pass `{ id: number }[]`, the return type is `{ id: number } | undefined`.

You do not need multiple functions like `firstNumber`, `firstUser`, etc. One generic function covers all cases with precise types.

You can also add constraints using `extends` when you need certain properties:

```ts
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const users = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
];

const user = findById(users, 2); // user is { id: number; name: string } | undefined
```

The constraint `T extends HasId` means “T must at least have an `id: number` property.” Anything more is allowed, and TypeScript preserves the full shape of the item.

## Generics with Interfaces and Types

Generics are not just for functions. You can use them with interfaces and type aliases to create reusable data shapes.

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

type User = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
};

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  success: true,
};

const productResponse: ApiResponse<Product> = {
  data: { id: 10, title: "Keyboard" },
  success: true,
};
```

In this example, `ApiResponse<T>` can wrap any data type you need:

- `ApiResponse<User>` for user endpoints.
- `ApiResponse<Product>` for product endpoints.
- `ApiResponse<string[]>` if your API returns a list of strings.

You keep one base response shape and plug different types into it as needed.

## Generic Classes

Classes can also be generic, which is useful for building reusable containers or services.

```ts
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);

const userStore = new DataStore<{ id: number; name: string }>();
userStore.add({ id: 1, name: "Alice" });
userStore.add({ id: 2, name: "Bob" });

const users = userStore.getAll(); // { id: number; name: string }[]
```

Here, `DataStore<T>` is one class, but:

- `DataStore<number>` holds numbers.
- `DataStore<{ id: number; name: string }>` holds users.

You get strong typing and IntelliSense for each specific instance without repeating class logic.

## Combining Generics with Utility Types

Generics also power many built-in TypeScript utility types like `Array<T>`, `Promise<T>`, `Record<K, T>`, and more. For example:

```ts
const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => resolve("Done"), 1000);
});

type UserMap = Record<number, string>; // key: user ID, value: user name

const usersById: UserMap = {
  1: "Alice",
  2: "Bob",
};
```

By understanding generics, you automatically become more comfortable with these utilities and can create similar patterns in your own codebase.

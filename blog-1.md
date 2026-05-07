# Why `any` Is a Type Safety Hole and Why `unknown` Is Safer

## Introduction

In real world we work with dynamic data, or user input, you often do not know the exact type of the data at run time. In TypeScript, many developers reach for the `any` type to bypass errors and “make it work.” Though, `any` disables type checking entirely on that value and turns off one of the biggest benefits of TypeScript: safety and tooling. In contrast, `unknown` lets you represent unpredictable data while still forcing you to prove what it is before using it.

Today, we will see why `any` is considered a type safety hole, why `unknown` is safer.

## The Problem with `any`

The `any` type tells TypeScript: “Trust me, I know what I’m doing.” Once you mark a value as `any`, the compiler stops checking what you do with it. You can call any method, access any property, and pass it anywhere, even when it makes no sense.

```ts
let data: any;

data = "Hello";
data.toFixed(2); // No error at compile time, but will crash at runtime

data = 42;
data.toUpperCase(); // Also no compile-time error
```

In the example above, `data` is sometimes a string and sometimes a number, but TypeScript will not warn you when you call string methods on a number or number methods on a string. You get maximum flexibility but lose all guarantees. This can hide bugs until runtime, exactly when it is most expensive to fix.


You might not notice this until very late. That is why `any` is often called a type safety hole.

## `unknown`: A Safer Alternative

The `unknown` type is similar to `any` in that it can hold any value: string, number, object, array, or something else. The crucial difference is that you cannot use an `unknown` value directly without first checking or asserting its type.

```ts
let value: unknown;

value = "Hello";
// value.toUpperCase(); // Error: Object is of type 'unknown'

if (typeof value === "string") {
  value.toUpperCase(); // Now safe, TypeScript knows value is string
}
```

Here, `unknown` forces you to perform a runtime check (like `typeof` or `instanceof`) before using the value in a type-specific way. This gives you two benefits:

- You can still represent data that you do not fully trust or know.
- You are forced to prove what it is before you use it, which keeps your code safe.
## Type Narrowing with `unknown`

Type narrowing is the process by which TypeScript refines a union or `unknown` type to something more specific based on checks in your code. This is exactly what happens when you use `typeof`, `instanceof`, or other custom type guards.

With `unknown`, narrowing is the main way you convert from “I do not know what this is” to “I am sure this is a string/number/object.”

```ts
function handleValue(input: unknown): string {
  if (typeof input === "string") {
    return `Length: ${input.length}`;
  }

  if (typeof input === "number") {
    return `Double: ${input * 2}`;
  }

  return "Unsupported type";
}
```

Here, TypeScript tracks your checks:

- Inside `typeof input === "string"`, `input` is narrowed to `string`.
- Inside `typeof input === "number"`, `input` is narrowed to `number`.
- Outside these branches, `input` is “everything else,” and you can handle that case separately.

You can also define custom type guard functions that help you narrow complex structures:

```ts
type User = {
  id: number;
  name: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

function greet(maybeUser: unknown): string {
  if (isUser(maybeUser)) {
    return `Hello, ${maybeUser.name}`;
  }

  return "Hello, guest";
}
```

The `isUser` function returns a special type predicate (`value is User`) that lets TypeScript know that inside the `if (isUser(maybeUser))` block, `maybeUser` is a `User`. This pattern is powerful when validating external data such as API responses.

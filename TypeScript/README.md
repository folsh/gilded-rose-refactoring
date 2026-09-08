# Gilded Rose Refactoring Kata

TypeScript solution for the **Gilded Rose Refactoring Kata**.

The goal was to safely refactor the existing legacy code, improve readability, preserve existing behavior, and implement the new `Conjured` item rule.

## Approach

The work was done incrementally:

1. Fix the existing starter tests.
2. Add characterization tests to secure the current behavior.
3. Refactor the legacy implementation without changing business rules.
4. Isolate item-specific quality rules.
5. Add tests for `Conjured`.
6. Implement the `Conjured` behavior.

The solution intentionally avoids unnecessary patterns or abstractions and keeps the business rules explicit.

## Business rules covered

The unit tests cover:

- Normal items
- `Aged Brie`
- `Sulfuras, Hand of Ragnaros`
- `Backstage passes`
- `Conjured Mana Cake`
- Quality boundaries (`0` and `50`)
- SellIn expiration boundaries
- Backstage thresholds (`10`, `5`, `0`)
- Multiple item types updated together

## Conjured

The requirement states:

> `"Conjured" items degrade in Quality twice as fast as normal items.`

The current implementation supports:

```text
Conjured Mana Cake
```

Behavior:

```text
Before expiration: quality -2
After expiration:  quality -4
Minimum quality:   0
```

The original requirement is slightly ambiguous about whether `Conjured` represents a single item or a category of items.

The current implementation uses an exact match for `Conjured Mana Cake`.

If `Conjured` should represent a category instead, the detection could easily be changed to:

```ts
item.name.startsWith('Conjured ')
```

This was intentionally not generalized without clarification of the business requirement.

## Getting started

Go to the TypeScript project:

```bash
cd TypeScript
```

Install dependencies:

```bash
npm install
```

## Run the unit tests from the Command-Line

Run the Jest test suite:

```bash
npm run test:jest
```

## Project structure

```text
TypeScript/
├── app/
│   └── gilded-rose.ts
└── test/
    └── jest/
```

The production code is located in:

```text
TypeScript/app/gilded-rose.ts
```

The unit tests are located in:

```text
TypeScript/test/jest/
```


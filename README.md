# zod-prop-types

A utility for transforming [Zod](https://github.com/colinhacks/zod) schemas into PropTypes for React components, ensuring type safety at runtime in a user-friendly and developer-friendly way.

[![npm version](https://badge.fury.io/js/zod-prop-types.svg)](https://badge.fury.io/js/zod-prop-types)
[![Build Status](https://travis-ci.com/paleite/zod-prop-types.svg?branch=master)](https://travis-ci.com/paleite/zod-prop-types)
[![Coverage Status](https://coveralls.io/repos/github/paleite/zod-prop-types/badge.svg?branch=master)](https://coveralls.io/github/paleite/zod-prop-types?branch=master)

## Installation

```bash
npm install zod-prop-types
# or with yarn
yarn add zod-prop-types
# or with pnpm
pnpm add zod-prop-types
```

## Usage

```tsx
import { zodPropTypes } from "zod-prop-types";
import { z } from "zod";

// Define your Zod schema
const GreetingPropsSchema = z.object({ name: z.string(), age: z.number() });

// Create your component
const Greeting = ({ name, age }: z.infer<typeof GreetingPropsSchema>) => (
  <div>{`Hello, ${name}. You are ${age} years old.`}</div>
);

// Assign transformed Zod schema as propTypes
Greeting.propTypes = zodPropTypes(GreetingPropsSchema);

export { Greeting };
```

## API Reference

### `zodPropTypes(ZodSchema)`

- `ZodSchema`: A Zod schema object.
- Returns: An object of PropTypes validators for the given Zod schema.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute.

## License

[MIT](LICENSE) © Patrick Eriksson

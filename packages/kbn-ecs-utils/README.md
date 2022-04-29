# @kbn/ecs-utils

Provides utility functions for validating and working with ECS field mappings
and events.

## Example usage

```js
import { requiredRules } from '@kbn/ecs-utils';

const mapping = {
  '@timestamp': '2022-03-31T18:48:35.000Z',
  ecs: {
    ver: '8.0.0',
  },
  message: 'Test',
};

const errors = requiredRules(mapping);

console.log(errors) // => [ 'ecs.version field must be populated' ]
```

## API

The module exposes two rules sets: `requiredRules` and `recommendedRules`:

```js
import { requiredRules, recommendedRules } from '@kbn/ecs-utils';
```

It's also possible to import each validator individually:

```js
import { validateTimestampPresent } from '@kbn/ecs-utils';
```

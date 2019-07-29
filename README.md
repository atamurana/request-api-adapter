# Request Api Adapter

Simple request api adapter for promise based HTTP clients

---

## Installation

```bash
npm install --save request-api-adapter
```

or

```bash
yarn add request-api-adapter
```

## Usage

```js
import { createAdapter } from 'request-api-adapter';

const apiAdapter = createAdapter(
  client,
  baseConfig,
  {
    someRequest,
  },
  successHandler,
  errorHandler,
);

// ...

apiAdapter.someRequest(config).then(requestHandler);
```

## Compose requests

```js
import { compose } from 'request-api-adapter';

function complicatedRequest(config) {
  return compose(
    firstSimpleRequest,
    secondSimpleRequest,
  )(config);
}
```

## API

##### createAdapter(client[, baseConfig[, request[, successHandler[, errorHandler]]]])
##### compose(request[, request[, ...]])

## Credits

Sponsored by [JetRockets](http://www.jetrockets.pro).

![JetRockets](http://jetrockets.pro/jetrockets-white.png)

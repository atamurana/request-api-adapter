import { identity, mapObjIndexed, mergeDeepRight, pipe } from 'ramda';

const compose = pipe;

function applyConfig(client, baseConfig, resolve, reject) {
  function applier(request) {
    return (...args) => {
      const config = pipe(request, mergeDeepRight(baseConfig))(...args);

      if (resolve && reject) {
        return client(config).then(resolve, reject);
      }

      if (reject) {
        return client(config).catch(reject);
      }

      if (resolve) {
        return client(config).then(resolve);
      }

      return client(config);
    };
  }

  return applier;
}

function createAdapter(client, baseConfig = {}, requests = {}, resolve, reject) {
  const applies = mapObjIndexed(applyConfig(client, baseConfig, resolve, reject), requests);

  const request = applyConfig(client, baseConfig, resolve, reject)(identity);

  return {
    request,
    ...applies,
  };
}

export { createAdapter, compose };

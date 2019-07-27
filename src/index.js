import { identity, mapObjIndexed, then, mergeDeepRight, otherwise, pipe, when, always } from 'ramda';

const compose = pipe;

function applyConfig(client, baseConfig, resolve, reject) {
  function applier(request) {
    return pipe(
      mergeDeepRight(baseConfig),
      request,
      client,
      when(always(resolve), then(resolve)),
      when(always(reject), otherwise(reject)),
    )(request);
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

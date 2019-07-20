import {
  always,
  identity,
  mapObjIndexed,
  mergeDeepRight,
  mergeRight,
  otherwise,
  pipe,
  reduce,
  then,
  when,
} from 'ramda';

function applyer(state, request) {
  const newState = request(state);
  return mergeRight(state, newState);
}

function applyerDeep(state, request) {
  const newState = request(state);
  return mergeDeepRight(state, newState);
}

function compose(...requests) {
  return (state) => reduce(applyer, state, requests);
}

function composeDeep(...requests) {
  return (state) => reduce(applyerDeep, state, requests);
}

function applyState(client, resolve, reject) {
  return (request) =>
    // eslint-disable-next-line
    pipe(
      request,
      client,
      when(always(resolve), then(resolve)),
      when(always(reject), otherwise(reject)),
    );
}

function mergeWithBase(baseState) {
  return (request) => (state) => mergeDeepRight(baseState, request(state));
}

function createAdapter(client, baseState = {}, requests = {}, resolve = identity, reject = identity) {
  const baseRequest = mergeDeepRight(baseState);

  const applies = mapObjIndexed(
    pipe(
      mergeWithBase(baseState),
      applyState(client, resolve, reject),
    ),
    requests,
  );

  const request = applyState(client, resolve, reject)(baseRequest);

  return {
    request,
    ...applies,
  };
}

export { createAdapter, compose, composeDeep };

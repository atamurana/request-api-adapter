import { set, lensProp } from 'ramda';

const baseConfig = {};

function get(config = {}) {
  return set(lensProp('method'), 'GET', config);
}

function post(config = {}) {
  return set(lensProp('method'), 'POST', config);
}

function patch(config = {}) {
  return set(lensProp('method'), 'PATCH', config);
}

function put(config = {}) {
  return set(lensProp('method'), 'PUT', config);
}

function destroy(config = {}) {
  return set(lensProp('method'), 'DESTROY', config);
}

function urlRequest(url) {
  return (config = {}) => set(lensProp('url'), url, config);
}

export { baseConfig, get, post, patch, put, destroy, urlRequest };

import axios from 'axios/index';

import { createAdapter, compose } from 'request-api-adapter';

import { baseConfig, get, urlRequest } from './baseRequests';

function errorHandler(error) {
  console.log('Request failed');
  throw error;
}

function successHandler(res) {
  console.log('Request sucess');
  return res;
}

function getUsers(config) {
  const url = 'https://raw.githubusercontent.com/atamurana/request-api-adapter/master/examples/users.json';

  return compose(
    get,
    urlRequest(url),
  )(config);
}

const apiAdapter = createAdapter(
  axios,
  baseConfig,
  {
    getUsers,
  },
  successHandler,
  errorHandler,
);

export default apiAdapter;

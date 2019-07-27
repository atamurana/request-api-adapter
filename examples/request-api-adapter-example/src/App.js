import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, pure, withHandlers, withState } from 'recompose';
import { reject, propEq } from 'ramda';

import Card from './components/Card';
import Button from './components/Button';
import apiAdapter from './apiAdapter';
import './styles.css';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  getUsers: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const defaultProps = {
  users: [],
  loading: false,
};

function App({ users, getUsers, removeUser, loading }) {
  return (
    <div>
      {users.length === 0 && <div>No Users</div>}
      {users.map(({ id, name, description }) => (
        <Card size="sm" key={id} title={name} body={description} action={() => removeUser(id)} />
      ))}
      <Actions>
        <StyledButton primary onClick={getUsers}>
          {loading ? 'Please wait...' : 'Get users'}
        </StyledButton>
      </Actions>
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const Actions = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 1rem;
`;

const enhance = compose(
  withState('users', 'setUsers', []),
  withState('loading', 'setLoading', false),
  withHandlers({
    getUsers: ({ setUsers, setLoading }) => async () => {
      setLoading(true);
      await apiAdapter
        .getUsers()
        .then(({ data }) => setUsers(data))
        .catch((error) => console.log('second error handle', error));
      setLoading(false);
    },
    removeUser: ({ users, setUsers }) => (id) => setUsers(reject(propEq('id', id), users)),
  }),
  pure,
);

export default enhance(App);

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import User from '../../mongo/models/usersModel';
import {
  createUsers,
  deletAllUsers,
  oneUsers
} from '../../mongo/controllers/usersController';

const propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node
};

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({
    name: '',
    password: '',
    region: '',
    delegation: '',
    folder: '',
    error: null
  });
  const getUSer = () => {
    oneUsers()
      .then(data => {
        const { _doc } = data[0];
        if (data[0]) {
          const userData = _doc;
          setUser(userData);
        }
        return data;
      })
      .catch(err => {
        console.log(err.message);
        user.error = err;
        setUser(user);
      });
  };
  const addUser = data => {
    deletAllUsers();
    createUsers(data)
      .then(userData => {
        if (userData) {
          setUser(userData);
        }
        return userData;
      })
      .catch(err => {
        console.log(err.message);
        user.error = true;
        setUser(user);
      });
  };
  const { children } = props;
  return (
    <UserContext.Provider value={{ user, setUser, getUSer, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = propTypes;

export default UserContextProvider;

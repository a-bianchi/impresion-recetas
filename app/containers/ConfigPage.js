// @flow
import React, { useContext } from 'react';
import ConfigForm from '../components/ConfigForm';
import Message from '../components/Message';
import { UserContext } from '../context/UserContext';

const ConfigPage = () => {
  const { user, addUser } = useContext(UserContext);
  return (
    <div>
      <Message />
      <ConfigForm handleAction={addUser} user={user} />
    </div>
  );
};

export default ConfigPage;

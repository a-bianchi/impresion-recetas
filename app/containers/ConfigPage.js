// @flow
import React, { useContext } from 'react';
import ConfigForm from '../components/ConfigForm';
import PaperForm from '../components/PaperForm';
import { UserContext } from '../context/UserContext';

const ConfigPage = () => {
  const { user, addUser } = useContext(UserContext);
  return (
    <PaperForm>
      <ConfigForm handleAction={addUser} user={user} title="Configuración" />
    </PaperForm>
  );
};

export default ConfigPage;

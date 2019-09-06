/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import RecetaForm from '../components/RecetaForm';
import { RecetasContext } from '../context/RecetasContext';
import { UserContext } from '../context/UserContext';

const CargarPage = () => {
  const { addReceta } = useContext(RecetasContext);
  const { user } = useContext(UserContext);

  const yearNow = () => {
    const date = new Date().toString();
    return date.substr(13, 2);
  };

  const insertReceta = recetaData => {
    recetaData.region = user.region;
    recetaData.delegation = user.delegation;
    addReceta(recetaData);
  };

  return (
    <div>
      <RecetaForm
        handleAction={insertReceta}
        receta={{ year: yearNow() }}
        inputsDisabled={{ yearDisabled: true, stateDisabled: true }}
      />
    </div>
  );
};

export default CargarPage;

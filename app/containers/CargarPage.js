/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import RecetaForm from '../components/RecetaForm';
import { RecetasContext } from '../context/RecetasContext';
import { UserContext } from '../context/UserContext';
import PaperForm from '../components/PaperForm';

const CargarPage = () => {
  const { addReceta } = useContext(RecetasContext);
  const { user } = useContext(UserContext);

  const yearNow = () => {
    const date = new Date().toString();
    return date.substr(13, 2);
  };

  const insertReceta = async recetaData => {
    recetaData.region = user.region;
    recetaData.delegation = user.delegation;
    await addReceta(recetaData);
  };

  return (
    <PaperForm>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Cargar Receta
      </Typography>
      <RecetaForm
        handleAction={insertReceta}
        receta={{ year: yearNow() }}
        inputsDisabled={{ yearDisabled: true, stateDisabled: true }}
      />
    </PaperForm>
  );
};

export default CargarPage;

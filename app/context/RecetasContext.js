import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import Receta from '../../mongo/models/recetasModel';
import {
  createRecetas,
  allRecetas
} from '../../mongo/controllers/recetasController';

const propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node
};

export const RecetasContext = createContext();

const RecetasContextProvider = props => {
  const [recetas, setRecetas] = useState([]);

  const getRecetas = () => {
    allRecetas()
      .then(data => {
        if (data) {
          let arrayRecetas = [];
          data.map(d => {
            const { _doc } = d;
            arrayRecetas = [...arrayRecetas, _doc];
            return d;
          });
          setRecetas(arrayRecetas);
        }
        return data;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  };
  const addReceta = data => {
    try {
      createRecetas(data);
      setRecetas([...recetas, data]);
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const { children } = props;
  return (
    <RecetasContext.Provider
      value={{ recetas, setRecetas, addReceta, getRecetas }}
    >
      {children}
    </RecetasContext.Provider>
  );
};

RecetasContextProvider.propTypes = propTypes;

export default RecetasContextProvider;

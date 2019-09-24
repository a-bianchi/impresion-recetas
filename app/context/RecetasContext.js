/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import Receta from '../../mongo/models/recetasModel';
import {
  createRecetas,
  allRecetas,
  updateRecetas,
  deletedRecetas
} from '../../mongo/controllers/recetasController';

const propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node
};

export const RecetasContext = createContext();

const RecetasContextProvider = props => {
  const [recetas, setRecetas] = useState([]);

  const getRecetas = delivered => {
    allRecetas(delivered)
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
        return {
          error: true,
          message: err.message
        };
      });
  };

  const addReceta = async data => {
    try {
      delete data._id;
      const { _doc } = await createRecetas(data);
      setRecetas([...recetas, _doc]);
      return {
        error: false,
        message: `La receta se inserto exitosamente!`
      };
    } catch (err) {
      return {
        error: true,
        message: err.message
      };
    }
  };

  const modReceta = async data => {
    try {
      await updateRecetas(data);
      return {
        error: false,
        message: `La receta número ${data.number} se modificó exitosamente!`
      };
    } catch (err) {
      return {
        error: true,
        message: err.message
      };
    }
  };

  const delReceta = async id => {
    try {
      const filterList = recetas.filter(receta => receta._id !== id);
      await deletedRecetas(id);
      setRecetas(filterList);
      return {
        error: false,
        message: 'La receta se eliminó exitosamente!'
      };
    } catch (err) {
      return {
        error: true,
        message: err.message
      };
    }
  };

  const { children } = props;
  return (
    <RecetasContext.Provider
      value={{
        recetas,
        setRecetas,
        addReceta,
        getRecetas,
        delReceta,
        modReceta
      }}
    >
      {children}
    </RecetasContext.Provider>
  );
};

RecetasContextProvider.propTypes = propTypes;

export default RecetasContextProvider;

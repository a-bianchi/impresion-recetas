import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node
};

export const OptionsContext = createContext();

const OptionsContextProvider = props => {
  const [select, setSelect] = useState('Apellido');

  const { children } = props;
  return (
    <OptionsContext.Provider value={{ select, setSelect }}>
      {children}
    </OptionsContext.Provider>
  );
};

OptionsContextProvider.propTypes = propTypes;

export default OptionsContextProvider;

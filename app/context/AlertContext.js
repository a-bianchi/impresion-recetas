import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node
};

export const AlertContext = createContext();

const AlertContextProvider = props => {
  const [alert, setAlert] = useState({
    open: false,
    variant: 'success',
    message: ''
  });

  const { children } = props;
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertContextProvider.propTypes = propTypes;

export default AlertContextProvider;

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node
};

export const ModalContext = createContext();

const ModalContextProvider = props => {
  const [modal, setModal] = useState(false);

  const { children } = props;
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalContextProvider.propTypes = propTypes;

export default ModalContextProvider;

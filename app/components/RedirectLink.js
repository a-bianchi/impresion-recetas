import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const RedirectLink = to => {
  return forwardRef(
    (props, ref) => <RouterLink innerRef={ref} to={to} {...props} />,
    to
  );
};

export default RedirectLink;

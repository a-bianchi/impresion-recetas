import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';

const propTypes = {
  handleClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  Icon: PropTypes.object,
  disabled: PropTypes.bool
};

const ButtonCustomIcon = ({ Icon, handleClick, disabled }) => {
  return (
    <React.Fragment>
      <IconButton onClick={handleClick} disabled={disabled}>
        <Icon />
      </IconButton>
    </React.Fragment>
  );
};

ButtonCustomIcon.defaultProps = {
  handleClick: () => {},
  Icon: SentimentSatisfied,
  disabled: false
};

ButtonCustomIcon.propTypes = propTypes;

export default ButtonCustomIcon;

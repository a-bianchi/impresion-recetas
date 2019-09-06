import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const propTypes = {
  name: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const ButtonsTable = ({ name }) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        className={classes.margin}
      >
        {name}
      </Button>
    </div>
  );
};

ButtonsTable.propTypes = propTypes;

export default ButtonsTable;

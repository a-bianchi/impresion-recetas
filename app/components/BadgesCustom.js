import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import EmojiPeople from '@material-ui/icons/EmojiPeople';

const propTypes = {
  recetas: PropTypes.number
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2)
  }
}));

const BadgesCustom = ({ recetas }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Badge className={classes.margin} badgeContent={recetas} color="primary">
        <EmojiPeople />
      </Badge>
    </React.Fragment>
  );
};

BadgesCustom.defaultProps = {
  recetas: 0
};

BadgesCustom.propTypes = propTypes;

export default BadgesCustom;

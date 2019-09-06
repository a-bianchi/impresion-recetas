import React from 'react';
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import routes from '../constants/routes';

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300]
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  avatar: {
    background: 'none',
    marginRight: -theme.spacing(1.5)
  }
}));

export default function CustomizedBreadcrumbs() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          avatar={
            <Avatar className={classes.avatar}>
              <HomeIcon />
            </Avatar>
          }
        />{' '}
        <StyledBreadcrumb
          component="a"
          href={`#${routes.RECETA}`}
          label="Cargar"
          avatar={
            <Avatar className={classes.avatar}>
              <AddIcon />
            </Avatar>
          }
        />{' '}
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Buscar"
          avatar={
            <Avatar className={classes.avatar}>
              <SearchIcon />
            </Avatar>
          }
        />{' '}
        <StyledBreadcrumb
          component="a"
          href={`#${routes.CONFIG}`}
          label="Configuración"
          avatar={
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          }
        />{' '}
      </Breadcrumbs>
    </Paper>
  );
}

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import SaveIcon from '@material-ui/icons/AddBox';
import BuildIcon from '@material-ui/icons/Menu';
import routes from '../constants/routes';
import RedirectLink from './RedirectLink';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  title: {
    flexGrow: 1
  }
}));

const MenuBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          data-test="menuBarTypography"
        >
          Impresión de Recetas
        </Typography>
        <Button
          color="inherit"
          component={RedirectLink(routes.HOME)}
          data-test="menuBarButtonHome"
        >
          <HomeIcon
            className={clsx(classes.leftIcon, classes.iconSmall)}
            data-test="menuBarIconHome"
          />
          Home
        </Button>
        <Button
          color="inherit"
          component={RedirectLink(routes.CARGAR)}
          data-test="menuBarButtonCargar"
        >
          <SaveIcon
            className={clsx(classes.leftIcon, classes.iconSmall)}
            data-test="menuBarIconCargar"
          />
          Cargar
        </Button>
        <Button
          color="inherit"
          component={RedirectLink(routes.CONFIG)}
          data-test="menuBarButtonConfig"
        >
          <BuildIcon
            className={clsx(classes.leftIcon, classes.iconSmall)}
            data-test="menuBarIconConfig"
          />
          Configuración
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;

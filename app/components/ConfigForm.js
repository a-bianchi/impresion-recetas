import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const propTypes = {
  handleAction: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
    region: PropTypes.string,
    delegation: PropTypes.string
  })
};

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  formControl: {
    margin: theme.spacing(1)
  },
  menu: {
    width: 200
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1.5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  error: {
    color: theme.palette.error.dark
  }
}));

const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(150, 'Por favor ingrese no más de 150 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres')
    .required('Por favor ingrese un nombre de usuario'),
  password: Yup.string()
    .max(150, 'Por favor ingrese no más de 150 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres')
    .required('Por favor ingrese una contraseña'),
  region: Yup.string()
    .max(2, 'Por favor ingrese no más de 2 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres')
    .required('Por favor ingrese una region'),
  delegation: Yup.string()
    .max(3, 'Por favor ingrese no más de 3 caracteres')
    .min(3, 'Por favor ingrese no menos de 2 caracteres')
    .required('Por favor ingrese una delegación')
});

const ConfigForm = ({ handleAction, user }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Configuración
          </Typography>
          <Formik
            initialValues={{
              name: user.name ? user.name : '',
              password: user.password ? user.password : '',
              region: user.region ? user.region : '',
              delegation: user.delegation ? user.delegation : ''
            }}
            onSubmit={(values, { resetForm }) => {
              handleAction(values);
              resetForm();
            }}
            enableReinitialize
            validationSchema={formValidationSchema}
            render={({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched
            }) => (
              <form onSubmit={handleSubmit} data-test="newFormConfig">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      required
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.region}
                    >
                      <InputLabel htmlFor="region-error">Region</InputLabel>
                      <Input
                        id="region-error"
                        data-test="input-region"
                        name="region"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.region}
                      />
                      {errors.region && touched.region ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageRegion"
                        >
                          {errors.region}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      required
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.delegation}
                    >
                      <InputLabel htmlFor="delegation-error">
                        Delegación
                      </InputLabel>
                      <Input
                        id="region-error"
                        data-test="input-delegation"
                        name="delegation"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.delegation}
                      />
                      {errors.delegation && touched.delegation ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageDelegation"
                        >
                          {errors.delegation}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      required
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.name}
                    >
                      <InputLabel htmlFor="name-error">Usuario</InputLabel>
                      <Input
                        id="name-error"
                        data-test="input-name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {errors.name && touched.name ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageName"
                        >
                          {errors.name}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      required
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.password}
                    >
                      <InputLabel htmlFor="password-error">Password</InputLabel>
                      <Input
                        id="password-error"
                        data-test="input-password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessagePassword"
                        >
                          {errors.password}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
                <React.Fragment>
                  <div className={classes.buttons}>
                    <Button
                      data-test="buttonGuardarConfig"
                      type="submit"
                      variant="contained"
                      className={classes.submit}
                      color="primary"
                      size="large"
                    >
                      Guardar
                    </Button>
                  </div>
                </React.Fragment>
              </form>
            )}
          />
        </Paper>
      </main>
    </React.Fragment>
  );
};

ConfigForm.defaultProps = {
  handleAction: () => {},
  user: { name: '', password: '', region: '', delegation: '' }
};

ConfigForm.propTypes = propTypes;

export default ConfigForm;

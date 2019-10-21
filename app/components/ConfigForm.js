import React, { useContext } from 'react';
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
import { AlertContext } from '../context/AlertContext';

const propTypes = {
  handleAction: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
    region: PropTypes.string,
    delegation: PropTypes.string,
    folder: PropTypes.string,
    puppeteerfolder: PropTypes.string
  })
};

const useStyles = makeStyles(theme => ({
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
    .required('Por favor ingrese una delegación'),
  folder: Yup.string().required(
    'Por favor ingrese una ruta donde guardar las recetas'
  ),
  puppeteerfolder: Yup.string().required(
    'Por favor ingrese la ruta donde se instaló puppeter'
  )
});

const ConfigForm = ({ handleAction, user, title }) => {
  const classes = useStyles();
  const { setAlert } = useContext(AlertContext);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Formik
        initialValues={{
          name: user.name ? user.name : '',
          password: user.password ? user.password : '',
          region: user.region ? user.region : '',
          delegation: user.delegation ? user.delegation : '',
          folder: user.folder ? user.folder : __dirname,
          puppeteerfolder: user.puppeteerfolder
            ? user.puppeteerfolder
            : './node_modules/puppeteer/.local-chromium/win64-656675/chrome-win/chrome.exe'
        }}
        onSubmit={(values, { resetForm }) => {
          setAlert({
            open: true,
            variant: 'success',
            message: 'La configuración se guardó con éxito!'
          });
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
              <Grid item xs={12} sm={12}>
                <FormControl
                  required
                  fullWidth
                  className={classes.formControl}
                  error={!!errors.folder}
                >
                  <InputLabel htmlFor="folder-error">folder</InputLabel>
                  <Input
                    id="folder-error"
                    data-test="input-folder"
                    name="folder"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.folder}
                  />
                  {errors.folder && touched.folder ? (
                    <FormHelperText
                      className={classes.error}
                      data-test="errorMessagefolder"
                    >
                      {errors.foldersword}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl
                  required
                  fullWidth
                  className={classes.formControl}
                  error={!!errors.puppeteerfolder}
                >
                  <InputLabel htmlFor="puppeteerfolder-error">
                    puppeter folder
                  </InputLabel>
                  <Input
                    id="puppeteerfolder-error"
                    data-test="input-puppeteerfolder"
                    name="puppeteerfolder"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.puppeteerfolder}
                  />
                  {errors.puppeteerfolder && touched.puppeteerfolder ? (
                    <FormHelperText
                      className={classes.error}
                      data-test="errorMessagePuppeteerFolder"
                    >
                      {errors.puppeteerfolder}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
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
                  <InputLabel htmlFor="delegation-error">Delegación</InputLabel>
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
          </form>
        )}
      />
    </React.Fragment>
  );
};

ConfigForm.defaultProps = {
  title: '',
  handleAction: () => {},
  user: {
    name: '',
    password: '',
    region: '',
    delegation: '',
    puppeteerfolder: ''
  }
};

ConfigForm.propTypes = propTypes;

export default ConfigForm;

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, makeStyles } from '@material-ui/core';
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
  receta: PropTypes.shape({
    number: PropTypes.string,
    year: PropTypes.string,
    dni: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
    type: PropTypes.string,
    state: PropTypes.string,
    entity: PropTypes.string
  }),
  inputsDisabled: PropTypes.shape({
    numberDisabled: PropTypes.bool,
    yearDisabled: PropTypes.bool,
    dniDisabled: PropTypes.bool,
    nameDisabled: PropTypes.bool,
    lastnameDisabled: PropTypes.bool,
    typeDisabled: PropTypes.bool,
    stateDisabled: PropTypes.bool,
    entityDisabled: PropTypes.bool
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

const statesarray = [
  {
    value: 'PENDIENTE',
    label: 'Pendiente'
  },
  {
    value: 'APROBADO',
    label: 'Aprobado'
  },
  {
    value: 'RECHAZADO',
    label: 'Rechazado'
  }
];

const types = [
  {
    value: 'MEPPES',
    label: 'Meppes'
  },
  {
    value: 'CENTRALIZADO',
    label: 'Centralizado'
  },
  {
    value: 'EXEPCION',
    label: 'Exepción'
  }
];

const formValidationSchema = Yup.object().shape({
  number: Yup.string()
    .max(7, 'Por favor ingrese no más de 7 caracteres')
    .min(1, 'Por favor ingrese no menos de 1 caracteres')
    .required('Por favor ingrese un numero'),
  dni: Yup.string()
    .max(8, 'Por favor ingrese no más de 8 caracteres')
    .min(8, 'Por favor ingrese no menos de 8 caracteres')
    .required('Por favor ingrese un dni'),
  year: Yup.string()
    .max(2, 'Por favor ingrese no mas de 2 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres'),
  name: Yup.string()
    .max(150, 'Por favor ingrese no más de 150 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres'),
  lastname: Yup.string()
    .max(150, 'Por favor ingrese no más de 150 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres'),
  type: Yup.string().oneOf(['MEPPES', 'CENTRALIZADO', 'EXEPCION']),
  state: Yup.string().oneOf(['PENDIENTE', 'APROBADO', 'RECHAZADO']),
  entity: Yup.string()
    .max(150, 'Por favor ingrese no más de 150 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres')
});

const RecetaForm = ({ handleAction, receta, inputsDisabled }) => {
  const { number, year, dni, name, lastname, type, state, entity } = receta;
  const {
    numberDisabled,
    yearDisabled,
    dniDisabled,
    nameDisabled,
    lastnameDisabled,
    typeDisabled,
    stateDisabled,
    entityDisabled
  } = inputsDisabled;
  const classes = useStyles();
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Cargar Recetas
          </Typography>
          <Formik
            initialValues={{
              number: number || '',
              year: year || '',
              name: name || '',
              lastname: lastname || '',
              dni: dni || '',
              type: type || 'MEPPES',
              state: state || 'PENDIENTE',
              entity: entity || 'PARTICULAR'
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
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.entity}
                    >
                      <InputLabel htmlFor="entity-error">Entidad</InputLabel>
                      <Input
                        id="entity-error"
                        data-test="input-entity"
                        disabled={entityDisabled}
                        name="entity"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.entity}
                      />
                      {errors.entity && touched.entity ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageEntity"
                        >
                          {errors.entity}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      disabled={yearDisabled}
                      className={classes.formControl}
                      error={!!errors.year}
                    >
                      <InputLabel htmlFor="year-error">Año</InputLabel>
                      <Input
                        id="year-error"
                        data-test="input-year"
                        disabled={yearDisabled}
                        name="year"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.year}
                      />
                      {errors.year && touched.year ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageYear"
                        >
                          {errors.year}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      error={!!errors.type}
                      disabled={typeDisabled}
                      data-test="select-type"
                      label="Sistema"
                      value={values.type}
                      onChange={handleChange('type')}
                      onBlur={handleBlur}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      helperText="Por favor seleccione un sistema"
                    >
                      {types.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      error={!!errors.state}
                      disabled={stateDisabled}
                      data-test="select-state"
                      label="Estado"
                      value={values.state}
                      onChange={handleChange('state')}
                      onBlur={handleBlur}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      helperText="Por favor seleccione el estado"
                    >
                      {statesarray.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      required
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.number}
                    >
                      <InputLabel htmlFor="number-error">
                        Número de Tramite
                      </InputLabel>
                      <Input
                        id="number-error"
                        data-test="input-number"
                        disabled={numberDisabled}
                        name="number"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.number}
                      />
                      {errors.number && touched.number ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageNumber"
                        >
                          {errors.number}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      required
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.dni}
                    >
                      <InputLabel htmlFor="dni-error">Dni</InputLabel>
                      <Input
                        id="dni-error"
                        data-test="input-dni"
                        disabled={dniDisabled}
                        name="dni"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dni}
                      />
                      {errors.dni && touched.dni ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageDni"
                        >
                          {errors.dni}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.name}
                    >
                      <InputLabel htmlFor="name-error">Nombre</InputLabel>
                      <Input
                        id="name-error"
                        data-test="input-name"
                        disabled={nameDisabled}
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
                      fullWidth
                      className={classes.formControl}
                      error={!!errors.lastname}
                    >
                      <InputLabel htmlFor="lastname-error">Apellido</InputLabel>
                      <Input
                        id="lastname-error"
                        data-test="input-lastname"
                        disabled={lastnameDisabled}
                        name="lastname"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                      />
                      {errors.lastname && touched.lastname ? (
                        <FormHelperText
                          className={classes.error}
                          data-test="errorMessageLastname"
                        >
                          {errors.lastname}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
                <React.Fragment>
                  <div className={classes.buttons}>
                    <Button
                      data-test="submitGuardarReceta"
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

RecetaForm.defaultProps = {
  handleAction: () => {},
  receta: {
    number: '',
    year: '',
    dni: '',
    name: '',
    lastname: '',
    type: '',
    state: '',
    entity: ''
  },
  inputsDisabled: {
    numberDisabled: false,
    yearDisabled: false,
    dniDisabled: false,
    nameDisabled: false,
    lastnameDisabled: false,
    typeDisabled: false,
    stateDisabled: false,
    entityDisabled: false
  }
};

RecetaForm.propTypes = propTypes;

export default RecetaForm;

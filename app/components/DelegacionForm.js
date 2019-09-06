// @flow
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

const propTypes = {
  handleAction: PropTypes.func
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1.5)
  }
}));

const formValidationSchema = Yup.object().shape({
  region: Yup.string()
    .max(2, 'Por favor ingrese no más de 2 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres')
    .required('Por favor ingrese un nombre de usuario'),
  delegation: Yup.string()
    .max(3, 'Por favor ingrese no más de 3 caracteres')
    .min(2, 'Por favor ingrese no menos de 2 caracteres')
    .required('Por favor ingrese una contraseña')
});

const DelegacionForm = ({ handleAction }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Formik
        initialValues={{ region: '', delegation: '' }}
        onSubmit={(values, { resetForm }) => {
          handleAction();
          resetForm();
        }}
        enableReinitialize
        validationSchema={formValidationSchema}
        render={({ handleSubmit, handleChange, handleBlur, values }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              required
              data-test="newElementRegion"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              name="region"
              type="text"
              label="Region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
            />
            <TextField
              required
              data-test="newElementDelegation"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              name="delegation"
              type="strin"
              label="Delegación"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.delegation}
            />
            <Button
              data-test="addNewElementButton"
              type="submit"
              variant="contained"
              className={classes.submit}
              color="primary"
              size="large"
            >
              Guardar
            </Button>
          </form>
        )}
      />
    </div>
  );
};

DelegacionForm.defaultProps = {
  handleAction: () => {}
};

DelegacionForm.propTypes = propTypes;

export default DelegacionForm;

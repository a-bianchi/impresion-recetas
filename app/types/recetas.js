import PropTypes from 'prop-types';

const recetaProps = PropTypes.shape({
  _id: PropTypes.object,
  tramite: PropTypes.number,
  region: PropTypes.string,
  delegation: PropTypes.string,
  number: PropTypes.string,
  year: PropTypes.string,
  dni: PropTypes.string,
  name: PropTypes.string,
  lastname: PropTypes.string,
  type: PropTypes.string,
  state: PropTypes.string,
  entity: PropTypes.string,
  printed: PropTypes.bool,
  delivered: PropTypes.bool,
  affiliated: PropTypes.string,
  authorizations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.object,
      numeroAutorizacion: PropTypes.string,
      numeroReceta: PropTypes.string,
      estado: PropTypes.bool
    })
  ),
  atPrinted: PropTypes.instanceOf(Date),
  atDelivered: PropTypes.instanceOf(Date),
  time: PropTypes.instanceOf(Date)
});

const recetaDefault = {
  _id: {},
  tramite: 0,
  region: '',
  delegation: '',
  number: '',
  year: '',
  dni: '',
  name: '',
  lastname: '',
  type: '',
  state: '',
  entity: '',
  printed: false,
  delivered: false,
  affiliated: '',
  authorizations: [
    {
      _id: {},
      numeroAutorizacion: '',
      numeroReceta: '',
      estado: true
    }
  ],
  atPrinted: new Date(),
  atDelivered: new Date(),
  time: new Date()
};

const inputsDisabledProps = PropTypes.shape({
  numberDisabled: PropTypes.bool,
  yearDisabled: PropTypes.bool,
  dniDisabled: PropTypes.bool,
  nameDisabled: PropTypes.bool,
  lastnameDisabled: PropTypes.bool,
  typeDisabled: PropTypes.bool,
  stateDisabled: PropTypes.bool,
  entityDisabled: PropTypes.bool
});

export { recetaProps, recetaDefault, inputsDisabledProps };

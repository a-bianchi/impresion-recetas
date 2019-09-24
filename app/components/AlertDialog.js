import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ModalContext } from '../context/ModalContext';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

const AlertDialog = ({ children, title }) => {
  const { modal, setModal } = useContext(ModalContext);

  function handleClose() {
    setModal(false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={modal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            data-test="alertDialogButtonClose"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

AlertDialog.defaultProps = {
  title: 'Im a cool modal',
  children: <div />
};

AlertDialog.propTypes = propTypes;

export default AlertDialog;

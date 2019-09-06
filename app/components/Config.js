// @flow
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ConfigForm from './ConfigForm';
import DelegacionForm from './DelegacionForm';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  container: {
    height: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignitems: 'center',
    justifycontent: 'center'
  },
  row: {
    width: 'auto'
  },
  flexitem: {
    padding: '5px',
    width: 'auto',
    height: '120px',
    margin: '10px',
    lineheight: '20px'
  }
}));

const Config = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.flexitem}>
          <Paper className={classes.root}>
            <ConfigForm handleAction={() => {}} systemName="MEPPES" />
          </Paper>
        </div>
        <div className={classes.flexitem}>
          <Paper className={classes.root}>
            <ConfigForm handleAction={() => {}} systemName="MEDICAMENTOS" />
          </Paper>
        </div>
        <div className={classes.flexitem}>
          <Paper className={classes.root}>
            <DelegacionForm handleAction={() => {}} />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Config;

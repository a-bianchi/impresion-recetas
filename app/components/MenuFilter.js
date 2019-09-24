import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import ButtonCustomIcon from './ButtonCustomIcon';
import { OptionsContext } from '../context/OptionsContext';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

const ITEM_HEIGHT = 48;

const MenuFilter = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { select, setSelect } = useContext(OptionsContext);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOption = op => {
    setSelect(op);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <ButtonCustomIcon handleClick={handleClick} Icon={FilterListIcon} />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === select}
            onClick={() => handleOption(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

MenuFilter.propTypes = propTypes;

export default MenuFilter;

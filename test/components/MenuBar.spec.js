import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import MenuBar from '../../app/components/MenuBar';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const component = shallow(<MenuBar />);
  return {
    component,
    buttons: component.find(Button)
  };
};

describe('Menu Bar render', () => {
  it('should render AppBar', () => {
    const { component } = setup();
    expect(component.find(AppBar).exists()).toBe(true);
  });

  it('should render Toolbar', () => {
    const { component } = setup();
    expect(component.find(Toolbar).exists()).toBe(true);
  });

  it('should display text "Impresión de Recetas"', () => {
    const { component } = setup();
    expect(component.find(Typography).text()).toBe('Impresión de Recetas');
  });

  it('should display Home button', () => {
    const { buttons } = setup();
    buttons.at(0).simulate('click');
    expect(buttons.at(0).exists()).toBe(true);
  });

  it('should display Cargar Recetas button', () => {
    const { buttons } = setup();
    buttons.at(1).simulate('click');
    expect(buttons.at(1).exists()).toBe(true);
  });

  it('should display Configuración button', () => {
    const { buttons } = setup();
    buttons.at(2).simulate('click');
    expect(buttons.at(2).exists()).toBe(true);
  });

  it('should display HomeIcon', () => {
    const { component } = setup();
    expect(component.find(HomeIcon).exists()).toBe(true);
  });

  it('should display WhatshotIcon', () => {
    const { component } = setup();
    expect(component.find(WhatshotIcon).exists()).toBe(true);
  });

  it('should display GrainIcon', () => {
    const { component } = setup();
    expect(component.find(GrainIcon).exists()).toBe(true);
  });

  it('should match exact snapshot', () => {
    const menu = (
      <div>
        <Router>
          <MenuBar />
        </Router>
      </div>
    );
    const tree = renderer.create(menu).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

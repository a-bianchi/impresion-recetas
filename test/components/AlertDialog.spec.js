import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ModalContextProvider from '../../app/context/ModalContext';
import AlertDialog from '../../app/components/AlertDialog';

Enzyme.configure({ adapter: new Adapter() });

const TestComponent = () => (
  <ModalContextProvider value={{ modal: true }}>
    <AlertDialog />
  </ModalContextProvider>
);

const setup = () => {
  const component = shallow(<TestComponent />);
  return {
    component,
    buttons: component.find(Button)
  };
};

describe('Alert Dialog render', () => {
  it('should render AlertDialog', () => {
    const { component } = setup();
    expect(component.find(AlertDialog).exists()).toBe(true);
  });

  it('should match exact snapshot', () => {
    const dialog = (
      <div>
        <Router>
          <TestComponent />
        </Router>
      </div>
    );
    const tree = renderer.create(dialog).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

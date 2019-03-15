import React from 'react';
import { shallow } from 'enzyme';
import Survey from './Survey';

describe('<Survey />', () => {
  test('renders', () => {
    const wrapper = shallow(<Survey />);
    expect(wrapper).toMatchSnapshot();
  });
});

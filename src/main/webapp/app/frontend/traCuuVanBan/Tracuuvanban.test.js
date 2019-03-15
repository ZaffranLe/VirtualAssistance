import React from 'react';
import { shallow } from 'enzyme';
import TraCuuVanBan from './TraCuuVanBan';

describe('<TraCuuVanBan />', () => {
  test('renders', () => {
    const wrapper = shallow(<TraCuuVanBan />);
    expect(wrapper).toMatchSnapshot();
  });
});

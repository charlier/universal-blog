import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import Home from '../../../src/client/pages/home';

describe('Home Page', () => {
  it('Renders the Home Page', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});

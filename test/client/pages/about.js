import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import About from '../../../src/client/pages/about';

describe('About Page', () => {
  it('Renders the About Page', () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot();
  });
});

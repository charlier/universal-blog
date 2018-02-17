import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import Index from '../../../src/client/pages';

describe('Index Page', () => {
  it('Renders the Index Page', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper).toMatchSnapshot();
  });
});

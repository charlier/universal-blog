import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import App from '../../../src/client/components/app';

describe('App Component', () => {
  it('Renders the App Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Adds the children content', () => {
    const wrapper = shallow(<App {...{ children: 'App content' }} />);
    expect(wrapper.find('div').find('div').text()).toBe('App content');
  });
});

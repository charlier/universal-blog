import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import Link from '../../../src/client/components/link';

describe('Link Component', () => {
  it('Renders the Link Component', () => {
    const wrapper = shallow(<Link />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Shows a link', () => {
    const wrapper = shallow(<Link href='web.site' />);
    expect(wrapper.find('a').attr('href')).toBe('web.site');
  });

  it('Adds the children content', () => {
    const wrapper = shallow(<Link {...{ children: 'Link content' }} />);
    expect(wrapper.find('a').text()).toBe('Link content');
  });

  it('Adds the children content', () => {
    const preventDefault = jest.fn();
    const context = { history: { push: jest.fn } };
    const wrapper = shallow(<Link {...{ children: 'Link content' }} />, { context });
    wrapper.find('a').simulate('click', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

});

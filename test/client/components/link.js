import { h } from 'preact';
import { shallow, deep } from 'preact-render-spy';
import Provider from 'preact-context-provider';

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

  it('Prevent the browser from following internal links', () => {
    const preventDefault = jest.fn();
    const context = { history: { push: () => {} } };
    const props = { children: 'Link content' };
    const wrapper = deep(
      <Provider {...context}>
        <Link {...props} />
      </Provider>,
      { depth: 2 }
    );
    wrapper.find('a').simulate('click', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it('Pushes updates to the history context', () => {
    const push = jest.fn();
    const context = { history: { push } };
    const props = { children: 'Link content', href: 'geoff' };
    const wrapper = deep(
      <Provider {...context}>
        <Link {...props} />
      </Provider>,
      { depth: 2 }
    );
    wrapper.find('a').simulate('click', { preventDefault: () => {} });
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('geoff');
  });

});

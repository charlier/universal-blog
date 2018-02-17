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

  it('Adds the children content', () => {
    const preventDefault = jest.fn();
    const wrapper = deep(
      <Provider history={{ push: () => {} }}>
        <Link {...{ children: 'Link content' }} />
      </Provider>,
      { depth: 2 }
    );
    wrapper.find('a').simulate('click', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it('Pushes updates to the history context', () => {
    const push = jest.fn();
    const wrapper = deep(
      <Provider history={{ push }}>
        <Link href='geoff' {...{ children: 'Link content' }} />
      </Provider>,
      { depth: 2 }
    );
    wrapper.find('a').simulate('click', { preventDefault: () => {} });
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('geoff');
  });

});

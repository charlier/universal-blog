import pureComponent from '../../../src/client/utils/pureComponent';

describe('Pure Component', () => {
  it('should not update when props remain the same', () => {
    const component = new pureComponent({ props: true });
    expect(component.shouldComponentUpdate({ props: true }, {})).toBe(false);
  });

  it('should update on props changes', () => {
    const component = new pureComponent({ props: true });
    expect(component.shouldComponentUpdate({ props: false }, {})).toBe(true);
  });

  it('should not update when state remains the same', () => {
    const component = new pureComponent({ state: true });
    expect(component.shouldComponentUpdate({ state: true }, {})).toBe(false);
  });

  it('should update on state changes', () => {
    const component = new pureComponent({ state: true });
    expect(component.shouldComponentUpdate({ state: false }, {})).toBe(true);
  });
});

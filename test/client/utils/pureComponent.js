import pureComponent from '../../../src/client/utils/pureComponent';

describe('Pure Component', () => {
  it('should not update when props remain the same', () => {
    const component = new pureComponent({ props: true });
    expect(component.shouldComponentUpdate({ props: true }, {})).toBeFalsy();
  });

  it('should update on props changes', () => {
    const component = new pureComponent({ props: true });
    expect(component.shouldComponentUpdate({ props: false }, {})).toBeTruthy();
  });

  it('should not update when state remains the same', () => {
    const component = new pureComponent({});
    component.setState({ state: true });
    expect(component.shouldComponentUpdate({}, { state: true })).toBeFalsy();
  });

  it('should update on state changes', () => {
    const component = new pureComponent({});
    component.setState({ state: true });
    expect(component.shouldComponentUpdate({}, { state: false })).toBeTruthy();
  });
});

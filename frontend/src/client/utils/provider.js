import PureComponent from './pureComponent';

export default class Provider extends PureComponent {
  getChildContext() {
    // eslint-disable-next-line no-unused-vars
    const { children, ...context } = this.props;
    return context;
  }
  render({ children }) {
    return (children && children[0] || null);
  }
}

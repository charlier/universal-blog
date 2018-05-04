import { Component } from 'preact';
import isEqual from 'deep-equal';

export default class PureComponent extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this;
    return !(isEqual(nextProps, props) && isEqual(nextState, state));
  }
}

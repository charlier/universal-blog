import { Component, h } from 'preact';

import App from '../components/app';

export default class Wiki extends Component {
  static getInitialProps({ params: { title } }) {
    return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
      .then((res) => res.json())
      .then((summary) => ({ summary }));
  }

  state = { seconds: 0 }
  interval = null

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(({ seconds }) => ({ seconds: seconds + 1 })),
      1000
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.summary.title !== this.props.summary.title) {
      this.setState({ seconds: 0 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render({ summary: { displaytitle, extract } }, { seconds }) {
    return (
      <App>
        <h1>Wikipedia</h1>
        <h2>
          Article: {displaytitle}. Seconds reading {seconds}.
        </h2>
        <p>{extract}</p>
      </App>
    );
  }
}

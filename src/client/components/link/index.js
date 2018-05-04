import { h } from 'preact';

export default (props, { history }) => (
  <a
    {...props}
    onClick={(e) => {
      e.preventDefault();
      history.push(props.href);
    }}
  >
    {props.children}
  </a>
);

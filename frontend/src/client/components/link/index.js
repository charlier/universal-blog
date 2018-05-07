import { h } from 'preact';

const Link = (props, { history }) => (
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

export default Link;

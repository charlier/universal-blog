import { h } from 'preact';

export default (props, context) => (
  <a
    {...props}
    onClick={(e) => {
      e.preventDefault();
      context.history.push(props.href);
    }}
  >
    {props.children}
  </a>
);

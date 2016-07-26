import defaultConfig from './default';

const config = {
  staticHost: '//static.charlie.im',
  apiHost: 'https://api.charlie.im',
  env: 'production'
};

export default Object.assign({}, defaultConfig, config);

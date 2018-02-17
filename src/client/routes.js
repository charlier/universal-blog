export default [
  {
    path: '/',
    page: () => import('./pages/index'),
    chunkName: 'pages/index'
  },
  {
    path: '/about',
    page: () => import('./pages/about'),
    chunkName: 'pages/about'
  },
  {
    path: '/wiki/:title',
    page: () => import('./pages/wiki'),
    chunkName: 'pages/wiki'
  },
  {
    path: '/github/:user',
    page: () => import('./pages/github'),
    chunkName: 'pages/github'
  }
];

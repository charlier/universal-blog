export default [
  {
    path: '/',
    page: () => import(/* webpackChunkName: "pages/home" */ './pages/home'),
    chunkName: 'pages/home'
  },
  {
    path: '/about',
    page: () => import(/* webpackChunkName: "pages/about" */ './pages/about'),
    chunkName: 'pages/about'
  },
  {
    path: '/wiki/:title',
    page: () => import(/* webpackChunkName: "pages/wiki" */ './pages/wiki'),
    chunkName: 'pages/wiki'
  },
  {
    path: '/github/:user',
    page: () => import(/* webpackChunkName: "pages/github" */ './pages/github'),
    chunkName: 'pages/github'
  }
];

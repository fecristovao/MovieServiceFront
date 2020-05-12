
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Search.vue') },
      { path: 'search', component: () => import('pages/Search.vue') },
      { path: 'download/:id/:idj', name: 'Download', component: () => import('pages/Download.vue') },
      { path: 'torrents', name: 'Torrents', component: () => import('pages/Torrents.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

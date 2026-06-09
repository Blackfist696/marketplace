
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/project02/public/app/home",
    "route": "/project02/public/app"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LUM3YKN3.js",
      "chunk-LCGEILH6.js"
    ],
    "route": "/project02/public/app/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SBTWCH27.js",
      "chunk-LCGEILH6.js"
    ],
    "route": "/project02/public/app/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HFBFIG2L.js"
    ],
    "route": "/project02/public/app/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HFBFIG2L.js"
    ],
    "route": "/project02/public/app/catalogue"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HFBFIG2L.js"
    ],
    "route": "/project02/public/app/produit/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HFBFIG2L.js"
    ],
    "route": "/project02/public/app/panier"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HFBFIG2L.js"
    ],
    "route": "/project02/public/app/profil"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HFBFIG2L.js"
    ],
    "route": "/project02/public/app/commande"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HFBFIG2L.js"
    ],
    "route": "/project02/public/app/boutique/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XLPCFGU3.js"
    ],
    "redirectTo": "/project02/public/app/artisan/dashboard",
    "route": "/project02/public/app/artisan"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XLPCFGU3.js"
    ],
    "route": "/project02/public/app/artisan/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XLPCFGU3.js"
    ],
    "route": "/project02/public/app/artisan/produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XLPCFGU3.js"
    ],
    "route": "/project02/public/app/artisan/commandes"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XLPCFGU3.js"
    ],
    "route": "/project02/public/app/artisan/stats"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XLPCFGU3.js"
    ],
    "route": "/project02/public/app/artisan/stats/consultation-produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-G3MP27AG.js"
    ],
    "redirectTo": "/project02/public/app/admin/dashboard",
    "route": "/project02/public/app/admin"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-G3MP27AG.js"
    ],
    "route": "/project02/public/app/admin/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-G3MP27AG.js"
    ],
    "route": "/project02/public/app/admin/artisans"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-G3MP27AG.js"
    ],
    "route": "/project02/public/app/admin/commandes"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-G3MP27AG.js"
    ],
    "route": "/project02/public/app/admin/produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-JBS2YB5H.js"
    ],
    "route": "/project02/public/app/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17018, hash: '337add517e91d1890eedea631847dc32d3e5edf25a1095802dddb754c8d18b5d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2857, hash: 'b7758fa8034a9830dc043be93e020ce1c32a5fb9a16ffdacfd5b24cdfa42d550', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'project02/public/app/register/index.html': {size: 33226, hash: 'f21f661a42c38a294348dbde2d9554a47ad387d1e436043228177baf6fba0512', text: () => import('./assets-chunks/project02_public_app_register_index_html.mjs').then(m => m.default)},
    'project02/public/app/login/index.html': {size: 31963, hash: 'e2e12c2845381b9402d9898cc557d137e4a3d438ab1a472b5d326b0740d3c901', text: () => import('./assets-chunks/project02_public_app_login_index_html.mjs').then(m => m.default)},
    'project02/public/app/catalogue/index.html': {size: 38088, hash: 'c1aa68d513efe969bbddac2a95674bf99c943aaca389b6433ce228b6c1afa850', text: () => import('./assets-chunks/project02_public_app_catalogue_index_html.mjs').then(m => m.default)},
    'project02/public/app/home/index.html': {size: 34918, hash: 'b876bb9f66d58c92542adb50223611f5f2c10703795446d593c2125bb7da972c', text: () => import('./assets-chunks/project02_public_app_home_index_html.mjs').then(m => m.default)},
    'styles-NJ7HW6FN.css': {size: 50249, hash: 'hujDA23BFpM', text: () => import('./assets-chunks/styles-NJ7HW6FN_css.mjs').then(m => m.default)}
  },
};

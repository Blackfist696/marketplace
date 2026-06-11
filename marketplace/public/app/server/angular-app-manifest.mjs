
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
      "chunk-MRG7NP5K.js",
      "chunk-PTCTEDNV.js"
    ],
    "route": "/project02/public/app/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-A4QEIY4W.js",
      "chunk-PTCTEDNV.js"
    ],
    "route": "/project02/public/app/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FQTZEN3U.js"
    ],
    "route": "/project02/public/app/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FQTZEN3U.js"
    ],
    "route": "/project02/public/app/catalogue"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FQTZEN3U.js"
    ],
    "route": "/project02/public/app/produit/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FQTZEN3U.js"
    ],
    "route": "/project02/public/app/panier"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FQTZEN3U.js"
    ],
    "route": "/project02/public/app/profil"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FQTZEN3U.js"
    ],
    "route": "/project02/public/app/commande"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FQTZEN3U.js"
    ],
    "route": "/project02/public/app/boutique/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EIK5HAUO.js"
    ],
    "redirectTo": "/project02/public/app/artisan/dashboard",
    "route": "/project02/public/app/artisan"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EIK5HAUO.js"
    ],
    "route": "/project02/public/app/artisan/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EIK5HAUO.js"
    ],
    "route": "/project02/public/app/artisan/produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EIK5HAUO.js"
    ],
    "route": "/project02/public/app/artisan/commandes"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EIK5HAUO.js"
    ],
    "route": "/project02/public/app/artisan/stats"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EIK5HAUO.js"
    ],
    "route": "/project02/public/app/artisan/stats/consultation-produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QJ4ROFYL.js"
    ],
    "redirectTo": "/project02/public/app/admin/dashboard",
    "route": "/project02/public/app/admin"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QJ4ROFYL.js"
    ],
    "route": "/project02/public/app/admin/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QJ4ROFYL.js"
    ],
    "route": "/project02/public/app/admin/artisans"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QJ4ROFYL.js"
    ],
    "route": "/project02/public/app/admin/clients"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QJ4ROFYL.js"
    ],
    "route": "/project02/public/app/admin/administrateurs"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QJ4ROFYL.js"
    ],
    "route": "/project02/public/app/admin/commandes"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QJ4ROFYL.js"
    ],
    "route": "/project02/public/app/admin/produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-AMOCCFZ5.js"
    ],
    "route": "/project02/public/app/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17135, hash: '0e4ea408c9107c611642d2016283c8735b4fe7635d0eedc1d2df83171cc49fa1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2974, hash: '66f3e45854bbc2c329b8dcc0ccd1dc60bdc623c6a813ac98231e7e43805c8f58', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'project02/public/app/home/index.html': {size: 34940, hash: '9f6e0f8d414bc14d18e6f73051e69ade730b25d11cf0ebdfefdd490334d6202c', text: () => import('./assets-chunks/project02_public_app_home_index_html.mjs').then(m => m.default)},
    'project02/public/app/login/index.html': {size: 31985, hash: '9bcd996d621f025aae42bde4d2cde537ddc73ab62dd98be4ba55bd107641d6c1', text: () => import('./assets-chunks/project02_public_app_login_index_html.mjs').then(m => m.default)},
    'project02/public/app/register/index.html': {size: 33248, hash: '1c029e6c1fafd20d6f17a5a286f17af054ca15b3eb2d75b97aa8f64e92597801', text: () => import('./assets-chunks/project02_public_app_register_index_html.mjs').then(m => m.default)},
    'project02/public/app/catalogue/index.html': {size: 42887, hash: '8603d5925d6700af5cf30791e8f894dc653dce4e7f88f27dd9a5d2a008dcc44b', text: () => import('./assets-chunks/project02_public_app_catalogue_index_html.mjs').then(m => m.default)},
    'styles-NOOEMPK7.css': {size: 51466, hash: 'uD8P+Wi1D+4', text: () => import('./assets-chunks/styles-NOOEMPK7_css.mjs').then(m => m.default)}
  },
};

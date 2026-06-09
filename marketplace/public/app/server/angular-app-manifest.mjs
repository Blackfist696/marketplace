
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
    'index.csr.html': {size: 17018, hash: 'b02136b2e2a116b1465748a3b51040e7b7d39d7fc98b8a18548115b5ad3fad88', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2857, hash: 'db6f68111e7ce98be72d550be3e479e05afaecc62ce0dfaa67fbf900bb196efd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'project02/public/app/login/index.html': {size: 31963, hash: '001931e77d25e21aab0772b8d4038230b2bb39bdda12134df91d2b3bfea67f13', text: () => import('./assets-chunks/project02_public_app_login_index_html.mjs').then(m => m.default)},
    'project02/public/app/register/index.html': {size: 33226, hash: '8b7ccb126bd28fead62290da85e12f24e49f49331062ad4ca241e22aac1c5613', text: () => import('./assets-chunks/project02_public_app_register_index_html.mjs').then(m => m.default)},
    'project02/public/app/home/index.html': {size: 34918, hash: '2ed62ee1f32945c94f283559d7454fce92de2894dd56786c774973c9acffe154', text: () => import('./assets-chunks/project02_public_app_home_index_html.mjs').then(m => m.default)},
    'project02/public/app/catalogue/index.html': {size: 38088, hash: '0108819bc99c1fccbdf368f9c214389e7f2f776eb600912963b8f7d7c936acd5', text: () => import('./assets-chunks/project02_public_app_catalogue_index_html.mjs').then(m => m.default)},
    'styles-T53Y3UZE.css': {size: 50696, hash: 'lHmkkb3IScU', text: () => import('./assets-chunks/styles-T53Y3UZE_css.mjs').then(m => m.default)}
  },
};

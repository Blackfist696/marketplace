
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
      "chunk-Z6Y2EQG3.js",
      "chunk-PTCTEDNV.js"
    ],
    "route": "/project02/public/app/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2M427UFH.js",
      "chunk-PTCTEDNV.js"
    ],
    "route": "/project02/public/app/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZOVHBK5G.js"
    ],
    "route": "/project02/public/app/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZOVHBK5G.js"
    ],
    "route": "/project02/public/app/catalogue"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZOVHBK5G.js"
    ],
    "route": "/project02/public/app/produit/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZOVHBK5G.js"
    ],
    "route": "/project02/public/app/panier"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZOVHBK5G.js"
    ],
    "route": "/project02/public/app/profil"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZOVHBK5G.js"
    ],
    "route": "/project02/public/app/commande"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZOVHBK5G.js"
    ],
    "route": "/project02/public/app/boutique/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PX5I2AHP.js"
    ],
    "redirectTo": "/project02/public/app/artisan/dashboard",
    "route": "/project02/public/app/artisan"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PX5I2AHP.js"
    ],
    "route": "/project02/public/app/artisan/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PX5I2AHP.js"
    ],
    "route": "/project02/public/app/artisan/produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PX5I2AHP.js"
    ],
    "route": "/project02/public/app/artisan/commandes"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PX5I2AHP.js"
    ],
    "route": "/project02/public/app/artisan/stats"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PX5I2AHP.js"
    ],
    "route": "/project02/public/app/artisan/stats/consultation-produits"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YPNADP2E.js"
    ],
    "redirectTo": "/project02/public/app/admin/dashboard",
    "route": "/project02/public/app/admin"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YPNADP2E.js"
    ],
    "route": "/project02/public/app/admin/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YPNADP2E.js"
    ],
    "route": "/project02/public/app/admin/artisans"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YPNADP2E.js"
    ],
    "route": "/project02/public/app/admin/clients"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YPNADP2E.js"
    ],
    "route": "/project02/public/app/admin/administrateurs"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YPNADP2E.js"
    ],
    "route": "/project02/public/app/admin/commandes"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YPNADP2E.js"
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
    'index.csr.html': {size: 17018, hash: '51c5a34d70134d0da448bd7cf0ac451e1206f9b26b0755ce327f4ebb9c2d3e81', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2857, hash: '111e89c30fbf409abcadc63aab1077433d01781332ad038a4e25b8be99bf3afd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'project02/public/app/login/index.html': {size: 31963, hash: '4f0d1a18613e18bb9ff5e975fe777de99d196742c0be9acc670a24d5bf88400f', text: () => import('./assets-chunks/project02_public_app_login_index_html.mjs').then(m => m.default)},
    'project02/public/app/home/index.html': {size: 34918, hash: 'a50d1774c74f36781038253b0f547b5e370ea8f75a40d4e81d6491a3e7141817', text: () => import('./assets-chunks/project02_public_app_home_index_html.mjs').then(m => m.default)},
    'project02/public/app/catalogue/index.html': {size: 38088, hash: 'bba120c2c6c8f5e1867f8ca3def1a091086db481c6a8061e98181ef317095d5a', text: () => import('./assets-chunks/project02_public_app_catalogue_index_html.mjs').then(m => m.default)},
    'project02/public/app/register/index.html': {size: 33226, hash: '885c06a8a9d1998c3b45fe2790f29be776e25f1570b0fee21baccc280f6a17cd', text: () => import('./assets-chunks/project02_public_app_register_index_html.mjs').then(m => m.default)},
    'styles-T53Y3UZE.css': {size: 50696, hash: 'lHmkkb3IScU', text: () => import('./assets-chunks/styles-T53Y3UZE_css.mjs').then(m => m.default)}
  },
};


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
    'index.csr.html': {size: 17018, hash: '9d33d4c82821f44cdcd9c5977ddb7a49f302338bf27718ba25fa7f04baef7e13', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2857, hash: '467a72175d842607b92f97f223cac3c0002aa4e1cd7fc960b791af031e281477', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'project02/public/app/register/index.html': {size: 33226, hash: '248576fd9f55132d5563865466fba02b6215f9c2ad9c52f6dc09927c50625263', text: () => import('./assets-chunks/project02_public_app_register_index_html.mjs').then(m => m.default)},
    'project02/public/app/login/index.html': {size: 31963, hash: 'e1850df482d25c9fcd79bb59d4b8e46b33129532bafa68b0cb23b96e86a0a1c5', text: () => import('./assets-chunks/project02_public_app_login_index_html.mjs').then(m => m.default)},
    'project02/public/app/home/index.html': {size: 34918, hash: 'fb4e0b27b2a86586bf4f3df86d4d928d9910155ed871472d81f0d8450aca2d42', text: () => import('./assets-chunks/project02_public_app_home_index_html.mjs').then(m => m.default)},
    'project02/public/app/catalogue/index.html': {size: 38088, hash: '463a32e626884f7e6832ed7e25d18103101a537738f52424f2b4fd00ffc7c434', text: () => import('./assets-chunks/project02_public_app_catalogue_index_html.mjs').then(m => m.default)},
    'styles-T53Y3UZE.css': {size: 50696, hash: 'lHmkkb3IScU', text: () => import('./assets-chunks/styles-T53Y3UZE_css.mjs').then(m => m.default)}
  },
};

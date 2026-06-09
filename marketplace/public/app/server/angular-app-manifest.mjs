
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
      "chunk-ZNH7BZPI.js"
    ],
    "redirectTo": "/project02/public/app/admin/dashboard",
    "route": "/project02/public/app/admin"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZNH7BZPI.js"
    ],
    "route": "/project02/public/app/admin/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZNH7BZPI.js"
    ],
    "route": "/project02/public/app/admin/artisans"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZNH7BZPI.js"
    ],
    "route": "/project02/public/app/admin/clients"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZNH7BZPI.js"
    ],
    "route": "/project02/public/app/admin/commandes"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZNH7BZPI.js"
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
    'index.csr.html': {size: 17018, hash: 'a6b125b0458a1110538633d80a087af6f7156f2290c25f5b2a4dbf90137e12ec', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2857, hash: '15af8dea87f5f011bdb366da04ba3c14669834ebcf1bb21ef4502b5a60b0a9f7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'project02/public/app/register/index.html': {size: 33226, hash: '26075f8ec083920407e34623799c9454056d32c4d489b468125de3652ba1f4de', text: () => import('./assets-chunks/project02_public_app_register_index_html.mjs').then(m => m.default)},
    'project02/public/app/login/index.html': {size: 31963, hash: '0f49f6810b100c0bb7e620b9d029f303b51abd57d46b760a73e2fa5c9ed70cff', text: () => import('./assets-chunks/project02_public_app_login_index_html.mjs').then(m => m.default)},
    'project02/public/app/home/index.html': {size: 34918, hash: '4fa8b379c64cbd4c0598763fa310194c30dbe0524e1214c1c4603e4591b5048c', text: () => import('./assets-chunks/project02_public_app_home_index_html.mjs').then(m => m.default)},
    'project02/public/app/catalogue/index.html': {size: 38088, hash: '8cd0fbc2b51bf1c5499246e73f77bb0c44b9ae4ef814fe846916654b80a4c984', text: () => import('./assets-chunks/project02_public_app_catalogue_index_html.mjs').then(m => m.default)},
    'styles-47SJNORG.css': {size: 50382, hash: '2JupB8hwIoE', text: () => import('./assets-chunks/styles-47SJNORG_css.mjs').then(m => m.default)}
  },
};

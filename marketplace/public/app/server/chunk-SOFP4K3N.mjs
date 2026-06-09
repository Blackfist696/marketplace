import './polyfills.server.mjs';
function n(r){if(!r)return"";let t=r.trim().replace(/^\/+/,""),e=document.baseURI;return t.startsWith("assets/products/")?new URL(`../${t}`,e).pathname:t.startsWith("products/")?new URL(`../assets/${t}`,e).pathname:new URL(`../${t}`,e).pathname}export{n as a};

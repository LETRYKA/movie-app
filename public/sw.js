if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>i(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"e020bc5fce3fb3574572a093fb8402b1"},{url:"/_next/static/NNH-sHHrIMy3jQOj7Q03J/_buildManifest.js",revision:"eae64b08edaba52b806c045ce72bd178"},{url:"/_next/static/NNH-sHHrIMy3jQOj7Q03J/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/111-69f19c4ecfbef9f4.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/345-42217e4304076e3c.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/487-f3cf535ab95b6b96.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/638.34121668c0113fea.js",revision:"34121668c0113fea"},{url:"/_next/static/chunks/663-8b8f965112cf6e47.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/687-d4ec76444c1046d1.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/695-4fe9ff52b1c8352e.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/7.a0b6037fc5592201.js",revision:"a0b6037fc5592201"},{url:"/_next/static/chunks/875-0ce321a711394a40.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/8d78465b-2e60f29df540eaa6.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/_not-found/page-87c6dd22f3f69f96.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/collection/%5Bid%5D/%5Btitle%5D/page-66e6d91bb9bd5c89.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/collection/layout-daf11b4603ca98ca.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/genre/%5Bid%5D/%5Bpage%5D/page-021b10d88d5deeed.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/genre/layout-3e36968bd42f52dc.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/home/layout-37b88916a31286c6.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/home/page-e09243d1677963fc.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/info/layout-2c2bc04fef7fa371.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/info/movie/%5Bid%5D/page-827ea2794c1a4b6f.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/info/series/%5Bid%5D/page-636a743b8dc132ca.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/layout-7ddef6f6f863ebd7.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/more/%5Bid%5D/%5Bpage%5D/page-93c913f72c811c55.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/more/layout-723ad9681100a72e.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/more/series/%5Bid%5D/%5Bpage%5D/page-d8ec801a1b57fb85.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/page-65f38310c8cdeeb1.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/profile/layout-5182758fcc62005b.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/profile/page-e52e61e293624f27.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/search/layout-d62cd91100357d6d.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/search/page-c5ac4edcc34c97a5.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/subscription/layout-5099eb0902234452.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/subscription/page-8a32e2e2e293c407.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/watch/layout-d782a6a127808fca.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/watch/movie/%5Bid%5D/page-94fa533a437894c8.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/app/watch/series/%5Bid%5D/%5Bseason%5D/%5Bepisode%5D/page-85cfa25d5fd27ba7.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/framework-2747601013381848.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/main-63e60a1635910ed7.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/main-app-ccf532a9d1a11fba.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/pages/_app-7b4c10837543382b.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/pages/_error-e9681b66b4ec5ea3.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-0f7f4f702c1e99df.js",revision:"NNH-sHHrIMy3jQOj7Q03J"},{url:"/_next/static/css/64943ef1406471c7.css",revision:"64943ef1406471c7"},{url:"/_next/static/css/6ec45cd97f6d3ea8.css",revision:"6ec45cd97f6d3ea8"},{url:"/_next/static/media/0822b6067e7c0dee-s.woff2",revision:"e639e31d35a7aa5fb0bc336286469c3c"},{url:"/_next/static/media/67354d9f27664b22-s.woff2",revision:"828d8b6c05d4a29e33d11e60773f0f74"},{url:"/_next/static/media/6905431624c34d00-s.p.woff2",revision:"5b3db6889bd28d3ebeef0fe9ae345c4e"},{url:"/imgs/Appx192.png.png",revision:"dbf4c0670277fbf9ebdcaa88c128d312"},{url:"/imgs/Appx512.png",revision:"233478377148ba48988aaa532688c68e"},{url:"/imgs/disney-bg.jpg",revision:"1947dc63b8ad2afa248275d80104d3bf"},{url:"/imgs/disney-v.mp4",revision:"871107259daeb06dc604bd5f1e1018d6"},{url:"/imgs/disney-vv.mp4",revision:"6406aefbcbb2f6f13db78248f1460a8a"},{url:"/imgs/disney.jpg",revision:"f461de578c175af0bb3aad9de51b1150"},{url:"/imgs/holder.jpg",revision:"3c7c40931e1d8ab19b7d86ef946e10ca"},{url:"/imgs/logo.png",revision:"19ac9d8a7f26691f2ad73b0cab9abb46"},{url:"/imgs/marvel-bg.jpg",revision:"9090500e54547d312bbb5140a71b0b46"},{url:"/imgs/marvel-v.mp4",revision:"51b01183ab18d76d47f36cefd921fb7a"},{url:"/imgs/marvel.jpg",revision:"e84d4a2a604ee52e4eacd0750a9e4c0b"},{url:"/imgs/ngeo-bg.jpg",revision:"5b662af8928a5941d715f0e1c9e8d35d"},{url:"/imgs/ngeo-v.mp4",revision:"f3878571ae707994f2d9857d4c925e1f"},{url:"/imgs/ngeo.jpg",revision:"45c4fe5c6f5e45685ae5eae6ec1b1e74"},{url:"/imgs/paramount-bg.jpg",revision:"19f176bd3104f66504148939ca063d3c"},{url:"/imgs/paramount-v.mp4",revision:"578f3fa9e4666f699f39714745a836ce"},{url:"/imgs/paramount.jpg",revision:"541276240df7f5489b1c646f9c8f1b55"},{url:"/imgs/pixar-bg.jpg",revision:"6e98902429ca1ab24a5b8e8b46648a6c"},{url:"/imgs/pixar-v.mp4",revision:"b45473a1174b7a6c6ab7812a2bc3afe7"},{url:"/imgs/pixar.jpg",revision:"28c23ea1950e5300ba69c8edf4230e95"},{url:"/imgs/star-v.mp4",revision:"62e78f81a08eba26b6fdda2802fecffd"},{url:"/imgs/starwars-bg.jpg",revision:"f82da89529f83f8f5011e5a0fbe070f3"},{url:"/imgs/starwars-v.mp4",revision:"dd1105d40b12ec33ce1e58a4dc49c3a3"},{url:"/imgs/starwars.jpg",revision:"b35032daa812d889606f8bc2ab6c187e"},{url:"/imgs/sub.png",revision:"ad71f3a7b9a603a7899e1a59330edb45"},{url:"/manifest.json",revision:"363cf8733f7c8f77818e4136eb8006ff"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

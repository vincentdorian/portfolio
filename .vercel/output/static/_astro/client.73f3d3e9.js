const r={};function _(e){r.context=e}function F(){return{...r.context,id:`${r.context.id}${r.context.count++}-`,count:0}}let P=D;const A=1,b=2,Y={owned:null,cleanups:null,context:null,owner:null};var d=null;let x=null,p=null,h=null,w=null,v=0;function k(e,n){const t=p,s=d,i=e.length===0,o=i?Y:{owned:null,cleanups:null,context:null,owner:n===void 0?s:n},f=i?e:()=>e(()=>C(()=>T(o)));d=o,p=null;try{return S(f,!0)}finally{p=t,d=s}}function H(e,n,t){const s=V(e,n,!1,A);L(s)}function C(e){if(p===null)return e();const n=p;p=null;try{return e()}finally{p=n}}function G(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&S(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],f=x&&x.running;f&&x.disposed.has(o),(f&&!o.tState||!f&&!o.state)&&(o.pure?h.push(o):w.push(o),o.observers&&M(o)),f||(o.state=A)}if(h.length>1e6)throw h=[],new Error},!1)),n}function L(e){if(!e.fn)return;T(e);const n=d,t=p,s=v;p=d=e,Q(e,e.value,s),p=t,d=n}function Q(e,n,t){let s;try{s=e.fn(n)}catch(i){e.pure&&(e.state=A,e.owned&&e.owned.forEach(T),e.owned=null),O(i)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?G(e,s):e.value=s,e.updatedAt=t)}function V(e,n,t,s=A,i){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:d,context:null,pure:t};return d===null||d!==Y&&(d.owned?d.owned.push(o):d.owned=[o]),o}function R(e){const n=x;if(e.state===0||n)return;if(e.state===b||n)return m(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<v);)(e.state||n)&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===A||n)L(e);else if(e.state===b||n){const i=h;h=null,S(()=>m(e,t[0]),!1),h=i}}function S(e,n){if(h)return e();let t=!1;n||(h=[]),w?t=!0:w=[],v++;try{const s=e();return J(t),s}catch(s){t||(w=null),h=null,O(s)}}function J(e){if(h&&(D(h),h=null),e)return;const n=w;w=null,n.length&&S(()=>P(n),!1)}function D(e){for(let n=0;n<e.length;n++)R(e[n])}function m(e,n){const t=x;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===A||t?i!==n&&R(i):(i.state===b||t)&&m(i,n))}}function M(e){const n=x;for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];(!s.state||n)&&(s.state=b,s.pure?h.push(s):w.push(s),s.observers&&M(s))}}function T(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const o=i.pop(),f=t.observerSlots.pop();s<i.length&&(o.sourceSlots[f]=s,i[s]=o,t.observerSlots[s]=f)}}if(e.owned){for(n=0;n<e.owned.length;n++)T(e.owned[n]);e.owned=null}if(e.cleanups){for(n=0;n<e.cleanups.length;n++)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function K(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function O(e){throw e=K(e),e}let W=!1;function X(){W=!0}function Z(e,n){if(W&&r.context){const t=r.context;_(F());const s=C(()=>e(n||{}));return _(t),s}return C(()=>e(n||{}))}function z(e,n,t){let s=t.length,i=n.length,o=s,f=0,l=0,c=n[i-1].nextSibling,a=null;for(;f<i||l<o;){if(n[f]===t[l]){f++,l++;continue}for(;n[i-1]===t[o-1];)i--,o--;if(i===f){const u=o<s?l?t[l-1].nextSibling:t[o-l]:c;for(;l<o;)e.insertBefore(t[l++],u)}else if(o===l)for(;f<i;)(!a||!a.has(n[f]))&&n[f].remove(),f++;else if(n[f]===t[o-1]&&t[l]===n[i-1]){const u=n[--i].nextSibling;e.insertBefore(t[l++],n[f++].nextSibling),e.insertBefore(t[--o],u),n[i]=t[o]}else{if(!a){a=new Map;let g=l;for(;g<o;)a.set(t[g],g++)}const u=a.get(n[f]);if(u!=null)if(l<u&&u<o){let g=f,N=1,B;for(;++g<i&&g<o&&!((B=a.get(n[g]))==null||B!==u+N);)N++;if(N>u-l){const q=n[f];for(;l<u;)e.insertBefore(t[l++],q)}else e.replaceChild(t[l++],n[f++])}else f++;else n[f++].remove()}}}function j(e,n,t,s={}){let i;return k(o=>{i=o,n===document?e():ee(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{i(),n.textContent=""}}function ee(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return E(e,n,s,t);H(i=>E(e,n(),i,t),s)}function te(e,n,t={}){r.completed=globalThis._$HY.completed,r.events=globalThis._$HY.events,r.load=globalThis._$HY.load,r.gather=i=>U(n,i),r.registry=new Map,r.context={id:t.renderId||"",count:0},U(n,t.renderId);const s=j(e,n,[...n.childNodes],t);return r.context=null,s}function E(e,n,t,s,i){for(r.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(n===t)return t;const o=typeof n,f=s!==void 0;if(e=f&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(r.context)return t;if(o==="number"&&(n=n.toString()),f){let l=t[0];l&&l.nodeType===3?l.data=n:l=document.createTextNode(n),t=y(e,t,s,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||o==="boolean"){if(r.context)return t;t=y(e,t,s)}else{if(o==="function")return H(()=>{let l=n();for(;typeof l=="function";)l=l();t=E(e,l,t,s)}),()=>t;if(Array.isArray(n)){const l=[],c=t&&Array.isArray(t);if($(l,n,t,i))return H(()=>t=E(e,l,t,s,!0)),()=>t;if(r.context){if(!l.length)return t;for(let a=0;a<l.length;a++)if(l[a].parentNode)return t=l}if(l.length===0){if(t=y(e,t,s),f)return t}else c?t.length===0?I(e,l,s):z(e,t,l):(t&&y(e),I(e,l));t=l}else if(n instanceof Node){if(r.context&&n.parentNode)return t=f?[n]:n;if(Array.isArray(t)){if(f)return t=y(e,t,s,n);y(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function $(e,n,t,s){let i=!1;for(let o=0,f=n.length;o<f;o++){let l=n[o],c=t&&t[o];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=$(e,l,c)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=$(e,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||i}else e.push(l),i=!0;else{const a=String(l);c&&c.nodeType===3&&c.data===a?e.push(c):e.push(document.createTextNode(a))}}return i}function I(e,n,t=null){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function y(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let o=!1;for(let f=n.length-1;f>=0;f--){const l=n[f];if(i!==l){const c=l.parentNode===e;!o&&!f?c?e.replaceChild(i,l):e.insertBefore(i,t):c&&l.remove()}else o=!0}}else e.insertBefore(i,t);return[i]}function U(e,n){const t=e.querySelectorAll("*[data-hk]");for(let s=0;s<t.length;s++){const i=t[s],o=i.getAttribute("data-hk");(!n||o.startsWith(n))&&!r.registry.has(o)&&r.registry.set(o,i)}}const ne=(...e)=>(X(),te(...e));var se=e=>(n,t,s,{client:i})=>{if(window._$HY||(window._$HY={events:[],completed:new WeakSet,r:{}}),!e.hasAttribute("ssr"))return;const o=i==="only"?j:ne;let f={};if(Object.keys(s).length>0)if(r.context)e.querySelectorAll("astro-slot").forEach(u=>{f[u.getAttribute("name")||"default"]=u.cloneNode(!0)});else for(const[u,g]of Object.entries(s))f[u]=document.createElement("astro-slot"),u!=="default"&&f[u].setAttribute("name",u),f[u].innerHTML=g;const{default:l,...c}=f,a=e.dataset.solidRenderId;o(()=>Z(n,{...t,...c,children:l}),e,{renderId:a})};export{se as default};

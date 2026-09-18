(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pe=globalThis,rt=Pe.ShadowRoot&&(Pe.ShadyCSS===void 0||Pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,nt=Symbol(),gt=new WeakMap;let Dt=class{constructor(e,s,n){if(this._$cssResult$=!0,n!==nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(rt&&e===void 0){const n=s!==void 0&&s.length===1;n&&(e=gt.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&gt.set(s,e))}return e}toString(){return this.cssText}};const Xt=t=>new Dt(typeof t=="string"?t:t+"",void 0,nt),E=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((n,r,i)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new Dt(s,t,nt)},Qt=(t,e)=>{if(rt)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const n=document.createElement("style"),r=Pe.litNonce;r!==void 0&&n.setAttribute("nonce",r),n.textContent=s.cssText,t.appendChild(n)}},mt=rt?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const n of e.cssRules)s+=n.cssText;return Xt(s)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:es,defineProperty:ts,getOwnPropertyDescriptor:ss,getOwnPropertyNames:rs,getOwnPropertySymbols:ns,getPrototypeOf:is}=Object,R=globalThis,ft=R.trustedTypes,as=ft?ft.emptyScript:"",Le=R.reactiveElementPolyfillSupport,ue=(t,e)=>t,Ee={toAttribute(t,e){switch(e){case Boolean:t=t?as:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},it=(t,e)=>!es(t,e),bt={attribute:!0,type:String,converter:Ee,reflect:!1,useDefault:!1,hasChanged:it};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);let ee=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=bt){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(e,n,s);r!==void 0&&ts(this.prototype,e,r)}}static getPropertyDescriptor(e,s,n){const{get:r,set:i}=ss(this.prototype,e)??{get(){return this[s]},set(a){this[s]=a}};return{get:r,set(a){const l=r==null?void 0:r.call(this);i==null||i.call(this,a),this.requestUpdate(e,l,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??bt}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;const e=is(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){const s=this.properties,n=[...rs(s),...ns(s)];for(const r of n)this.createProperty(r,s[r])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[n,r]of s)this.elementProperties.set(n,r)}this._$Eh=new Map;for(const[s,n]of this.elementProperties){const r=this._$Eu(s,n);r!==void 0&&this._$Eh.set(r,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const r of n)s.unshift(mt(r))}else e!==void 0&&s.push(mt(e));return s}static _$Eu(e,s){const n=s.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(s=>s(this))}addController(e){var s;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)==null||s.call(e))}removeController(e){var s;(s=this._$EO)==null||s.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const n of s.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(s=>{var n;return(n=s.hostConnected)==null?void 0:n.call(s)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(s=>{var n;return(n=s.hostDisconnected)==null?void 0:n.call(s)})}attributeChangedCallback(e,s,n){this._$AK(e,n)}_$ET(e,s){var i;const n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&n.reflect===!0){const a=(((i=n.converter)==null?void 0:i.toAttribute)!==void 0?n.converter:Ee).toAttribute(s,n.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,s){var i,a;const n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const l=n.getPropertyOptions(r),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((i=l.converter)==null?void 0:i.fromAttribute)!==void 0?l.converter:Ee;this._$Em=r;const p=c.fromAttribute(s,l.type);this[r]=p??((a=this._$Ej)==null?void 0:a.get(r))??p,this._$Em=null}}requestUpdate(e,s,n,r=!1,i){var a;if(e!==void 0){const l=this.constructor;if(r===!1&&(i=this[e]),n??(n=l.getPropertyOptions(e)),!((n.hasChanged??it)(i,s)||n.useDefault&&n.reflect&&i===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(l._$Eu(e,n))))return;this.C(e,s,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??s??this[e]),i!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(s=void 0),this._$AL.set(e,s)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,a]of r){const{wrapped:l}=a,c=this[i];l!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,a,c)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(n=this._$EO)==null||n.forEach(r=>{var i;return(i=r.hostUpdate)==null?void 0:i.call(r)}),this.update(s)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(s)}willUpdate(e){}_$AE(e){var s;(s=this._$EO)==null||s.forEach(n=>{var r;return(r=n.hostUpdated)==null?void 0:r.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(s=>this._$ET(s,this[s]))),this._$EM()}updated(e){}firstUpdated(e){}};ee.elementStyles=[],ee.shadowRootOptions={mode:"open"},ee[ue("elementProperties")]=new Map,ee[ue("finalized")]=new Map,Le==null||Le({ReactiveElement:ee}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=globalThis,yt=t=>t,Oe=ge.trustedTypes,vt=Oe?Oe.createPolicy("lit-html",{createHTML:t=>t}):void 0,Et="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Ot="?"+M,os=`<${Ot}>`,J=document,fe=()=>J.createComment(""),be=t=>t===null||typeof t!="object"&&typeof t!="function",at=Array.isArray,ls=t=>at(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Be=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,wt=/>/g,B=RegExp(`>|${Be}(?:([^\\s"'>=/]+)(${Be}*=${Be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kt=/'/g,xt=/"/g,It=/^(?:script|style|textarea|title)$/i,Kt=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),o=Kt(1),_t=Kt(2),ne=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),St=new WeakMap,z=J.createTreeWalker(J,129);function Wt(t,e){if(!at(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(e):e}const cs=(t,e)=>{const s=t.length-1,n=[];let r,i=e===2?"<svg>":e===3?"<math>":"",a=he;for(let l=0;l<s;l++){const c=t[l];let p,g,d=-1,b=0;for(;b<c.length&&(a.lastIndex=b,g=a.exec(c),g!==null);)b=a.lastIndex,a===he?g[1]==="!--"?a=$t:g[1]!==void 0?a=wt:g[2]!==void 0?(It.test(g[2])&&(r=RegExp("</"+g[2],"g")),a=B):g[3]!==void 0&&(a=B):a===B?g[0]===">"?(a=r??he,d=-1):g[1]===void 0?d=-2:(d=a.lastIndex-g[2].length,p=g[1],a=g[3]===void 0?B:g[3]==='"'?xt:kt):a===xt||a===kt?a=B:a===$t||a===wt?a=he:(a=B,r=void 0);const h=a===B&&t[l+1].startsWith("/>")?" ":"";i+=a===he?c+os:d>=0?(n.push(p),c.slice(0,d)+Et+c.slice(d)+M+h):c+M+(d===-2?l:h)}return[Wt(t,i+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class ye{constructor({strings:e,_$litType$:s},n){let r;this.parts=[];let i=0,a=0;const l=e.length-1,c=this.parts,[p,g]=cs(e,s);if(this.el=ye.createElement(p,n),z.currentNode=this.el.content,s===2||s===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=z.nextNode())!==null&&c.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const d of r.getAttributeNames())if(d.endsWith(Et)){const b=g[a++],h=r.getAttribute(d).split(M),m=/([.?@])?(.*)/.exec(b);c.push({type:1,index:i,name:m[2],strings:h,ctor:m[1]==="."?ds:m[1]==="?"?hs:m[1]==="@"?us:je}),r.removeAttribute(d)}else d.startsWith(M)&&(c.push({type:6,index:i}),r.removeAttribute(d));if(It.test(r.tagName)){const d=r.textContent.split(M),b=d.length-1;if(b>0){r.textContent=Oe?Oe.emptyScript:"";for(let h=0;h<b;h++)r.append(d[h],fe()),z.nextNode(),c.push({type:2,index:++i});r.append(d[b],fe())}}}else if(r.nodeType===8)if(r.data===Ot)c.push({type:2,index:i});else{let d=-1;for(;(d=r.data.indexOf(M,d+1))!==-1;)c.push({type:7,index:i}),d+=M.length-1}i++}}static createElement(e,s){const n=J.createElement("template");return n.innerHTML=e,n}}function ie(t,e,s=t,n){var a,l;if(e===ne)return e;let r=n!==void 0?(a=s._$Co)==null?void 0:a[n]:s._$Cl;const i=be(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==i&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),i===void 0?r=void 0:(r=new i(t),r._$AT(t,s,n)),n!==void 0?(s._$Co??(s._$Co=[]))[n]=r:s._$Cl=r),r!==void 0&&(e=ie(t,r._$AS(t,e.values),r,n)),e}class ps{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:n}=this._$AD,r=((e==null?void 0:e.creationScope)??J).importNode(s,!0);z.currentNode=r;let i=z.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let p;c.type===2?p=new we(i,i.nextSibling,this,e):c.type===1?p=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(p=new gs(i,this,e)),this._$AV.push(p),c=n[++l]}a!==(c==null?void 0:c.index)&&(i=z.nextNode(),a++)}return z.currentNode=J,r}p(e){let s=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,s),s+=n.strings.length-2):n._$AI(e[s])),s++}}class we{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,s,n,r){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=n,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=ie(this,e,s),be(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==ne&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ls(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&be(this._$AH)?this._$AA.nextSibling.data=e:this.T(J.createTextNode(e)),this._$AH=e}$(e){var i;const{values:s,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ye.createElement(Wt(n.h,n.h[0]),this.options)),n);if(((i=this._$AH)==null?void 0:i._$AD)===r)this._$AH.p(s);else{const a=new ps(r,this),l=a.u(this.options);a.p(s),this.T(l),this._$AH=a}}_$AC(e){let s=St.get(e.strings);return s===void 0&&St.set(e.strings,s=new ye(e)),s}k(e){at(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let n,r=0;for(const i of e)r===s.length?s.push(n=new we(this.O(fe()),this.O(fe()),this,this.options)):n=s[r],n._$AI(i),r++;r<s.length&&(this._$AR(n&&n._$AB.nextSibling,r),s.length=r)}_$AR(e=this._$AA.nextSibling,s){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,s);e!==this._$AB;){const r=yt(e).nextSibling;yt(e).remove(),e=r}}setConnected(e){var s;this._$AM===void 0&&(this._$Cv=e,(s=this._$AP)==null||s.call(this,e))}}class je{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,n,r,i){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=s,this._$AM=r,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=x}_$AI(e,s=this,n,r){const i=this.strings;let a=!1;if(i===void 0)e=ie(this,e,s,0),a=!be(e)||e!==this._$AH&&e!==ne,a&&(this._$AH=e);else{const l=e;let c,p;for(e=i[0],c=0;c<i.length-1;c++)p=ie(this,l[n+c],s,c),p===ne&&(p=this._$AH[c]),a||(a=!be(p)||p!==this._$AH[c]),p===x?e=x:e!==x&&(e+=(p??"")+i[c+1]),this._$AH[c]=p}a&&!r&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ds extends je{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}}class hs extends je{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}}class us extends je{constructor(e,s,n,r,i){super(e,s,n,r,i),this.type=5}_$AI(e,s=this){if((e=ie(this,e,s,0)??x)===ne)return;const n=this._$AH,r=e===x&&n!==x||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==x&&(n===x||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var s;typeof this._$AH=="function"?this._$AH.call(((s=this.options)==null?void 0:s.host)??this.element,e):this._$AH.handleEvent(e)}}class gs{constructor(e,s,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ie(this,e)}}const He=ge.litHtmlPolyfillSupport;He==null||He(ye,we),(ge.litHtmlVersions??(ge.litHtmlVersions=[])).push("3.3.3");const ms=(t,e,s)=>{const n=(s==null?void 0:s.renderBefore)??e;let r=n._$litPart$;if(r===void 0){const i=(s==null?void 0:s.renderBefore)??null;n._$litPart$=r=new we(e.insertBefore(fe(),i),i,void 0,s??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis;class w extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var s;const e=super.createRenderRoot();return(s=this.renderOptions).renderBefore??(s.renderBefore=e.firstChild),e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ms(s,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ne}}var At;w._$litElement$=!0,w.finalized=!0,(At=V.litElementHydrateSupport)==null||At.call(V,{LitElement:w});const ze=V.litElementPolyfillSupport;ze==null||ze({LitElement:w});(V.litElementVersions??(V.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fs={attribute:!0,type:String,converter:Ee,reflect:!1,hasChanged:it},bs=(t=fs,e,s)=>{const{kind:n,metadata:r}=s;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(s.name,t),n==="accessor"){const{name:a}=s;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,c,t,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,t,l),l}}}if(n==="setter"){const{name:a}=s;return function(l){const c=this[a];e.call(this,l),this.requestUpdate(a,c,t,!0,l)}}throw Error("Unsupported decorator location: "+n)};function _(t){return(e,s)=>typeof s=="object"?bs(t,e,s):((n,r,i)=>{const a=r.hasOwnProperty(i);return r.constructor.createProperty(i,n),a?Object.getOwnPropertyDescriptor(r,i):void 0})(t,e,s)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(t){return _({...t,state:!0,attribute:!1})}const ys="2.0.0",vs=2;function ae(){return{schemaVersion:vs,onboardingComplete:!1,profile:null,settings:{units:"metric"},activePlan:null,pendingPlan:null,activeWorkout:null,sessions:[],adherence:{},measurements:[],reviews:[],photos:[]}}const Tt="bulktrack-v2",$s=1,oe="kv",N="photos";let F=null;function ke(){return F||(F=new Promise((t,e)=>{const s=indexedDB.open(Tt,$s);s.onupgradeneeded=()=>{const n=s.result;n.objectStoreNames.contains(oe)||n.createObjectStore(oe),n.objectStoreNames.contains(N)||n.createObjectStore(N)},s.onsuccess=()=>t(s.result),s.onerror=()=>e(s.error)}),F)}function ot(t){return new Promise((e,s)=>{t.oncomplete=()=>e(),t.onerror=()=>s(t.error),t.onabort=()=>s(t.error)})}async function ws(t){const e=await ke();return new Promise((s,n)=>{const i=e.transaction(oe,"readonly").objectStore(oe).get(t);i.onsuccess=()=>s(i.result),i.onerror=()=>n(i.error)})}async function ks(t,e){const n=(await ke()).transaction(oe,"readwrite");n.objectStore(oe).put(e,t),await ot(n)}async function Mt(t,e){const n=(await ke()).transaction(N,"readwrite");n.objectStore(N).put(e,t),await ot(n)}async function Rt(t){const e=await ke();return new Promise((s,n)=>{const i=e.transaction(N,"readonly").objectStore(N).get(t);i.onsuccess=()=>s(i.result),i.onerror=()=>n(i.error)})}async function Ct(t){const s=(await ke()).transaction(N,"readwrite");s.objectStore(N).delete(t),await ot(s)}async function xs(){F&&((await F).close(),F=null),await new Promise((t,e)=>{const s=indexedDB.deleteDatabase(Tt);s.onsuccess=()=>t(),s.onerror=()=>e(s.error),s.onblocked=()=>t()})}const Nt="state";async function _s(){try{localStorage.removeItem("bulktrack:v1")}catch{}const t=await ws(Nt);return!t||t.schemaVersion!==2?ae():{...ae(),...t,settings:t.settings??{units:"metric"},sessions:(t.sessions??[]).map(Ss),adherence:t.adherence??{},measurements:t.measurements??[],reviews:t.reviews??[],photos:t.photos??[]}}function Ss(t){return{...t,exercises:(t.exercises??[]).map(Cs)}}function Cs(t){var s;const e=t.plannedExerciseId??t.exerciseId??"";return{plannedExerciseId:e,performedExerciseId:t.performedExerciseId??e,name:t.name,status:t.status??((s=t.sets)!=null&&s.some(n=>n.done)?"completed":"pending"),skipReason:t.skipReason,substitutionReason:t.substitutionReason,sets:t.sets??[]}}async function Ps(t){await ks(Nt,t)}function Ye(t="id"){return`${t}_${Math.random().toString(36).slice(2,8)}${Date.now().toString(36).slice(-4)}`}function As(t,e,s){return Math.min(s,Math.max(e,t))}function Ds(t,e){var r;const s=Math.round(t/e)*e,n=e<1?((r=String(e).split(".")[1])==null?void 0:r.length)??1:0;return Number(s.toFixed(n))}function Es(t){return t.length?t.reduce((e,s)=>e+s,0)/t.length:null}function Fe(t,e=1){return t==null||Number.isNaN(t)?"—":`${t.toFixed(e)} kg`}function Ge(t){return t==null||Number.isNaN(t)?"—":`${t.toFixed(1)} cm`}function Ze(t,e,s=1){return t==null||Number.isNaN(t)?"—":`${t>0?"+":""}${t.toFixed(s)} ${e}`}function Os(t){return Number.isInteger(t)?String(t):t.toFixed(1)}function Is(t,e=0){const s=Number(t);return Number.isFinite(s)?s:e}const Ks=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],te=["January","February","March","April","May","June","July","August","September","October","November","December"];function Ie(t){return String(t).padStart(2,"0")}function Xe(t){return`${t.getFullYear()}-${Ie(t.getMonth()+1)}-${Ie(t.getDate())}`}function W(t){const[e,s,n]=t.split("-").map(Number);return new Date(e??2026,(s??1)-1,n??1)}function jt(t,e){const s=new Date(t);return s.setDate(s.getDate()+e),s}function Ws(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}function Ts(t){const e=Ws(t),s=e.getDay(),n=s===0?-6:1-s;return jt(e,n)}function K(t=new Date){return Xe(t)}function Ms(t){const e=typeof t=="string"?W(t):t;return Ks[e.getDay()]??"monday"}function Rs(t){const e=typeof t=="string"?W(t):t;return`${e.toLocaleDateString("en-GB",{weekday:"long"})}, ${e.getDate()} ${te[e.getMonth()]}`}function le(t){var s;const e=typeof t=="string"?W(t):t;return`${e.getDate()} ${(s=te[e.getMonth()])==null?void 0:s.slice(0,3)}`}function Ut(t,e){var r,i;const s=W(t),n=W(e);return s.getMonth()===n.getMonth()?`${s.getDate()}–${n.getDate()} ${te[s.getMonth()]}`:`${s.getDate()} ${(r=te[s.getMonth()])==null?void 0:r.slice(0,3)} – ${n.getDate()} ${(i=te[n.getMonth()])==null?void 0:i.slice(0,3)}`}function se(t){const[e,s]=t.split("-").map(Number);return`${te[(s??1)-1]??t} ${e}`}function Ns(t=new Date){const e=t.getHours();return e<12?"Good morning":e<18?"Good afternoon":"Good evening"}function Ae(t,e,s){return t>=e&&t<=s}function js(t){const e=Math.max(0,Math.ceil(t)),s=Math.floor(e/60),n=e%60;return`${Ie(s)}:${Ie(n)}`}function Us(t){const e=W(t);return e.getDay()===0&&e.getDate()<=7}function me(t){return t.slice(0,7)}let G=ae();const De=new Set;let Qe=Promise.resolve();function Lt(){De.forEach(t=>t())}function Ls(){Qe=Qe.then(()=>Ps(G)).catch(t=>{console.error("Failed to save BulkTrack data",t)})}function C(t){G=t(G),Ls(),Lt()}const u={ready:Promise.resolve(),async init(){G=await _s(),Lt()},get(){return G},subscribe(t){return De.add(t),()=>De.delete(t)},completeOnboarding(t,e){C(s=>({...s,onboardingComplete:!0,profile:t,activePlan:e,pendingPlan:null,measurements:[{date:K(),weightKg:t.currentWeightKg},...s.measurements.filter(n=>n.date!==K())]}))},updateProfile(t){C(e=>({...e,profile:e.profile?{...e.profile,...t}:e.profile}))},setPendingPlan(t){C(e=>({...e,pendingPlan:t}))},startWeek(){C(t=>{if(!t.pendingPlan)return t;const e=t.pendingPlan;return{...t,activePlan:e,pendingPlan:null,profile:t.profile?{...t.profile,targetWeightKg:e.targets.targetWeightKg,goal:e.targets.goal}:t.profile}})},upsertAdherence(t,e){C(s=>{const n=s.adherence[t]??{date:t};return{...s,adherence:{...s.adherence,[t]:{...n,...e,date:t}}}})},setActiveWorkout(t){C(e=>({...e,activeWorkout:t}))},saveActiveWorkout(t){C(e=>({...e,activeWorkout:t}))},completeWorkout(t){C(e=>({...e,activeWorkout:null,sessions:[t,...e.sessions.filter(s=>s.id!==t.id)]}))},markDayComplete(t,e,s,n){const r={id:Ye("session"),workoutId:e,name:s,date:t,startedAt:new Date().toISOString(),completedAt:new Date().toISOString(),durationMinutes:n==="swimming"?30:void 0,exercises:[],currentExerciseIndex:0};C(i=>({...i,sessions:[r,...i.sessions.filter(a=>!(a.date===t&&a.workoutId===e))]}))},saveMeasurement(t){C(e=>({...e,measurements:[t,...e.measurements.filter(s=>s.date!==t.date)].sort((s,n)=>s.date.localeCompare(n.date))}))},saveReview(t){C(e=>({...e,reviews:[t,...e.reviews.filter(s=>s.startDate!==t.startDate)]}))},markReviewExported(t){C(e=>({...e,reviews:e.reviews.map(s=>s.startDate===t?{...s,exportedAt:new Date().toISOString()}:s)}))},async addPhoto(t,e,s=K()){const n=me(s),r=G.photos.find(a=>a.month===n&&a.pose===e),i=Ye("photo");await Mt(i,t),r&&await Ct(r.id),C(a=>({...a,photos:[{id:i,date:s,month:n,pose:e},...a.photos.filter(l=>l.id!==(r==null?void 0:r.id))]}))},async removePhoto(t){await Ct(t),C(e=>({...e,photos:e.photos.filter(s=>s.id!==t)}))},getPhoto:Rt,restoreBackup(t){C(()=>({...ae(),...t,schemaVersion:2}))},async reset(){De.clear(),await Qe,await xs(),G=ae();try{localStorage.removeItem("bulktrack:v1")}catch{}window.location.hash="#/today",window.location.reload()}};function Bt(t,e){if(t.type==="swimming")return"Swimming";if(t.type==="delivery_recovery")return"Delivery / recovery";if(t.type==="weekly_review")return"Weekly review";const s=e==null?void 0:e.workouts.find(n=>n.id===t.workoutId);return(s==null?void 0:s.name)??"Gym"}const Bs=["today","progress","plan"];function Hs(t=window.location.hash){const e=t.replace(/^#\/?/,""),[s,n]=e.split("/");return s==="plan"&&n?{page:"plan",workoutId:n}:s==="history"&&n?{page:"history",sessionId:n}:["today","progress","plan","settings","workout","review","onboarding","history","import"].includes(s)?{page:s}:{page:"today"}}function y(t,e=""){const s=e?`#/${t}/${e}`:`#/${t}`;if(window.location.hash===s){window.dispatchEvent(new HashChangeEvent("hashchange"));return}window.location.hash=s}function zs(t){return Bs.includes(t)}var Fs=Object.defineProperty,Gs=Object.getOwnPropertyDescriptor,xe=(t,e,s,n)=>{for(var r=n>1?void 0:n?Gs(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Fs(e,s,r),r};let q=class extends w{constructor(){super(...arguments),this.title="BulkTrack",this.showDate=!1,this.showSettings=!0,this.backTo=""}render(){return o`
      <header>
        <div class="brand">
          <div class="top">
            ${this.backTo?o`<button @click=${()=>y(this.backTo)} aria-label="Back">←</button>`:null}
            <span class="name">${this.title}</span>
          </div>
          ${this.showDate?o`<span class="date">${Rs(K())}</span>`:null}
          ${this.showDate?o`<span class="hello">${Ns()}</span>`:null}
        </div>
        ${this.showSettings?o`<button @click=${()=>y("settings")} aria-label="Settings">⚙</button>`:o`<span></span>`}
      </header>
    `}};q.styles=E`
    :host {
      display: block;
    }

    header {
      min-height: var(--header-h);
      padding: calc(10px + env(safe-area-inset-top, 0px)) 20px 8px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-height: 44px;
      justify-content: center;
    }

    .top {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .name {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .date {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .hello {
      font-size: 12px;
      color: var(--text-secondary);
    }

    button {
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--surface);
      color: var(--text-primary);
      font-size: 18px;
      flex-shrink: 0;
    }
  `;xe([_()],q.prototype,"title",2);xe([_({type:Boolean})],q.prototype,"showDate",2);xe([_({type:Boolean})],q.prototype,"showSettings",2);xe([_()],q.prototype,"backTo",2);q=xe([P("app-header")],q);var Vs=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,Ht=(t,e,s,n)=>{for(var r=n>1?void 0:n?Js(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Vs(e,s,r),r};let Ke=class extends w{constructor(){super(...arguments),this.page="today"}render(){return o`
      <nav>
        ${[{id:"today",label:"Today"},{id:"progress",label:"Progress"},{id:"plan",label:"Plan"}].map(e=>o`
            <button class=${this.page===e.id?"on":""} @click=${()=>y(e.id)}>
              ${e.label}
            </button>
          `)}
      </nav>
    `}};Ke.styles=E`
    :host {
      display: block;
    }

    nav {
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 100%;
      max-width: var(--max-width);
      height: var(--nav-h);
      padding: 8px 12px calc(10px + env(safe-area-inset-bottom, 0px));
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      background: rgba(11, 13, 16, 0.92);
      border-top: 1px solid var(--border);
      backdrop-filter: blur(16px);
    }

    button {
      min-height: 48px;
      border: 0;
      border-radius: 14px;
      background: transparent;
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 700;
    }

    button.on {
      color: var(--accent-ink);
      background: var(--accent);
    }
  `;Ht([_()],Ke.prototype,"page",2);Ke=Ht([P("bottom-nav")],Ke);const T=E`
  :host {
    display: block;
    color: var(--text-primary);
  }

  * {
    box-sizing: border-box;
  }

  button,
  input,
  textarea {
    font-family: inherit;
  }

  .page {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
  }

  .card.raised {
    background: var(--surface-raised);
  }

  .kicker {
    margin: 0 0 6px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .muted {
    color: var(--text-secondary);
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  .title {
    font-size: 28px;
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .metric {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }

  .body {
    font-size: 15px;
    line-height: 1.45;
    color: var(--text-secondary);
  }

  .meta {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    min-height: 48px;
    border: 0;
    border-radius: 14px;
    padding: 0 18px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .btn.primary {
    background: var(--accent);
    color: var(--accent-ink);
  }

  .btn.secondary {
    background: var(--surface-raised);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }

  .btn.ghost {
    background: transparent;
    color: var(--text-secondary);
  }

  .btn.danger {
    background: rgba(255, 92, 92, 0.12);
    color: var(--danger);
  }

  .btn.block {
    width: 100%;
  }

  .btn:disabled {
    opacity: 0.45;
  }

  .choice {
    min-height: 48px;
    flex: 1;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface-raised);
    color: var(--text-primary);
    font-weight: 700;
  }

  .choice.on {
    background: var(--accent);
    color: var(--accent-ink);
    border-color: transparent;
  }

  .habit {
    width: 100%;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 4px;
    border: 0;
    background: transparent;
    color: inherit;
    font-size: 16px;
  }

  .check {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    display: grid;
    place-items: center;
    color: var(--accent-ink);
    font-size: 14px;
    font-weight: 800;
  }

  .check.on {
    background: var(--accent);
    border-color: var(--accent);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field label {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .field input,
  .field textarea {
    width: 100%;
    min-height: 48px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--surface-raised);
    color: var(--text-primary);
    padding: 12px 14px;
  }

  .field textarea {
    min-height: 120px;
    resize: vertical;
  }

  .pill-row,
  .split {
    display: flex;
    gap: 8px;
  }

  .pill {
    min-height: 36px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 13px;
  }

  .pill.on {
    background: var(--accent);
    color: var(--accent-ink);
    border-color: transparent;
  }

  .list-btn {
    width: 100%;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 0;
    border: 0;
    border-bottom: 1px solid var(--border);
    background: transparent;
    color: inherit;
    text-align: left;
  }

  .list-btn:last-child {
    border-bottom: 0;
  }

  .error {
    color: var(--danger);
    font-size: 14px;
  }
`;function qs(t,e,s){return t.sessions.find(n=>n.date===e&&n.completedAt&&(!s||n.workoutId===s))}function Ys(t,e){return t.sessions.find(s=>s.workoutId===e&&s.completedAt)}function et(t,e){for(const s of t.sessions){if(!s.completedAt)continue;const n=s.exercises.find(i=>i.status!=="skipped"&&(i.performedExerciseId===e||i.plannedExerciseId===e||i.exerciseId===e)),r=(n==null?void 0:n.sets.filter(i=>i.done&&i.reps>0))??[];if(r.length)return r.map(i=>({weightKg:i.weightKg,reps:i.reps}))}}function Y(t){return[...t.measurements].sort((e,s)=>e.date.localeCompare(s.date))}function Zs(t,e){var l;const s=Y(t);if(e==="all"||!s.length)return s;const n=W(((l=s[s.length-1])==null?void 0:l.date)??K()),r=e==="1m"?1:3,i=new Date(n);i.setMonth(i.getMonth()-r);const a=i.toISOString().slice(0,10);return s.filter(c=>c.date>=a)}function Xs(t){var r,i;const e=Y(t),s=(r=e[0])==null?void 0:r.weightKg,n=(i=e[e.length-1])==null?void 0:i.weightKg;return s==null||n==null?{}:{start:s,current:n,delta:re(n-s)}}function Qs(t){var l,c,p,g;const e=Y(t);if(e.length<2)return null;const s=W(((l=e[0])==null?void 0:l.date)??""),n=W(((c=e[e.length-1])==null?void 0:c.date)??""),r=Math.max(1,(n.getTime()-s.getTime())/(10080*60*1e3)),i=((p=e[0])==null?void 0:p.weightKg)??0,a=((g=e[e.length-1])==null?void 0:g.weightKg)??0;return re((a-i)/r)}function lt(t){return Y(t).filter(e=>e.waistCm!=null||e.armCm!=null||e.chestCm!=null||e.shouldersCm!=null||e.forearmCm!=null||e.thighCm!=null)}function er(t){const e=new Map,s=[...t.sessions].filter(n=>n.completedAt).reverse();for(const n of s)for(const r of n.exercises){const i=r.sets.filter(p=>p.done&&p.weightKg>0);if(!i.length||r.status==="skipped")continue;const a=r.performedExerciseId??r.plannedExerciseId,l=Math.max(...i.map(p=>p.weightKg)),c=e.get(a);c?c.last=l:e.set(a,{name:r.name,first:l,last:l})}return[...e.entries()].map(([n,r])=>({exerciseId:n,name:r.name,fromKg:r.first,toKg:r.last})).sort((n,r)=>Math.abs(r.toKg-r.fromKg)-Math.abs(n.toKg-n.fromKg))}function tr(t,e){const s=new Map;for(const i of(t==null?void 0:t.workouts)??[])for(const a of i.exercises)s.set(a.id,{name:a.name,kg:a.targetWeightKg});const n=new Set,r=[];for(const i of e.workouts)for(const a of i.exercises){if(n.has(a.id))continue;n.add(a.id);const l=s.get(a.id);r.push({name:a.name,from:l==null?void 0:l.kg,to:a.targetWeightKg})}return r}function zt(t,e,s){const n=t.activePlan,r=(n==null?void 0:n.schedule.filter(h=>h.type==="gym").length)??0,i=t.sessions.filter(h=>h.completedAt&&Ae(h.date,e,s)&&h.workoutId!=="swimming").sort((h,m)=>h.date.localeCompare(m.date)),l=Object.keys(t.adherence).filter(h=>Ae(h,e,s)).sort().map(h=>t.adherence[h]).filter(h=>!!h),c=Y(t).filter(h=>h.date<e).at(-1),p=Y(t).filter(h=>Ae(h.date,e,s)).at(-1),g=lt(t).filter(h=>h.date<=s),d=g.at(-1),b=g.filter(h=>h.date<e).at(-1);return{plannedSessions:r,completedSessions:i.length,completedWorkouts:i,adherence:{foodDaysOnPlan:l.filter(h=>h.onPlan==="yes"||h.onPlan==="mostly").length,proteinTargetDays:l.filter(h=>h.proteinTarget).length,creatineDays:l.filter(h=>h.creatine).length,shakeDays:l.filter(h=>h.shake).length,waterTargetDays:l.filter(h=>h.waterTarget).length},averageSleep:rr(Es(l.map(h=>h.sleepHours).filter(h=>h!=null))),changeSinceLastWeek:{weightKg:re(((p==null?void 0:p.weightKg)??0)-((c==null?void 0:c.weightKg)??(p==null?void 0:p.weightKg)??0)),waistCm:re(((d==null?void 0:d.waistCm)??0)-((b==null?void 0:b.waistCm)??(d==null?void 0:d.waistCm)??0)),armCm:re(((d==null?void 0:d.armCm)??0)-((b==null?void 0:b.armCm)??(d==null?void 0:d.armCm)??0))}}}function sr(t){const e=t.reduce((s,n)=>{const r=n.restSeconds??90;return s+n.sets*(r+40)},0);return Math.max(20,Math.round(e/60))}function re(t){return Math.round(t*10)/10}function rr(t){return t==null?null:re(t)}var nr=Object.defineProperty,ir=Object.getOwnPropertyDescriptor,ce=(t,e,s,n)=>{for(var r=n>1?void 0:n?ir(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&nr(e,s,r),r};let j=class extends w{constructor(){super(...arguments),this.value=0,this.step=1,this.min=0,this.max=500,this.suffix=""}emit(t){const e=As(Ds(t,this.step),this.min,this.max);this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:e,bubbles:!0,composed:!0}))}render(){return o`
      <div class="wrap">
        <button type="button" @click=${()=>this.emit(this.value-this.step)} aria-label="Decrease">−</button>
        <input
          type="text"
          inputmode="decimal"
          .value=${Os(this.value)}
          @change=${t=>this.emit(Is(t.target.value,this.value))}
        />
        ${this.suffix?o`<span>${this.suffix}</span>`:null}
        <button type="button" @click=${()=>this.emit(this.value+this.step)} aria-label="Increase">+</button>
      </div>
    `}};j.styles=E`
    :host {
      display: inline-flex;
    }

    .wrap {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--surface-raised);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 4px;
      min-height: 44px;
    }

    button {
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 10px;
      background: var(--surface);
      color: var(--text-primary);
      font-size: 20px;
      font-weight: 700;
    }

    input {
      width: 52px;
      border: 0;
      background: transparent;
      color: var(--text-primary);
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }

    span {
      color: var(--text-secondary);
      font-size: 13px;
      padding-right: 8px;
    }
  `;ce([_({type:Number})],j.prototype,"value",2);ce([_({type:Number})],j.prototype,"step",2);ce([_({type:Number})],j.prototype,"min",2);ce([_({type:Number})],j.prototype,"max",2);ce([_()],j.prototype,"suffix",2);j=ce([P("stepper-input")],j);var ar=Object.getOwnPropertyDescriptor,or=(t,e,s,n)=>{for(var r=n>1?void 0:n?ar(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=a(r)||r);return r};let tt=class extends w{toggle(t,e){const s=u.get().adherence[t],n=!(s!=null&&s[e]);u.upsertAdherence(t,{[e]:n})}startWorkout(t,e){if(!e.workoutId)return;const s=t.workouts.find(r=>r.id===e.workoutId);if(!s)return;const n=u.get().activeWorkout;if(n&&!n.completedAt){y("workout");return}u.setActiveWorkout({id:Ye("session"),workoutId:s.id,name:s.name,date:K(),startedAt:new Date().toISOString(),exercises:s.exercises.map(r=>{const i=et(u.get(),r.id);return{plannedExerciseId:r.id,performedExerciseId:r.id,name:r.name,status:"pending",sets:Array.from({length:r.sets},(a,l)=>{var c,p;return{weightKg:((c=i==null?void 0:i[l])==null?void 0:c.weightKg)??r.targetWeightKg,reps:((p=i==null?void 0:i[l])==null?void 0:p.reps)??r.repRange.max,done:!1}})}}),currentExerciseIndex:0}),y("workout")}mainCard(t){const e=K(),s=t.activePlan,n=t.activeWorkout;if(!s)return o`
        <div class="card">
          <p class="kicker">Today</p>
          <h2 class="hero-title">No active plan</h2>
          <p class="body">Import your weekly plan to get started.</p>
          <button class="btn primary block" style="margin-top:16px" @click=${()=>y("settings")}>
            Import plan
          </button>
        </div>
      `;if(n&&!n.completedAt)return o`
        <div class="card raised">
          <p class="kicker">Workout in progress</p>
          <h2 class="hero-title">${n.name}</h2>
          <p class="meta">Pick up where you left off.</p>
          <button class="btn primary block" style="margin-top:16px" @click=${()=>y("workout")}>
            Resume
          </button>
        </div>
      `;if(!Ae(e,s.week.startDate,s.week.endDate)){const p=t.reviews.find(g=>g.startDate===s.week.startDate);return e>s.week.endDate?o`
          <div class="card">
            <p class="kicker">Week ${s.week.number}</p>
            <h2 class="hero-title">${p!=null&&p.exportedAt?"Review exported ✓":"Week complete ✓"}</h2>
            <p class="body">${t.pendingPlan?"Next week's plan is ready.":"Waiting for next week's plan."}</p>
            <button
              class="btn primary block"
              style="margin-top:16px"
              @click=${()=>y(t.pendingPlan?"import":"settings")}
            >
              ${t.pendingPlan?"Start week":"Import next week"}
            </button>
          </div>
        `:o`
        <div class="card">
          <p class="kicker">Upcoming</p>
          <h2 class="hero-title">Week ${s.week.number} starts soon</h2>
          <p class="body">${le(s.week.startDate)}</p>
        </div>
      `}const r=s.schedule.find(p=>p.day===Ms(e));if(!r)return o`
        <div class="card">
          <h2 class="hero-title">Nothing planned</h2>
          <p class="body">No session on the current plan for today.</p>
        </div>
      `;const i=qs(t,e,r.workoutId??r.type),a=t.reviews.find(p=>p.startDate===s.week.startDate);if(r.type==="weekly_review")return a?o`
          <div class="card">
            <p class="kicker">Sunday</p>
            <h2 class="hero-title">Week complete ✓</h2>
            <p class="body">
              ${t.pendingPlan?"Next week's plan is ready.":"Waiting for next week’s plan."}
            </p>
            <button
              class="btn primary block"
              style="margin-top:16px"
              @click=${()=>y(t.pendingPlan?"import":"settings")}
            >
              ${t.pendingPlan?"Start week":"Import next week"}
            </button>
          </div>
        `:o`
        <div class="card raised">
          <p class="kicker">Sunday Review</p>
          <h2 class="hero-title">Your weekly review is ready.</h2>
          <button class="btn primary block" style="margin-top:16px" @click=${()=>y("review")}>
            Complete weekly review
          </button>
        </div>
      `;if(r.type==="swimming")return i?o`
          <div class="card">
            <p class="kicker">Today</p>
            <h2 class="hero-title">Swimming complete ✓</h2>
            <p class="body">Nice. Recovery is the next useful thing.</p>
          </div>
        `:o`
        <div class="card raised">
          <p class="kicker">Today</p>
          <h2 class="hero-title">Swimming</h2>
          <button
            class="btn primary block"
            style="margin-top:16px"
            @click=${()=>u.markDayComplete(e,"swimming","Swimming","swimming")}
          >
            Mark swimming complete
          </button>
        </div>
      `;if(r.type==="delivery_recovery")return o`
        <div class="card">
          <p class="kicker">Today</p>
          <h2 class="hero-title">Recovery Day</h2>
          <p class="body">No gym today.</p>
          <p class="meta" style="margin-top:8px">Delivery shift / recovery</p>
        </div>
      `;const l=s.workouts.find(p=>p.id===r.workoutId);if(i){const p=lr(s,r);return o`
        <div class="card">
          <p class="kicker">Today</p>
          <h2 class="hero-title">Workout complete ✓</h2>
          <p class="body">${i.durationMinutes?`${i.durationMinutes} min`:l==null?void 0:l.name}</p>
          ${p?o`<p class="meta" style="margin-top:10px">Next: ${p}</p>`:null}
        </div>
      `}const c=l?Ys(t,l.id):void 0;return o`
      <div class="card raised">
        <p class="kicker">Gym day</p>
        <h2 class="hero-title">${(l==null?void 0:l.name)??"Workout"}</h2>
        <p class="meta">${(l==null?void 0:l.exercises.length)??0} exercises</p>
        <p class="meta">Approx. ${l?sr(l.exercises):55} min</p>
        <button class="btn primary block" style="margin-top:16px" @click=${()=>this.startWorkout(s,r)}>
          Start workout
        </button>
        ${c?o`<p class="meta" style="margin-top:12px">Last ${l==null?void 0:l.name}: ${le(c.date)}</p>`:null}
      </div>
    `}render(){const t=u.get(),e=K(),s=t.adherence[e]??{};return o`
      <section class="page">
        ${this.mainCard(t)}

        <div class="card">
          <p class="kicker">Today</p>
          ${H("Protein target",!!s.proteinTarget,()=>this.toggle(e,"proteinTarget"))}
          ${H("Creatine",!!s.creatine,()=>this.toggle(e,"creatine"))}
          ${H("Night shake",!!s.shake,()=>this.toggle(e,"shake"))}
          ${H("Water target",!!s.waterTarget,()=>this.toggle(e,"waterTarget"))}
          <div class="row" style="min-height:52px">
            <span>Sleep</span>
            ${s.sleepHours==null?o`<button class="btn ghost" @click=${()=>u.upsertAdherence(e,{sleepHours:7.5})}>
                  Add sleep
                </button>`:o`<stepper-input
                  .value=${s.sleepHours}
                  .step=${.5}
                  .min=${0}
                  .max=${14}
                  suffix="h"
                  @change=${n=>u.upsertAdherence(e,{sleepHours:n.detail})}
                ></stepper-input>`}
          </div>
        </div>

        <div class="card stack">
          <p class="kicker">Meals</p>
          ${H("Breakfast",!!s.breakfast,()=>this.toggle(e,"breakfast"))}
          ${H("Lunch",!!s.lunch,()=>this.toggle(e,"lunch"))}
          ${H("Dinner",!!s.dinner,()=>this.toggle(e,"dinner"))}
          <p class="body">On plan today?</p>
          <div class="choices">
            ${Ve("yes","Yes",s.onPlan)}
            ${Ve("mostly","Mostly",s.onPlan)}
            ${Ve("no","No",s.onPlan)}
          </div>
          <div class="field">
            <label>Anything unusual?</label>
            <input
              placeholder="Had pizza Saturday night."
              .value=${s.note??""}
              @change=${n=>u.upsertAdherence(e,{note:n.target.value})}
            />
          </div>
        </div>
      </section>
    `}};tt.styles=[T,E`
      .hero-title {
        font-size: 28px;
        font-weight: 700;
        letter-spacing: -0.03em;
        margin-bottom: 6px;
      }
      .meta {
        font-size: 15px;
        color: var(--text-secondary);
      }
      .choices {
        display: flex;
        gap: 8px;
      }
    `];tt=or([P("today-page")],tt);function H(t,e,s){return o`
    <button class="habit" @click=${s}>
      <span>${t}</span>
      <span class="check ${e?"on":""}">${e?"✓":""}</span>
    </button>
  `}function Ve(t,e,s){return o`
    <button class="choice ${s===t?"on":""}" @click=${()=>u.upsertAdherence(K(),{onPlan:t})}>
      ${e}
    </button>
  `}function lr(t,e){const s=t.schedule.findIndex(r=>r.day===e.day),n=t.schedule[s+1];return n?Bt(n,t):void 0}var cr=Object.defineProperty,pr=Object.getOwnPropertyDescriptor,Ft=(t,e,s,n)=>{for(var r=n>1?void 0:n?pr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&cr(e,s,r),r};let We=class extends w{constructor(){super(...arguments),this.points=[]}render(){const t=this.points.filter(d=>Number.isFinite(d.weightKg));if(t.length<2)return o`<div class="empty">${t.length?"Need one more weigh-in for a trend":"No weight history yet"}</div>`;const e=t.map(d=>d.weightKg),s=Math.min(...e)-.4,n=Math.max(...e)+.4,r=320,i=160,a=18,l=t.map((d,b)=>{const h=a+b/(t.length-1)*(r-a*2),m=a+(n-d.weightKg)/(n-s||1)*(i-a*2);return{x:h,y:m,point:d}}),c=l.map((d,b)=>`${b===0?"M":"L"}${d.x.toFixed(1)} ${d.y.toFixed(1)}`).join(" "),p=l[0],g=l[l.length-1];return o`
      <svg viewBox="0 0 ${r} ${i}" role="img" aria-label="Weight trend">
        ${_t`
          <path d=${c} fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          ${l.map(d=>_t`<circle cx=${d.x} cy=${d.y} r="4" fill="var(--accent)" />`)}
        `}
        ${p?o`<text x=${p.x} y=${i-2} fill="#9299a3" font-size="10">${le(p.point.date)}</text>`:null}
        ${g?o`<text x=${g.x} y=${i-2} fill="#9299a3" font-size="10" text-anchor="end">${le(g.point.date)}</text>`:null}
      </svg>
    `}};We.styles=E`
    :host {
      display: block;
    }

    svg {
      width: 100%;
      height: 180px;
    }

    .empty {
      height: 160px;
      display: grid;
      place-items: center;
      color: var(--text-secondary);
      font-size: 14px;
    }
  `;Ft([_({attribute:!1})],We.prototype,"points",2);We=Ft([P("progress-chart")],We);var dr=Object.defineProperty,hr=Object.getOwnPropertyDescriptor,_e=(t,e,s,n)=>{for(var r=n>1?void 0:n?hr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&dr(e,s,r),r};let Z=class extends w{constructor(){super(...arguments),this.range="3m",this.showAllStrength=!1,this.showHistory=!1,this.urls={}}connectedCallback(){super.connectedCallback(),this.loadPhotos()}disconnectedCallback(){Object.values(this.urls).forEach(t=>URL.revokeObjectURL(t)),super.disconnectedCallback()}async loadPhotos(){const t={};for(const e of u.get().photos){const s=await u.getPhoto(e.id);s&&(t[e.id]=URL.createObjectURL(s))}Object.values(this.urls).forEach(e=>URL.revokeObjectURL(e)),this.urls=t}render(){var b,h;const t=u.get(),e=Xs(t),s=Qs(t),n=Zs(t,this.range),r=lt(t),i=r.at(-2),a=r.at(-1),l=er(t),c=this.showAllStrength?l:l.slice(0,3),p=t.sessions.filter(m=>m.completedAt),d=[...new Set(t.photos.map(m=>m.month))].sort().slice(-2);return o`
      <section class="page">
        <div class="card">
          <p class="kicker">Weight</p>
          <p class="metric">
            ${e.start!=null?Fe(e.start):"—"} → ${e.current!=null?Fe(e.current):"—"}
          </p>
          <p class="body">Goal: ${Fe(((b=t.profile)==null?void 0:b.targetWeightKg)??((h=t.activePlan)==null?void 0:h.targets.targetWeightKg))}</p>
          <p class="body">${e.delta!=null?Ze(e.delta,"kg")+" since start":"Log a Sunday weigh-in to start the trend."}</p>
          ${s!=null?o`<p class="body">${Ze(s,"kg")} / week average</p>`:null}
        </div>

        <div class="card">
          <div class="row">
            <p class="kicker">Trend</p>
            <div class="pill-row">
              ${["1m","3m","all"].map(m=>o`
                  <button class="pill ${this.range===m?"on":""}" @click=${()=>this.range=m}>
                    ${m==="1m"?"1 month":m==="3m"?"3 months":"All"}
                  </button>
                `)}
            </div>
          </div>
          <progress-chart .points=${n}></progress-chart>
        </div>

        <div class="card stack">
          <p class="kicker">Body</p>
          ${a?o`
                <p class="body">${ur(i,a)}</p>
                ${Q("Upper arm",i==null?void 0:i.armCm,a.armCm)}
                ${Q("Waist",i==null?void 0:i.waistCm,a.waistCm)}
                ${Q("Chest",i==null?void 0:i.chestCm,a.chestCm)}
                ${Q("Shoulders",i==null?void 0:i.shouldersCm,a.shouldersCm)}
                ${Q("Forearm",i==null?void 0:i.forearmCm,a.forearmCm)}
                ${Q("Thigh",i==null?void 0:i.thighCm,a.thighCm)}
              `:o`<p class="body">Monthly measurements appear after the first Sunday of a new month.</p>`}
        </div>

        <div class="card stack">
          <p class="kicker">Strength</p>
          ${c.length?c.map(m=>o`
                  <div class="row">
                    <span>${m.name}</span>
                    <strong>${m.fromKg} → ${m.toKg} kg</strong>
                  </div>
                `):o`<p class="body">Complete a workout to see strength changes.</p>`}
          ${l.length>3?o`<button class="btn ghost" @click=${()=>this.showAllStrength=!this.showAllStrength}>
                ${this.showAllStrength?"Show less":"View all exercises"}
              </button>`:null}
        </div>

        <div class="card stack">
          <p class="kicker">Progress photos</p>
          ${d.length?o`
                <p class="body">${d.map(se).join(" ↔ ")}</p>
                ${["front","side","back"].map(m=>this.poseCompare(m,d,t.photos))}
              `:o`<p class="body">Front, side and back photos are added on the first Sunday of each month.</p>`}
        </div>

        <div class="card">
          <button class="btn ghost block" @click=${()=>this.showHistory=!this.showHistory}>
            ${this.showHistory?"Hide workout history":"View workout history"}
          </button>
          ${this.showHistory?p.map(m=>o`
                  <button class="list-btn" @click=${()=>y("history",m.id)}>
                    <span>
                      <strong>${m.name}</strong>
                      <span class="body" style="display:block">${le(m.date)}</span>
                    </span>
                    <span class="muted">${m.durationMinutes?`${m.durationMinutes} min`:""}</span>
                  </button>
                `):null}
        </div>
      </section>
    `}poseCompare(t,e,s){var n;return o`
      <p>${(n=t[0])==null?void 0:n.toUpperCase()}${t.slice(1)}</p>
      <div class="compare">
        ${e.map(r=>{const i=s.find(a=>a.month===r&&a.pose===t);return i&&this.urls[i.id]?o`<img src=${this.urls[i.id]??""} alt=${`${t} ${se(r)}`} />`:o`<div class="ph">${se(r)}</div>`})}
      </div>
    `}};Z.styles=[T,E`
      .compare {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .compare img,
      .ph {
        width: 100%;
        aspect-ratio: 3/4;
        object-fit: cover;
        border-radius: 12px;
        background: var(--surface-raised);
      }
      .ph {
        display: grid;
        place-items: center;
        color: var(--text-secondary);
        font-size: 13px;
      }
    `];_e([f()],Z.prototype,"range",2);_e([f()],Z.prototype,"showAllStrength",2);_e([f()],Z.prototype,"showHistory",2);_e([f()],Z.prototype,"urls",2);Z=_e([P("progress-page")],Z);function ur(t,e){return t?`${se(t.date.slice(0,7))} → ${se(e.date.slice(0,7))}`:se(e.date.slice(0,7))}function Q(t,e,s){if(e==null&&s==null)return o``;const n=e!=null&&s!=null?s-e:void 0;return o`
    <div class="row">
      <div>
        <p>${t}</p>
        <p class="body">${e!=null&&s!=null?`${Ge(e)} → ${Ge(s)}`:Ge(s??e)}</p>
      </div>
      <strong>${n!=null?Ze(n,"cm"):""}</strong>
    </div>
  `}function D(t){return`/exercise-images/${t.replace(/_/g,"-")}.png`}const gr=[{id:"chest_press",aliases:["chest_press_machine","chest press"],name:"Chest Press",machine:"Technogym Chest Press",machineImage:D("chest_press"),setup:["Seat so handles line up with mid-chest","Hands in a comfortable grip","Back flat against the pad"],execution:["Press until elbows are almost straight","Keep shoulder blades on the pad","Control the return without slamming the stack"],commonMistake:"Do not let the shoulders roll forward.",restSeconds:90,weightStepKg:5},{id:"incline_chest_press",aliases:["incline_chest_press_machine"],name:"Incline Chest Press",machine:"Technogym Incline Chest Press",machineImage:D("incline_chest_press"),setup:["Seat so handles meet the upper chest","Ribs down","Shoulders packed"],execution:["Drive slightly up and in","Keep wrists stacked over elbows","Stop just short of lockout"],commonMistake:"Do not arch the lower back off the pad.",restSeconds:90,weightStepKg:5},{id:"lat_pulldown",aliases:[],name:"Lat Pulldown",machine:"Lat pulldown",machineImage:D("lat_pulldown"),setup:["Thigh pads snug","Grip slightly wider than shoulders","Lean back only a few degrees"],execution:["Pull the bar to the upper chest","Drive elbows down","Control the stretch at the top"],commonMistake:"Do not yank with the arms or pull behind the neck.",restSeconds:90,weightStepKg:5},{id:"seated_row",aliases:["seated_row_machine"],name:"Seated Row",machine:"Seated row machine",machineImage:D("seated_row"),setup:["Chest against the pad if present","Handles at mid-torso","Shoulders down"],execution:["Row elbows past the torso","Squeeze the shoulder blades","Stretch forward with control"],commonMistake:"Do not shrug or swing the torso.",restSeconds:90,weightStepKg:5},{id:"shoulder_press",aliases:["shoulder_press_machine"],name:"Shoulder Press",machine:"Technogym Shoulder Press",machineImage:D("shoulder_press"),setup:["Handles start around ear height","Lower back against the pad","Neutral wrist"],execution:["Press up without shrugging","Lower until elbows are around 90 degrees","Keep ribs down"],commonMistake:"Do not flare the ribs or lock out hard.",restSeconds:90,weightStepKg:5},{id:"leg_press",aliases:[],name:"Leg Press",machine:"Leg press",machineImage:D("leg_press"),setup:["Feet hip-to-shoulder width, mid-platform","Do not lock the sled at the top","Hold the handles lightly"],execution:["Lower until thighs are around 90 degrees if hips allow","Drive through the whole foot","Keep the lower back on the pad"],commonMistake:"Do not let the lower back round at the bottom.",restSeconds:120,weightStepKg:5},{id:"biceps_curl",aliases:["biceps_curl_machine"],name:"Biceps Curl Machine",machine:"Biceps curl machine",machineImage:D("biceps_curl"),setup:["Chest against the pad","Elbows in line with the pivot","Full stretch at the bottom"],execution:["Curl without swinging","Squeeze at the top","Lower for 2–3 seconds"],commonMistake:"Do not let the elbows slide or swing the stack.",restSeconds:75,weightStepKg:2.5},{id:"triceps_pushdown",aliases:["cable_triceps_pushdown","triceps_extension_machine"],name:"Triceps Pushdown",machine:"Cable triceps pushdown",machineImage:D("triceps_pushdown"),setup:["High pulley, bar or rope","Elbows glued to the sides","Soft knees"],execution:["Push down until arms are straight","Let the bar rise only to around 90 degrees","Keep elbows still"],commonMistake:"Do not flare the elbows or turn it into a chest press.",restSeconds:75,weightStepKg:2.5},{id:"rear_delt",aliases:["rear_delt_reverse_pec_deck"],name:"Rear Delt / Reverse Pec Deck",machine:"Reverse pec deck",machineImage:D("rear_delt"),setup:["Face the pad","Handles at shoulder height","Soft elbows"],execution:["Open the arms until they line up with the shoulders","Squeeze the rear delts","Control the return"],commonMistake:"Do not row with the elbows or use a heavy stack.",restSeconds:60,weightStepKg:2.5},{id:"leg_extension",aliases:[],name:"Leg Extension",machine:"Leg extension",machineImage:D("leg_extension"),setup:["Pad just above the ankles","Knees in line with the pivot"],execution:["Extend fully without pain","Squeeze the quads","Lower slowly"],commonMistake:"Do not use momentum.",restSeconds:60,weightStepKg:5},{id:"leg_curl",aliases:["seated_leg_curl","lying_leg_curl"],name:"Leg Curl",machine:"Seated leg curl",machineImage:D("leg_curl"),setup:["Thigh pad snug","Ankle pad just above the heels","Hips stay down"],execution:["Curl as far as the machine allows","Pause","Resist the return"],commonMistake:"Do not lift the hips off the seat.",restSeconds:60,weightStepKg:5}];function Te(t){const e=t.trim().toLowerCase().replace(/[\s-]+/g,"_");return gr.find(s=>s.id===e||s.aliases.includes(e)||s.name.toLowerCase().replace(/[\s-]+/g,"_")===e)}function Se(t){var s,n,r;const e=Te(t.id)??Te(t.name);return e?{...t,machine:t.machine??e.machine,machineImage:t.machineImage??e.machineImage,setup:(s=t.setup)!=null&&s.length?t.setup:e.setup,execution:(n=t.execution)!=null&&n.length?t.execution:e.execution,commonMistake:t.commonMistake??e.commonMistake,restSeconds:t.restSeconds??e.restSeconds,weightStepKg:t.weightStepKg??e.weightStepKg,alternatives:(r=t.alternatives)==null?void 0:r.map(i=>Gt(i))}:{...t,machineImage:t.machineImage??D(t.id),weightStepKg:t.weightStepKg??2.5}}function Gt(t){var s,n;const e=Te(t.exerciseId)??Te(t.name);return{...t,name:t.name||(e==null?void 0:e.name)||t.exerciseId,machine:t.machine??(e==null?void 0:e.machine),machineImage:t.machineImage??(e==null?void 0:e.machineImage)??D(t.exerciseId),weightStepKg:t.weightStepKg??(e==null?void 0:e.weightStepKg)??2.5,restSeconds:t.restSeconds??(e==null?void 0:e.restSeconds),setup:(s=t.setup)!=null&&s.length?t.setup:e==null?void 0:e.setup,execution:(n=t.execution)!=null&&n.length?t.execution:e==null?void 0:e.execution,commonMistake:t.commonMistake??(e==null?void 0:e.commonMistake)}}function Je(t,e){const s=Gt(e);return Se({id:s.exerciseId,name:s.name,machine:s.machine,machineImage:s.machineImage,setup:s.setup,execution:s.execution,commonMistake:s.commonMistake,sets:s.sets??t.sets,repRange:s.repRange??t.repRange,targetWeightKg:s.targetWeightKg??t.targetWeightKg,restSeconds:s.restSeconds??t.restSeconds,weightStepKg:s.weightStepKg})}function mr(t){if(!t)return"";if(/^(https?:|data:|blob:)/i.test(t))return t;const e="./",s=t.replace(/^\.\//,"").replace(/^\//,"");return`${e}${s}`}var fr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,pe=(t,e,s,n)=>{for(var r=n>1?void 0:n?br(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&fr(e,s,r),r};let U=class extends w{constructor(){super(...arguments),this.src="",this.alt="",this.placeholder=!0,this.failed=!1,this.resolved=""}willUpdate(t){t.has("src")&&(this.failed=!1,this.resolved=mr(this.src))}render(){const t=this.resolved||this.src;return!this.src&&!this.placeholder?o``:!t||this.failed?o`<div class="frame">Machine image unavailable</div>`:o`<img
      src=${t}
      alt=${this.alt}
      @error=${()=>{t.endsWith(".webp")?this.resolved=t.replace(/\.webp$/,".png"):this.failed=!0}}
    />`}};U.styles=E`
    :host {
      display: block;
      width: 100%;
    }

    .frame,
    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: inherit;
    }

    img {
      display: block;
      object-fit: cover;
      background: var(--surface-raised);
    }

    .frame {
      display: grid;
      place-items: center;
      background: var(--surface-raised);
      color: var(--text-secondary);
      font-size: 13px;
    }
  `;pe([_()],U.prototype,"src",2);pe([_()],U.prototype,"alt",2);pe([_({type:Boolean})],U.prototype,"placeholder",2);pe([f()],U.prototype,"failed",2);pe([f()],U.prototype,"resolved",2);U=pe([P("machine-image")],U);var yr=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,Vt=(t,e,s,n)=>{for(var r=n>1?void 0:n?vr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&yr(e,s,r),r};let Me=class extends w{constructor(){super(...arguments),this.workoutId=""}render(){var r;const e=u.get().activePlan;if(!e)return o`
        <section class="page">
          <div class="card">
            <h1 class="title">No active plan</h1>
            <p class="body" style="margin-top:8px">Import a weekly plan to see this week’s training.</p>
            <button class="btn primary block" style="margin-top:16px" @click=${()=>y("settings")}>
              Import plan
            </button>
          </div>
        </section>
      `;const s=e.workouts.find(i=>i.id===this.workoutId);if(s)return this.workoutDetail(s);const n=e.targets;return o`
      <section class="page">
        <div class="card">
          <p class="kicker">Week ${e.week.number}</p>
          <h1 class="title">${Ut(e.week.startDate,e.week.endDate)}</h1>
          <p class="body" style="margin-top:12px">Goal: Lean bulk</p>
          <p class="body">Target gain: +${n.weeklyWeightGainKg.min}–${n.weeklyWeightGainKg.max} kg/week</p>
          <p class="body">Protein: ${n.proteinGrams} g/day</p>
          ${n.calorieGuidance?o`<p class="body">Calorie guidance: ~${n.calorieGuidance} kcal</p>`:null}
        </div>

        ${e.coachNote?o`
              <div class="card">
                <p class="kicker">Coach note</p>
                <p class="body">${e.coachNote}</p>
              </div>
            `:null}

        <div class="card">
          <p class="kicker">Training</p>
          ${e.schedule.map(i=>{const a=Bt(i,e),l=i.type==="gym";return o`
              <button class="day" ?disabled=${!l} @click=${()=>l&&y("plan",i.workoutId)}>
                <strong>${i.day.slice(0,3).toUpperCase()}</strong>
                <span>${a}</span>
              </button>
            `})}
        </div>

        ${(r=n.mealGuidance)!=null&&r.length?o`
              <div class="card stack">
                <p class="kicker">Meal guidance</p>
                ${n.mealGuidance.map(i=>o`<p class="body">• ${i}</p>`)}
              </div>
            `:null}
      </section>
    `}workoutDetail(t){return o`
      <section class="page">
        <button class="btn ghost" @click=${()=>y("plan")}>← Plan</button>
        <div class="card">
          <h1 class="title">${t.name}</h1>
          <p class="body">${t.exercises.length} exercises</p>
        </div>
        ${t.exercises.map(e=>this.exerciseCard(Se(e)))}
      </section>
    `}exerciseCard(t){return o`
      <div class="card ex-card">
        ${t.machineImage?o`<machine-image src=${t.machineImage} alt=${t.machine??t.name}></machine-image>`:null}
        <div class="ex-body">
          <strong>${t.name}</strong>
          ${t.machine?o`<p class="body">${t.machine}</p>`:null}
          <div class="ex-meta">
            <span class="body">${t.sets} × ${t.repRange.min}–${t.repRange.max}</span>
            <span class="kg">${t.targetWeightKg} kg</span>
          </div>
        </div>
      </div>
    `}};Me.styles=[T,E`
      .day {
        width: 100%;
        min-height: 56px;
        display: grid;
        grid-template-columns: 52px 1fr;
        gap: 12px;
        align-items: center;
        padding: 10px 0;
        border: 0;
        border-bottom: 1px solid var(--border);
        background: transparent;
        color: inherit;
        text-align: left;
      }
      .day:last-child {
        border-bottom: 0;
      }
      .ex-card {
        padding: 0;
        overflow: hidden;
      }
      .ex-body {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .ex-meta {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
        margin-top: 10px;
      }
      .kg {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.03em;
      }
      machine-image {
        border-radius: 18px 18px 0 0;
      }
    `];Vt([_()],Me.prototype,"workoutId",2);Me=Vt([P("plan-page")],Me);const $r=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];function I(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function v(t){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"&&t.trim()&&Number.isFinite(Number(t)))return Number(t)}function $(t){return typeof t=="string"&&t.trim()?t.trim():void 0}function st(t){if(!Array.isArray(t))return;const e=t.map(s=>$(s)).filter(s=>!!s);return e.length?e:void 0}function wr(t){var s;const e=(s=$(t))==null?void 0:s.toLowerCase();return $r.find(n=>n===e)}function kr(t){var s;const e=(s=$(t))==null?void 0:s.toLowerCase().replace(/[\s-]+/g,"_");if(e==="gym")return"gym";if(e==="swimming")return"swimming";if(e==="weekly_review"||e==="sunday_review"||e==="review")return"weekly_review";if(e==="delivery_recovery"||e==="recovery"||e==="rest"||e==="delivery"||e==="delivery_work")return"delivery_recovery"}function Jt(t){if(Array.isArray(t)&&t.length>=2){const e=v(t[0]),s=v(t[1]);if(e!=null&&s!=null)return{min:e,max:s}}if(I(t)){const e=v(t.min),s=v(t.max);if(e!=null&&s!=null)return{min:e,max:s}}}function xr(t){if(!Array.isArray(t)||t.length===0)return;const e=[];for(const s of t){if(!I(s))return;const n=wr(s.day),r=kr(s.type);if(!n||!r)return;const i=$(s.workoutId);e.push({day:n,type:r,workoutId:r==="gym"?i:void 0})}return e}function _r(t){if(!Array.isArray(t))return[];const e=[];for(const s of t){if(!I(s))continue;const n=$(s.id),r=$(s.name);if(!n||!r||!Array.isArray(s.exercises))continue;const i=s.exercises.flatMap(a=>{if(!I(a))return[];const l=$(a.id)??$(a.exerciseId),c=$(a.name),p=v(a.sets),g=v(a.targetWeightKg)??v(a.recommendedWorkingWeightKg),d=Jt(a.repRange);return!l||!c||p==null||g==null||!d?[]:[Se({id:l,name:c,machine:$(a.machine),machineImage:$(a.machineImage),setup:st(a.setup),execution:st(a.execution),commonMistake:$(a.commonMistake),sets:p,repRange:d,targetWeightKg:g,restSeconds:v(a.restSeconds),weightStepKg:v(a.weightStepKg),warmup:Sr(a.warmup),alternatives:Cr(a.alternatives)})]});e.push({id:n,name:r,estimatedMinutes:v(s.estimatedMinutes),exercises:i})}return e}function Sr(t){if(!I(t))return;const e=t.enabled===!0||t.enabled==="true";if(!(!e&&t.enabled!==!1))return{enabled:e,instruction:$(t.instruction)}}function Cr(t){if(!Array.isArray(t)||!t.length)return;const e=[];for(const s of t){if(!I(s))continue;const n=$(s.exerciseId)??$(s.id),r=$(s.name);!n||!r||e.push({exerciseId:n,name:r,machine:$(s.machine),machineImage:$(s.machineImage),reason:$(s.reason),targetWeightKg:v(s.targetWeightKg),sets:v(s.sets),repRange:Jt(s.repRange),weightStepKg:v(s.weightStepKg)})}return e.length?e:void 0}function Pr(t){if(!I(t))return{ok:!1,error:"That file is not valid JSON."};if(t.schemaVersion==="1.0"||t.importType==="weekly_plan"||t.type==="weekly_plan"||t.exportType==="weekly_checkin")return{ok:!1,error:"This is a BulkTrack V1 file. Ask ChatGPT for schemaVersion 2 (type: bulkTrackWeeklyPlan)."};if(t.schemaVersion!==2&&t.schemaVersion!=="2")return{ok:!1,error:`Unsupported schema version (${String(t.schemaVersion??"missing")}). This app expects schemaVersion 2.`};if(t.type!=="bulkTrackWeeklyPlan")return{ok:!1,error:`Unsupported file type (${String(t.type??"missing")}). Expected bulkTrackWeeklyPlan.`};if(!I(t.week))return{ok:!1,error:"Plan is missing week dates."};const e=v(t.week.number),s=$(t.week.startDate),n=$(t.week.endDate);if(e==null||!s||!n)return{ok:!1,error:"Plan week must include number, startDate and endDate."};if(!I(t.targets))return{ok:!1,error:"Plan is missing targets."};const r=v(t.targets.targetWeightKg),i=v(t.targets.proteinGrams)??v(t.targets.proteinTargetG),a=I(t.targets.weeklyWeightGainKg)?t.targets.weeklyWeightGainKg:void 0,l=v(a==null?void 0:a.min),c=v(a==null?void 0:a.max);if(r==null||i==null||l==null||c==null)return{ok:!1,error:"Plan targets must include protein, weight goal and weekly gain range."};const p=xr(t.schedule);if(!p)return{ok:!1,error:"Plan schedule is missing or invalid."};const g=_r(t.workouts),d=p.filter(h=>h.type==="gym");for(const h of d)if(!h.workoutId||!g.some(m=>m.id===h.workoutId))return{ok:!1,error:`Gym day ${h.day} points to a missing workout.`};return{ok:!0,plan:{schemaVersion:2,type:"bulkTrackWeeklyPlan",week:{number:e,startDate:s,endDate:n},targets:{goal:"lean_bulk",targetWeightKg:r,weeklyWeightGainKg:{min:l,max:c},proteinGrams:i,calorieGuidance:v(t.targets.calorieGuidance),waterLitres:v(t.targets.waterLitres),creatineGrams:v(t.targets.creatineGrams),mealGuidance:st(t.targets.mealGuidance)},coachNote:$(t.coachNote)??"",schedule:p,workouts:g}}}function ct(t){try{return Pr(JSON.parse(t))}catch{return{ok:!1,error:"That file is not valid JSON."}}}function qt(t,e,s="application/json"){const n=new Blob([e],{type:s}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=t,i.click(),URL.revokeObjectURL(r)}async function pt(t){await navigator.clipboard.writeText(t)}async function Ar(t,e){var i;const s=new Blob([e],{type:"application/json"}),n=new File([s],t,{type:"application/json"}),r=navigator;if(r.share&&(!r.canShare||r.canShare({files:[n]})||r.canShare({text:e})))try{return(i=r.canShare)!=null&&i.call(r,{files:[n]})?await r.share({files:[n],title:"BulkTrack JSON",text:t}):await r.share({title:"BulkTrack JSON",text:e}),"shared"}catch(a){if(a.name==="AbortError")return"shared"}return/iphone|ipad|ipod/i.test(navigator.userAgent)?(await pt(e),"copied"):(qt(t,e),"downloaded")}var Dr=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,dt=(t,e,s,n)=>{for(var r=n>1?void 0:n?Er(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Dr(e,s,r),r};let ve=class extends w{constructor(){super(...arguments),this.message="",this.error=""}async importPlan(t){var n;const e=(n=t.target.files)==null?void 0:n[0];if(!e)return;const s=ct(await e.text());if(!s.ok){this.error=s.error;return}u.setPendingPlan(s.plan),y("import")}async exportAll(){const t=u.get(),e=[];for(const r of t.photos){const i=await Rt(r.id);if(!i)continue;const a=await Or(i);e.push({id:r.id,mime:i.type||"image/jpeg",dataUrl:a})}const s={schemaVersion:2,type:"bulkTrackBackup",exportedAt:new Date().toISOString(),state:t,photos:e},n=JSON.stringify(s,null,2);try{qt("bulktrack-backup.json",n),this.message="Backup downloaded"}catch{await pt(n),this.message="Backup copied"}}async importBackup(t){var s;const e=(s=t.target.files)==null?void 0:s[0];if(e)try{const n=JSON.parse(await e.text());if(n.schemaVersion!==2||n.type!=="bulkTrackBackup"||!n.state){this.error="That is not a BulkTrack V2 backup.";return}const r={...ae(),...n.state,schemaVersion:2};u.restoreBackup(r);for(const i of n.photos??[]){const a=Ir(i.dataUrl);a&&await Mt(i.id,a)}this.message="Backup imported"}catch{this.error="Could not read that backup file."}}render(){const t=u.get().profile;return o`
      <section class="page">
        <div class="card stack">
          <p class="kicker">Profile</p>
          <div class="field">
            <label>Height</label>
            <stepper-input
              .value=${(t==null?void 0:t.heightCm)??168}
              .step=${1}
              suffix="cm"
              @change=${e=>u.updateProfile({heightCm:e.detail})}
            ></stepper-input>
          </div>
          <div class="field">
            <label>Target weight</label>
            <stepper-input
              .value=${(t==null?void 0:t.targetWeightKg)??72}
              .step=${.1}
              suffix="kg"
              @change=${e=>u.updateProfile({targetWeightKg:e.detail})}
            ></stepper-input>
          </div>
        </div>

        <div class="card stack">
          <p class="kicker">Units</p>
          <p>kg / cm</p>
        </div>

        <div class="card stack">
          <p class="kicker">Weekly plan</p>
          <label class="btn primary block" style="display:grid;place-items:center">
            Import plan JSON
            <input type="file" accept="application/json" hidden @change=${this.importPlan} />
          </label>
        </div>

        <div class="card stack">
          <p class="kicker">Data</p>
          <button class="btn secondary block" @click=${()=>this.exportAll()}>Export all data</button>
          <label class="btn secondary block" style="display:grid;place-items:center">
            Import backup
            <input type="file" accept="application/json" hidden @change=${this.importBackup} />
          </label>
          <button class="btn danger block" @click=${()=>confirm("Reset BulkTrack on this device?")&&u.reset()}>
            Reset app
          </button>
        </div>

        ${this.message?o`<p class="body">${this.message}</p>`:null}
        ${this.error?o`<p class="error">${this.error}</p>`:null}

        <div class="card">
          <p class="kicker">About</p>
          <p>BulkTrack ${ys}</p>
          <p class="body">Personal weekly tracker. ChatGPT is the coach.</p>
        </div>
      </section>
    `}};ve.styles=[T];dt([f()],ve.prototype,"message",2);dt([f()],ve.prototype,"error",2);ve=dt([P("settings-page")],ve);function Or(t){return new Promise((e,s)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>s(n.error),n.readAsDataURL(t)})}function Ir(t){var a;const[e,s]=t.split(",");if(!s)return null;const n=((a=e==null?void 0:e.match(/data:(.*?);/))==null?void 0:a[1])??"image/jpeg",r=atob(s),i=new Uint8Array(r.length);for(let l=0;l<r.length;l+=1)i[l]=r.charCodeAt(l);return new Blob([i],{type:n})}var Kr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,de=(t,e,s,n)=>{for(var r=n>1?void 0:n?Wr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Kr(e,s,r),r};let L=class extends w{constructor(){super(...arguments),this.sheet=null,this.finishing=!1,this.restUntil=null,this.now=Date.now(),this.notes=""}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>this.now=Date.now(),250)}disconnectedCallback(){this.timer&&window.clearInterval(this.timer),super.disconnectedCallback()}session(){return u.get().activeWorkout}plannedDef(t){var r;const e=(r=u.get().activePlan)==null?void 0:r.workouts.find(i=>i.id===t.workoutId),s=t.exercises[t.currentExerciseIndex],n=(e==null?void 0:e.exercises.find(i=>i.id===(s==null?void 0:s.plannedExerciseId)))??(e==null?void 0:e.exercises[t.currentExerciseIndex]);return n?Se(n):void 0}currentDef(t){var n;const e=this.plannedDef(t),s=t.exercises[t.currentExerciseIndex];if(!e||!s)return e;if(s.performedExerciseId&&s.performedExerciseId!==e.id){const r=(n=e.alternatives)==null?void 0:n.find(i=>i.exerciseId===s.performedExerciseId);if(r)return Je(e,r)}return e}persist(t){u.saveActiveWorkout({...t,exercises:t.exercises.map(e=>({...e,sets:[...e.sets]}))})}completeSet(t,e,s){var i;const n=t.exercises[e],r=n==null?void 0:n.sets[s];if(!(!n||!r||n.status==="skipped")&&(r.done=!r.done,n.sets.some(a=>a.done)&&(n.status="completed"),this.persist(t),r.done)){const a=((i=this.currentDef(t))==null?void 0:i.restSeconds)??90,l=e===t.exercises.length-1,c=s===n.sets.length-1;l&&c||(this.restUntil=Date.now()+a*1e3)}}next(t){if(this.sheet=null,t.currentExerciseIndex>=t.exercises.length-1){this.finishing=!0,this.restUntil=null;return}t.currentExerciseIndex+=1,this.persist(t)}prev(t){t.currentExerciseIndex=Math.max(0,t.currentExerciseIndex-1),this.persist(t),this.finishing=!1,this.sheet=null}skip(t,e){e.status="skipped",e.skipReason="machine_unavailable",e.sets=[],this.persist(t),this.sheet=null,this.next(t)}useAlternative(t,e,s){const n=this.plannedDef(t);if(!n)return;const r=Je(n,s),i=et(u.get(),r.id);e.performedExerciseId=r.id,e.name=r.name,e.status="pending",e.substitutionReason="machine_unavailable",e.skipReason=void 0,e.sets=Array.from({length:r.sets},(a,l)=>{var c,p;return{weightKg:((c=i==null?void 0:i[l])==null?void 0:c.weightKg)??r.targetWeightKg,reps:((p=i==null?void 0:i[l])==null?void 0:p.reps)??r.repRange.max,done:!1}}),this.persist(t),this.sheet=null}finish(t,e){const s={...t,completedAt:new Date().toISOString(),durationMinutes:Math.max(1,Math.round((Date.now()-new Date(t.startedAt).getTime())/6e4)),feeling:e,notes:this.notes.trim()||void 0,exercises:t.exercises.map(n=>({...n,status:n.status==="skipped"?"skipped":"completed"}))};u.completeWorkout(s),y("today")}finishScreen(t){const e=t.exercises.reduce((r,i)=>r+i.sets.filter(a=>a.done).length,0),s=t.exercises.filter(r=>r.status==="skipped").length,n=Math.max(1,Math.round((Date.now()-new Date(t.startedAt).getTime())/6e4));return o`
      <section class="page">
        <div class="card">
          <p class="kicker">Done</p>
          <h1 class="title">Workout complete</h1>
          <p class="body" style="margin-top:8px">Great work.</p>
          <p class="meta" style="margin-top:16px">${t.exercises.length-s} exercises</p>
          <p class="body">${e} sets</p>
          ${s?o`<p class="body">${s} skipped</p>`:null}
          <p class="body">${n} minutes</p>
        </div>
        <div class="card stack">
          <p>How did today's workout feel?</p>
          <div class="feel">
            <button class="btn secondary block" @click=${()=>this.finish(t,"too_easy")}>Too easy</button>
            <button class="btn primary block" @click=${()=>this.finish(t,"good")}>Good</button>
            <button class="btn secondary block" @click=${()=>this.finish(t,"too_hard")}>Too hard</button>
          </div>
          <div class="field">
            <label>Anything I should know?</label>
            <textarea
              placeholder="Shoulder felt uncomfortable, machine unavailable, felt tired, etc."
              .value=${this.notes}
              @input=${r=>this.notes=r.target.value}
            ></textarea>
          </div>
        </div>
      </section>
    `}infoSheet(t){var e,s;return o`
      <div class="sheet-bg" @click=${()=>this.sheet=null}>
        <div class="sheet" @click=${n=>n.stopPropagation()}>
          ${t.machineImage?o`<machine-image src=${t.machineImage} alt=${t.machine??t.name}></machine-image>`:null}
          <h2 class="title">${t.name}</h2>
          ${t.machine?o`<p class="body" style="margin:8px 0 12px">${t.machine}</p>`:null}
          ${(e=t.setup)!=null&&e.length?o`<p class="kicker">Setup</p>
                ${t.setup.map(n=>o`<p class="body">• ${n}</p>`)}`:null}
          ${(s=t.execution)!=null&&s.length?o`<p class="kicker" style="margin-top:12px">Execution</p>
                ${t.execution.map((n,r)=>o`<p class="body">${r+1}. ${n}</p>`)}`:null}
          ${t.commonMistake?o`<p class="kicker" style="margin-top:12px">Common mistake</p>
                <p class="body">${t.commonMistake}</p>`:null}
          <button class="btn primary block" style="margin-top:16px" @click=${()=>this.sheet=null}>Close</button>
        </div>
      </div>
    `}unavailableSheet(t,e,s){var n;return o`
      <div class="sheet-bg" @click=${()=>this.sheet=null}>
        <div class="sheet" @click=${r=>r.stopPropagation()}>
          <h2 class="title">Machine unavailable</h2>
          <p class="body" style="margin:8px 0 16px">Use an alternative exercise or skip this exercise today.</p>
          ${(n=s.alternatives)!=null&&n.length?o`<button class="btn primary block" @click=${()=>this.sheet="alts"}>Use alternative</button>`:o`<p class="body">No alternative in this week's plan.</p>`}
          <button class="btn secondary block" @click=${()=>this.skip(t,e)}>Skip today</button>
          <button class="btn ghost block" @click=${()=>this.sheet=null}>Cancel</button>
        </div>
      </div>
    `}altsSheet(t,e,s){return o`
      <div class="sheet-bg" @click=${()=>this.sheet=null}>
        <div class="sheet" @click=${n=>n.stopPropagation()}>
          <h2 class="title">${s.name} unavailable</h2>
          <p class="body" style="margin:8px 0 16px">Alternative</p>
          ${(s.alternatives??[]).map(n=>{const r=Je(s,n);return o`
              <div class="card alt-card">
                <strong>${r.name}</strong>
                ${r.machine?o`<p class="body">${r.machine}</p>`:null}
                <p class="body">${r.sets} × ${r.repRange.min}–${r.repRange.max}</p>
                <p class="metric">${r.targetWeightKg} kg</p>
                <button class="btn primary block" @click=${()=>this.useAlternative(t,e,n)}>
                  Use this
                </button>
              </div>
            `})}
          <button class="btn ghost block" @click=${()=>this.sheet="unavailable"}>Cancel</button>
        </div>
      </div>
    `}render(){var d,b,h,m;const t=this.session();if(!t)return o`
        <section class="page">
          <div class="card">
            <h1 class="title">No workout in progress</h1>
            <button class="btn primary block" style="margin-top:16px" @click=${()=>y("today")}>
              Back to Today
            </button>
          </div>
        </section>
      `;if(this.finishing)return this.finishScreen(t);const e=t.currentExerciseIndex,s=t.exercises[e],n=this.plannedDef(t),r=this.currentDef(t),i=et(u.get(),(s==null?void 0:s.performedExerciseId)??(s==null?void 0:s.plannedExerciseId)??""),a=this.restUntil?(this.restUntil-this.now)/1e3:0,l=(e+1)/t.exercises.length*100,c=!!(s!=null&&s.sets.some(O=>O.done)),p=!!((d=r==null?void 0:r.warmup)!=null&&d.enabled&&r.warmup.instruction&&!c),g=(r==null?void 0:r.weightStepKg)??2.5;return o`
      <section class="page">
        <div class="top">
          <div class="row">
            <p class="kicker">${t.name}</p>
            <button class="btn ghost" @click=${()=>y("today")}>Close</button>
          </div>
          <h1 class="title">${(s==null?void 0:s.name)??"Exercise"}</h1>
          <p class="body">Exercise ${e+1} of ${t.exercises.length}</p>
          <div class="progress"><span style="width:${l}%"></span></div>
        </div>

        <div class="card stack">
          <p class="kicker">Last session</p>
          ${i?o`<p class="metric">${((b=i[0])==null?void 0:b.weightKg)??"—"} kg</p>
                <p class="body">${i.map(O=>O.reps).join(" / ")} reps</p>`:o`<p class="body">First time logging this.</p>`}
        </div>

        <div class="card stack">
          <div class="row">
            <div>
              <p class="kicker">Today</p>
              <p class="body">
                Target: ${(r==null?void 0:r.targetWeightKg)??((h=s==null?void 0:s.sets[0])==null?void 0:h.weightKg)} kg · ${r==null?void 0:r.repRange.min}–${r==null?void 0:r.repRange.max} reps
              </p>
            </div>
          </div>
          ${p?o`<p class="body">Warm-up · ${(m=r==null?void 0:r.warmup)==null?void 0:m.instruction}</p>`:null}
          <button class="btn ghost info-btn" @click=${()=>this.sheet="info"}>ⓘ How to do this</button>
          <div class="head">Sets</div>
          ${s==null?void 0:s.sets.map((O,ut)=>o`
              <div class="set-row">
                <div class="set-top">
                  <strong>Set ${ut+1}</strong>
                  <button class="check ${O.done?"on":""}" @click=${()=>this.completeSet(t,e,ut)}>
                    ${O.done?"✓":""}
                  </button>
                </div>
                <div class="controls">
                  <stepper-input
                    .value=${O.weightKg}
                    .step=${g}
                    suffix="kg"
                    @change=${Ue=>{O.weightKg=Ue.detail,this.persist(t)}}
                  ></stepper-input>
                  <stepper-input
                    .value=${O.reps}
                    .step=${1}
                    suffix="reps"
                    @change=${Ue=>{O.reps=Ue.detail,this.persist(t)}}
                  ></stepper-input>
                </div>
              </div>
            `)}
        </div>

        <button class="btn ghost block" @click=${()=>this.sheet="unavailable"}>Machine unavailable?</button>
        <button class="btn primary block" @click=${()=>this.next(t)}>
          ${e>=t.exercises.length-1?"Finish workout":"Next exercise"}
        </button>
        ${e>0?o`<button class="btn ghost block" @click=${()=>this.prev(t)}>Previous</button>`:null}

        ${a>0?o`
              <div class="timer">
                <span class="time">${js(a)}</span>
                <button class="btn secondary" @click=${()=>this.restUntil=(this.restUntil??0)+3e4}>+30 sec</button>
                <button class="btn ghost" @click=${()=>this.restUntil=null}>Skip</button>
              </div>
            `:null}

        ${this.sheet==="info"&&r?this.infoSheet(r):null}
        ${this.sheet==="unavailable"&&s&&n?this.unavailableSheet(t,s,n):null}
        ${this.sheet==="alts"&&s&&n?this.altsSheet(t,s,n):null}
      </section>
    `}};L.styles=[T,E`
      .top {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 8px;
        padding-top: calc(12px + env(safe-area-inset-top, 0px));
      }
      .progress {
        height: 6px;
        border-radius: 99px;
        background: var(--surface-raised);
        overflow: hidden;
      }
      .progress > span {
        display: block;
        height: 100%;
        background: var(--accent);
      }
      .set-row {
        display: grid;
        gap: 8px;
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
      }
      .set-top,
      .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .controls {
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      .head {
        font-size: 12px;
        color: var(--text-secondary);
      }
      .timer {
        position: sticky;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 12px;
        border-radius: 16px;
        background: var(--surface-raised);
        border: 1px solid var(--border);
      }
      .time {
        font-size: 28px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .sheet-bg {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: flex-end;
        z-index: 20;
      }
      .sheet {
        width: 100%;
        max-width: var(--max-width);
        margin: 0 auto;
        max-height: 86vh;
        overflow: auto;
        background: var(--surface);
        border-radius: 24px 24px 0 0;
        padding: 20px 20px calc(20px + env(safe-area-inset-bottom, 0px));
      }
      .sheet machine-image {
        border-radius: 16px;
        margin-bottom: 14px;
      }
      .feel,
      .alt-card {
        display: grid;
        gap: 8px;
      }
      .info-btn {
        min-height: 44px;
        justify-content: flex-start;
        gap: 8px;
      }
    `];de([f()],L.prototype,"sheet",2);de([f()],L.prototype,"finishing",2);de([f()],L.prototype,"restUntil",2);de([f()],L.prototype,"now",2);de([f()],L.prototype,"notes",2);L=de([P("workout-page")],L);function Pt(t,e){const s=zt(t,e.startDate,e.endDate),n=t.profile,r=t.activePlan,i=Nr(t.measurements,e.endDate);return{schemaVersion:2,type:"bulkTrackWeeklyReview",user:{heightCm:(n==null?void 0:n.heightCm)??0,goal:(n==null?void 0:n.goal)??(r==null?void 0:r.targets.goal)??"lean_bulk",targetWeightKg:(n==null?void 0:n.targetWeightKg)??(r==null?void 0:r.targets.targetWeightKg)??0},week:{number:e.weekNumber,startDate:e.startDate,endDate:e.endDate},measurements:{weightKg:e.measurements.weightKg,waistCm:e.measurements.waistCm??(i==null?void 0:i.waistCm),armCm:e.measurements.armCm??(i==null?void 0:i.armCm)},changeSinceLastWeek:s.changeSinceLastWeek,training:{plannedSessions:s.plannedSessions,completedSessions:s.completedSessions,sessions:s.completedWorkouts.map(a=>Tr(a))},adherence:s.adherence,sleep:{averageHours:s.averageSleep},monthlyProgress:Rr(t,e),weeklyFeeling:e.weeklyFeeling,userNotes:e.userNotes}}function Tr(t){return{date:t.date,workoutId:t.workoutId,durationMinutes:t.durationMinutes,feeling:t.feeling,exercises:t.exercises.map(e=>Mr(e)),notes:t.notes??""}}function Mr(t){const e=t.plannedExerciseId,s=t.performedExerciseId??e;return t.status==="skipped"?{plannedExerciseId:e,status:"skipped",skipReason:t.skipReason??"machine_unavailable",name:t.name}:{plannedExerciseId:e,performedExerciseId:s,name:t.name,status:"completed",...e!==s?{substitutionReason:t.substitutionReason??"machine_unavailable"}:{},sets:t.sets.filter(n=>n.done&&n.reps>0).map(n=>({weightKg:n.weightKg,reps:n.reps}))}}function Rr(t,e){if(!e.monthlyRecorded)return{recorded:!1};const s=me(e.endDate),n=t.photos.filter(i=>i.month===s),r=i=>n.some(a=>a.pose===i);return{recorded:!0,measurements:{waistCm:e.measurements.waistCm,armCm:e.measurements.armCm,chestCm:e.measurements.chestCm,shouldersCm:e.measurements.shouldersCm,forearmCm:e.measurements.forearmCm,thighCm:e.measurements.thighCm},photosRecorded:{front:r("front"),side:r("side"),back:r("back")}}}function Nr(t,e){return[...t].filter(s=>s.date<=e&&jr(s)).sort((s,n)=>s.date.localeCompare(n.date)).at(-1)}function jr(t){return[t.waistCm,t.armCm,t.chestCm,t.shouldersCm,t.forearmCm,t.thighCm].some(e=>e!=null)}function Ur(t){return`bulkTrack-week-${t}-review.json`}var Lr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,A=(t,e,s,n)=>{for(var r=n>1?void 0:n?Br(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Lr(e,s,r),r};let S=class extends w{constructor(){super(...arguments),this.weightKg=0,this.waistCm=0,this.armCm=0,this.chestCm=0,this.shouldersCm=0,this.forearmCm=0,this.thighCm=0,this.notes="",this.message="",this.error="",this.ready=!1,this.urls={},this.monthlyDue=!1}connectedCallback(){var i;super.connectedCallback();const t=u.get(),e=Y(t).at(-1),s=lt(t).at(-1),n=t.activePlan,r=n?t.reviews.find(a=>a.startDate===n.week.startDate):void 0;this.monthlyDue=n?Us(n.week.endDate):!1,this.weightKg=(r==null?void 0:r.measurements.weightKg)??(e==null?void 0:e.weightKg)??((i=t.profile)==null?void 0:i.currentWeightKg)??0,this.waistCm=(r==null?void 0:r.measurements.waistCm)??(s==null?void 0:s.waistCm)??0,this.armCm=(r==null?void 0:r.measurements.armCm)??(s==null?void 0:s.armCm)??0,this.chestCm=(r==null?void 0:r.measurements.chestCm)??(s==null?void 0:s.chestCm)??0,this.shouldersCm=(r==null?void 0:r.measurements.shouldersCm)??(s==null?void 0:s.shouldersCm)??0,this.forearmCm=(r==null?void 0:r.measurements.forearmCm)??(s==null?void 0:s.forearmCm)??0,this.thighCm=(r==null?void 0:r.measurements.thighCm)??(s==null?void 0:s.thighCm)??0,this.feeling=r==null?void 0:r.weeklyFeeling,this.notes=(r==null?void 0:r.userNotes)??"",this.ready=!0,this.loadPhotos()}disconnectedCallback(){Object.values(this.urls).forEach(t=>URL.revokeObjectURL(t)),super.disconnectedCallback()}async loadPhotos(){const t=u.get().activePlan?me(u.get().activePlan.week.endDate):"",e={};for(const s of u.get().photos.filter(n=>n.month===t)){const n=await u.getPhoto(s.id);n&&(e[s.id]=URL.createObjectURL(n))}Object.values(this.urls).forEach(s=>URL.revokeObjectURL(s)),this.urls=e}optional(t){return t>0?t:void 0}review(){const t=u.get().activePlan;if(!t)return null;const e=this.monthlyDue?{waistCm:this.optional(this.waistCm),armCm:this.optional(this.armCm),chestCm:this.optional(this.chestCm),shouldersCm:this.optional(this.shouldersCm),forearmCm:this.optional(this.forearmCm),thighCm:this.optional(this.thighCm)}:{},s=!!(this.monthlyDue&&(e.waistCm||e.armCm||e.chestCm||e.shouldersCm||e.forearmCm||e.thighCm||u.get().photos.some(n=>n.month===me(t.week.endDate))));return{weekNumber:t.week.number,startDate:t.week.startDate,endDate:t.week.endDate,completedAt:new Date().toISOString(),measurements:{date:t.week.endDate,weightKg:this.weightKg,...e},monthlyRecorded:s,weeklyFeeling:this.feeling,userNotes:this.notes.trim()||void 0}}save(){const t=this.review();return t?(u.saveMeasurement(t.measurements),u.saveReview(t),t):null}async exportJson(){const t=this.save();if(!t)return;const e=JSON.stringify(Pt(u.get(),t),null,2),s=await Ar(Ur(t.weekNumber),e);u.markReviewExported(t.startDate),this.message=s==="copied"?"JSON copied":"Review exported"}async copyJson(){const t=this.save();t&&(await pt(JSON.stringify(Pt(u.get(),t),null,2)),u.markReviewExported(t.startDate),this.message="JSON copied")}async onImport(t){var n;const e=(n=t.target.files)==null?void 0:n[0];if(!e)return;const s=ct(await e.text());if(!s.ok){this.error=s.error;return}this.save(),u.setPendingPlan(s.plan),y("import")}async onPhoto(t,e){var r,i;const s=(r=e.target.files)==null?void 0:r[0];if(!s)return;const n=((i=u.get().activePlan)==null?void 0:i.week.endDate)??void 0;await u.addPhoto(s,t,n),await this.loadPhotos()}photoFor(t){const e=u.get().activePlan?me(u.get().activePlan.week.endDate):"";return u.get().photos.find(s=>s.month===e&&s.pose===t)}render(){const t=u.get(),e=t.activePlan;if(!e||!this.ready)return o`<section class="page"><div class="card"><h1 class="title">No week to review</h1></div></section>`;const s=zt(t,e.week.startDate,e.week.endDate);return o`
      <section class="page">
        <div class="card">
          <p class="kicker">Sunday</p>
          <h1 class="title">Week ${e.week.number} review</h1>
        </div>

        <div class="card stack">
          <p class="kicker">Measurements</p>
          <div class="field">
            <label>Weight</label>
            <stepper-input .value=${this.weightKg} .step=${.1} suffix="kg" @change=${n=>this.weightKg=n.detail}></stepper-input>
          </div>
        </div>

        ${this.monthlyDue?this.monthlySection():null}

        <div class="card stack">
          <p class="kicker">This week</p>
          <p>Training ${s.completedSessions} / ${s.plannedSessions} workouts ${s.completedSessions>=s.plannedSessions&&s.plannedSessions?"✓":""}</p>
          <p>Food adherence ${s.adherence.foodDaysOnPlan} / 7 days</p>
          <p>Creatine ${s.adherence.creatineDays} / 7 days</p>
          <p>Average sleep ${s.averageSleep!=null?`${s.averageSleep} h`:"—"}</p>
        </div>

        <div class="card stack">
          <p>How did this week feel?</p>
          <div class="split">
            ${["easy","good","hard"].map(n=>o`<button class="choice ${this.feeling===n?"on":""}" @click=${()=>this.feeling=n}>${n}</button>`)}
          </div>
          <div class="field">
            <label>Anything I should know?</label>
            <textarea
              placeholder="Shoulder felt slightly uncomfortable Thursday. Food was good except Saturday."
              .value=${this.notes}
              @input=${n=>this.notes=n.target.value}
            ></textarea>
          </div>
        </div>

        ${this.message?o`<p class="body">${this.message}</p>`:null}
        ${this.error?o`<p class="error">${this.error}</p>`:null}

        <button class="btn primary block" @click=${()=>this.exportJson()}>Export for ChatGPT</button>
        <button class="btn secondary block" @click=${()=>this.copyJson()}>Copy JSON</button>
        <label class="btn ghost block" style="display:grid;place-items:center">
          Import next week
          <input type="file" accept="application/json" hidden @change=${this.onImport} />
        </label>
      </section>
    `}monthlySection(){return o`
      <div class="card stack">
        <p class="kicker">Monthly progress</p>
        <p class="body">Weight ${this.weightKg.toFixed(1)} kg</p>
        <div class="field"><label>Waist</label><stepper-input .value=${this.waistCm} .step=${.1} suffix="cm" @change=${t=>this.waistCm=t.detail}></stepper-input></div>
        <div class="field"><label>Upper arm</label><stepper-input .value=${this.armCm} .step=${.1} suffix="cm" @change=${t=>this.armCm=t.detail}></stepper-input></div>
        <div class="field"><label>Chest</label><stepper-input .value=${this.chestCm} .step=${.1} suffix="cm" @change=${t=>this.chestCm=t.detail}></stepper-input></div>
        <div class="field"><label>Shoulders</label><stepper-input .value=${this.shouldersCm} .step=${.1} suffix="cm" @change=${t=>this.shouldersCm=t.detail}></stepper-input></div>
        <div class="field"><label>Forearm</label><stepper-input .value=${this.forearmCm} .step=${.1} suffix="cm" @change=${t=>this.forearmCm=t.detail}></stepper-input></div>
        <div class="field"><label>Thigh</label><stepper-input .value=${this.thighCm} .step=${.1} suffix="cm" @change=${t=>this.thighCm=t.detail}></stepper-input></div>
      </div>
      <div class="card stack">
        <p class="kicker">Progress photos</p>
        <div class="slots">
          ${this.photoSlot("front","Front")}
          ${this.photoSlot("side","Side")}
          ${this.photoSlot("back","Back")}
        </div>
      </div>
    `}photoSlot(t,e){const s=this.photoFor(t);return o`
      <div class="slot">
        <span class="body">${e}</span>
        ${s&&this.urls[s.id]?o`<label>
              <img src=${this.urls[s.id]??""} alt=${e} />
              <input type="file" accept="image/*" hidden @change=${n=>this.onPhoto(t,n)} />
            </label>`:o`<label>Add
              <input type="file" accept="image/*" hidden @change=${n=>this.onPhoto(t,n)} />
            </label>`}
      </div>
    `}};S.styles=[T,E`
      .slots {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      .slot {
        display: grid;
        gap: 8px;
        justify-items: center;
        text-align: center;
      }
      .slot label {
        width: 100%;
        display: grid;
        place-items: center;
        background: var(--surface-raised);
        border: 1px dashed var(--border);
        color: var(--text-secondary);
        font-size: 13px;
        min-height: 44px;
        aspect-ratio: 3 / 4;
        border-radius: 12px;
      }
      .slot label:has(img) {
        border: 0;
        padding: 0;
        background: transparent;
        aspect-ratio: auto;
      }
      .slot img {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        border-radius: 12px;
      }
    `];A([f()],S.prototype,"weightKg",2);A([f()],S.prototype,"waistCm",2);A([f()],S.prototype,"armCm",2);A([f()],S.prototype,"chestCm",2);A([f()],S.prototype,"shouldersCm",2);A([f()],S.prototype,"forearmCm",2);A([f()],S.prototype,"thighCm",2);A([f()],S.prototype,"feeling",2);A([f()],S.prototype,"notes",2);A([f()],S.prototype,"message",2);A([f()],S.prototype,"error",2);A([f()],S.prototype,"ready",2);A([f()],S.prototype,"urls",2);A([f()],S.prototype,"monthlyDue",2);S=A([P("weekly-review-page")],S);function k(t,e,s,n=90,r=3,i=10,a=12,l={}){return Se({id:t,name:e,sets:r,repRange:{min:i,max:a},targetWeightKg:s,restSeconds:n,...l})}function qe(t,e,s){return{id:t,name:e,estimatedMinutes:55,exercises:s}}function Hr(t=new Date){const e=Ts(t),s=Xe(e),n=Xe(jt(e,6));return{schemaVersion:2,type:"bulkTrackWeeklyPlan",week:{number:4,startDate:s,endDate:n},targets:{goal:"lean_bulk",targetWeightKg:72,weeklyWeightGainKg:{min:.2,max:.3},proteinGrams:140,calorieGuidance:2600,waterLitres:2.5,creatineGrams:5,mealGuidance:["protein-rich breakfast","proper lunch","Syrian dinner","night protein shake"]},coachNote:"This week we are establishing the three full-body sessions. Keep loads as written, hit the top of the rep range when you can, and do not intentionally increase calories.",schedule:[{day:"monday",type:"gym",workoutId:"full_body_a"},{day:"tuesday",type:"swimming"},{day:"wednesday",type:"gym",workoutId:"full_body_b"},{day:"thursday",type:"gym",workoutId:"full_body_c"},{day:"friday",type:"delivery_recovery"},{day:"saturday",type:"delivery_recovery"},{day:"sunday",type:"weekly_review"}],workouts:[qe("full_body_a","Full Body A",[k("chest_press","Chest Press",30,90,3,10,12,{warmup:{enabled:!0,instruction:"1 light set × 12 reps"},alternatives:[{exerciseId:"incline_chest_press",name:"Incline Chest Press",reason:"Machine unavailable",targetWeightKg:27.5}]}),k("lat_pulldown","Lat Pulldown",35),k("leg_press","Leg Press",80,120),k("shoulder_press","Shoulder Press",20),k("biceps_curl","Biceps Curl Machine",15,75),k("triceps_pushdown","Triceps Pushdown",20,75)]),qe("full_body_b","Full Body B",[k("incline_chest_press","Incline Chest Press",27.5,90,3,10,12,{warmup:{enabled:!0,instruction:"1 light set × 12 reps"}}),k("lat_pulldown","Lat Pulldown",35),k("seated_row","Seated Row",30),k("shoulder_press","Shoulder Press",20),k("leg_press","Leg Press",80,120),k("biceps_curl","Biceps Curl Machine",15,75)]),qe("full_body_c","Full Body C",[k("chest_press","Chest Press",30,90,3,10,12,{warmup:{enabled:!0,instruction:"1 light set × 12 reps"},alternatives:[{exerciseId:"incline_chest_press",name:"Incline Chest Press",reason:"Machine unavailable",targetWeightKg:27.5}]}),k("lat_pulldown","Lat Pulldown",35),k("leg_press","Leg Press",80,120),k("shoulder_press","Shoulder Press",20),k("triceps_pushdown","Triceps Pushdown",20,75),k("rear_delt","Rear Delt / Reverse Pec Deck",15,60,3,12,15)])]}}var zr=Object.defineProperty,Fr=Object.getOwnPropertyDescriptor,Ce=(t,e,s,n)=>{for(var r=n>1?void 0:n?Fr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&zr(e,s,r),r};let X=class extends w{constructor(){super(...arguments),this.heightCm=168,this.currentWeightKg=65.5,this.targetWeightKg=72,this.error=""}finish(t){u.completeOnboarding({heightCm:this.heightCm,currentWeightKg:this.currentWeightKg,targetWeightKg:this.targetWeightKg,goal:"lean_bulk"},t),y("today")}async onFile(t){var r;const e=(r=t.target.files)==null?void 0:r[0];if(!e)return;const s=await e.text(),n=ct(s);if(!n.ok){this.error=n.error;return}u.completeOnboarding({heightCm:this.heightCm,currentWeightKg:this.currentWeightKg,targetWeightKg:n.plan.targets.targetWeightKg,goal:"lean_bulk"},null),u.setPendingPlan(n.plan),y("import")}render(){return o`
      <section class="page">
        <div class="card stack">
          <p class="kicker">Welcome</p>
          <h1 class="title">Welcome to BulkTrack</h1>
          <p class="body">A simple fitness tracker built around your weekly plan.</p>
          <div class="field">
            <label>Height</label>
            <stepper-input
              .value=${this.heightCm}
              .step=${1}
              suffix="cm"
              @change=${t=>this.heightCm=t.detail}
            ></stepper-input>
          </div>
          <div class="field">
            <label>Current weight</label>
            <stepper-input
              .value=${this.currentWeightKg}
              .step=${.1}
              suffix="kg"
              @change=${t=>this.currentWeightKg=t.detail}
            ></stepper-input>
          </div>
          <div class="field">
            <label>Target weight</label>
            <stepper-input
              .value=${this.targetWeightKg}
              .step=${.1}
              suffix="kg"
              @change=${t=>this.targetWeightKg=t.detail}
            ></stepper-input>
          </div>
        </div>

        ${this.error?o`<p class="error">${this.error}</p>`:null}

        <div class="actions">
          <button class="btn primary block" @click=${()=>this.finish(Hr())}>
            Use demo plan
          </button>
          <label class="btn secondary block" style="display:grid;place-items:center">
            Import plan
            <input type="file" accept="application/json" hidden @change=${this.onFile} />
          </label>
        </div>
      </section>
    `}};X.styles=[T,E`
      .actions {
        position: sticky;
        bottom: 0;
        display: grid;
        gap: 8px;
        padding: 8px 0 12px;
        background: linear-gradient(to top, var(--bg) 70%, transparent);
      }
    `];Ce([f()],X.prototype,"heightCm",2);Ce([f()],X.prototype,"currentWeightKg",2);Ce([f()],X.prototype,"targetWeightKg",2);Ce([f()],X.prototype,"error",2);X=Ce([P("onboarding-page")],X);var Gr=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,Yt=(t,e,s,n)=>{for(var r=n>1?void 0:n?Vr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Gr(e,s,r),r};let Re=class extends w{constructor(){super(...arguments),this.fromOnboarding=!1}render(){const t=u.get(),e=t.pendingPlan;if(!e)return o`
        <section class="page">
          <div class="card">
            <h1 class="title">No plan waiting</h1>
            <p class="body">Import a JSON file from Settings or Sunday review.</p>
            <button class="btn primary block" style="margin-top:16px" @click=${()=>y("settings")}>
              Go to settings
            </button>
          </div>
        </section>
      `;const s=e.targets,n=e.schedule.filter(i=>i.type==="gym").length,r=tr(t.activePlan,e);return o`
      <section class="page">
        <div class="card">
          <p class="kicker">Ready</p>
          <h1 class="title">Week ${e.week.number} ready</h1>
          <p class="body">${Ut(e.week.startDate,e.week.endDate)}</p>
          <p class="body" style="margin-top:12px">Weight target: +${s.weeklyWeightGainKg.min}–${s.weeklyWeightGainKg.max} kg</p>
          <p class="body">Protein: ${s.proteinGrams} g</p>
          <p class="body">Gym: ${n} sessions</p>
        </div>

        <div class="card stack">
          <p class="kicker">Changes</p>
          ${r.map(i=>i.from==null?o`<p>${i.name} · ${i.to} kg</p>`:i.from===i.to?o`<p>${i.name} unchanged</p>`:o`<p>${i.name} ${i.from} → ${i.to} kg</p>`)}
        </div>

        ${e.coachNote?o`<div class="card"><p class="kicker">Coach</p><p class="body">${e.coachNote}</p></div>`:null}

        <button
          class="btn primary block"
          @click=${()=>{u.startWeek(),y("today")}}
        >
          Start week
        </button>
        <button
          class="btn ghost block"
          @click=${()=>{u.setPendingPlan(null),y(this.fromOnboarding?"onboarding":"today")}}
        >
          Cancel
        </button>
      </section>
    `}};Re.styles=[T];Yt([_({type:Boolean})],Re.prototype,"fromOnboarding",2);Re=Yt([P("import-page")],Re);var Jr=Object.defineProperty,qr=Object.getOwnPropertyDescriptor,Zt=(t,e,s,n)=>{for(var r=n>1?void 0:n?qr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Jr(e,s,r),r};let Ne=class extends w{constructor(){super(...arguments),this.sessionId=""}render(){const t=u.get().sessions.find(e=>e.id===this.sessionId);return t?o`
      <section class="page">
        <button class="btn ghost" @click=${()=>y("progress")}>← Progress</button>
        <div class="card">
          <p class="kicker">${le(t.date)}</p>
          <h1 class="title">${t.name}</h1>
          <p class="body">${t.durationMinutes?`${t.durationMinutes} min`:""}</p>
          ${t.feeling?o`<p class="body">Felt ${t.feeling.replace("_"," ")}</p>`:null}
          ${t.notes?o`<p class="body">${t.notes}</p>`:null}
        </div>
        ${t.exercises.map(e=>o`
            <div class="card">
              <strong>${e.name}</strong>
              ${e.status==="skipped"?o`<p class="body">Skipped · machine unavailable</p>`:o`${e.plannedExerciseId!==e.performedExerciseId?o`<p class="body">Planned ${e.plannedExerciseId.replace(/_/g," ")}</p>`:null}
                    ${e.sets.filter(s=>s.done).map((s,n)=>o`<p class="body">Set ${n+1} · ${s.weightKg} kg × ${s.reps}</p>`)}`}
            </div>
          `)}
      </section>
    `:o`
        <section class="page">
          <div class="card">
            <h1 class="title">Workout not found</h1>
            <button class="btn primary block" style="margin-top:16px" @click=${()=>y("progress")}>
              Back
            </button>
          </div>
        </section>
      `}};Ne.styles=[T];Zt([_()],Ne.prototype,"sessionId",2);Ne=Zt([P("session-page")],Ne);var Yr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,ht=(t,e,s,n)=>{for(var r=n>1?void 0:n?Zr(e,s):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(r=(n?a(e,s,r):a(r))||r);return n&&r&&Yr(e,s,r),r};let $e=class extends w{constructor(){super(...arguments),this.route={page:"today"},this.ready=!1,this.syncRoute=()=>{this.route=Hs()}}connectedCallback(){super.connectedCallback(),u.ready=u.init().then(()=>{this.ready=!0,this.syncRoute()}),window.addEventListener("hashchange",this.syncRoute),u.subscribe(()=>this.requestUpdate()),window.location.hash||(window.location.hash="#/today")}disconnectedCallback(){window.removeEventListener("hashchange",this.syncRoute),super.disconnectedCallback()}header(){const t=this.effectivePage();return t==="onboarding"?o`<app-header title="BulkTrack" .showSettings=${!1}></app-header>`:t==="workout"?null:t==="review"?o`<app-header title="Review" backTo="today"></app-header>`:t==="settings"?o`<app-header title="Settings" backTo="today" .showSettings=${!1}></app-header>`:t==="import"?o`<app-header title="Import" backTo="today" .showSettings=${!1}></app-header>`:t==="history"?o`<app-header title="Workout" backTo="progress" .showSettings=${!1}></app-header>`:t==="today"?o`<app-header title="BulkTrack" .showDate=${!0}></app-header>`:t==="progress"?o`<app-header title="Progress"></app-header>`:o`<app-header title="Plan"></app-header>`}effectivePage(){return u.get().onboardingComplete?this.route.page:"onboarding"}render(){if(!this.ready)return o`<div class="shell"><main><p style="padding:24px;color:var(--text-secondary)">Loading…</p></main></div>`;const t=this.effectivePage(),e=zs(t);return o`
      <div class="shell ${e?"":"full"}">
        ${this.header()}
        <main>
          ${t==="today"?o`<today-page></today-page>`:null}
          ${t==="progress"?o`<progress-page></progress-page>`:null}
          ${t==="plan"?o`<plan-page .workoutId=${this.route.workoutId??""}></plan-page>`:null}
          ${t==="settings"?o`<settings-page></settings-page>`:null}
          ${t==="workout"?o`<workout-page></workout-page>`:null}
          ${t==="review"?o`<weekly-review-page></weekly-review-page>`:null}
          ${t==="onboarding"?o`<onboarding-page></onboarding-page>`:null}
          ${t==="import"?o`<import-page></import-page>`:null}
          ${t==="history"?o`<session-page .sessionId=${this.route.sessionId??""}></session-page>`:null}
        </main>
        ${e?o`<bottom-nav .page=${t}></bottom-nav>`:null}
      </div>
    `}};$e.styles=E`
    :host {
      display: block;
      min-height: 100dvh;
      background: var(--bg);
    }

    .shell {
      max-width: var(--max-width);
      margin: 0 auto;
      min-height: 100dvh;
      max-height: 100dvh;
      overflow-y: auto;
      padding-bottom: calc(var(--nav-h) + 16px);
    }

    .shell.full {
      padding-bottom: 24px;
    }

    main {
      padding: 0 20px 24px;
    }
  `;ht([f()],$e.prototype,"route",2);ht([f()],$e.prototype,"ready",2);$e=ht([P("bulk-app")],$e);

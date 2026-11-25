// @bun
var S="openchamber.sdk",f=1;var Je=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Yt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(p)=>{let i=p.target===e?r:p.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let E=s.get(i);if(E!==void 0)clearTimeout(E);s.set(i,setTimeout(()=>{s.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var jo=`(${Yt.toString()})(document);`;var Ye=128,Qe=65536;var xe=128;var Ie=65536;var qe=8000,Ze=192000,et=120000;var Qt=(e)=>{let r=[],s=0,p=0;return{push:(i)=>{r.push(i),p+=i.length;while(p-s>e&&r.length>1){let E=r.shift();p-=E?.length??0,s=0}},pull:(i)=>{let E=0;while(E<i.length&&r.length>0){let T=r[0],A=Math.min(i.length-E,T.length-s);if(i.set(T.subarray(s,s+A),E),E+=A,s+=A,s>=T.length)r.shift(),p-=T.length,s=0}i.fill(0,E)},clear:()=>{r.length=0,s=0,p=0},get size(){return p-s}}};var to=/^[a-z][a-z0-9-]{0,39}$/;var qt=(e)=>Object(e)===e&&!Array.isArray(e),tt=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),Zt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,eo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,oo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!qt(s)||!to.test(s.id)||!Zt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!tt(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!tt(s,["kind","id","label","value","options","disabled"]))return!1;if(!eo(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let p=new Set;for(let i of s.options){if(!qt(i)||!tt(i,["value","label"])||!eo(i.value)||!Zt(i.label)||p.has(i.value))return!1;p.add(i.value)}if(!p.has(s.value))return!1}return!0};var ro=["{id}","{segment}","{segments+}"];var Nr=new Set(ro);var no=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var vr=new Set(no);var ge=20000000,be=256;var ot=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,so=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var io=/^[A-Za-z0-9_-]{1,80}$/;var ao=["left","right","top","bottom"];var co=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of p)if(!co(i,r+1,s))return!1;return!0},rt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(rt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(rt)}return String(e)===e||Number.isFinite(e)},nt=(e)=>{try{if(String(e.id)!==e.id||!io.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ao.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!co(e.data)||!rt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var lo=/^[0-9a-f]{7,64}$/i,po=(e)=>lo.test(e),st=255,_o=(e,r,s)=>({openCommit:(p)=>po(p)?e({channel:S,v:f,type:"open-commit",id:r(),payload:{sha:p}}):s("Commit id must be 7 to 64 hex characters."),openWalkthrough:({base:p})=>{let i=p.trim();if(!i||i.length>st)return s(`Base must contain 1 to ${st} characters.`);return e({channel:S,v:f,type:"open-walkthrough",id:r(),payload:{base:i}})}});var at=2000;var Eo=["file","directory","other","missing"],ct=(e)=>Boolean(e&&"sessionId"in e),lt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Ce=500,Ue=32000,To=16000,So=128,fo=200,Ao=2000,Oo=16000,mo=80,Ro=200,ho=16000;var xo=2000;var dt=20000,ke=1024,Me=2000000;var Ne=64000,ye=8000,pt=4000;var _t=960000;var Io=999,go=1e4,Te=500,bo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Co=["stopped","starting","ready","failed"],Yo=new Set(bo),Uo=(e)=>Yo.has(e),ko=(e)=>e&&Uo(e)?e:"HOST_REJECTED",ne=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ne);if(Object(e)===e)return Object.values(e).every(ne);return!1},Mo=(e)=>ne(e)&&JSON.stringify(e).length<=ho,uo=(e)=>e?.trim().slice(0,Ro)??"",se=(e)=>{let r=e.id.trim().slice(0,So),s=e.title.trim().slice(0,fo),p=e.url.trim().slice(0,Ao),i=e.text?.trim().slice(0,Oo),E=e.author?.trim().slice(0,mo),T=e.kind==="pull"?"pull":"issue",A={providerId:e.providerId.trim(),id:r,title:s||r,url:p,kind:T};if(i)A.text=i;if(E)A.author=E;if(T==="pull"){let h=uo(e.branches?.head),R=uo(e.branches?.base);if(h&&R)A.branches={head:h,base:R}}if(Mo(e.data))A.data=e.data;return A},ut=(e)=>{let r=se(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},Et=(e)=>{let r={text:e.text.trim().slice(0,To)};if(e.send)r.send=!0;return r},Tt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Io,Math.max(0,Math.round(e)))},St=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(go,Math.max(0,Math.ceil(e)))};var ie=(e)=>e.length>0&&e.length<=ke&&!e.includes("\x00")&&!e.includes("\\");var ve=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>xo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Qo=new Set(Co),ft=(e)=>Boolean(e&&"status"in e&&Qo.has(String(e.status))&&!("body"in e)),Le=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),At=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ot=(e)=>Boolean(e&&"written"in e&&e.written===!0),mt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),qo=new Set(Eo),Rt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&qo.has(String(e.kind))&&Number.isFinite(e.size)),ht=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Zo=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),er=(e)=>Object(e)===e?e:null,it=(e)=>String(e)===e&&e.length>0,tr=(e)=>{if(!it(e.id))return null;if(e.ok===!0){let r={channel:S,v:f,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&it(e.error))return{channel:S,v:f,type:"result",id:e.id,ok:!1,error:e.error,code:ko(it(e.code)?e.code:void 0)};return null},xt=(e)=>{let r=er(e);if(!r||r.channel!==S||r.v!==f)return null;if(r.type==="result")return tr(r);if(!Zo.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var No=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),or=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var yo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${ke} characters without NUL or backslash.`)),we=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`oc-${e.value}`),It=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),p=e.requestTimeoutMs??dt,i=new Set,E=new Set,T=new Set,A=new Set,h=new Set,R=new Set,b=new Set,v=new Set,K=new Set,Y=new Set,fe=new Set,Z=new Set,Fe=[],le=null,de=null,Ae=new Set,Oe=new Set,pe=null,_e=null,Be=!1,ee=new Map,te=new Map,oe=new Map,V=!1,_={value:0},d=null,W=null,ue=!1,Ee=!1,Dt=null,D=null,Xt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},L=(t)=>{r.parent.postMessage(t,"*")},Ht=()=>{if(V||r.parent===r||Z.size===0||d?.features?.lateGenerateResults!==!0)return;L({channel:S,v:f,type:"generate-late-listen"})},x=(t,o)=>{for(let c of t)try{c(o)}catch(a){console.error(a)}},$t=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=xt(t.data);if(!o)return;if(o.type==="workspace"){let a=te.get(o.payload.subscriptionId);if(a)x([a],o.payload.snapshot);return}if(o.type==="shells"){let a=oe.get(o.payload.subscriptionId);if(a)x([a],o.payload.snapshot);return}if(o.type==="microphone-audio"){D?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let a=D;if(!a)return;D=null,a.release(),x(a.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(d=o.payload,W=Xt(o.payload.session),x(i,o.payload),x(E,o.payload.directory),x(T,o.payload.session),W)x(A,W);if(x(h,o.payload.connection),x(R,o.payload.settings),x(b,o.payload.item),o.payload.block)x(v,o.payload.block);Ht();return}if(o.type==="service-event"){x(K,o.payload);return}if(o.type==="generate-late"){if(Z.size===0)Fe.push(o.payload);else x(Z,o.payload);return}if(o.type==="directory"){if(d)d={...d,directory:o.payload.directory};x(E,o.payload.directory);return}if(o.type==="session"){if(d)d={...d,session:o.payload.session};if(!o.payload.session)W=null;else if(W?.sessionId!==o.payload.session.id)W=Xt(o.payload.session);x(T,o.payload.session);return}if(o.type==="session-lifecycle"){W=o.payload,x(A,o.payload);return}if(o.type==="connection"){if(d)d={...d,connection:o.payload.connection};x(h,o.payload.connection);return}if(o.type==="settings"){if(d)d={...d,settings:o.payload.settings};x(R,o.payload.settings);return}if(o.type==="item"){if(d)d={...d,item:o.payload.item};x(b,o.payload.item);return}if(o.type==="status-control-event"){x(Y,o.payload);return}if(o.type==="popover-closed"){x(fe,o.payload);return}if(o.type==="action"){let a=(m)=>{if(!V)L({channel:S,v:f,type:"action-result",id:o.id,payload:m})},O=de;if(!O){a({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>O(o.payload)).then(()=>a({ok:!0}),(m)=>{let I=(m instanceof Error?m.message:String(m)).trim();a({ok:!1,error:(I||"Action failed.").slice(0,Te)})});return}if(o.type==="file-open"){let a=o.payload;if(_e&&so(_e,a))return;_e=a,x(Ae,o.payload);return}if(o.type==="file-saved"){x(Oe,o.payload.version);return}if(o.type==="file-snapshot"){let a=(I)=>{if(!V)L({channel:S,v:f,type:"file-snapshot-result",id:o.id,payload:I})},O=(I)=>a({error:(I.trim()||"Could not read the edited file.").slice(0,Te)}),m=pe;if(!m){O("This extension does not edit files.");return}Promise.resolve().then(()=>m(o.payload.purpose)).then((I)=>{if(ot(I)>ge){O(`The file is over ${ge} ${"bytes"in I?"bytes":"characters"}.`);return}if(I.version.length>be){O(`The snapshot version is over ${be} characters.`);return}a({snapshot:"bytes"in I?{bytes:I.bytes,version:I.version}:{content:I.content,version:I.version}})},(I)=>O(I instanceof Error?I.message:String(I)));return}if(o.type==="resolve"){let a=(m)=>{L({channel:S,v:f,type:"resolve-result",id:o.id,payload:m})},O=le;if(!O){a({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>O(o.payload)).then((m)=>a({item:m?se(m):null}),(m)=>{let I=(m instanceof Error?m.message:String(m)).trim();a({error:(I||"Command failed.").slice(0,Te)})});return}let c=ee.get(o.id);if(!c)return;if(clearTimeout(c.timer),ee.delete(o.id),o.ok){c.resolve(o.payload);return}c.reject(new l(o.code,o.error))};r.addEventListener("message",$t),L({channel:S,v:f,type:"hello"});let N=(t,o=p)=>{if(V||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((c,a)=>{let O=setTimeout(()=>{ee.delete(t.id),a(new l("HOST_TIMEOUT","Host did not answer in time."))},o);ee.set(t.id,{resolve:c,reject:a,timer:O}),L(t)})},M=(t)=>N(t).then(()=>{return}),C={channel:S,v:f},Ke=(t)=>{if(!V&&r.parent!==r)L(t)},Vt=()=>Ke({...C,type:"file-save"}),We=()=>{if(!V&&r.parent!==r)L({...C,type:"microphone-close",id:u(_)})},Wo=async()=>{if(D)throw new l("HOST_REJECTED","The microphone is already open in this frame.");if(d?.features?.microphone!==!0)throw new l("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new l("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<qe||o.sampleRate>Ze)throw o.close().catch(()=>{return}),new l("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let c=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,a=Qt(Math.round(o.sampleRate/4)),O=o.createScriptProcessor(1024,1,1);O.onaudioprocess=(H)=>a.pull(H.outputBuffer.getChannelData(0));let m=o.createMediaStreamDestination();O.connect(m);let I=new Set,re={queue:a,endedListeners:I,release:()=>{O.onaudioprocess=null,O.disconnect(),a.clear();for(let H of m.stream.getTracks())H.stop();o.close().catch(()=>{return})}};D=re;try{let H=await N({...C,type:"microphone-open",id:u(_),payload:{sampleRate:o.sampleRate}},et);if(!H||!("opened"in H)||H.opened!==!0)throw new l("HOST_REJECTED","Host did not open the microphone.");if(await c,D!==re)throw new l("DISCONNECTED","The microphone closed while it was opening.")}catch(H){if(D===re)D=null;throw re.release(),We(),H}return{stream:m.stream,close:()=>{if(D!==re)return;D=null,re.release(),We()},onEnded:(H)=>(I.add(H),()=>{I.delete(H)})}},Ft=(t)=>{if(!No(t)||!or(t))return;t.preventDefault(),Vt()},Bt=(t)=>{if(!No(t)||t.key!=="Escape"||d?.surface!=="popover"||!d.popover)return;t.preventDefault(),jt(d.popover.id,"escape").catch(()=>{return})},me=()=>{let t=d?.surface==="popover"?d.popover:void 0;if(!t)return;let o=ue||Ee;if(Dt===o)return;Dt=o,Jt(t.id,o).catch(()=>{return})},Re=()=>{if(d?.surface!=="popover"||ue)return;ue=!0,me()},Kt=(t)=>{if(d?.surface!=="popover"||t.relatedTarget!==null||!ue)return;ue=!1,me()},Wt=()=>{if(d?.surface!=="popover"||Ee)return;Ee=!0,me()},zt=()=>{if(d?.surface!=="popover"||!Ee)return;Ee=!1,me()},F=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},ze=async(t)=>{if(t.kind!=="projects")F(t.projectId);let o=await N({...C,type:"workspace-read",id:u(_),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},je=async(t,o)=>{if(t.kind!=="projects")F(t.projectId);let c=u(_);te.set(c,o);try{await M({...C,type:"workspace-subscribe",id:u(_),payload:{subscriptionId:c,query:t}})}catch(a){if(te.delete(c),!V)L({...C,type:"workspace-unsubscribe",id:u(_),payload:{subscriptionId:c}});throw a}return()=>{if(!te.delete(c)||V)return;L({...C,type:"workspace-unsubscribe",id:u(_),payload:{subscriptionId:c}})}},zo=async(t,o)=>{if(t.kind==="session")F(t.sessionId);if(t.kind==="project")F(t.projectId);let c=u(_);oe.set(c,o);try{await M({...C,type:"shells-subscribe",id:u(_),payload:{subscriptionId:c,scope:t}})}catch(a){if(oe.delete(c),!V)L({...C,type:"shells-unsubscribe",id:u(_),payload:{subscriptionId:c}});throw a}return()=>{if(!oe.delete(c)||V)return;L({...C,type:"shells-unsubscribe",id:u(_),payload:{subscriptionId:c}})}},he=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ye))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ne(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Qe)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&d?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await N({...C,type:"storage",id:u(_),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},jt=(t,o)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):M({...C,type:"popover-close",id:u(_),payload:o?{id:t,reason:o}:{id:t}}),Jt=(t,o)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):M({...C,type:"popover-anchor",id:u(_),payload:{id:t,active:o}});return r.addEventListener("keydown",Bt,!0),r.addEventListener("pointerover",Re),r.addEventListener("pointermove",Re),r.addEventListener("pointerout",Kt),r.addEventListener("focus",Wt),r.addEventListener("blur",zt),{onAction:(t)=>(de=t,()=>{if(de===t)de=null}),listProjects:async()=>{let t=await ze({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await ze({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await ze({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>je({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>je({kind:"worktrees",projectId:t},(c)=>{if(c.kind==="worktrees")o(c)}),onSessions:(t,o)=>je({kind:"sessions",projectId:t},(c)=>{if(c.kind==="sessions")o(c)}),onRunningShells:(t,o)=>zo(t,o),readShellOutput:async(t,o)=>{F(t,xe);let c=o?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let a=o?.tailBytes;if(a!==void 0&&(!Number.isInteger(a)||a<1||a>Ie))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ie}.`);let m=await N({...C,type:"shell-output",id:u(_),payload:{shellId:t,cursor:c,tailBytes:a}});if(!m||typeof m.output!=="string"||!Number.isFinite(m.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return m},stopShell:async(t)=>{if(F(t,xe),(await N({...C,type:"shell-stop",id:u(_),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{F(t),await M({...C,type:"open-session",id:u(_),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let c=we(o),a={op:"get",key:t};if(c)a.scope=c;let O=await he(a);return O.op==="get"&&O.found?O.value:void 0},set:async(t,o,c)=>{let a=we(c),O={op:"set",key:t,value:o};if(a)O.scope=a;await he(O)},delete:async(t,o)=>{let c=we(o),a={op:"delete",key:t};if(c)a.scope=c;await he(a)},keys:async(t)=>{let o=we(t),c={op:"keys"};if(o)c.scope=o;let a=await he(c);if(a.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return a.keys}},onReady:(t)=>{if(i.add(t),d)t(d);return()=>{i.delete(t)}},onDirectory:(t)=>{if(E.add(t),d)t(d.directory);return()=>{E.delete(t)}},onSession:(t)=>{if(T.add(t),d)t(d.session);return()=>{T.delete(t)}},onSessionLifecycle:(t)=>{if(A.add(t),W)t(W);return()=>{A.delete(t)}},onConnection:(t)=>{if(h.add(t),d)t(d.connection);return()=>{h.delete(t)}},onSettings:(t)=>{if(R.add(t),d)t(d.settings);return()=>{R.delete(t)}},onItem:(t)=>{if(b.add(t),d)t(d.item);return()=>{b.delete(t)}},onBlock:(t)=>{if(v.add(t),d?.block)t(d.block);return()=>{v.delete(t)}},onServiceEvent:(t)=>(K.add(t),()=>{K.delete(t)}),onStatusControl:(t)=>(Y.add(t),()=>{Y.delete(t)}),onPopoverClosed:(t)=>(fe.add(t),()=>{fe.delete(t)}),setStatusControls:(t)=>{if(d?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!oo(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return M({...C,type:"status-controls",id:u(_),payload:{controls:t}})},openPopover:(t)=>{if(d?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!nt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return M({...C,type:"popover-open",id:u(_),payload:t})},closePopover:jt,setPopoverAnchorActive:Jt,onResolve:(t)=>(le=t,()=>{if(le===t)le=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ce)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Ce} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ue))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Ue} characters.`));return M({channel:S,v:f,type:"toast",id:u(_),payload:{...t,message:o}})},openUrl:(t)=>M({channel:S,v:f,type:"open-url",id:u(_),payload:{url:t}}),..._o(M,()=>u(_),(t)=>Promise.reject(new l("HOST_REJECTED",t))),answerBlock:(t)=>M({channel:S,v:f,type:"block-answer",id:u(_),payload:{text:t.trim().slice(0,at)}}),openSurface:(t)=>M({channel:S,v:f,type:"open-surface",id:u(_),payload:{surfaceId:t}}),writeClipboard:(t)=>M({channel:S,v:f,type:"clipboard-write",id:u(_),payload:{text:t}}),compose:(t)=>M({channel:S,v:f,type:"compose",id:u(_),payload:t}),attach:(t)=>M({channel:S,v:f,type:"attach",id:u(_),payload:se(t)}),startSession:async(t)=>{if(t.projectId!==void 0)F(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")F(o.directory);else{if(o.name!==void 0)F(o.name,200);if(o.baseBranch!==void 0)F(o.baseBranch,200)}let c=await N({channel:S,v:f,type:"start-session",id:u(_),payload:ut(t)},e.requestTimeoutMs??180000);if(!ct(c))throw new l("HOST_REJECTED","Host did not return a session.");return c},prompt:(t)=>N({channel:S,v:f,type:"prompt",id:u(_),payload:Et(t)}).then((o)=>{if(!lt(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>M({channel:S,v:f,type:"session-link",id:u(_),payload:se(t)}),close:()=>M({channel:S,v:f,type:"close",id:u(_)}),oauthStart:()=>M({channel:S,v:f,type:"oauth-start",id:u(_)}),oauthDisconnect:()=>M({channel:S,v:f,type:"oauth-disconnect",id:u(_)}),request:(t)=>(ve(t.path)?N({channel:S,v:f,type:"request",id:u(_),payload:t}):yo()).then((o)=>{if(!Le(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(ve(t.path)?N({channel:S,v:f,type:"service-request",id:u(_),payload:t}):yo()).then((o)=>{if(!Le(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>N({channel:S,v:f,type:"service-status",id:u(_)}).then((t)=>{if(!ft(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ie(t)?N({channel:S,v:f,type:"file-read",id:u(_),payload:{path:t}}):Pe()).then((o)=>{if(!At(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ie(t))return Pe();if(o.length>Me)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Me} characters.`));return N({channel:S,v:f,type:"file-write",id:u(_),payload:{path:t,content:o}}).then((c)=>{if(!Ot(c))throw new l("HOST_REJECTED","Host did not confirm the write.");return c})},listDir:(t)=>(ie(t)?N({channel:S,v:f,type:"file-list",id:u(_),payload:{path:t}}):Pe()).then((o)=>{if(!mt(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ie(t)?N({channel:S,v:f,type:"file-stat",id:u(_),payload:{path:t}}):Pe()).then((o)=>{if(!Rt(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),c=t.system?.trim();if(o.length===0||o.length>Ne)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ne} characters.`));if(c!==void 0&&(c.length===0||c.length>ye))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${ye} characters.`));let a=t.maxOutputTokens===void 0?void 0:Math.min(pt,Math.max(1,Math.floor(t.maxOutputTokens)));if(a!==void 0&&!Number.isFinite(a))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let O={prompt:o};if(c!==void 0)O.system=c;if(a!==void 0)O.maxOutputTokens=a;return N({channel:S,v:f,type:"generate",id:u(_),payload:O},e.requestTimeoutMs??_t).then((m)=>{if(!ht(m))throw new l("HOST_REJECTED","Host did not return generated text.");return m})},onLateGenerateResult:(t)=>{Z.add(t);for(let o of Fe.splice(0))x([t],o);return Ht(),()=>{Z.delete(t)}},openMicrophone:Wo,setBadge:(t)=>M({channel:S,v:f,type:"badge",id:u(_),payload:{count:Tt(t)}}),setHeight:(t)=>M({channel:S,v:f,type:"resize",id:u(_),payload:{height:St(t)}}),onFileOpen:(t)=>{if(Ae.add(t),!Be)Be=!0,r.addEventListener("keydown",Ft,!0);if(_e)t(_e);return()=>{Ae.delete(t)}},onFileSnapshot:(t)=>(pe=t,()=>{if(pe===t)pe=null}),onFileSaved:(t)=>(Oe.add(t),()=>{Oe.delete(t)}),reportFileChange:(t)=>Ke({...C,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Vt,reportFileUnsupported:()=>Ke({...C,type:"file-unsupported"}),dispose:()=>{for(let t of te.keys())L({...C,type:"workspace-unsubscribe",id:u(_),payload:{subscriptionId:t}});te.clear();for(let t of oe.keys())L({...C,type:"shells-unsubscribe",id:u(_),payload:{subscriptionId:t}});if(oe.clear(),D)We(),D.release(),D=null;if(V=!0,le=null,de=null,pe=null,Ae.clear(),Oe.clear(),Be)r.removeEventListener("keydown",Ft,!0);r.removeEventListener("message",$t),r.removeEventListener("keydown",Bt,!0),r.removeEventListener("pointerover",Re),r.removeEventListener("pointermove",Re),r.removeEventListener("pointerout",Kt),r.removeEventListener("focus",Wt),r.removeEventListener("blur",zt);for(let t of ee.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));ee.clear(),i.clear(),E.clear(),T.clear(),A.clear(),h.clear(),R.clear(),b.clear(),v.clear(),K.clear(),Y.clear(),fe.clear(),Z.clear(),Fe.length=0}}};var vo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Zr=new Set(vo);var Lo=["none","agent","user"];var tn=new Set(Lo);var rr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],nr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Po=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,p]of rr)r.style.setProperty(s,e.tokens[p]);for(let[s,p,i]of nr){let E=e.tokens[i]??"";r.style.setProperty(s,E),r.style.setProperty(p,E)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},gt=(e,r)=>{if(Po(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var sr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},g=(e,r)=>`var(--${e}, var(--oc-${sr[e]}, ${r}))`,j=g("surface-background","transparent"),De=g("surface-elevated","transparent"),ae=g("surface-elevated-foreground","inherit"),X=g("surface-foreground","inherit"),U=g("surface-muted-foreground","gray"),ir=g("surface-muted","transparent"),Q=g("interactive-border","currentColor"),P=g("interactive-hover","transparent"),q=g("interactive-active","transparent"),bt=g("interactive-selection","transparent"),Ct=g("interactive-selection-foreground","inherit"),z=g("primary","currentColor"),Ut=g("primary-text","inherit"),kt=g("error-text","inherit"),ar=g("font-sans","inherit"),Mt=g("font-mono","monospace"),Xo=g("radius","9px"),Nt=`calc(${Xo} - 2px)`,wo=`calc(${Xo} - 4px)`,k=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,Go=`background-image: linear-gradient(${P}, ${P});`,yt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,vt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Do="box-shadow: var(--oc-sdk-lit);",Lt=`inset 0 0.5px 0 0 ${k(X,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,cr=`
:root {
  --oc-sdk-edge: ${k(X,16)};
  --oc-sdk-field-bg: ${De};
  --oc-sdk-raised-bg: ${j};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(X,14)};
  --oc-sdk-field-bg: ${k(j,50,De)};
  --oc-sdk-raised-bg: ${De};
  --oc-sdk-field-lift: ${Lt};
  --oc-sdk-raised-lift: ${Lt};
  --oc-sdk-lit: ${Lt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ge=(e)=>{let r=g(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${g(`${e}-text`,"inherit")}; }`},n=(e)=>`calc(${e}rem / 14)`,lr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${n(8)}; height: ${n(32)}; padding: 0 ${n(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${n(6)}; height: ${n(28)}; padding: 0 ${n(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${n(4)}; height: ${n(24)}; padding: 0 ${n(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${n(14)}; height: ${n(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${n(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${n(32)}; padding: 0 ${n(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${n(8)} ${n(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${n(34)}; padding-right: ${n(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${n(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${n(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${n(24)}; height: ${n(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${n(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${n(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${n(28)}; padding: 0 ${n(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${n(2)}; min-width: ${n(160)}; max-width: calc(100vw - ${n(16)}); max-height: min(${n(320)}, calc(100vh - ${n(16)})); overflow: auto; padding: ${n(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${n(2)} ${n(2)} ${n(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${n(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${n(8)}; width: 100%; padding: ${n(6)} ${n(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${n(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${n(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${n(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${n(14)}; height: ${n(14)}; margin-top: ${n(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${n(36)}; height: ${n(20)}; --oc-sdk-thumb-travel: ${n(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${n(2)}; left: ${n(2)}; width: ${n(16)}; height: ${n(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${n(2)}; padding: ${n(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${n(6)}; height: ${n(28)}; padding: 0 ${n(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${n(1)} ${n(6)}; font-size: ${n(11)}; font-weight: 500; line-height: ${n(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${n(8)}; width: 100%; padding: ${n(6)} ${n(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${n(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${n(16)} ${n(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${n(4)}; padding: ${n(40)} ${n(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${n(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${n(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${n(16)}; height: ${n(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${n(12)}; height: ${n(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${n(12)}; padding: ${n(8)} ${n(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${n(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${n(8)}; width: 100%; margin: ${n(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${n(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${n(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${n(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${n(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${n(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${n(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${n(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${n(36)}; height: ${n(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${n(44)}; }
  .oc-sdk-check { min-height: ${n(36)}; padding: ${n(8)} 0; }
}
`,Ho=`${cr}
.oc-sdk { color: ${X}; font-family: ${ar}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Go} }
.oc-sdk-mono { font-family: ${Mt}; }
.oc-sdk-muted { color: ${U}; }
${Ge("success")}${Ge("warning")}${Ge("error")}${Ge("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${z}; --oc-sdk-tone-text: ${Ut}; }

.oc-sdk-btn { border-radius: ${Nt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${wo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ut}; background: ${k(z,10,j)}; border-color: ${k(z,12)}; ${Do} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(z,16,j)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(z,22,j)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ir}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ae}; ${vt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${q}, ${q}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${P}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${q}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${g("status-error","red")}; color: ${kt}; background: ${k("var(--oc-sdk-tone)",7,j)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${Do} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,j)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,j)}; box-shadow: none; }

.oc-sdk-field-note { color: ${U}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${kt}; }
.oc-sdk-input { border-radius: ${Nt}; background: var(--oc-sdk-field-bg); color: ${ae}; ${yt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${U}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${yt(k(X,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${yt(g("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Mt}; }

.oc-sdk-search-icon { color: ${U}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search-clear { border-radius: ${wo}; color: ${U}; }
.oc-sdk-search-clear:hover { background: ${P}; color: ${X}; }

.oc-sdk-trigger { border-radius: ${Nt}; background: var(--oc-sdk-raised-bg); color: ${ae}; ${vt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${U}; }
.oc-sdk-trigger-chevron { color: ${U}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ae}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${De}; background-clip: padding-box; color: ${ae}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${P}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${bt}; color: ${Ct}; }
.oc-sdk-option-check { color: ${X}; }
.oc-sdk-option[data-destructive="true"] { color: ${kt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(g("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${U}; }
.oc-sdk-popup-empty { color: ${U}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Q}; border-radius: 4px; color: ${X}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(X,60,Q)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Q}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${j}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Go} }
.oc-sdk-check-desc { color: ${U}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(X,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${U}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${X}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ct}; background: ${bt}; border-color: ${Q}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ae}; background: var(--oc-sdk-raised-bg); ${vt} }
.oc-sdk-tab-count { color: ${U}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(X,6)}; color: ${U}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${P}; }
.oc-sdk-row[aria-selected="true"] { background: ${bt}; color: ${Ct}; }
.oc-sdk-row-lead { font-family: ${Mt}; color: ${U}; }
.oc-sdk-row-sub { color: ${U}; }
.oc-sdk-row-meta { color: ${U}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${U}; }

.oc-sdk-empty-body { color: ${U}; }

.oc-sdk-spinner { color: ${U}; }
.oc-sdk-spinner-ring { border-color: ${Q}; border-top-color: ${z}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${U}; }

.oc-sdk-separator { color: ${U}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(Q,40)}; }

.oc-sdk-progress-label { color: ${U}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(X,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${z}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${g("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${g("success-text","inherit")}; }

.oc-sdk-text a { color: ${Ut}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(Q,60)}; }
`,y=`
${Je}
${lr}
${Ho}`;var $o=2000;var wt=(e)=>typeof e==="object"&&e!==null,Er=(e)=>wt(e)&&typeof e.at==="number"&&typeof e.intervalMs==="number"&&wt(e.omlx)&&wt(e.omlx.summary)&&Array.isArray(e.omlx.active_models)&&Array.isArray(e.history)&&Array.isArray(e.warnings),Tr=(e)=>{if(!(e instanceof l))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Gt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Vo=(e,r,s,p)=>{let i=!1,E=$o,T=async()=>{if(i)return;i=!0;try{if(!Gt(r))return;let b=await e.serviceRequest({method:"GET",path:"/snapshot"}),v;try{v=JSON.parse(b.body)}catch{v=null}if(b.status===200&&Er(v))s(v),E=v.omlx.summary.total_active_requests>0?100:$o;else p(b.status===200?"bad-answer":"service-failed")}catch(b){p(Tr(b))}finally{i=!1,setTimeout(()=>{T()},E)}};T();let A=Gt(r),h=()=>{let b=Gt(r);if(b&&!A)T();A=b};document.addEventListener("visibilitychange",h);let R=new ResizeObserver(h);return R.observe(document.documentElement),R.observe(r),{refresh:()=>{T()}}};var Fo=It(),B=document.getElementById("root");if(!B)throw Error("Missing #root");var Ko=document.createElement("style");Ko.textContent=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 14px; }
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px;
    border-radius: var(--oc-radius); background: color-mix(in srgb, var(--oc-fg) 4%, transparent); }
  .card-title { font-size: 13px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .row-head { font-size: 11px; font-weight: 600; margin-bottom: 4px; color: var(--oc-muted); }
  .req-list { display: flex; flex-direction: column; gap: 4px; }
  .req-row { display: flex; align-items: center; gap: 8px; }
  .req-lead { width: 48px; font-size: 11px; color: var(--oc-muted); }
  .req-main { flex: 1 1 auto; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .req-meta { width: 72px; font-size: 11px; text-align: right; color: var(--oc-muted); }
  .progress { height: 6px; border-radius: 999px; background: var(--oc-border); position: relative; margin: 4px 0; }
  .progress-fill { height: 100%; border-radius: 999px; background: var(--oc-primary); transform-origin: left; transition: transform .2s ease; }
  .empty { color: var(--oc-muted); padding: 8px 0; font-size: 11px; }
  .head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; }
  .head .grow { flex: 1; }
  .live { display: inline-flex; align-items: center; gap: 6px; color: var(--oc-muted); font-size: 11px; white-space: nowrap; padding-top: 2px; }
  .live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--oc-success); }
  .live.stale::before { background: var(--oc-muted); }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius);
    background: color-mix(in srgb, var(--oc-error) 10%, transparent); color: var(--oc-error-text, var(--oc-fg)); }
  h2 { font-size: 13px; font-weight: 600; margin: 12px 0 8px; color: var(--oc-fg); }
  .footer { color: var(--oc-muted); font-size: 11px; margin-top: 12px; }
`;document.head.append(Ko);function Sr(e){return`oc-sdk-badge ${e==="loaded"?"success":e==="loading"?"info":e==="error"?"error":"muted"}`}function fr(e){if(e.processed===null||e.total===null||e.total===0)return null;return Math.min(100,Math.round(e.processed/e.total*100))}function Bo(e){if(e===null)return"\u2014";if(e<60)return`${e.toFixed(1)}s`;return`${Math.floor(e/60)}m${Math.floor(e%60)}s`}function Ar(e){let r=document.createElement("div");r.className="card";let s=document.createElement("div");s.className="card-title",s.append(e.id,document.createElement("span"),document.createElement("span").className=Sr(e.state),document.createElement("span").innerText=e.state);let p=document.createElement("div");if(p.className="req-list",e.prefilling.length>0){let i=document.createElement("div");i.className="row-head",i.innerText="Prefill",p.append(i);for(let E of e.prefilling){let T=document.createElement("div");T.style.margin="4px 0";let A=document.createElement("div");A.className="progress";let h=document.createElement("div");h.className="progress-fill";let R=fr(E);if(R!==null)h.style.transform=`scaleX(${R/100})`;A.append(h),T.append(A);let b=document.createElement("div");b.className="req-row";let v=document.createElement("span");v.className="req-lead",v.innerText="req";let K=document.createElement("span");K.className="req-main",K.innerText=`${E.processed??0}/${E.total??0} tokens`;let Y=document.createElement("span");Y.className="req-meta",Y.innerText=R!==null?`${R}%`:`${E.speed??0} tps`,b.append(v,K,Y),p.append(T,b)}}if(e.generating.length>0){let i=document.createElement("div");i.className="row-head",i.innerText="Generate",p.append(i);for(let E of e.generating){let T=document.createElement("div");T.className="req-row";let A=document.createElement("span");A.className="req-lead",A.innerText="req";let h=document.createElement("span");h.className="req-main",h.innerText=`${E.generated_tokens??0} tokens`;let R=document.createElement("span");R.className="req-meta",R.innerText=`${E.tokens_per_second??0} tps \xB7 ${Bo(E.elapsed_seconds)}`,T.append(A,h,R),p.append(T)}}if(e.waiting.length>0){let i=document.createElement("div");i.className="row-head",i.innerText="Waiting",p.append(i);for(let E of e.waiting){let T=document.createElement("div");T.className="req-row";let A=document.createElement("span");A.className="req-lead",A.innerText=`#${E.queue_position}`;let h=document.createElement("span");h.className="req-main",h.innerText=`${E.prompt_tokens} tokens`;let R=document.createElement("span");R.className="req-meta",R.innerText=Bo(E.elapsed_seconds),T.append(A,h,R),p.append(T)}}if(!e.prefilling.length&&!e.generating.length&&!e.waiting.length){let i=document.createElement("div");i.className="empty",i.innerText="No active requests",p.append(i)}return r.append(s,p),r}function Or(e){if(B.innerHTML="",e.warnings.length>0){let T=document.createElement("div");T.className="banner",T.innerText=e.warnings.map((A)=>A.message).join("; "),B.append(T)}let r=document.createElement("div");r.className="head",r.append(document.createElement("span").className="live".concat(!e.omlx.authenticated?" stale":""),document.createElement("span").className="grow",document.createElement("span").className="big".concat(" num"),document.createElement("span").innerText=`${e.omlx.summary.models_loaded} models`,document.createElement("span").innerText="Live"),B.append(r);let s=document.createElement("div");s.className="grid";let p=(T,A)=>{let h=document.createElement("div");h.className="card";let R=document.createElement("div");R.className="card-title",R.innerText=T;let b=document.createElement("div");return b.className="big".concat(" num"),b.innerText=A,h.append(R,b),h};s.append(p("Active",String(e.omlx.summary.total_active_requests)),p("Waiting",String(e.omlx.summary.total_waiting_requests)),p("Prefill",String(e.omlx.summary.total_prefilling)),p("Generate",String(e.omlx.summary.total_generating))),B.append(s);let i=document.createElement("h2");i.innerText=`Models (${e.omlx.active_models.length})`,B.append(i);for(let T of e.omlx.active_models)B.append(Ar(T));let E=document.createElement("div");E.className="footer",E.innerText=`Updated every ${e.intervalMs} ms`,B.append(E)}function mr(e){B.innerHTML=`<div class="banner">${"oMLX monitor "+(e==="service-failed"?"stopped":e==="needs-approval"?"permission denied":e==="paused"?"paused":e==="bad-answer"?"unexpected response":"unreachable")}</div>`}Fo.onReady(async(e)=>{gt(e,document.documentElement),Vo(Fo,B,Or,mr).refresh()});

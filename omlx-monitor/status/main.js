// @bun
var Rn=Object.defineProperty;var mn=(e)=>e;function hn(e,n){this[e]=mn.bind(null,n)}var In=(e,n)=>{for(var s in n)Rn(e,s,{get:n[s],enumerable:!0,configurable:!0,set:hn.bind(n,s)})};var C=(e,n)=>()=>(e&&(n=e(e=0)),n);var E="openchamber.sdk",S=1;var Se=()=>{};function Eo(e){let n=e.documentElement;if(n.hasAttribute("data-oc-scrollbar-activity"))return;n.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(_)=>{let d=_.target===e?n:_.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-oc-scrolling"))d.setAttribute("data-oc-scrolling","");let T=s.get(d);if(T!==void 0)clearTimeout(T);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ot=`
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
`,xn;var ge=C(()=>{xn=`(${Eo.toString()})(document);`});var rt=128,st=65536;var be=128,Ce=65536;var it=()=>{};var at=8000,ct=192000,lt=120000,So=(e)=>{let n=[],s=0,_=0;return{push:(d)=>{n.push(d),_+=d.length;while(_-s>e&&n.length>1){let T=n.shift();_-=T?.length??0,s=0}},pull:(d)=>{let T=0;while(T<d.length&&n.length>0){let h=n[0],U=Math.min(d.length-T,h.length-s);if(d.set(h.subarray(s,s+U),T),T+=U,s+=U,s>=h.length)n.shift(),_-=h.length,s=0}d.fill(0,T)},clear:()=>{n.length=0,s=0,_=0},get size(){return _-s}}};var dt=()=>{};var Oo,To=(e)=>Object(e)===e&&!Array.isArray(e),_t=(e,n)=>Object.keys(e).every((s)=>n.includes(s)),fo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ao=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Ro=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let n=new Set;for(let s of e){if(!To(s)||!Oo.test(s.id)||!fo(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(n.has(s.id))return!1;if(n.add(s.id),s.kind==="button"){if(!_t(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!_t(s,["kind","id","label","value","options","disabled"]))return!1;if(!Ao(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let _=new Set;for(let d of s.options){if(!To(d)||!_t(d,["value","label"])||!Ao(d.value)||!fo(d.label)||_.has(d.value))return!1;_.add(d.value)}if(!_.has(s.value))return!1}return!0};var pt=C(()=>{Oo=/^[a-z][a-z0-9-]{0,39}$/});var ut=()=>{};var mo=()=>{};var ho,cr;var Io=C(()=>{ut();ho=["{id}","{segment}","{segments+}"],cr=new Set(ho)});var xo,dr;var go=C(()=>{xo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"],dr=new Set(xo)});var bo=()=>{};var Co=()=>{};var Ue=20000000,ke=256,Et=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Uo=(e,n)=>{if(e.path!==n.path||e.readOnly!==n.readOnly)return!1;if(e.encoding==="text"||n.encoding==="text")return e.encoding==="text"&&n.encoding==="text"&&e.content===n.content;if(e.bytes.byteLength!==n.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==n.bytes[s])return!1;return!0};var St=()=>{};var ko,Mo,No=(e,n=0,s={remaining:16000})=>{if(--s.remaining<0||n>=32)return!1;if(e===null)return!0;let _=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of _)if(!No(d,n+1,s))return!1;return!0},Tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((n)=>/^(0|[1-9]\d*)$/.test(n)&&Number(n)<e.length)&&e.every(Tt);if(Object(e)===e){let n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype)&&Object.values(e).every(Tt)}return String(e)===e||Number.isFinite(e)},ft=(e)=>{try{if(String(e.id)!==e.id||!ko.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Mo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!No(e.data)||!Tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var At=C(()=>{ko=/^[A-Za-z0-9_-]{1,80}$/,Mo=["left","right","top","bottom"]});var yo,vo=(e)=>yo.test(e),Ot=255,Lo=(e,n,s)=>({openCommit:(_)=>vo(_)?e({channel:E,v:S,type:"open-commit",id:n(),payload:{sha:_}}):s("Commit id must be 7 to 64 hex characters."),openWalkthrough:({base:_})=>{let d=_.trim();if(!d||d.length>Ot)return s(`Base must contain 1 to ${Ot} characters.`);return e({channel:E,v:S,type:"open-walkthrough",id:n(),payload:{base:d}})}});var Rt=C(()=>{Se();yo=/^[0-9a-f]{7,64}$/i});var ht=2000,wo,It=(e)=>Boolean(e&&"sessionId"in e),xt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),Me=500,Ne=32000,Go=16000,Do=128,Xo=200,Ho=2000,Vo=16000,$o=80,Fo=200,Bo=16000,Ko=2000,gt=20000,ye=1024,ve=2000000,Le=64000,Pe=8000,bt=4000,Ct=960000,Wo=999,jo=1e4,Te=500,zo,Jo,bn,Yo=(e)=>bn.has(e),Qo=(e)=>e&&Yo(e)?e:"HOST_REJECTED",oe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(oe);if(Object(e)===e)return Object.values(e).every(oe);return!1},qo=(e)=>oe(e)&&JSON.stringify(e).length<=Bo,Po=(e)=>e?.trim().slice(0,Fo)??"",ne=(e)=>{let n=e.id.trim().slice(0,Do),s=e.title.trim().slice(0,Xo),_=e.url.trim().slice(0,Ho),d=e.text?.trim().slice(0,Vo),T=e.author?.trim().slice(0,$o),h=e.kind==="pull"?"pull":"issue",U={providerId:e.providerId.trim(),id:n,title:s||n,url:_,kind:h};if(d)U.text=d;if(T)U.author=T;if(h==="pull"){let X=Po(e.branches?.head),H=Po(e.branches?.base);if(X&&H)U.branches={head:X,base:H}}if(qo(e.data))U.data=e.data;return U},Ut=(e)=>{let n=ne(e);if(e.projectId)n.projectId=e.projectId;if(e.navigation)n.navigation=e.navigation;if(e.worktree)n.worktree=e.worktree;return n},kt=(e)=>{let n={text:e.text.trim().slice(0,Go)};if(e.send)n.send=!0;return n},Mt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Wo,Math.max(0,Math.round(e)))},Nt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(jo,Math.max(0,Math.ceil(e)))},re=(e)=>e.length>0&&e.length<=ye&&!e.includes("\x00")&&!e.includes("\\"),we=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ko)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Cn,yt=(e)=>Boolean(e&&"status"in e&&Cn.has(String(e.status))&&!("body"in e)),Ge=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),vt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Lt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Pt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Un,wt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Un.has(String(e.kind))&&Number.isFinite(e.size)),Gt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),kn,Mn=(e)=>Object(e)===e?e:null,mt=(e)=>String(e)===e&&e.length>0,Nn=(e)=>{if(!mt(e.id))return null;if(e.ok===!0){let n={channel:E,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)n.payload=e.payload;return n}if(e.ok===!1&&mt(e.error))return{channel:E,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:Qo(mt(e.code)?e.code:void 0)};return null},Dt=(e)=>{let n=Mn(e);if(!n||n.channel!==E||n.v!==S)return null;if(n.type==="result")return Nn(n);if(!kn.has(String(n.type))||Object(n.payload)!==n.payload)return null;return n};var De=C(()=>{Se();wo=["file","directory","other","missing"],zo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Jo=["stopped","starting","ready","failed"],bn=new Set(zo),Cn=new Set(Jo),Un=new Set(wo),kn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"])});var Zo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),yn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",c,en=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Xe=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${ye} characters without NUL or backslash.`)),He=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`oc-${e.value}`),Xt=(e={})=>{let n=e.target??("window"in globalThis?window:null);if(!n)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===n.parent),_=e.requestTimeoutMs??gt,d=new Set,T=new Set,h=new Set,U=new Set,X=new Set,H=new Set,N=new Set,B=new Set,ce=new Set,Ae=new Set,Oe=new Set,Q=new Set,Ye=[],le=null,de=null,Re=new Set,me=new Set,_e=null,pe=null,Qe=!1,q=new Map,Z=new Map,ee=new Map,V=!1,p={value:0},l=null,K=null,ue=!1,Ee=!1,to=null,w=null,oo=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},y=(t)=>{n.parent.postMessage(t,"*")},no=()=>{if(V||n.parent===n||Q.size===0||l?.features?.lateGenerateResults!==!0)return;y({channel:E,v:S,type:"generate-late-listen"})},O=(t,o)=>{for(let a of t)try{a(o)}catch(i){console.error(i)}},ro=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=Dt(t.data);if(!o)return;if(o.type==="workspace"){let i=Z.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="shells"){let i=ee.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="microphone-audio"){w?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let i=w;if(!i)return;w=null,i.release(),O(i.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(l=o.payload,K=oo(o.payload.session),O(d,o.payload),O(T,o.payload.directory),O(h,o.payload.session),K)O(U,K);if(O(X,o.payload.connection),O(H,o.payload.settings),O(N,o.payload.item),o.payload.block)O(B,o.payload.block);no();return}if(o.type==="service-event"){O(ce,o.payload);return}if(o.type==="generate-late"){if(Q.size===0)Ye.push(o.payload);else O(Q,o.payload);return}if(o.type==="directory"){if(l)l={...l,directory:o.payload.directory};O(T,o.payload.directory);return}if(o.type==="session"){if(l)l={...l,session:o.payload.session};if(!o.payload.session)K=null;else if(K?.sessionId!==o.payload.session.id)K=oo(o.payload.session);O(h,o.payload.session);return}if(o.type==="session-lifecycle"){K=o.payload,O(U,o.payload);return}if(o.type==="connection"){if(l)l={...l,connection:o.payload.connection};O(X,o.payload.connection);return}if(o.type==="settings"){if(l)l={...l,settings:o.payload.settings};O(H,o.payload.settings);return}if(o.type==="item"){if(l)l={...l,item:o.payload.item};O(N,o.payload.item);return}if(o.type==="status-control-event"){O(Ae,o.payload);return}if(o.type==="popover-closed"){O(Oe,o.payload);return}if(o.type==="action"){let i=(A)=>{if(!V)y({channel:E,v:S,type:"action-result",id:o.id,payload:A})},f=de;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(o.payload)).then(()=>i({ok:!0}),(A)=>{let R=(A instanceof Error?A.message:String(A)).trim();i({ok:!1,error:(R||"Action failed.").slice(0,Te)})});return}if(o.type==="file-open"){let i=o.payload;if(pe&&Uo(pe,i))return;pe=i,O(Re,o.payload);return}if(o.type==="file-saved"){O(me,o.payload.version);return}if(o.type==="file-snapshot"){let i=(R)=>{if(!V)y({channel:E,v:S,type:"file-snapshot-result",id:o.id,payload:R})},f=(R)=>i({error:(R.trim()||"Could not read the edited file.").slice(0,Te)}),A=_e;if(!A){f("This extension does not edit files.");return}Promise.resolve().then(()=>A(o.payload.purpose)).then((R)=>{if(Et(R)>Ue){f(`The file is over ${Ue} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>ke){f(`The snapshot version is over ${ke} characters.`);return}i({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>f(R instanceof Error?R.message:String(R)));return}if(o.type==="resolve"){let i=(A)=>{y({channel:E,v:S,type:"resolve-result",id:o.id,payload:A})},f=le;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(o.payload)).then((A)=>i({item:A?ne(A):null}),(A)=>{let R=(A instanceof Error?A.message:String(A)).trim();i({error:(R||"Command failed.").slice(0,Te)})});return}let a=q.get(o.id);if(!a)return;if(clearTimeout(a.timer),q.delete(o.id),o.ok){a.resolve(o.payload);return}a.reject(new c(o.code,o.error))};n.addEventListener("message",ro),y({channel:E,v:S,type:"hello"});let k=(t,o=_)=>{if(V||n.parent===n)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,i)=>{let f=setTimeout(()=>{q.delete(t.id),i(new c("HOST_TIMEOUT","Host did not answer in time."))},o);q.set(t.id,{resolve:a,reject:i,timer:f}),y(t)})},b=(t)=>k(t).then(()=>{return}),I={channel:E,v:S},qe=(t)=>{if(!V&&n.parent!==n)y(t)},so=()=>qe({...I,type:"file-save"}),Ze=()=>{if(!V&&n.parent!==n)y({...I,type:"microphone-close",id:u(p)})},An=async()=>{if(w)throw new c("HOST_REJECTED","The microphone is already open in this frame.");if(l?.features?.microphone!==!0)throw new c("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new c("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<at||o.sampleRate>ct)throw o.close().catch(()=>{return}),new c("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let a=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,i=So(Math.round(o.sampleRate/4)),f=o.createScriptProcessor(1024,1,1);f.onaudioprocess=(D)=>i.pull(D.outputBuffer.getChannelData(0));let A=o.createMediaStreamDestination();f.connect(A);let R=new Set,te={queue:i,endedListeners:R,release:()=>{f.onaudioprocess=null,f.disconnect(),i.clear();for(let D of A.stream.getTracks())D.stop();o.close().catch(()=>{return})}};w=te;try{let D=await k({...I,type:"microphone-open",id:u(p),payload:{sampleRate:o.sampleRate}},lt);if(!D||!("opened"in D)||D.opened!==!0)throw new c("HOST_REJECTED","Host did not open the microphone.");if(await a,w!==te)throw new c("DISCONNECTED","The microphone closed while it was opening.")}catch(D){if(w===te)w=null;throw te.release(),Ze(),D}return{stream:A.stream,close:()=>{if(w!==te)return;w=null,te.release(),Ze()},onEnded:(D)=>(R.add(D),()=>{R.delete(D)})}},io=(t)=>{if(!Zo(t)||!yn(t))return;t.preventDefault(),so()},ao=(t)=>{if(!Zo(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),po(l.popover.id,"escape").catch(()=>{return})},he=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let o=ue||Ee;if(to===o)return;to=o,uo(t.id,o).catch(()=>{return})},Ie=()=>{if(l?.surface!=="popover"||ue)return;ue=!0,he()},co=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!ue)return;ue=!1,he()},lo=()=>{if(l?.surface!=="popover"||Ee)return;Ee=!0,he()},_o=()=>{if(l?.surface!=="popover"||!Ee)return;Ee=!1,he()},F=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new c("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},et=async(t)=>{if(t.kind!=="projects")F(t.projectId);let o=await k({...I,type:"workspace-read",id:u(p),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return o},tt=async(t,o)=>{if(t.kind!=="projects")F(t.projectId);let a=u(p);Z.set(a,o);try{await b({...I,type:"workspace-subscribe",id:u(p),payload:{subscriptionId:a,query:t}})}catch(i){if(Z.delete(a),!V)y({...I,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:a}});throw i}return()=>{if(!Z.delete(a)||V)return;y({...I,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:a}})}},On=async(t,o)=>{if(t.kind==="session")F(t.sessionId);if(t.kind==="project")F(t.projectId);let a=u(p);ee.set(a,o);try{await b({...I,type:"shells-subscribe",id:u(p),payload:{subscriptionId:a,scope:t}})}catch(i){if(ee.delete(a),!V)y({...I,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:a}});throw i}return()=>{if(!ee.delete(a)||V)return;y({...I,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:a}})}},xe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>rt))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!oe(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>st)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let o=await k({...I,type:"storage",id:u(p),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return o},po=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):b({...I,type:"popover-close",id:u(p),payload:o?{id:t,reason:o}:{id:t}}),uo=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):b({...I,type:"popover-anchor",id:u(p),payload:{id:t,active:o}});return n.addEventListener("keydown",ao,!0),n.addEventListener("pointerover",Ie),n.addEventListener("pointermove",Ie),n.addEventListener("pointerout",co),n.addEventListener("focus",lo),n.addEventListener("blur",_o),{onAction:(t)=>(de=t,()=>{if(de===t)de=null}),listProjects:async()=>{let t=await et({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await et({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await et({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>tt({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>tt({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")o(a)}),onSessions:(t,o)=>tt({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")o(a)}),onRunningShells:(t,o)=>On(t,o),readShellOutput:async(t,o)=>{F(t,be);let a=o?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Ce))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ce}.`);let A=await k({...I,type:"shell-output",id:u(p),payload:{shellId:t,cursor:a,tailBytes:i}});if(!A||typeof A.output!=="string"||!Number.isFinite(A.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async(t)=>{if(F(t,be),(await k({...I,type:"shell-stop",id:u(p),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{F(t),await b({...I,type:"open-session",id:u(p),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let a=He(o),i={op:"get",key:t};if(a)i.scope=a;let f=await xe(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,o,a)=>{let i=He(a),f={op:"set",key:t,value:o};if(i)f.scope=i;await xe(f)},delete:async(t,o)=>{let a=He(o),i={op:"delete",key:t};if(a)i.scope=a;await xe(i)},keys:async(t)=>{let o=He(t),a={op:"keys"};if(o)a.scope=o;let i=await xe(a);if(i.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),l)t(l);return()=>{d.delete(t)}},onDirectory:(t)=>{if(T.add(t),l)t(l.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(h.add(t),l)t(l.session);return()=>{h.delete(t)}},onSessionLifecycle:(t)=>{if(U.add(t),K)t(K);return()=>{U.delete(t)}},onConnection:(t)=>{if(X.add(t),l)t(l.connection);return()=>{X.delete(t)}},onSettings:(t)=>{if(H.add(t),l)t(l.settings);return()=>{H.delete(t)}},onItem:(t)=>{if(N.add(t),l)t(l.item);return()=>{N.delete(t)}},onBlock:(t)=>{if(B.add(t),l?.block)t(l.block);return()=>{B.delete(t)}},onServiceEvent:(t)=>(ce.add(t),()=>{ce.delete(t)}),onStatusControl:(t)=>(Ae.add(t),()=>{Ae.delete(t)}),onPopoverClosed:(t)=>(Oe.add(t),()=>{Oe.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!Ro(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...I,type:"status-controls",id:u(p),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!ft(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...I,type:"popover-open",id:u(p),payload:t})},closePopover:po,setPopoverAnchorActive:uo,onResolve:(t)=>(le=t,()=>{if(le===t)le=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Me)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${Me} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ne))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Ne} characters.`));return b({channel:E,v:S,type:"toast",id:u(p),payload:{...t,message:o}})},openUrl:(t)=>b({channel:E,v:S,type:"open-url",id:u(p),payload:{url:t}}),...Lo(b,()=>u(p),(t)=>Promise.reject(new c("HOST_REJECTED",t))),answerBlock:(t)=>b({channel:E,v:S,type:"block-answer",id:u(p),payload:{text:t.trim().slice(0,ht)}}),openSurface:(t)=>b({channel:E,v:S,type:"open-surface",id:u(p),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:E,v:S,type:"clipboard-write",id:u(p),payload:{text:t}}),compose:(t)=>b({channel:E,v:S,type:"compose",id:u(p),payload:t}),attach:(t)=>b({channel:E,v:S,type:"attach",id:u(p),payload:ne(t)}),startSession:async(t)=>{if(t.projectId!==void 0)F(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")F(o.directory);else{if(o.name!==void 0)F(o.name,200);if(o.baseBranch!==void 0)F(o.baseBranch,200)}let a=await k({channel:E,v:S,type:"start-session",id:u(p),payload:Ut(t)},e.requestTimeoutMs??180000);if(!It(a))throw new c("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>k({channel:E,v:S,type:"prompt",id:u(p),payload:kt(t)}).then((o)=>{if(!xt(o))throw new c("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>b({channel:E,v:S,type:"session-link",id:u(p),payload:ne(t)}),close:()=>b({channel:E,v:S,type:"close",id:u(p)}),oauthStart:()=>b({channel:E,v:S,type:"oauth-start",id:u(p)}),oauthDisconnect:()=>b({channel:E,v:S,type:"oauth-disconnect",id:u(p)}),request:(t)=>(we(t.path)?k({channel:E,v:S,type:"request",id:u(p),payload:t}):en()).then((o)=>{if(!Ge(o))throw new c("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(we(t.path)?k({channel:E,v:S,type:"service-request",id:u(p),payload:t}):en()).then((o)=>{if(!Ge(o))throw new c("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>k({channel:E,v:S,type:"service-status",id:u(p)}).then((t)=>{if(!yt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(re(t)?k({channel:E,v:S,type:"file-read",id:u(p),payload:{path:t}}):Xe()).then((o)=>{if(!vt(o))throw new c("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!re(t))return Xe();if(o.length>ve)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${ve} characters.`));return k({channel:E,v:S,type:"file-write",id:u(p),payload:{path:t,content:o}}).then((a)=>{if(!Lt(a))throw new c("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(re(t)?k({channel:E,v:S,type:"file-list",id:u(p),payload:{path:t}}):Xe()).then((o)=>{if(!Pt(o))throw new c("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(re(t)?k({channel:E,v:S,type:"file-stat",id:u(p),payload:{path:t}}):Xe()).then((o)=>{if(!wt(o))throw new c("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),a=t.system?.trim();if(o.length===0||o.length>Le)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${Le} characters.`));if(a!==void 0&&(a.length===0||a.length>Pe))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Pe} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(bt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:o};if(a!==void 0)f.system=a;if(i!==void 0)f.maxOutputTokens=i;return k({channel:E,v:S,type:"generate",id:u(p),payload:f},e.requestTimeoutMs??Ct).then((A)=>{if(!Gt(A))throw new c("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:(t)=>{Q.add(t);for(let o of Ye.splice(0))O([t],o);return no(),()=>{Q.delete(t)}},openMicrophone:An,setBadge:(t)=>b({channel:E,v:S,type:"badge",id:u(p),payload:{count:Mt(t)}}),setHeight:(t)=>b({channel:E,v:S,type:"resize",id:u(p),payload:{height:Nt(t)}}),onFileOpen:(t)=>{if(Re.add(t),!Qe)Qe=!0,n.addEventListener("keydown",io,!0);if(pe)t(pe);return()=>{Re.delete(t)}},onFileSnapshot:(t)=>(_e=t,()=>{if(_e===t)_e=null}),onFileSaved:(t)=>(me.add(t),()=>{me.delete(t)}),reportFileChange:(t)=>qe({...I,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:so,reportFileUnsupported:()=>qe({...I,type:"file-unsupported"}),dispose:()=>{for(let t of Z.keys())y({...I,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:t}});Z.clear();for(let t of ee.keys())y({...I,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:t}});if(ee.clear(),w)Ze(),w.release(),w=null;if(V=!0,le=null,de=null,_e=null,Re.clear(),me.clear(),Qe)n.removeEventListener("keydown",io,!0);n.removeEventListener("message",ro),n.removeEventListener("keydown",ao,!0),n.removeEventListener("pointerover",Ie),n.removeEventListener("pointermove",Ie),n.removeEventListener("pointerout",co),n.removeEventListener("focus",lo),n.removeEventListener("blur",_o);for(let t of q.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));q.clear(),d.clear(),T.clear(),h.clear(),U.clear(),X.clear(),H.clear(),N.clear(),B.clear(),ce.clear(),Ae.clear(),Oe.clear(),Q.clear(),Ye.length=0}}};var tn=C(()=>{Se();pt();At();Rt();St();De();dt();it();c=class c extends Error{code;constructor(e,n){super(n);this.name="HostRequestError",this.code=e}}});var on,Mr;var nn=C(()=>{on=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"],Mr=new Set(on)});var rn,yr;var sn=C(()=>{rn=["none","agent","user"],yr=new Set(rn)});var Ht=C(()=>{Se();ge();it();dt();pt();ut();mo();Io();go();bo();Co();St();tn();At();Rt();De();De();nn();sn()});var En={};In(En,{FAILURE_TEXT:()=>Zt,isOnScreen:()=>je,startPolling:()=>Wn});var un=2000,Zt,qt=(e)=>typeof e==="object"&&e!==null,Bn=(e)=>qt(e)&&typeof e.at==="number"&&typeof e.intervalMs==="number"&&qt(e.omlx)&&qt(e.omlx.summary)&&Array.isArray(e.omlx.active_models)&&Array.isArray(e.history)&&Array.isArray(e.warnings),Kn=(e)=>{if(!(e instanceof c))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},je=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Wn=(e,n,s,_)=>{let d=!1,T=un,h=async()=>{if(d)return;d=!0;try{if(!je(n))return;let N=await e.serviceRequest({method:"GET",path:"/snapshot"}),B;try{B=JSON.parse(N.body)}catch{B=null}if(N.status===200&&Bn(B))s(B),T=B.omlx.summary.total_active_requests>0?100:un;else _(N.status===200?"bad-answer":"service-failed")}catch(N){_(Kn(N))}finally{d=!1,setTimeout(()=>{h()},T)}};h();let U=je(n),X=()=>{let N=je(n);if(N&&!U)h();U=N};document.addEventListener("visibilitychange",X);let H=new ResizeObserver(X);return H.observe(document.documentElement),H.observe(n),{refresh:()=>{h()}}};var eo=C(()=>{Ht();Zt={"needs-approval":"Allow the local service for oMLX monitor in Settings \u2192 Extensions.",paused:"oMLX monitor is paused in Settings \u2192 Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the oMLX monitoring service.","bad-answer":"The monitoring service answered with something unexpected."}});Ht();var vn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ln=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],an=(e,n)=>{n.style.colorScheme=e.mode;for(let[s,_]of vn)n.style.setProperty(s,e.tokens[_]);for(let[s,_,d]of Ln){let T=e.tokens[d]??"";n.style.setProperty(s,T),n.style.setProperty(_,T)}n.style.setProperty("font-family",e.tokens.font),n.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),n.style.setProperty("line-height","1.45"),n.style.setProperty("color",e.tokens.foreground)},Vt=(e,n)=>{if(an(e.theme,n),n.dataset)n.dataset.ocSurface=e.surface,n.dataset.ocTheme=e.theme.mode};ge();var Pn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},m=(e,n)=>`var(--${e}, var(--oc-${Pn[e]}, ${n}))`,j=m("surface-background","transparent"),$e=m("surface-elevated","transparent"),se=m("surface-elevated-foreground","inherit"),G=m("surface-foreground","inherit"),x=m("surface-muted-foreground","gray"),wn=m("surface-muted","transparent"),J=m("interactive-border","currentColor"),v=m("interactive-hover","transparent"),Y=m("interactive-active","transparent"),$t=m("interactive-selection","transparent"),Ft=m("interactive-selection-foreground","inherit"),W=m("primary","currentColor"),Bt=m("primary-text","inherit"),Kt=m("error-text","inherit"),Gn=m("font-sans","inherit"),Wt=m("font-mono","monospace"),_n=m("radius","9px"),jt=`calc(${_n} - 2px)`,cn=`calc(${_n} - 4px)`,g=(e,n,s="transparent")=>`color-mix(in srgb, ${e} ${n}%, ${s})`,ln=`background-image: linear-gradient(${v}, ${v});`,zt=(e,n="0.5px")=>`box-shadow: inset 0 0 0 ${n} ${e}, var(--oc-sdk-field-lift);`,Jt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",dn="box-shadow: var(--oc-sdk-lit);",Yt=`inset 0 0.5px 0 0 ${g(G,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Dn=`
:root {
  --oc-sdk-edge: ${g(G,16)};
  --oc-sdk-field-bg: ${$e};
  --oc-sdk-raised-bg: ${j};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${g(G,14)};
  --oc-sdk-field-bg: ${g(j,50,$e)};
  --oc-sdk-raised-bg: ${$e};
  --oc-sdk-field-lift: ${Yt};
  --oc-sdk-raised-lift: ${Yt};
  --oc-sdk-lit: ${Yt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ve=(e)=>{let n=m(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${n}; --oc-sdk-tone-text: ${m(`${e}-text`,"inherit")}; }`},r=(e)=>`calc(${e}rem / 14)`,Xn=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${r(8)}; height: ${r(32)}; padding: 0 ${r(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${r(6)}; height: ${r(28)}; padding: 0 ${r(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${r(4)}; height: ${r(24)}; padding: 0 ${r(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${r(14)}; height: ${r(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${r(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${r(32)}; padding: 0 ${r(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${r(8)} ${r(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${r(34)}; padding-right: ${r(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${r(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${r(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${r(24)}; height: ${r(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${r(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${r(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${r(28)}; padding: 0 ${r(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${r(2)}; min-width: ${r(160)}; max-width: calc(100vw - ${r(16)}); max-height: min(${r(320)}, calc(100vh - ${r(16)})); overflow: auto; padding: ${r(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${r(2)} ${r(2)} ${r(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${r(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${r(8)}; width: 100%; padding: ${r(6)} ${r(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${r(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${r(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${r(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${r(14)}; height: ${r(14)}; margin-top: ${r(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${r(36)}; height: ${r(20)}; --oc-sdk-thumb-travel: ${r(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${r(2)}; left: ${r(2)}; width: ${r(16)}; height: ${r(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${r(2)}; padding: ${r(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${r(6)}; height: ${r(28)}; padding: 0 ${r(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${r(1)} ${r(6)}; font-size: ${r(11)}; font-weight: 500; line-height: ${r(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${r(8)}; width: 100%; padding: ${r(6)} ${r(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${r(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${r(16)} ${r(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${r(4)}; padding: ${r(40)} ${r(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${r(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${r(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${r(16)}; height: ${r(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${r(12)}; height: ${r(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${r(12)}; padding: ${r(8)} ${r(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${r(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${r(8)}; width: 100%; margin: ${r(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${r(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${r(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${r(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${r(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${r(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${r(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${r(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${r(36)}; height: ${r(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${r(44)}; }
  .oc-sdk-check { min-height: ${r(36)}; padding: ${r(8)} 0; }
}
`,pn=`${Dn}
.oc-sdk { color: ${G}; font-family: ${Gn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ln} }
.oc-sdk-mono { font-family: ${Wt}; }
.oc-sdk-muted { color: ${x}; }
${Ve("success")}${Ve("warning")}${Ve("error")}${Ve("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${W}; --oc-sdk-tone-text: ${Bt}; }

.oc-sdk-btn { border-radius: ${jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${cn}; }
.oc-sdk-btn[data-variant="default"] { color: ${Bt}; background: ${g(W,10,j)}; border-color: ${g(W,12)}; ${dn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${g(W,16,j)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${g(W,22,j)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${wn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${se}; ${Jt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Y}, ${Y}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${v}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Y}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${m("status-error","red")}; color: ${Kt}; background: ${g("var(--oc-sdk-tone)",7,j)}; border-color: ${g("var(--oc-sdk-tone)",12)}; ${dn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${g("var(--oc-sdk-tone)",9,j)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${g("var(--oc-sdk-tone)",11,j)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Kt}; }
.oc-sdk-input { border-radius: ${jt}; background: var(--oc-sdk-field-bg); color: ${se}; ${zt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${zt(g(G,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${zt(m("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Wt}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${W}; }
.oc-sdk-search-clear { border-radius: ${cn}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${v}; color: ${G}; }

.oc-sdk-trigger { border-radius: ${jt}; background: var(--oc-sdk-raised-bg); color: ${se}; ${Jt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${se}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${$e}; background-clip: padding-box; color: ${se}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${v}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${$t}; color: ${Ft}; }
.oc-sdk-option-check { color: ${G}; }
.oc-sdk-option[data-destructive="true"] { color: ${Kt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${g(m("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${J}; border-radius: 4px; color: ${G}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${g(G,60,J)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${J}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${j}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${W}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ln} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${g(G,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${G}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ft}; background: ${$t}; border-color: ${J}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${se}; background: var(--oc-sdk-raised-bg); ${Jt} }
.oc-sdk-tab-count { color: ${x}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${g(G,6)}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${g("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${v}; }
.oc-sdk-row[aria-selected="true"] { background: ${$t}; color: ${Ft}; }
.oc-sdk-row-lead { font-family: ${Wt}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${J}; border-top-color: ${W}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${g("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${g(J,40)}; }

.oc-sdk-progress-label { color: ${x}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${g(G,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${W}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${m("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${m("success-text","inherit")}; }

.oc-sdk-text a { color: ${Bt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${g(J,60)}; }
`,M=`
${ot}
${Xn}
${pn}`;ge();eo();var Sn=Xt(),ae=document.getElementById("root");if(!ae)throw Error("Missing #root");var ze=null,Je=null,jn=null;function zn(e){jn=e;let n=e.omlx.active_models;ze=null,Je=null;for(let s of n){if(!ze&&s.prefilling.length>0){let _=s.prefilling[0];ze={model:s.id,tokens:`${_.processed??0} tokens`,tps:`${_.speed??0} tps`}}if(!Je&&s.generating.length>0){let _=s.generating[0];Je={model:s.id,tokens:`${_.generated_tokens??0} tokens`,tps:`${_.tokens_per_second??0} tps`}}}}function Tn(e,n){let s=document.createElement("div");s.className="column";let _=document.createElement("div");_.className="column-title",_.innerText=e,s.append(_);let d=document.createElement("div");d.className="column-model",d.innerText=n.model,s.append(d);let T=document.createElement("div");T.className="column-body",T.innerText=n.tokens,s.append(T);let h=document.createElement("div");return h.className="column-meta",h.innerText=`@ ${n.tps}`,s.append(h),s}function Jn(e){ae.innerHTML="";let n=document.createElement("div");n.className="row";let s=document.createElement("span");if(s.className="badge",e.omlx.authenticated)s.className+=" success";else s.className+=" muted";s.innerText=e.omlx.authenticated?"live":"offline",n.append(s);let _=Tn("Prefill",ze||{model:"oMLX",tokens:"Idle",tps:"Idle"}),d=Tn("Generate",Je||{model:"oMLX",tokens:"Idle",tps:"Idle"});n.append(_,d),ae.append(n)}function Yn(e){ae.innerHTML="";let n=document.createElement("div");n.style.color="var(--oc-error)",n.innerText=Zt[e]??"oMLX Monitor offline",ae.append(n)}var fn=document.createElement("style");fn.textContent=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .row { display: flex; align-items: center; gap: 12px; }
  .badge { font-size: 10px; padding: 0 4px; border-radius: 4px; line-height: 14px; }
  .badge.success { background: color-mix(in srgb, var(--oc-success) 16%, transparent); color: var(--oc-success); }
  .badge.muted { background: color-mix(in srgb, var(--oc-fg) 8%, transparent); color: var(--oc-muted); }
  .column { display: flex; flex-direction: column; gap: 2px; }
  .column-title { font-size: 10px; color: var(--oc-muted); text-transform: uppercase; letter-spacing: 0.05em; }
  .column-model { font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .column-body { font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .column-meta { font-size: 10px; color: var(--oc-muted); }
`;document.head.append(fn);Sn.onReady(async(e)=>{Vt(e,document.documentElement);let{startPolling:n}=await Promise.resolve().then(() => (eo(),En));n(Sn,ae,(_)=>{zn(_),Jn(_)},Yn).refresh()});

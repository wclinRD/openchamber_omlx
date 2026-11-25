// @bun
var Rr=Object.defineProperty;var mr=(e)=>e;function hr(e,r){this[e]=mr.bind(null,r)}var Ir=(e,r)=>{for(var s in r)Rr(e,s,{get:r[s],enumerable:!0,configurable:!0,set:hr.bind(r,s)})};var b=(e,r)=>()=>(e&&(r=e(e=0)),r);var E="openchamber.sdk",S=1;var Ae=()=>{};function To(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(l)=>{let d=l.target===e?r:l.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-oc-scrolling"))d.setAttribute("data-oc-scrolling","");let T=s.get(d);if(T!==void 0)clearTimeout(T);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var rt=`
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
`,xr;var Ue=b(()=>{xr=`(${To.toString()})(document);`});var st=128,it=65536;var ke=128,Me=65536;var at=()=>{};var ct=8000,lt=192000,dt=120000,fo=(e)=>{let r=[],s=0,l=0;return{push:(d)=>{r.push(d),l+=d.length;while(l-s>e&&r.length>1){let T=r.shift();l-=T?.length??0,s=0}},pull:(d)=>{let T=0;while(T<d.length&&r.length>0){let C=r[0],U=Math.min(d.length-T,C.length-s);if(d.set(C.subarray(s,s+U),T),T+=U,s+=U,s>=C.length)r.shift(),l-=C.length,s=0}d.fill(0,T)},clear:()=>{r.length=0,s=0,l=0},get size(){return l-s}}};var _t=()=>{};var mo,Ao=(e)=>Object(e)===e&&!Array.isArray(e),ut=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),Oo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ro=(e)=>String(e)===e&&e.length>=1&&e.length<=80,ho=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!Ao(s)||!mo.test(s.id)||!Oo(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!ut(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!ut(s,["kind","id","label","value","options","disabled"]))return!1;if(!Ro(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let l=new Set;for(let d of s.options){if(!Ao(d)||!ut(d,["value","label"])||!Ro(d.value)||!Oo(d.label)||l.has(d.value))return!1;l.add(d.value)}if(!l.has(s.value))return!1}return!0};var pt=b(()=>{mo=/^[a-z][a-z0-9-]{0,39}$/});var Et=()=>{};var Io=()=>{};var xo,_n;var go=b(()=>{Et();xo=["{id}","{segment}","{segments+}"],_n=new Set(xo)});var bo,pn;var Co=b(()=>{bo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"],pn=new Set(bo)});var Uo=()=>{};var ko=()=>{};var Ne=20000000,ye=256,St=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Mo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var Tt=()=>{};var No,yo,vo=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let l=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of l)if(!vo(d,r+1,s))return!1;return!0},ft=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(ft);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(ft)}return String(e)===e||Number.isFinite(e)},At=(e)=>{try{if(String(e.id)!==e.id||!No.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!yo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!vo(e.data)||!ft(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Ot=b(()=>{No=/^[A-Za-z0-9_-]{1,80}$/,yo=["left","right","top","bottom"]});var Lo,Po=(e)=>Lo.test(e),Rt=255,wo=(e,r,s)=>({openCommit:(l)=>Po(l)?e({channel:E,v:S,type:"open-commit",id:r(),payload:{sha:l}}):s("Commit id must be 7 to 64 hex characters."),openWalkthrough:({base:l})=>{let d=l.trim();if(!d||d.length>Rt)return s(`Base must contain 1 to ${Rt} characters.`);return e({channel:E,v:S,type:"open-walkthrough",id:r(),payload:{base:d}})}});var mt=b(()=>{Ae();Lo=/^[0-9a-f]{7,64}$/i});var It=2000,Do,xt=(e)=>Boolean(e&&"sessionId"in e),gt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),ve=500,Le=32000,Xo=16000,Ho=128,Vo=200,$o=2000,Fo=16000,Bo=80,Ko=200,Wo=16000,jo=2000,bt=20000,Pe=1024,we=2000000,Ge=64000,De=8000,Ct=4000,Ut=960000,zo=999,Jo=1e4,Oe=500,Yo,Qo,br,qo=(e)=>br.has(e),Zo=(e)=>e&&qo(e)?e:"HOST_REJECTED",ie=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ie);if(Object(e)===e)return Object.values(e).every(ie);return!1},er=(e)=>ie(e)&&JSON.stringify(e).length<=Wo,Go=(e)=>e?.trim().slice(0,Ko)??"",ae=(e)=>{let r=e.id.trim().slice(0,Ho),s=e.title.trim().slice(0,Vo),l=e.url.trim().slice(0,$o),d=e.text?.trim().slice(0,Fo),T=e.author?.trim().slice(0,Bo),C=e.kind==="pull"?"pull":"issue",U={providerId:e.providerId.trim(),id:r,title:s||r,url:l,kind:C};if(d)U.text=d;if(T)U.author=T;if(C==="pull"){let X=Go(e.branches?.head),H=Go(e.branches?.base);if(X&&H)U.branches={head:X,base:H}}if(er(e.data))U.data=e.data;return U},kt=(e)=>{let r=ae(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},Mt=(e)=>{let r={text:e.text.trim().slice(0,Xo)};if(e.send)r.send=!0;return r},Nt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(zo,Math.max(0,Math.round(e)))},yt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Jo,Math.max(0,Math.ceil(e)))},ce=(e)=>e.length>0&&e.length<=Pe&&!e.includes("\x00")&&!e.includes("\\"),Xe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>jo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Cr,vt=(e)=>Boolean(e&&"status"in e&&Cr.has(String(e.status))&&!("body"in e)),He=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Lt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Pt=(e)=>Boolean(e&&"written"in e&&e.written===!0),wt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Ur,Gt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Ur.has(String(e.kind))&&Number.isFinite(e.size)),Dt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),kr,Mr=(e)=>Object(e)===e?e:null,ht=(e)=>String(e)===e&&e.length>0,Nr=(e)=>{if(!ht(e.id))return null;if(e.ok===!0){let r={channel:E,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&ht(e.error))return{channel:E,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:Zo(ht(e.code)?e.code:void 0)};return null},Xt=(e)=>{let r=Mr(e);if(!r||r.channel!==E||r.v!==S)return null;if(r.type==="result")return Nr(r);if(!kr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Ve=b(()=>{Ae();Do=["file","directory","other","missing"],Yo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Qo=["stopped","starting","ready","failed"],br=new Set(Yo),Cr=new Set(Qo),Ur=new Set(Do),kr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"])});var tr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),yr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",c,or=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),$e=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${Pe} characters without NUL or backslash.`)),Fe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`oc-${e.value}`),Ht=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),l=e.requestTimeoutMs??bt,d=new Set,T=new Set,C=new Set,U=new Set,X=new Set,H=new Set,N=new Set,B=new Set,_e=new Set,me=new Set,he=new Set,te=new Set,Qe=[],ue=null,pe=null,Ie=new Set,xe=new Set,Ee=null,Se=null,qe=!1,oe=new Map,re=new Map,ne=new Map,V=!1,u={value:0},_=null,K=null,Te=!1,fe=!1,ro=null,w=null,no=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},y=(t)=>{r.parent.postMessage(t,"*")},so=()=>{if(V||r.parent===r||te.size===0||_?.features?.lateGenerateResults!==!0)return;y({channel:E,v:S,type:"generate-late-listen"})},O=(t,o)=>{for(let a of t)try{a(o)}catch(i){console.error(i)}},io=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=Xt(t.data);if(!o)return;if(o.type==="workspace"){let i=re.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="shells"){let i=ne.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="microphone-audio"){w?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let i=w;if(!i)return;w=null,i.release(),O(i.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(_=o.payload,K=no(o.payload.session),O(d,o.payload),O(T,o.payload.directory),O(C,o.payload.session),K)O(U,K);if(O(X,o.payload.connection),O(H,o.payload.settings),O(N,o.payload.item),o.payload.block)O(B,o.payload.block);so();return}if(o.type==="service-event"){O(_e,o.payload);return}if(o.type==="generate-late"){if(te.size===0)Qe.push(o.payload);else O(te,o.payload);return}if(o.type==="directory"){if(_)_={..._,directory:o.payload.directory};O(T,o.payload.directory);return}if(o.type==="session"){if(_)_={..._,session:o.payload.session};if(!o.payload.session)K=null;else if(K?.sessionId!==o.payload.session.id)K=no(o.payload.session);O(C,o.payload.session);return}if(o.type==="session-lifecycle"){K=o.payload,O(U,o.payload);return}if(o.type==="connection"){if(_)_={..._,connection:o.payload.connection};O(X,o.payload.connection);return}if(o.type==="settings"){if(_)_={..._,settings:o.payload.settings};O(H,o.payload.settings);return}if(o.type==="item"){if(_)_={..._,item:o.payload.item};O(N,o.payload.item);return}if(o.type==="status-control-event"){O(me,o.payload);return}if(o.type==="popover-closed"){O(he,o.payload);return}if(o.type==="action"){let i=(A)=>{if(!V)y({channel:E,v:S,type:"action-result",id:o.id,payload:A})},f=pe;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(o.payload)).then(()=>i({ok:!0}),(A)=>{let R=(A instanceof Error?A.message:String(A)).trim();i({ok:!1,error:(R||"Action failed.").slice(0,Oe)})});return}if(o.type==="file-open"){let i=o.payload;if(Se&&Mo(Se,i))return;Se=i,O(Ie,o.payload);return}if(o.type==="file-saved"){O(xe,o.payload.version);return}if(o.type==="file-snapshot"){let i=(R)=>{if(!V)y({channel:E,v:S,type:"file-snapshot-result",id:o.id,payload:R})},f=(R)=>i({error:(R.trim()||"Could not read the edited file.").slice(0,Oe)}),A=Ee;if(!A){f("This extension does not edit files.");return}Promise.resolve().then(()=>A(o.payload.purpose)).then((R)=>{if(St(R)>Ne){f(`The file is over ${Ne} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>ye){f(`The snapshot version is over ${ye} characters.`);return}i({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>f(R instanceof Error?R.message:String(R)));return}if(o.type==="resolve"){let i=(A)=>{y({channel:E,v:S,type:"resolve-result",id:o.id,payload:A})},f=ue;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(o.payload)).then((A)=>i({item:A?ae(A):null}),(A)=>{let R=(A instanceof Error?A.message:String(A)).trim();i({error:(R||"Command failed.").slice(0,Oe)})});return}let a=oe.get(o.id);if(!a)return;if(clearTimeout(a.timer),oe.delete(o.id),o.ok){a.resolve(o.payload);return}a.reject(new c(o.code,o.error))};r.addEventListener("message",io),y({channel:E,v:S,type:"hello"});let k=(t,o=l)=>{if(V||r.parent===r)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,i)=>{let f=setTimeout(()=>{oe.delete(t.id),i(new c("HOST_TIMEOUT","Host did not answer in time."))},o);oe.set(t.id,{resolve:a,reject:i,timer:f}),y(t)})},g=(t)=>k(t).then(()=>{return}),h={channel:E,v:S},Ze=(t)=>{if(!V&&r.parent!==r)y(t)},ao=()=>Ze({...h,type:"file-save"}),et=()=>{if(!V&&r.parent!==r)y({...h,type:"microphone-close",id:p(u)})},Ar=async()=>{if(w)throw new c("HOST_REJECTED","The microphone is already open in this frame.");if(_?.features?.microphone!==!0)throw new c("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new c("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<ct||o.sampleRate>lt)throw o.close().catch(()=>{return}),new c("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let a=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,i=fo(Math.round(o.sampleRate/4)),f=o.createScriptProcessor(1024,1,1);f.onaudioprocess=(D)=>i.pull(D.outputBuffer.getChannelData(0));let A=o.createMediaStreamDestination();f.connect(A);let R=new Set,se={queue:i,endedListeners:R,release:()=>{f.onaudioprocess=null,f.disconnect(),i.clear();for(let D of A.stream.getTracks())D.stop();o.close().catch(()=>{return})}};w=se;try{let D=await k({...h,type:"microphone-open",id:p(u),payload:{sampleRate:o.sampleRate}},dt);if(!D||!("opened"in D)||D.opened!==!0)throw new c("HOST_REJECTED","Host did not open the microphone.");if(await a,w!==se)throw new c("DISCONNECTED","The microphone closed while it was opening.")}catch(D){if(w===se)w=null;throw se.release(),et(),D}return{stream:A.stream,close:()=>{if(w!==se)return;w=null,se.release(),et()},onEnded:(D)=>(R.add(D),()=>{R.delete(D)})}},co=(t)=>{if(!tr(t)||!yr(t))return;t.preventDefault(),ao()},lo=(t)=>{if(!tr(t)||t.key!=="Escape"||_?.surface!=="popover"||!_.popover)return;t.preventDefault(),Eo(_.popover.id,"escape").catch(()=>{return})},ge=()=>{let t=_?.surface==="popover"?_.popover:void 0;if(!t)return;let o=Te||fe;if(ro===o)return;ro=o,So(t.id,o).catch(()=>{return})},be=()=>{if(_?.surface!=="popover"||Te)return;Te=!0,ge()},_o=(t)=>{if(_?.surface!=="popover"||t.relatedTarget!==null||!Te)return;Te=!1,ge()},uo=()=>{if(_?.surface!=="popover"||fe)return;fe=!0,ge()},po=()=>{if(_?.surface!=="popover"||!fe)return;fe=!1,ge()},F=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new c("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},tt=async(t)=>{if(t.kind!=="projects")F(t.projectId);let o=await k({...h,type:"workspace-read",id:p(u),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return o},ot=async(t,o)=>{if(t.kind!=="projects")F(t.projectId);let a=p(u);re.set(a,o);try{await g({...h,type:"workspace-subscribe",id:p(u),payload:{subscriptionId:a,query:t}})}catch(i){if(re.delete(a),!V)y({...h,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:a}});throw i}return()=>{if(!re.delete(a)||V)return;y({...h,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:a}})}},Or=async(t,o)=>{if(t.kind==="session")F(t.sessionId);if(t.kind==="project")F(t.projectId);let a=p(u);ne.set(a,o);try{await g({...h,type:"shells-subscribe",id:p(u),payload:{subscriptionId:a,scope:t}})}catch(i){if(ne.delete(a),!V)y({...h,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:a}});throw i}return()=>{if(!ne.delete(a)||V)return;y({...h,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:a}})}},Ce=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>st))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ie(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>it)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&_?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let o=await k({...h,type:"storage",id:p(u),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return o},Eo=(t,o)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):g({...h,type:"popover-close",id:p(u),payload:o?{id:t,reason:o}:{id:t}}),So=(t,o)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):g({...h,type:"popover-anchor",id:p(u),payload:{id:t,active:o}});return r.addEventListener("keydown",lo,!0),r.addEventListener("pointerover",be),r.addEventListener("pointermove",be),r.addEventListener("pointerout",_o),r.addEventListener("focus",uo),r.addEventListener("blur",po),{onAction:(t)=>(pe=t,()=>{if(pe===t)pe=null}),listProjects:async()=>{let t=await tt({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await tt({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await tt({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>ot({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>ot({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")o(a)}),onSessions:(t,o)=>ot({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")o(a)}),onRunningShells:(t,o)=>Or(t,o),readShellOutput:async(t,o)=>{F(t,ke);let a=o?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Me))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Me}.`);let A=await k({...h,type:"shell-output",id:p(u),payload:{shellId:t,cursor:a,tailBytes:i}});if(!A||typeof A.output!=="string"||!Number.isFinite(A.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async(t)=>{if(F(t,ke),(await k({...h,type:"shell-stop",id:p(u),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{F(t),await g({...h,type:"open-session",id:p(u),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let a=Fe(o),i={op:"get",key:t};if(a)i.scope=a;let f=await Ce(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,o,a)=>{let i=Fe(a),f={op:"set",key:t,value:o};if(i)f.scope=i;await Ce(f)},delete:async(t,o)=>{let a=Fe(o),i={op:"delete",key:t};if(a)i.scope=a;await Ce(i)},keys:async(t)=>{let o=Fe(t),a={op:"keys"};if(o)a.scope=o;let i=await Ce(a);if(i.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),_)t(_);return()=>{d.delete(t)}},onDirectory:(t)=>{if(T.add(t),_)t(_.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(C.add(t),_)t(_.session);return()=>{C.delete(t)}},onSessionLifecycle:(t)=>{if(U.add(t),K)t(K);return()=>{U.delete(t)}},onConnection:(t)=>{if(X.add(t),_)t(_.connection);return()=>{X.delete(t)}},onSettings:(t)=>{if(H.add(t),_)t(_.settings);return()=>{H.delete(t)}},onItem:(t)=>{if(N.add(t),_)t(_.item);return()=>{N.delete(t)}},onBlock:(t)=>{if(B.add(t),_?.block)t(_.block);return()=>{B.delete(t)}},onServiceEvent:(t)=>(_e.add(t),()=>{_e.delete(t)}),onStatusControl:(t)=>(me.add(t),()=>{me.delete(t)}),onPopoverClosed:(t)=>(he.add(t),()=>{he.delete(t)}),setStatusControls:(t)=>{if(_?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!ho(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return g({...h,type:"status-controls",id:p(u),payload:{controls:t}})},openPopover:(t)=>{if(_?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!At(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return g({...h,type:"popover-open",id:p(u),payload:t})},closePopover:Eo,setPopoverAnchorActive:So,onResolve:(t)=>(ue=t,()=>{if(ue===t)ue=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ve)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${ve} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Le))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Le} characters.`));return g({channel:E,v:S,type:"toast",id:p(u),payload:{...t,message:o}})},openUrl:(t)=>g({channel:E,v:S,type:"open-url",id:p(u),payload:{url:t}}),...wo(g,()=>p(u),(t)=>Promise.reject(new c("HOST_REJECTED",t))),answerBlock:(t)=>g({channel:E,v:S,type:"block-answer",id:p(u),payload:{text:t.trim().slice(0,It)}}),openSurface:(t)=>g({channel:E,v:S,type:"open-surface",id:p(u),payload:{surfaceId:t}}),writeClipboard:(t)=>g({channel:E,v:S,type:"clipboard-write",id:p(u),payload:{text:t}}),compose:(t)=>g({channel:E,v:S,type:"compose",id:p(u),payload:t}),attach:(t)=>g({channel:E,v:S,type:"attach",id:p(u),payload:ae(t)}),startSession:async(t)=>{if(t.projectId!==void 0)F(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")F(o.directory);else{if(o.name!==void 0)F(o.name,200);if(o.baseBranch!==void 0)F(o.baseBranch,200)}let a=await k({channel:E,v:S,type:"start-session",id:p(u),payload:kt(t)},e.requestTimeoutMs??180000);if(!xt(a))throw new c("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>k({channel:E,v:S,type:"prompt",id:p(u),payload:Mt(t)}).then((o)=>{if(!gt(o))throw new c("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>g({channel:E,v:S,type:"session-link",id:p(u),payload:ae(t)}),close:()=>g({channel:E,v:S,type:"close",id:p(u)}),oauthStart:()=>g({channel:E,v:S,type:"oauth-start",id:p(u)}),oauthDisconnect:()=>g({channel:E,v:S,type:"oauth-disconnect",id:p(u)}),request:(t)=>(Xe(t.path)?k({channel:E,v:S,type:"request",id:p(u),payload:t}):or()).then((o)=>{if(!He(o))throw new c("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Xe(t.path)?k({channel:E,v:S,type:"service-request",id:p(u),payload:t}):or()).then((o)=>{if(!He(o))throw new c("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>k({channel:E,v:S,type:"service-status",id:p(u)}).then((t)=>{if(!vt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ce(t)?k({channel:E,v:S,type:"file-read",id:p(u),payload:{path:t}}):$e()).then((o)=>{if(!Lt(o))throw new c("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ce(t))return $e();if(o.length>we)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${we} characters.`));return k({channel:E,v:S,type:"file-write",id:p(u),payload:{path:t,content:o}}).then((a)=>{if(!Pt(a))throw new c("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(ce(t)?k({channel:E,v:S,type:"file-list",id:p(u),payload:{path:t}}):$e()).then((o)=>{if(!wt(o))throw new c("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ce(t)?k({channel:E,v:S,type:"file-stat",id:p(u),payload:{path:t}}):$e()).then((o)=>{if(!Gt(o))throw new c("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),a=t.system?.trim();if(o.length===0||o.length>Ge)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${Ge} characters.`));if(a!==void 0&&(a.length===0||a.length>De))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${De} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(Ct,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:o};if(a!==void 0)f.system=a;if(i!==void 0)f.maxOutputTokens=i;return k({channel:E,v:S,type:"generate",id:p(u),payload:f},e.requestTimeoutMs??Ut).then((A)=>{if(!Dt(A))throw new c("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:(t)=>{te.add(t);for(let o of Qe.splice(0))O([t],o);return so(),()=>{te.delete(t)}},openMicrophone:Ar,setBadge:(t)=>g({channel:E,v:S,type:"badge",id:p(u),payload:{count:Nt(t)}}),setHeight:(t)=>g({channel:E,v:S,type:"resize",id:p(u),payload:{height:yt(t)}}),onFileOpen:(t)=>{if(Ie.add(t),!qe)qe=!0,r.addEventListener("keydown",co,!0);if(Se)t(Se);return()=>{Ie.delete(t)}},onFileSnapshot:(t)=>(Ee=t,()=>{if(Ee===t)Ee=null}),onFileSaved:(t)=>(xe.add(t),()=>{xe.delete(t)}),reportFileChange:(t)=>Ze({...h,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:ao,reportFileUnsupported:()=>Ze({...h,type:"file-unsupported"}),dispose:()=>{for(let t of re.keys())y({...h,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:t}});re.clear();for(let t of ne.keys())y({...h,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:t}});if(ne.clear(),w)et(),w.release(),w=null;if(V=!0,ue=null,pe=null,Ee=null,Ie.clear(),xe.clear(),qe)r.removeEventListener("keydown",co,!0);r.removeEventListener("message",io),r.removeEventListener("keydown",lo,!0),r.removeEventListener("pointerover",be),r.removeEventListener("pointermove",be),r.removeEventListener("pointerout",_o),r.removeEventListener("focus",uo),r.removeEventListener("blur",po);for(let t of oe.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));oe.clear(),d.clear(),T.clear(),C.clear(),U.clear(),X.clear(),H.clear(),N.clear(),B.clear(),_e.clear(),me.clear(),he.clear(),te.clear(),Qe.length=0}}};var rr=b(()=>{Ae();pt();Ot();mt();Tt();Ve();_t();at();c=class c extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}});var nr,vn;var sr=b(()=>{nr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"],vn=new Set(nr)});var ir,Pn;var ar=b(()=>{ir=["none","agent","user"],Pn=new Set(ir)});var Vt=b(()=>{Ae();Ue();at();_t();pt();Et();Io();go();Co();Uo();ko();Tt();rr();Ot();mt();Ve();Ve();sr();ar()});var Sr={};Ir(Sr,{FAILURE_TEXT:()=>eo,isOnScreen:()=>Ye,startPolling:()=>Wr});var Er=2000,eo,Zt=(e)=>typeof e==="object"&&e!==null,Br=(e)=>Zt(e)&&typeof e.at==="number"&&typeof e.intervalMs==="number"&&Zt(e.omlx)&&Zt(e.omlx.summary)&&Array.isArray(e.omlx.active_models)&&Array.isArray(e.history)&&Array.isArray(e.warnings),Kr=(e)=>{if(!(e instanceof c))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Ye=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Wr=(e,r,s,l)=>{let d=!1,T=Er,C=async()=>{if(d)return;d=!0;try{if(!Ye(r))return;let N=await e.serviceRequest({method:"GET",path:"/snapshot"}),B;try{B=JSON.parse(N.body)}catch{B=null}if(N.status===200&&Br(B))s(B),T=B.omlx.summary.total_active_requests>0?100:Er;else l(N.status===200?"bad-answer":"service-failed")}catch(N){l(Kr(N))}finally{d=!1,setTimeout(()=>{C()},T)}};C();let U=Ye(r),X=()=>{let N=Ye(r);if(N&&!U)C();U=N};document.addEventListener("visibilitychange",X);let H=new ResizeObserver(X);return H.observe(document.documentElement),H.observe(r),{refresh:()=>{C()}}};var to=b(()=>{Vt();eo={"needs-approval":"Allow the local service for oMLX monitor in Settings \u2192 Extensions.",paused:"oMLX monitor is paused in Settings \u2192 Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the oMLX monitoring service.","bad-answer":"The monitoring service answered with something unexpected."}});Vt();var vr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Lr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],cr=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,l]of vr)r.style.setProperty(s,e.tokens[l]);for(let[s,l,d]of Lr){let T=e.tokens[d]??"";r.style.setProperty(s,T),r.style.setProperty(l,T)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},$t=(e,r)=>{if(cr(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};Ue();var Pr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},m=(e,r)=>`var(--${e}, var(--oc-${Pr[e]}, ${r}))`,j=m("surface-background","transparent"),Ke=m("surface-elevated","transparent"),le=m("surface-elevated-foreground","inherit"),G=m("surface-foreground","inherit"),I=m("surface-muted-foreground","gray"),wr=m("surface-muted","transparent"),Z=m("interactive-border","currentColor"),v=m("interactive-hover","transparent"),ee=m("interactive-active","transparent"),Ft=m("interactive-selection","transparent"),Bt=m("interactive-selection-foreground","inherit"),W=m("primary","currentColor"),Kt=m("primary-text","inherit"),Wt=m("error-text","inherit"),Gr=m("font-sans","inherit"),jt=m("font-mono","monospace"),ur=m("radius","9px"),zt=`calc(${ur} - 2px)`,lr=`calc(${ur} - 4px)`,x=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,dr=`background-image: linear-gradient(${v}, ${v});`,Jt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Yt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",_r="box-shadow: var(--oc-sdk-lit);",Qt=`inset 0 0.5px 0 0 ${x(G,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Dr=`
:root {
  --oc-sdk-edge: ${x(G,16)};
  --oc-sdk-field-bg: ${Ke};
  --oc-sdk-raised-bg: ${j};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${x(G,14)};
  --oc-sdk-field-bg: ${x(j,50,Ke)};
  --oc-sdk-raised-bg: ${Ke};
  --oc-sdk-field-lift: ${Qt};
  --oc-sdk-raised-lift: ${Qt};
  --oc-sdk-lit: ${Qt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Be=(e)=>{let r=m(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${m(`${e}-text`,"inherit")}; }`},n=(e)=>`calc(${e}rem / 14)`,Xr=`
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
`,pr=`${Dr}
.oc-sdk { color: ${G}; font-family: ${Gr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${dr} }
.oc-sdk-mono { font-family: ${jt}; }
.oc-sdk-muted { color: ${I}; }
${Be("success")}${Be("warning")}${Be("error")}${Be("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${W}; --oc-sdk-tone-text: ${Kt}; }

.oc-sdk-btn { border-radius: ${zt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${lr}; }
.oc-sdk-btn[data-variant="default"] { color: ${Kt}; background: ${x(W,10,j)}; border-color: ${x(W,12)}; ${_r} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${x(W,16,j)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${x(W,22,j)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${wr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${le}; ${Yt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ee}, ${ee}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${v}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ee}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${m("status-error","red")}; color: ${Wt}; background: ${x("var(--oc-sdk-tone)",7,j)}; border-color: ${x("var(--oc-sdk-tone)",12)}; ${_r} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${x("var(--oc-sdk-tone)",9,j)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${x("var(--oc-sdk-tone)",11,j)}; box-shadow: none; }

.oc-sdk-field-note { color: ${I}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Wt}; }
.oc-sdk-input { border-radius: ${zt}; background: var(--oc-sdk-field-bg); color: ${le}; ${Jt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${I}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Jt(x(G,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Jt(m("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${jt}; }

.oc-sdk-search-icon { color: ${I}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${W}; }
.oc-sdk-search-clear { border-radius: ${lr}; color: ${I}; }
.oc-sdk-search-clear:hover { background: ${v}; color: ${G}; }

.oc-sdk-trigger { border-radius: ${zt}; background: var(--oc-sdk-raised-bg); color: ${le}; ${Yt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ee}, ${ee}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${I}; }
.oc-sdk-trigger-chevron { color: ${I}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${le}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ke}; background-clip: padding-box; color: ${le}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${v}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ft}; color: ${Bt}; }
.oc-sdk-option-check { color: ${G}; }
.oc-sdk-option[data-destructive="true"] { color: ${Wt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${x(m("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${I}; }
.oc-sdk-popup-empty { color: ${I}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Z}; border-radius: 4px; color: ${G}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${x(G,60,Z)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Z}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${j}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${W}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${dr} }
.oc-sdk-check-desc { color: ${I}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${x(G,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${I}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${G}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Bt}; background: ${Ft}; border-color: ${Z}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${le}; background: var(--oc-sdk-raised-bg); ${Yt} }
.oc-sdk-tab-count { color: ${I}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${x(G,6)}; color: ${I}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${x("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${v}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ft}; color: ${Bt}; }
.oc-sdk-row-lead { font-family: ${jt}; color: ${I}; }
.oc-sdk-row-sub { color: ${I}; }
.oc-sdk-row-meta { color: ${I}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${I}; }

.oc-sdk-empty-body { color: ${I}; }

.oc-sdk-spinner { color: ${I}; }
.oc-sdk-spinner-ring { border-color: ${Z}; border-top-color: ${W}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${x("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${I}; }

.oc-sdk-separator { color: ${I}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${x(Z,40)}; }

.oc-sdk-progress-label { color: ${I}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${x(G,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${W}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${m("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${m("success-text","inherit")}; }

.oc-sdk-text a { color: ${Kt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${x(Z,60)}; }
`,M=`
${rt}
${Xr}
${pr}`;Ue();to();function Y(e,r,s,l){let d=document.createElement(e);if(r)d.className=r;if(s!==void 0&&s!==null)d.textContent=s;if(l)l.forEach((T)=>d.append(T));return d}var Tr=Ht(),Q=document.getElementById("root");if(!Q)throw Error("Missing #root");var J=null,q=null,oo=null;function jr(){if(J?.model)return J.model;if(q?.model)return q.model;if(!oo)return"Mirage";let e=oo.omlx.active_models??[];if(e.length>0)return e[0].id;return"Mirage"}function zr(e){oo=e;let r=e.omlx.active_models;J=null,q=null;for(let s of r){if(!J&&s.prefilling.length>0){let l=s.prefilling[0];if(!l)continue;let d=l.total!=null&&l.total>0?Math.round((l.processed??0)/l.total*100):null;J={model:s.id,tokens:`${l.processed??0} tokens`,tps:`${l.speed!=null?l.speed.toFixed(2):"0"} tps`,percent:d}}if(!q&&s.generating.length>0){let l=s.generating[0];if(!l)continue;q={model:s.id,tokens:`${l.generated_tokens??0} tokens`,tps:`${l.tokens_per_second!=null?l.tokens_per_second.toFixed(2):"0"} tps`,percent:null}}}}function Jr(){let e=document.createElement("div");e.className="meter";let r=document.createElement("span");r.className="meter-fill",e.append(r);let s=document.createElement("span");if(s.className="value num",!J)r.style.width="0%",s.textContent="Idle";else r.style.width=`${J.percent??0}%`,s.textContent=`${J.percent??"-"}% @ ${J.tps}`;return{meter:e,text:s}}function Yr(){return q?`${q.tokens} @ ${q.tps}`:"Idle"}function Qr(e){Q.innerHTML="";let r=document.createElement("div");r.className="line",r.append(Y("span","what","MODEL NAME"),Y("div","meter-empty"),Y("span","value",jr()),Y("span","value status",e.omlx.authenticated?"live":"offline"));let s=r.querySelector(".value.status");if(e.omlx.authenticated)s.style.color="var(--oc-success)";Q.append(r);let l=document.createElement("div");l.className="line";let d=Jr();l.append(Y("span","what","PREFILL"),d.meter,d.text),Q.append(l);let T=document.createElement("div");T.className="line",T.append(Y("span","what","GENERATE"),Y("div","meter-empty"),Y("span","value",Yr())),Q.append(T)}function qr(e){Q.innerHTML="";let r=document.createElement("div");r.style.color="var(--oc-error)",r.innerText=eo[e]??"oMLX Monitor offline",Q.append(r)}var fr=document.createElement("style");fr.textContent=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .line { display: grid; grid-template-columns: 100px minmax(0, 1fr) auto auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .line .value.num { font-variant-numeric: tabular-nums; }
  .meter { position: relative; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; transition: width .4s ease; }
  .meter-empty { height: 4px; }
  .meter-fill { background: var(--oc-success); }
`;document.head.append(fr);Tr.onReady(async(e)=>{$t(e,document.documentElement);let{startPolling:r}=await Promise.resolve().then(() => (to(),Sr));r(Tr,Q,(l)=>{zr(l),Qr(l)},qr).refresh()});

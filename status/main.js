// @bun
var Rr=Object.defineProperty;var hr=(e)=>e;function Ir(e,r){this[e]=hr.bind(null,r)}var xr=(e,r)=>{for(var s in r)Rr(e,s,{get:r[s],enumerable:!0,configurable:!0,set:Ir.bind(r,s)})};var U=(e,r)=>()=>(e&&(r=e(e=0)),r);var E="openchamber.sdk",S=1;var Oe=()=>{};function fo(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(l)=>{let d=l.target===e?r:l.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-oc-scrolling"))d.setAttribute("data-oc-scrolling","");let T=s.get(d);if(T!==void 0)clearTimeout(T);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var nt=`
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
`,gr;var Me=U(()=>{gr=`(${fo.toString()})(document);`});var it=128,at=65536;var ke=128,ye=65536;var ct=()=>{};var lt=8000,dt=192000,_t=120000,Ao=(e)=>{let r=[],s=0,l=0;return{push:(d)=>{r.push(d),l+=d.length;while(l-s>e&&r.length>1){let T=r.shift();l-=T?.length??0,s=0}},pull:(d)=>{let T=0;while(T<d.length&&r.length>0){let h=r[0],b=Math.min(d.length-T,h.length-s);if(d.set(h.subarray(s,s+b),T),T+=b,s+=b,s>=h.length)r.shift(),l-=h.length,s=0}d.fill(0,T)},clear:()=>{r.length=0,s=0,l=0},get size(){return l-s}}};var ut=()=>{};var ho,Oo=(e)=>Object(e)===e&&!Array.isArray(e),pt=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),mo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ro=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Io=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!Oo(s)||!ho.test(s.id)||!mo(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!pt(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!pt(s,["kind","id","label","value","options","disabled"]))return!1;if(!Ro(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let l=new Set;for(let d of s.options){if(!Oo(d)||!pt(d,["value","label"])||!Ro(d.value)||!mo(d.label)||l.has(d.value))return!1;l.add(d.value)}if(!l.has(s.value))return!1}return!0};var Et=U(()=>{ho=/^[a-z][a-z0-9-]{0,39}$/});var St=()=>{};var xo=()=>{};var go,un;var bo=U(()=>{St();go=["{id}","{segment}","{segments+}"],un=new Set(go)});var Co,En;var Uo=U(()=>{Co=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"],En=new Set(Co)});var Mo=()=>{};var ko=()=>{};var Ne=20000000,ve=256,Tt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,yo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var ft=()=>{};var No,vo,Lo=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let l=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of l)if(!Lo(d,r+1,s))return!1;return!0},At=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(At);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(At)}return String(e)===e||Number.isFinite(e)},Ot=(e)=>{try{if(String(e.id)!==e.id||!No.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!vo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Lo(e.data)||!At(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var mt=U(()=>{No=/^[A-Za-z0-9_-]{1,80}$/,vo=["left","right","top","bottom"]});var Po,wo=(e)=>Po.test(e),Rt=255,Go=(e,r,s)=>({openCommit:(l)=>wo(l)?e({channel:E,v:S,type:"open-commit",id:r(),payload:{sha:l}}):s("Commit id must be 7 to 64 hex characters."),openWalkthrough:({base:l})=>{let d=l.trim();if(!d||d.length>Rt)return s(`Base must contain 1 to ${Rt} characters.`);return e({channel:E,v:S,type:"open-walkthrough",id:r(),payload:{base:d}})}});var ht=U(()=>{Oe();Po=/^[0-9a-f]{7,64}$/i});var xt=2000,Xo,gt=(e)=>Boolean(e&&"sessionId"in e),bt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),Le=500,Pe=32000,Ho=16000,$o=128,Vo=200,Fo=2000,Bo=16000,Ko=80,Wo=200,jo=16000,zo=2000,Ct=20000,we=1024,Ge=2000000,De=64000,Xe=8000,Ut=4000,Mt=960000,Jo=999,Yo=1e4,me=500,Qo,qo,Cr,Zo=(e)=>Cr.has(e),er=(e)=>e&&Zo(e)?e:"HOST_REJECTED",ce=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ce);if(Object(e)===e)return Object.values(e).every(ce);return!1},tr=(e)=>ce(e)&&JSON.stringify(e).length<=jo,Do=(e)=>e?.trim().slice(0,Wo)??"",le=(e)=>{let r=e.id.trim().slice(0,$o),s=e.title.trim().slice(0,Vo),l=e.url.trim().slice(0,Fo),d=e.text?.trim().slice(0,Bo),T=e.author?.trim().slice(0,Ko),h=e.kind==="pull"?"pull":"issue",b={providerId:e.providerId.trim(),id:r,title:s||r,url:l,kind:h};if(d)b.text=d;if(T)b.author=T;if(h==="pull"){let y=Do(e.branches?.head),N=Do(e.branches?.base);if(y&&N)b.branches={head:y,base:N}}if(tr(e.data))b.data=e.data;return b},kt=(e)=>{let r=le(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},yt=(e)=>{let r={text:e.text.trim().slice(0,Ho)};if(e.send)r.send=!0;return r},Nt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Jo,Math.max(0,Math.round(e)))},vt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Yo,Math.max(0,Math.ceil(e)))},de=(e)=>e.length>0&&e.length<=we&&!e.includes("\x00")&&!e.includes("\\"),He=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>zo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Ur,Lt=(e)=>Boolean(e&&"status"in e&&Ur.has(String(e.status))&&!("body"in e)),$e=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Pt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),wt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Gt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Mr,Dt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Mr.has(String(e.kind))&&Number.isFinite(e.size)),Xt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),kr,yr=(e)=>Object(e)===e?e:null,It=(e)=>String(e)===e&&e.length>0,Nr=(e)=>{if(!It(e.id))return null;if(e.ok===!0){let r={channel:E,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&It(e.error))return{channel:E,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:er(It(e.code)?e.code:void 0)};return null},Ht=(e)=>{let r=yr(e);if(!r||r.channel!==E||r.v!==S)return null;if(r.type==="result")return Nr(r);if(!kr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Ve=U(()=>{Oe();Xo=["file","directory","other","missing"],Qo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],qo=["stopped","starting","ready","failed"],Cr=new Set(Qo),Ur=new Set(qo),Mr=new Set(Xo),kr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"])});var or=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),vr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",c,rr=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Fe=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${we} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`oc-${e.value}`),$t=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),l=e.requestTimeoutMs??Ct,d=new Set,T=new Set,h=new Set,b=new Set,y=new Set,N=new Set,M=new Set,H=new Set,Z=new Set,he=new Set,Ie=new Set,re=new Set,qe=[],pe=null,Ee=null,xe=new Set,ge=new Set,Se=null,Te=null,Ze=!1,ne=new Map,se=new Map,ie=new Map,F=!1,u={value:0},_=null,K=null,fe=!1,Ae=!1,no=null,D=null,so=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},L=(t)=>{r.parent.postMessage(t,"*")},io=()=>{if(F||r.parent===r||re.size===0||_?.features?.lateGenerateResults!==!0)return;L({channel:E,v:S,type:"generate-late-listen"})},O=(t,o)=>{for(let a of t)try{a(o)}catch(i){console.error(i)}},ao=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=Ht(t.data);if(!o)return;if(o.type==="workspace"){let i=se.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="shells"){let i=ie.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="microphone-audio"){D?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let i=D;if(!i)return;D=null,i.release(),O(i.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(_=o.payload,K=so(o.payload.session),O(d,o.payload),O(T,o.payload.directory),O(h,o.payload.session),K)O(b,K);if(O(y,o.payload.connection),O(N,o.payload.settings),O(M,o.payload.item),o.payload.block)O(H,o.payload.block);io();return}if(o.type==="service-event"){O(Z,o.payload);return}if(o.type==="generate-late"){if(re.size===0)qe.push(o.payload);else O(re,o.payload);return}if(o.type==="directory"){if(_)_={..._,directory:o.payload.directory};O(T,o.payload.directory);return}if(o.type==="session"){if(_)_={..._,session:o.payload.session};if(!o.payload.session)K=null;else if(K?.sessionId!==o.payload.session.id)K=so(o.payload.session);O(h,o.payload.session);return}if(o.type==="session-lifecycle"){K=o.payload,O(b,o.payload);return}if(o.type==="connection"){if(_)_={..._,connection:o.payload.connection};O(y,o.payload.connection);return}if(o.type==="settings"){if(_)_={..._,settings:o.payload.settings};O(N,o.payload.settings);return}if(o.type==="item"){if(_)_={..._,item:o.payload.item};O(M,o.payload.item);return}if(o.type==="status-control-event"){O(he,o.payload);return}if(o.type==="popover-closed"){O(Ie,o.payload);return}if(o.type==="action"){let i=(A)=>{if(!F)L({channel:E,v:S,type:"action-result",id:o.id,payload:A})},f=Ee;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(o.payload)).then(()=>i({ok:!0}),(A)=>{let m=(A instanceof Error?A.message:String(A)).trim();i({ok:!1,error:(m||"Action failed.").slice(0,me)})});return}if(o.type==="file-open"){let i=o.payload;if(Te&&yo(Te,i))return;Te=i,O(xe,o.payload);return}if(o.type==="file-saved"){O(ge,o.payload.version);return}if(o.type==="file-snapshot"){let i=(m)=>{if(!F)L({channel:E,v:S,type:"file-snapshot-result",id:o.id,payload:m})},f=(m)=>i({error:(m.trim()||"Could not read the edited file.").slice(0,me)}),A=Se;if(!A){f("This extension does not edit files.");return}Promise.resolve().then(()=>A(o.payload.purpose)).then((m)=>{if(Tt(m)>Ne){f(`The file is over ${Ne} ${"bytes"in m?"bytes":"characters"}.`);return}if(m.version.length>ve){f(`The snapshot version is over ${ve} characters.`);return}i({snapshot:"bytes"in m?{bytes:m.bytes,version:m.version}:{content:m.content,version:m.version}})},(m)=>f(m instanceof Error?m.message:String(m)));return}if(o.type==="resolve"){let i=(A)=>{L({channel:E,v:S,type:"resolve-result",id:o.id,payload:A})},f=pe;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(o.payload)).then((A)=>i({item:A?le(A):null}),(A)=>{let m=(A instanceof Error?A.message:String(A)).trim();i({error:(m||"Command failed.").slice(0,me)})});return}let a=ne.get(o.id);if(!a)return;if(clearTimeout(a.timer),ne.delete(o.id),o.ok){a.resolve(o.payload);return}a.reject(new c(o.code,o.error))};r.addEventListener("message",ao),L({channel:E,v:S,type:"hello"});let k=(t,o=l)=>{if(F||r.parent===r)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,i)=>{let f=setTimeout(()=>{ne.delete(t.id),i(new c("HOST_TIMEOUT","Host did not answer in time."))},o);ne.set(t.id,{resolve:a,reject:i,timer:f}),L(t)})},C=(t)=>k(t).then(()=>{return}),I={channel:E,v:S},et=(t)=>{if(!F&&r.parent!==r)L(t)},co=()=>et({...I,type:"file-save"}),tt=()=>{if(!F&&r.parent!==r)L({...I,type:"microphone-close",id:p(u)})},Or=async()=>{if(D)throw new c("HOST_REJECTED","The microphone is already open in this frame.");if(_?.features?.microphone!==!0)throw new c("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new c("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<lt||o.sampleRate>dt)throw o.close().catch(()=>{return}),new c("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let a=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,i=Ao(Math.round(o.sampleRate/4)),f=o.createScriptProcessor(1024,1,1);f.onaudioprocess=(V)=>i.pull(V.outputBuffer.getChannelData(0));let A=o.createMediaStreamDestination();f.connect(A);let m=new Set,ae={queue:i,endedListeners:m,release:()=>{f.onaudioprocess=null,f.disconnect(),i.clear();for(let V of A.stream.getTracks())V.stop();o.close().catch(()=>{return})}};D=ae;try{let V=await k({...I,type:"microphone-open",id:p(u),payload:{sampleRate:o.sampleRate}},_t);if(!V||!("opened"in V)||V.opened!==!0)throw new c("HOST_REJECTED","Host did not open the microphone.");if(await a,D!==ae)throw new c("DISCONNECTED","The microphone closed while it was opening.")}catch(V){if(D===ae)D=null;throw ae.release(),tt(),V}return{stream:A.stream,close:()=>{if(D!==ae)return;D=null,ae.release(),tt()},onEnded:(V)=>(m.add(V),()=>{m.delete(V)})}},lo=(t)=>{if(!or(t)||!vr(t))return;t.preventDefault(),co()},_o=(t)=>{if(!or(t)||t.key!=="Escape"||_?.surface!=="popover"||!_.popover)return;t.preventDefault(),So(_.popover.id,"escape").catch(()=>{return})},be=()=>{let t=_?.surface==="popover"?_.popover:void 0;if(!t)return;let o=fe||Ae;if(no===o)return;no=o,To(t.id,o).catch(()=>{return})},Ce=()=>{if(_?.surface!=="popover"||fe)return;fe=!0,be()},uo=(t)=>{if(_?.surface!=="popover"||t.relatedTarget!==null||!fe)return;fe=!1,be()},po=()=>{if(_?.surface!=="popover"||Ae)return;Ae=!0,be()},Eo=()=>{if(_?.surface!=="popover"||!Ae)return;Ae=!1,be()},B=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new c("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},ot=async(t)=>{if(t.kind!=="projects")B(t.projectId);let o=await k({...I,type:"workspace-read",id:p(u),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return o},rt=async(t,o)=>{if(t.kind!=="projects")B(t.projectId);let a=p(u);se.set(a,o);try{await C({...I,type:"workspace-subscribe",id:p(u),payload:{subscriptionId:a,query:t}})}catch(i){if(se.delete(a),!F)L({...I,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:a}});throw i}return()=>{if(!se.delete(a)||F)return;L({...I,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:a}})}},mr=async(t,o)=>{if(t.kind==="session")B(t.sessionId);if(t.kind==="project")B(t.projectId);let a=p(u);ie.set(a,o);try{await C({...I,type:"shells-subscribe",id:p(u),payload:{subscriptionId:a,scope:t}})}catch(i){if(ie.delete(a),!F)L({...I,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:a}});throw i}return()=>{if(!ie.delete(a)||F)return;L({...I,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:a}})}},Ue=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>it))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ce(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>at)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&_?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let o=await k({...I,type:"storage",id:p(u),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return o},So=(t,o)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):C({...I,type:"popover-close",id:p(u),payload:o?{id:t,reason:o}:{id:t}}),To=(t,o)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):C({...I,type:"popover-anchor",id:p(u),payload:{id:t,active:o}});return r.addEventListener("keydown",_o,!0),r.addEventListener("pointerover",Ce),r.addEventListener("pointermove",Ce),r.addEventListener("pointerout",uo),r.addEventListener("focus",po),r.addEventListener("blur",Eo),{onAction:(t)=>(Ee=t,()=>{if(Ee===t)Ee=null}),listProjects:async()=>{let t=await ot({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await ot({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await ot({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>rt({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>rt({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")o(a)}),onSessions:(t,o)=>rt({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")o(a)}),onRunningShells:(t,o)=>mr(t,o),readShellOutput:async(t,o)=>{B(t,ke);let a=o?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>ye))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ye}.`);let A=await k({...I,type:"shell-output",id:p(u),payload:{shellId:t,cursor:a,tailBytes:i}});if(!A||typeof A.output!=="string"||!Number.isFinite(A.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async(t)=>{if(B(t,ke),(await k({...I,type:"shell-stop",id:p(u),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{B(t),await C({...I,type:"open-session",id:p(u),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let a=Be(o),i={op:"get",key:t};if(a)i.scope=a;let f=await Ue(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,o,a)=>{let i=Be(a),f={op:"set",key:t,value:o};if(i)f.scope=i;await Ue(f)},delete:async(t,o)=>{let a=Be(o),i={op:"delete",key:t};if(a)i.scope=a;await Ue(i)},keys:async(t)=>{let o=Be(t),a={op:"keys"};if(o)a.scope=o;let i=await Ue(a);if(i.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),_)t(_);return()=>{d.delete(t)}},onDirectory:(t)=>{if(T.add(t),_)t(_.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(h.add(t),_)t(_.session);return()=>{h.delete(t)}},onSessionLifecycle:(t)=>{if(b.add(t),K)t(K);return()=>{b.delete(t)}},onConnection:(t)=>{if(y.add(t),_)t(_.connection);return()=>{y.delete(t)}},onSettings:(t)=>{if(N.add(t),_)t(_.settings);return()=>{N.delete(t)}},onItem:(t)=>{if(M.add(t),_)t(_.item);return()=>{M.delete(t)}},onBlock:(t)=>{if(H.add(t),_?.block)t(_.block);return()=>{H.delete(t)}},onServiceEvent:(t)=>(Z.add(t),()=>{Z.delete(t)}),onStatusControl:(t)=>(he.add(t),()=>{he.delete(t)}),onPopoverClosed:(t)=>(Ie.add(t),()=>{Ie.delete(t)}),setStatusControls:(t)=>{if(_?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!Io(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return C({...I,type:"status-controls",id:p(u),payload:{controls:t}})},openPopover:(t)=>{if(_?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!Ot(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return C({...I,type:"popover-open",id:p(u),payload:t})},closePopover:So,setPopoverAnchorActive:To,onResolve:(t)=>(pe=t,()=>{if(pe===t)pe=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Le)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${Le} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Pe))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Pe} characters.`));return C({channel:E,v:S,type:"toast",id:p(u),payload:{...t,message:o}})},openUrl:(t)=>C({channel:E,v:S,type:"open-url",id:p(u),payload:{url:t}}),...Go(C,()=>p(u),(t)=>Promise.reject(new c("HOST_REJECTED",t))),answerBlock:(t)=>C({channel:E,v:S,type:"block-answer",id:p(u),payload:{text:t.trim().slice(0,xt)}}),openSurface:(t)=>C({channel:E,v:S,type:"open-surface",id:p(u),payload:{surfaceId:t}}),writeClipboard:(t)=>C({channel:E,v:S,type:"clipboard-write",id:p(u),payload:{text:t}}),compose:(t)=>C({channel:E,v:S,type:"compose",id:p(u),payload:t}),attach:(t)=>C({channel:E,v:S,type:"attach",id:p(u),payload:le(t)}),startSession:async(t)=>{if(t.projectId!==void 0)B(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")B(o.directory);else{if(o.name!==void 0)B(o.name,200);if(o.baseBranch!==void 0)B(o.baseBranch,200)}let a=await k({channel:E,v:S,type:"start-session",id:p(u),payload:kt(t)},e.requestTimeoutMs??180000);if(!gt(a))throw new c("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>k({channel:E,v:S,type:"prompt",id:p(u),payload:yt(t)}).then((o)=>{if(!bt(o))throw new c("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>C({channel:E,v:S,type:"session-link",id:p(u),payload:le(t)}),close:()=>C({channel:E,v:S,type:"close",id:p(u)}),oauthStart:()=>C({channel:E,v:S,type:"oauth-start",id:p(u)}),oauthDisconnect:()=>C({channel:E,v:S,type:"oauth-disconnect",id:p(u)}),request:(t)=>(He(t.path)?k({channel:E,v:S,type:"request",id:p(u),payload:t}):rr()).then((o)=>{if(!$e(o))throw new c("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(He(t.path)?k({channel:E,v:S,type:"service-request",id:p(u),payload:t}):rr()).then((o)=>{if(!$e(o))throw new c("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>k({channel:E,v:S,type:"service-status",id:p(u)}).then((t)=>{if(!Lt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(de(t)?k({channel:E,v:S,type:"file-read",id:p(u),payload:{path:t}}):Fe()).then((o)=>{if(!Pt(o))throw new c("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!de(t))return Fe();if(o.length>Ge)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${Ge} characters.`));return k({channel:E,v:S,type:"file-write",id:p(u),payload:{path:t,content:o}}).then((a)=>{if(!wt(a))throw new c("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(de(t)?k({channel:E,v:S,type:"file-list",id:p(u),payload:{path:t}}):Fe()).then((o)=>{if(!Gt(o))throw new c("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(de(t)?k({channel:E,v:S,type:"file-stat",id:p(u),payload:{path:t}}):Fe()).then((o)=>{if(!Dt(o))throw new c("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),a=t.system?.trim();if(o.length===0||o.length>De)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${De} characters.`));if(a!==void 0&&(a.length===0||a.length>Xe))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Xe} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(Ut,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:o};if(a!==void 0)f.system=a;if(i!==void 0)f.maxOutputTokens=i;return k({channel:E,v:S,type:"generate",id:p(u),payload:f},e.requestTimeoutMs??Mt).then((A)=>{if(!Xt(A))throw new c("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:(t)=>{re.add(t);for(let o of qe.splice(0))O([t],o);return io(),()=>{re.delete(t)}},openMicrophone:Or,setBadge:(t)=>C({channel:E,v:S,type:"badge",id:p(u),payload:{count:Nt(t)}}),setHeight:(t)=>C({channel:E,v:S,type:"resize",id:p(u),payload:{height:vt(t)}}),onFileOpen:(t)=>{if(xe.add(t),!Ze)Ze=!0,r.addEventListener("keydown",lo,!0);if(Te)t(Te);return()=>{xe.delete(t)}},onFileSnapshot:(t)=>(Se=t,()=>{if(Se===t)Se=null}),onFileSaved:(t)=>(ge.add(t),()=>{ge.delete(t)}),reportFileChange:(t)=>et({...I,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:co,reportFileUnsupported:()=>et({...I,type:"file-unsupported"}),dispose:()=>{for(let t of se.keys())L({...I,type:"workspace-unsubscribe",id:p(u),payload:{subscriptionId:t}});se.clear();for(let t of ie.keys())L({...I,type:"shells-unsubscribe",id:p(u),payload:{subscriptionId:t}});if(ie.clear(),D)tt(),D.release(),D=null;if(F=!0,pe=null,Ee=null,Se=null,xe.clear(),ge.clear(),Ze)r.removeEventListener("keydown",lo,!0);r.removeEventListener("message",ao),r.removeEventListener("keydown",_o,!0),r.removeEventListener("pointerover",Ce),r.removeEventListener("pointermove",Ce),r.removeEventListener("pointerout",uo),r.removeEventListener("focus",po),r.removeEventListener("blur",Eo);for(let t of ne.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));ne.clear(),d.clear(),T.clear(),h.clear(),b.clear(),y.clear(),N.clear(),M.clear(),H.clear(),Z.clear(),he.clear(),Ie.clear(),re.clear(),qe.length=0}}};var nr=U(()=>{Oe();Et();mt();ht();ft();Ve();ut();ct();c=class c extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}});var sr,Ln;var ir=U(()=>{sr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"],Ln=new Set(sr)});var ar,wn;var cr=U(()=>{ar=["none","agent","user"],wn=new Set(ar)});var Vt=U(()=>{Oe();Me();ct();ut();Et();St();xo();bo();Uo();Mo();ko();ft();nr();mt();ht();Ve();Ve();ir();cr()});var Tr={};xr(Tr,{FAILURE_TEXT:()=>to,isOnScreen:()=>Qe,startPolling:()=>jr});var Sr=2000,to,eo=(e)=>typeof e==="object"&&e!==null,Kr=(e)=>eo(e)&&typeof e.at==="number"&&typeof e.intervalMs==="number"&&eo(e.omlx)&&eo(e.omlx.summary)&&Array.isArray(e.omlx.active_models)&&Array.isArray(e.history)&&Array.isArray(e.warnings),Wr=(e)=>{if(!(e instanceof c))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Qe=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,jr=(e,r,s,l)=>{let d=!1,T=Sr,h=async()=>{if(d)return;d=!0;try{if(!Qe(r))return;let M=await e.serviceRequest({method:"GET",path:"/snapshot"}),H;try{H=JSON.parse(M.body)}catch{H=null}if(M.status===200&&Kr(H))s(H),T=H.omlx.summary.total_active_requests>0?100:Sr;else l(M.status===200?"bad-answer":"service-failed")}catch(M){l(Wr(M))}finally{d=!1,setTimeout(()=>{h()},T)}};h();let b=Qe(r),y=()=>{let M=Qe(r);if(M&&!b)h();b=M};document.addEventListener("visibilitychange",y);let N=new ResizeObserver(y);return N.observe(document.documentElement),N.observe(r),{refresh:()=>{h()}}};var oo=U(()=>{Vt();to={"needs-approval":"Allow the local service for oMLX monitor in Settings \u2192 Extensions.",paused:"oMLX monitor is paused in Settings \u2192 Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the oMLX monitoring service.","bad-answer":"The monitoring service answered with something unexpected."}});Vt();var Lr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Pr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],lr=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,l]of Lr)r.style.setProperty(s,e.tokens[l]);for(let[s,l,d]of Pr){let T=e.tokens[d]??"";r.style.setProperty(s,T),r.style.setProperty(l,T)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Ft=(e,r)=>{if(lr(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};Me();var wr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},R=(e,r)=>`var(--${e}, var(--oc-${wr[e]}, ${r}))`,j=R("surface-background","transparent"),We=R("surface-elevated","transparent"),_e=R("surface-elevated-foreground","inherit"),X=R("surface-foreground","inherit"),x=R("surface-muted-foreground","gray"),Gr=R("surface-muted","transparent"),ee=R("interactive-border","currentColor"),P=R("interactive-hover","transparent"),te=R("interactive-active","transparent"),Bt=R("interactive-selection","transparent"),Kt=R("interactive-selection-foreground","inherit"),W=R("primary","currentColor"),Wt=R("primary-text","inherit"),jt=R("error-text","inherit"),Dr=R("font-sans","inherit"),zt=R("font-mono","monospace"),pr=R("radius","9px"),Jt=`calc(${pr} - 2px)`,dr=`calc(${pr} - 4px)`,g=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,_r=`background-image: linear-gradient(${P}, ${P});`,Yt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Qt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ur="box-shadow: var(--oc-sdk-lit);",qt=`inset 0 0.5px 0 0 ${g(X,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Xr=`
:root {
  --oc-sdk-edge: ${g(X,16)};
  --oc-sdk-field-bg: ${We};
  --oc-sdk-raised-bg: ${j};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${g(X,14)};
  --oc-sdk-field-bg: ${g(j,50,We)};
  --oc-sdk-raised-bg: ${We};
  --oc-sdk-field-lift: ${qt};
  --oc-sdk-raised-lift: ${qt};
  --oc-sdk-lit: ${qt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ke=(e)=>{let r=R(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${R(`${e}-text`,"inherit")}; }`},n=(e)=>`calc(${e}rem / 14)`,Hr=`
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
`,Er=`${Xr}
.oc-sdk { color: ${X}; font-family: ${Dr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${_r} }
.oc-sdk-mono { font-family: ${zt}; }
.oc-sdk-muted { color: ${x}; }
${Ke("success")}${Ke("warning")}${Ke("error")}${Ke("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${W}; --oc-sdk-tone-text: ${Wt}; }

.oc-sdk-btn { border-radius: ${Jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${dr}; }
.oc-sdk-btn[data-variant="default"] { color: ${Wt}; background: ${g(W,10,j)}; border-color: ${g(W,12)}; ${ur} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${g(W,16,j)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${g(W,22,j)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Gr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${_e}; ${Qt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${te}, ${te}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${P}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${te}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${R("status-error","red")}; color: ${jt}; background: ${g("var(--oc-sdk-tone)",7,j)}; border-color: ${g("var(--oc-sdk-tone)",12)}; ${ur} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${g("var(--oc-sdk-tone)",9,j)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${g("var(--oc-sdk-tone)",11,j)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${jt}; }
.oc-sdk-input { border-radius: ${Jt}; background: var(--oc-sdk-field-bg); color: ${_e}; ${Yt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Yt(g(X,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Yt(R("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${zt}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${W}; }
.oc-sdk-search-clear { border-radius: ${dr}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${P}; color: ${X}; }

.oc-sdk-trigger { border-radius: ${Jt}; background: var(--oc-sdk-raised-bg); color: ${_e}; ${Qt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${We}; background-clip: padding-box; color: ${_e}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${P}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Bt}; color: ${Kt}; }
.oc-sdk-option-check { color: ${X}; }
.oc-sdk-option[data-destructive="true"] { color: ${jt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${g(R("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ee}; border-radius: 4px; color: ${X}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${g(X,60,ee)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ee}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${j}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${W}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${_r} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${g(X,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${X}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Kt}; background: ${Bt}; border-color: ${ee}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${_e}; background: var(--oc-sdk-raised-bg); ${Qt} }
.oc-sdk-tab-count { color: ${x}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${g(X,6)}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${g("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${P}; }
.oc-sdk-row[aria-selected="true"] { background: ${Bt}; color: ${Kt}; }
.oc-sdk-row-lead { font-family: ${zt}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${ee}; border-top-color: ${W}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${g("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${g(ee,40)}; }

.oc-sdk-progress-label { color: ${x}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${g(X,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${W}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${R("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${R("success-text","inherit")}; }

.oc-sdk-text a { color: ${Wt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${g(ee,60)}; }
`,v=`
${nt}
${Hr}
${Er}`;Me();oo();function oe(e,r,s,l){let d=document.createElement(e);if(r)d.className=r;if(s!==void 0&&s!==null)d.textContent=s;if(l)l.forEach((T)=>d.append(T));return d}var fr=$t(),J=document.getElementById("root");if(!J)throw Error("Missing #root");var Y=null,q=null,Q=null,ro=null;function zr(){if(Y?.model)return Y.model;if(q?.model)return q.model;if(!ro)return"Mirage";let e=ro.omlx.active_models??[];if(e.length>0)return e[0].id;return"Mirage"}function Jr(e){ro=e;let r=e.omlx.active_models;Y=null,q=null;for(let s of r){if(!Y&&s.prefilling.length>0){let l=s.prefilling[0];if(!l)continue;let d=l.total!=null&&l.total>0?Math.round((l.processed??0)/l.total*100):null;Y={model:s.id,tokens:`${l.processed??0} tokens`,tps:`${l.speed!=null?l.speed.toFixed(2):"0"} tps`,percent:d}}if(!q&&s.generating.length>0){let l=s.generating[0];if(!l)continue;q={model:s.id,tokens:`${l.generated_tokens??0} tokens`,tps:`${l.tokens_per_second!=null?l.tokens_per_second.toFixed(2):"0"} tps`,percent:null}}}if(e.omlx.memory_pressure){let s=e.omlx.memory_pressure;Q={current:s.current_formatted,current_bytes:s.current_bytes,soft:s.soft_formatted,soft_bytes:s.soft_bytes,hard:s.hard_formatted,level:s.pressure_level}}else Q=null}function Yr(){let e=document.createElement("div");e.className="meter";let r=document.createElement("span");r.className="meter-fill",e.append(r);let s=document.createElement("span");if(s.className="value num",!Y)r.style.width="0%",s.textContent="Idle";else r.style.width=`${Y.percent??0}%`,s.textContent=`${Y.percent??"-"}% @ ${Y.tps}`;return{meter:e,text:s}}function Qr(){return q?`${q.tokens} @ ${q.tps}`:"Idle"}function qr(e){J.innerHTML="";let r=document.createElement("div");r.className="line";let s=document.createElement("span");s.className="value",s.textContent=zr(),r.append(oe("span","what","Model"),oe("div","meter-empty"),s),J.append(r);let l=document.createElement("div");l.className="line";let d=Yr();l.append(oe("span","what","Prefill"),d.meter,d.text),J.append(l);let T=document.createElement("div");if(T.className="line",T.append(oe("span","what","Generate"),oe("div","meter-empty"),oe("span","value",Qr())),J.append(T),Q){let h=document.createElement("div");h.className="line";let b=Q.soft_bytes>0?Math.min(100,Math.round(Q.current_bytes/Q.soft_bytes*100)):0,y=document.createElement("span");y.className="meter-fill meter-fill-memory",y.style.width=`${b}%`;let N=document.createElement("div");N.className="meter",N.append(y);let M=document.createElement("span");M.className="value num";let H=Q.current.replace(/GB\s*$/,""),Z=Q.soft.replace(/GB\s*$/,"");M.textContent=`${H} / ${Z} GB \xB7 ${b}%`,h.append(oe("span","what","Pressure"),N,M),J.append(h)}}function Zr(e){J.innerHTML="";let r=document.createElement("div");r.style.color="var(--oc-error)",r.innerText=to[e]??"oMLX Monitor offline",J.append(r)}var Ar=document.createElement("style");Ar.textContent=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .line { display: grid; grid-template-columns: 100px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .line .value.num { font-variant-numeric: tabular-nums; }
  .meter { position: relative; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; transition: width .4s ease; }
  .meter-empty { height: 4px; }
  .meter-fill { background: var(--oc-success); }
  .meter-fill-memory { background: var(--oc-primary); }
`;document.head.append(Ar);fr.onReady(async(e)=>{Ft(e,document.documentElement);let{startPolling:r}=await Promise.resolve().then(() => (oo(),Tr));r(fr,J,(l)=>{Jr(l),qr(l)},Zr).refresh()});

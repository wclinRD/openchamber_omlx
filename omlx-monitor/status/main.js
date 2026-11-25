// @bun
var Or=Object.defineProperty;var Rr=(e)=>e;function mr(e,r){this[e]=Rr.bind(null,r)}var hr=(e,r)=>{for(var s in r)Or(e,s,{get:r[s],enumerable:!0,configurable:!0,set:mr.bind(r,s)})};var k=(e,r)=>()=>(e&&(r=e(e=0)),r);var E="openchamber.sdk",S=1;var fe=()=>{};function So(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(c)=>{let d=c.target===e?r:c.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-oc-scrolling"))d.setAttribute("data-oc-scrolling","");let T=s.get(d);if(T!==void 0)clearTimeout(T);s.set(d,setTimeout(()=>{s.delete(d),d.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ot=`
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
`,Ir;var ke=k(()=>{Ir=`(${So.toString()})(document);`});var nt=128,st=65536;var Ce=128,Ue=65536;var it=()=>{};var at=8000,ct=192000,lt=120000,To=(e)=>{let r=[],s=0,c=0;return{push:(d)=>{r.push(d),c+=d.length;while(c-s>e&&r.length>1){let T=r.shift();c-=T?.length??0,s=0}},pull:(d)=>{let T=0;while(T<d.length&&r.length>0){let h=r[0],C=Math.min(d.length-T,h.length-s);if(d.set(h.subarray(s,s+C),T),T+=C,s+=C,s>=h.length)r.shift(),c-=h.length,s=0}d.fill(0,T)},clear:()=>{r.length=0,s=0,c=0},get size(){return c-s}}};var dt=()=>{};var Ro,fo=(e)=>Object(e)===e&&!Array.isArray(e),pt=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),Ao=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Oo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,mo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!fo(s)||!Ro.test(s.id)||!Ao(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!pt(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!pt(s,["kind","id","label","value","options","disabled"]))return!1;if(!Oo(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let c=new Set;for(let d of s.options){if(!fo(d)||!pt(d,["value","label"])||!Oo(d.value)||!Ao(d.label)||c.has(d.value))return!1;c.add(d.value)}if(!c.has(s.value))return!1}return!0};var _t=k(()=>{Ro=/^[a-z][a-z0-9-]{0,39}$/});var ut=()=>{};var ho=()=>{};var Io,dn;var xo=k(()=>{ut();Io=["{id}","{segment}","{segments+}"],dn=new Set(Io)});var go,_n;var bo=k(()=>{go=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"],_n=new Set(go)});var ko=()=>{};var Co=()=>{};var Me=20000000,Ne=256,Et=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Uo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var St=()=>{};var Mo,No,yo=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let c=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of c)if(!yo(d,r+1,s))return!1;return!0},Tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(Tt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(Tt)}return String(e)===e||Number.isFinite(e)},ft=(e)=>{try{if(String(e.id)!==e.id||!Mo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!No.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!yo(e.data)||!Tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var At=k(()=>{Mo=/^[A-Za-z0-9_-]{1,80}$/,No=["left","right","top","bottom"]});var vo,Lo=(e)=>vo.test(e),Ot=255,Po=(e,r,s)=>({openCommit:(c)=>Lo(c)?e({channel:E,v:S,type:"open-commit",id:r(),payload:{sha:c}}):s("Commit id must be 7 to 64 hex characters."),openWalkthrough:({base:c})=>{let d=c.trim();if(!d||d.length>Ot)return s(`Base must contain 1 to ${Ot} characters.`);return e({channel:E,v:S,type:"open-walkthrough",id:r(),payload:{base:d}})}});var Rt=k(()=>{fe();vo=/^[0-9a-f]{7,64}$/i});var ht=2000,Go,It=(e)=>Boolean(e&&"sessionId"in e),xt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),ye=500,ve=32000,Do=16000,Xo=128,Ho=200,$o=2000,Vo=16000,Fo=80,Bo=200,Ko=16000,Wo=2000,gt=20000,Le=1024,Pe=2000000,we=64000,Ge=8000,bt=4000,kt=960000,jo=999,zo=1e4,Ae=500,Jo,Yo,gr,Qo=(e)=>gr.has(e),qo=(e)=>e&&Qo(e)?e:"HOST_REJECTED",se=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(se);if(Object(e)===e)return Object.values(e).every(se);return!1},Zo=(e)=>se(e)&&JSON.stringify(e).length<=Ko,wo=(e)=>e?.trim().slice(0,Bo)??"",ie=(e)=>{let r=e.id.trim().slice(0,Xo),s=e.title.trim().slice(0,Ho),c=e.url.trim().slice(0,$o),d=e.text?.trim().slice(0,Vo),T=e.author?.trim().slice(0,Fo),h=e.kind==="pull"?"pull":"issue",C={providerId:e.providerId.trim(),id:r,title:s||r,url:c,kind:h};if(d)C.text=d;if(T)C.author=T;if(h==="pull"){let X=wo(e.branches?.head),H=wo(e.branches?.base);if(X&&H)C.branches={head:X,base:H}}if(Zo(e.data))C.data=e.data;return C},Ct=(e)=>{let r=ie(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},Ut=(e)=>{let r={text:e.text.trim().slice(0,Do)};if(e.send)r.send=!0;return r},Mt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(jo,Math.max(0,Math.round(e)))},Nt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(zo,Math.max(0,Math.ceil(e)))},ae=(e)=>e.length>0&&e.length<=Le&&!e.includes("\x00")&&!e.includes("\\"),De=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Wo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},br,yt=(e)=>Boolean(e&&"status"in e&&br.has(String(e.status))&&!("body"in e)),Xe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),vt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Lt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Pt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),kr,wt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&kr.has(String(e.kind))&&Number.isFinite(e.size)),Gt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Cr,Ur=(e)=>Object(e)===e?e:null,mt=(e)=>String(e)===e&&e.length>0,Mr=(e)=>{if(!mt(e.id))return null;if(e.ok===!0){let r={channel:E,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&mt(e.error))return{channel:E,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:qo(mt(e.code)?e.code:void 0)};return null},Dt=(e)=>{let r=Ur(e);if(!r||r.channel!==E||r.v!==S)return null;if(r.type==="result")return Mr(r);if(!Cr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var He=k(()=>{fe();Go=["file","directory","other","missing"],Jo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Yo=["stopped","starting","ready","failed"],gr=new Set(Jo),br=new Set(Yo),kr=new Set(Go),Cr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"])});var er=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Nr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",l,tr=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),$e=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Le} characters without NUL or backslash.`)),Ve=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`oc-${e.value}`),Xt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),c=e.requestTimeoutMs??gt,d=new Set,T=new Set,h=new Set,C=new Set,X=new Set,H=new Set,N=new Set,B=new Set,de=new Set,Re=new Set,me=new Set,ee=new Set,Ye=[],pe=null,_e=null,he=new Set,Ie=new Set,ue=null,Ee=null,Qe=!1,te=new Map,oe=new Map,re=new Map,V=!1,_={value:0},p=null,W=null,Se=!1,Te=!1,oo=null,w=null,ro=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},y=(t)=>{r.parent.postMessage(t,"*")},no=()=>{if(V||r.parent===r||ee.size===0||p?.features?.lateGenerateResults!==!0)return;y({channel:E,v:S,type:"generate-late-listen"})},O=(t,o)=>{for(let a of t)try{a(o)}catch(i){console.error(i)}},so=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=Dt(t.data);if(!o)return;if(o.type==="workspace"){let i=oe.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="shells"){let i=re.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="microphone-audio"){w?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let i=w;if(!i)return;w=null,i.release(),O(i.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(p=o.payload,W=ro(o.payload.session),O(d,o.payload),O(T,o.payload.directory),O(h,o.payload.session),W)O(C,W);if(O(X,o.payload.connection),O(H,o.payload.settings),O(N,o.payload.item),o.payload.block)O(B,o.payload.block);no();return}if(o.type==="service-event"){O(de,o.payload);return}if(o.type==="generate-late"){if(ee.size===0)Ye.push(o.payload);else O(ee,o.payload);return}if(o.type==="directory"){if(p)p={...p,directory:o.payload.directory};O(T,o.payload.directory);return}if(o.type==="session"){if(p)p={...p,session:o.payload.session};if(!o.payload.session)W=null;else if(W?.sessionId!==o.payload.session.id)W=ro(o.payload.session);O(h,o.payload.session);return}if(o.type==="session-lifecycle"){W=o.payload,O(C,o.payload);return}if(o.type==="connection"){if(p)p={...p,connection:o.payload.connection};O(X,o.payload.connection);return}if(o.type==="settings"){if(p)p={...p,settings:o.payload.settings};O(H,o.payload.settings);return}if(o.type==="item"){if(p)p={...p,item:o.payload.item};O(N,o.payload.item);return}if(o.type==="status-control-event"){O(Re,o.payload);return}if(o.type==="popover-closed"){O(me,o.payload);return}if(o.type==="action"){let i=(A)=>{if(!V)y({channel:E,v:S,type:"action-result",id:o.id,payload:A})},f=_e;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(o.payload)).then(()=>i({ok:!0}),(A)=>{let R=(A instanceof Error?A.message:String(A)).trim();i({ok:!1,error:(R||"Action failed.").slice(0,Ae)})});return}if(o.type==="file-open"){let i=o.payload;if(Ee&&Uo(Ee,i))return;Ee=i,O(he,o.payload);return}if(o.type==="file-saved"){O(Ie,o.payload.version);return}if(o.type==="file-snapshot"){let i=(R)=>{if(!V)y({channel:E,v:S,type:"file-snapshot-result",id:o.id,payload:R})},f=(R)=>i({error:(R.trim()||"Could not read the edited file.").slice(0,Ae)}),A=ue;if(!A){f("This extension does not edit files.");return}Promise.resolve().then(()=>A(o.payload.purpose)).then((R)=>{if(Et(R)>Me){f(`The file is over ${Me} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>Ne){f(`The snapshot version is over ${Ne} characters.`);return}i({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>f(R instanceof Error?R.message:String(R)));return}if(o.type==="resolve"){let i=(A)=>{y({channel:E,v:S,type:"resolve-result",id:o.id,payload:A})},f=pe;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(o.payload)).then((A)=>i({item:A?ie(A):null}),(A)=>{let R=(A instanceof Error?A.message:String(A)).trim();i({error:(R||"Command failed.").slice(0,Ae)})});return}let a=te.get(o.id);if(!a)return;if(clearTimeout(a.timer),te.delete(o.id),o.ok){a.resolve(o.payload);return}a.reject(new l(o.code,o.error))};r.addEventListener("message",so),y({channel:E,v:S,type:"hello"});let U=(t,o=c)=>{if(V||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,i)=>{let f=setTimeout(()=>{te.delete(t.id),i(new l("HOST_TIMEOUT","Host did not answer in time."))},o);te.set(t.id,{resolve:a,reject:i,timer:f}),y(t)})},b=(t)=>U(t).then(()=>{return}),I={channel:E,v:S},qe=(t)=>{if(!V&&r.parent!==r)y(t)},io=()=>qe({...I,type:"file-save"}),Ze=()=>{if(!V&&r.parent!==r)y({...I,type:"microphone-close",id:u(_)})},fr=async()=>{if(w)throw new l("HOST_REJECTED","The microphone is already open in this frame.");if(p?.features?.microphone!==!0)throw new l("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new l("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<at||o.sampleRate>ct)throw o.close().catch(()=>{return}),new l("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let a=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,i=To(Math.round(o.sampleRate/4)),f=o.createScriptProcessor(1024,1,1);f.onaudioprocess=(D)=>i.pull(D.outputBuffer.getChannelData(0));let A=o.createMediaStreamDestination();f.connect(A);let R=new Set,ne={queue:i,endedListeners:R,release:()=>{f.onaudioprocess=null,f.disconnect(),i.clear();for(let D of A.stream.getTracks())D.stop();o.close().catch(()=>{return})}};w=ne;try{let D=await U({...I,type:"microphone-open",id:u(_),payload:{sampleRate:o.sampleRate}},lt);if(!D||!("opened"in D)||D.opened!==!0)throw new l("HOST_REJECTED","Host did not open the microphone.");if(await a,w!==ne)throw new l("DISCONNECTED","The microphone closed while it was opening.")}catch(D){if(w===ne)w=null;throw ne.release(),Ze(),D}return{stream:A.stream,close:()=>{if(w!==ne)return;w=null,ne.release(),Ze()},onEnded:(D)=>(R.add(D),()=>{R.delete(D)})}},ao=(t)=>{if(!er(t)||!Nr(t))return;t.preventDefault(),io()},co=(t)=>{if(!er(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),uo(p.popover.id,"escape").catch(()=>{return})},xe=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let o=Se||Te;if(oo===o)return;oo=o,Eo(t.id,o).catch(()=>{return})},ge=()=>{if(p?.surface!=="popover"||Se)return;Se=!0,xe()},lo=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!Se)return;Se=!1,xe()},po=()=>{if(p?.surface!=="popover"||Te)return;Te=!0,xe()},_o=()=>{if(p?.surface!=="popover"||!Te)return;Te=!1,xe()},F=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},et=async(t)=>{if(t.kind!=="projects")F(t.projectId);let o=await U({...I,type:"workspace-read",id:u(_),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},tt=async(t,o)=>{if(t.kind!=="projects")F(t.projectId);let a=u(_);oe.set(a,o);try{await b({...I,type:"workspace-subscribe",id:u(_),payload:{subscriptionId:a,query:t}})}catch(i){if(oe.delete(a),!V)y({...I,type:"workspace-unsubscribe",id:u(_),payload:{subscriptionId:a}});throw i}return()=>{if(!oe.delete(a)||V)return;y({...I,type:"workspace-unsubscribe",id:u(_),payload:{subscriptionId:a}})}},Ar=async(t,o)=>{if(t.kind==="session")F(t.sessionId);if(t.kind==="project")F(t.projectId);let a=u(_);re.set(a,o);try{await b({...I,type:"shells-subscribe",id:u(_),payload:{subscriptionId:a,scope:t}})}catch(i){if(re.delete(a),!V)y({...I,type:"shells-unsubscribe",id:u(_),payload:{subscriptionId:a}});throw i}return()=>{if(!re.delete(a)||V)return;y({...I,type:"shells-unsubscribe",id:u(_),payload:{subscriptionId:a}})}},be=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>nt))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!se(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>st)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await U({...I,type:"storage",id:u(_),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},uo=(t,o)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):b({...I,type:"popover-close",id:u(_),payload:o?{id:t,reason:o}:{id:t}}),Eo=(t,o)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):b({...I,type:"popover-anchor",id:u(_),payload:{id:t,active:o}});return r.addEventListener("keydown",co,!0),r.addEventListener("pointerover",ge),r.addEventListener("pointermove",ge),r.addEventListener("pointerout",lo),r.addEventListener("focus",po),r.addEventListener("blur",_o),{onAction:(t)=>(_e=t,()=>{if(_e===t)_e=null}),listProjects:async()=>{let t=await et({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await et({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await et({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>tt({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>tt({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")o(a)}),onSessions:(t,o)=>tt({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")o(a)}),onRunningShells:(t,o)=>Ar(t,o),readShellOutput:async(t,o)=>{F(t,Ce);let a=o?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Ue))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ue}.`);let A=await U({...I,type:"shell-output",id:u(_),payload:{shellId:t,cursor:a,tailBytes:i}});if(!A||typeof A.output!=="string"||!Number.isFinite(A.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async(t)=>{if(F(t,Ce),(await U({...I,type:"shell-stop",id:u(_),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{F(t),await b({...I,type:"open-session",id:u(_),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let a=Ve(o),i={op:"get",key:t};if(a)i.scope=a;let f=await be(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,o,a)=>{let i=Ve(a),f={op:"set",key:t,value:o};if(i)f.scope=i;await be(f)},delete:async(t,o)=>{let a=Ve(o),i={op:"delete",key:t};if(a)i.scope=a;await be(i)},keys:async(t)=>{let o=Ve(t),a={op:"keys"};if(o)a.scope=o;let i=await be(a);if(i.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(d.add(t),p)t(p);return()=>{d.delete(t)}},onDirectory:(t)=>{if(T.add(t),p)t(p.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(h.add(t),p)t(p.session);return()=>{h.delete(t)}},onSessionLifecycle:(t)=>{if(C.add(t),W)t(W);return()=>{C.delete(t)}},onConnection:(t)=>{if(X.add(t),p)t(p.connection);return()=>{X.delete(t)}},onSettings:(t)=>{if(H.add(t),p)t(p.settings);return()=>{H.delete(t)}},onItem:(t)=>{if(N.add(t),p)t(p.item);return()=>{N.delete(t)}},onBlock:(t)=>{if(B.add(t),p?.block)t(p.block);return()=>{B.delete(t)}},onServiceEvent:(t)=>(de.add(t),()=>{de.delete(t)}),onStatusControl:(t)=>(Re.add(t),()=>{Re.delete(t)}),onPopoverClosed:(t)=>(me.add(t),()=>{me.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!mo(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...I,type:"status-controls",id:u(_),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!ft(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...I,type:"popover-open",id:u(_),payload:t})},closePopover:uo,setPopoverAnchorActive:Eo,onResolve:(t)=>(pe=t,()=>{if(pe===t)pe=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ye)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ye} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ve))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${ve} characters.`));return b({channel:E,v:S,type:"toast",id:u(_),payload:{...t,message:o}})},openUrl:(t)=>b({channel:E,v:S,type:"open-url",id:u(_),payload:{url:t}}),...Po(b,()=>u(_),(t)=>Promise.reject(new l("HOST_REJECTED",t))),answerBlock:(t)=>b({channel:E,v:S,type:"block-answer",id:u(_),payload:{text:t.trim().slice(0,ht)}}),openSurface:(t)=>b({channel:E,v:S,type:"open-surface",id:u(_),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:E,v:S,type:"clipboard-write",id:u(_),payload:{text:t}}),compose:(t)=>b({channel:E,v:S,type:"compose",id:u(_),payload:t}),attach:(t)=>b({channel:E,v:S,type:"attach",id:u(_),payload:ie(t)}),startSession:async(t)=>{if(t.projectId!==void 0)F(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")F(o.directory);else{if(o.name!==void 0)F(o.name,200);if(o.baseBranch!==void 0)F(o.baseBranch,200)}let a=await U({channel:E,v:S,type:"start-session",id:u(_),payload:Ct(t)},e.requestTimeoutMs??180000);if(!It(a))throw new l("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>U({channel:E,v:S,type:"prompt",id:u(_),payload:Ut(t)}).then((o)=>{if(!xt(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>b({channel:E,v:S,type:"session-link",id:u(_),payload:ie(t)}),close:()=>b({channel:E,v:S,type:"close",id:u(_)}),oauthStart:()=>b({channel:E,v:S,type:"oauth-start",id:u(_)}),oauthDisconnect:()=>b({channel:E,v:S,type:"oauth-disconnect",id:u(_)}),request:(t)=>(De(t.path)?U({channel:E,v:S,type:"request",id:u(_),payload:t}):tr()).then((o)=>{if(!Xe(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(De(t.path)?U({channel:E,v:S,type:"service-request",id:u(_),payload:t}):tr()).then((o)=>{if(!Xe(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>U({channel:E,v:S,type:"service-status",id:u(_)}).then((t)=>{if(!yt(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ae(t)?U({channel:E,v:S,type:"file-read",id:u(_),payload:{path:t}}):$e()).then((o)=>{if(!vt(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ae(t))return $e();if(o.length>Pe)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Pe} characters.`));return U({channel:E,v:S,type:"file-write",id:u(_),payload:{path:t,content:o}}).then((a)=>{if(!Lt(a))throw new l("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(ae(t)?U({channel:E,v:S,type:"file-list",id:u(_),payload:{path:t}}):$e()).then((o)=>{if(!Pt(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ae(t)?U({channel:E,v:S,type:"file-stat",id:u(_),payload:{path:t}}):$e()).then((o)=>{if(!wt(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),a=t.system?.trim();if(o.length===0||o.length>we)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${we} characters.`));if(a!==void 0&&(a.length===0||a.length>Ge))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ge} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(bt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:o};if(a!==void 0)f.system=a;if(i!==void 0)f.maxOutputTokens=i;return U({channel:E,v:S,type:"generate",id:u(_),payload:f},e.requestTimeoutMs??kt).then((A)=>{if(!Gt(A))throw new l("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:(t)=>{ee.add(t);for(let o of Ye.splice(0))O([t],o);return no(),()=>{ee.delete(t)}},openMicrophone:fr,setBadge:(t)=>b({channel:E,v:S,type:"badge",id:u(_),payload:{count:Mt(t)}}),setHeight:(t)=>b({channel:E,v:S,type:"resize",id:u(_),payload:{height:Nt(t)}}),onFileOpen:(t)=>{if(he.add(t),!Qe)Qe=!0,r.addEventListener("keydown",ao,!0);if(Ee)t(Ee);return()=>{he.delete(t)}},onFileSnapshot:(t)=>(ue=t,()=>{if(ue===t)ue=null}),onFileSaved:(t)=>(Ie.add(t),()=>{Ie.delete(t)}),reportFileChange:(t)=>qe({...I,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:io,reportFileUnsupported:()=>qe({...I,type:"file-unsupported"}),dispose:()=>{for(let t of oe.keys())y({...I,type:"workspace-unsubscribe",id:u(_),payload:{subscriptionId:t}});oe.clear();for(let t of re.keys())y({...I,type:"shells-unsubscribe",id:u(_),payload:{subscriptionId:t}});if(re.clear(),w)Ze(),w.release(),w=null;if(V=!0,pe=null,_e=null,ue=null,he.clear(),Ie.clear(),Qe)r.removeEventListener("keydown",ao,!0);r.removeEventListener("message",so),r.removeEventListener("keydown",co,!0),r.removeEventListener("pointerover",ge),r.removeEventListener("pointermove",ge),r.removeEventListener("pointerout",lo),r.removeEventListener("focus",po),r.removeEventListener("blur",_o);for(let t of te.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));te.clear(),d.clear(),T.clear(),h.clear(),C.clear(),X.clear(),H.clear(),N.clear(),B.clear(),de.clear(),Re.clear(),me.clear(),ee.clear(),Ye.length=0}}};var or=k(()=>{fe();_t();At();Rt();St();He();dt();it();l=class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}});var rr,yn;var nr=k(()=>{rr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"],yn=new Set(rr)});var sr,Ln;var ir=k(()=>{sr=["none","agent","user"],Ln=new Set(sr)});var Ht=k(()=>{fe();ke();it();dt();_t();ut();ho();xo();bo();ko();Co();St();or();At();Rt();He();He();nr();ir()});var Er={};hr(Er,{FAILURE_TEXT:()=>Zt,isOnScreen:()=>Je,startPolling:()=>Kr});var ur=2000,Zt,qt=(e)=>typeof e==="object"&&e!==null,Fr=(e)=>qt(e)&&typeof e.at==="number"&&typeof e.intervalMs==="number"&&qt(e.omlx)&&qt(e.omlx.summary)&&Array.isArray(e.omlx.active_models)&&Array.isArray(e.history)&&Array.isArray(e.warnings),Br=(e)=>{if(!(e instanceof l))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Je=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Kr=(e,r,s,c)=>{let d=!1,T=ur,h=async()=>{if(d)return;d=!0;try{if(!Je(r))return;let N=await e.serviceRequest({method:"GET",path:"/snapshot"}),B;try{B=JSON.parse(N.body)}catch{B=null}if(N.status===200&&Fr(B))s(B),T=B.omlx.summary.total_active_requests>0?100:ur;else c(N.status===200?"bad-answer":"service-failed")}catch(N){c(Br(N))}finally{d=!1,setTimeout(()=>{h()},T)}};h();let C=Je(r),X=()=>{let N=Je(r);if(N&&!C)h();C=N};document.addEventListener("visibilitychange",X);let H=new ResizeObserver(X);return H.observe(document.documentElement),H.observe(r),{refresh:()=>{h()}}};var eo=k(()=>{Ht();Zt={"needs-approval":"Allow the local service for oMLX monitor in Settings \u2192 Extensions.",paused:"oMLX monitor is paused in Settings \u2192 Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the oMLX monitoring service.","bad-answer":"The monitoring service answered with something unexpected."}});Ht();var yr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],vr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ar=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,c]of yr)r.style.setProperty(s,e.tokens[c]);for(let[s,c,d]of vr){let T=e.tokens[d]??"";r.style.setProperty(s,T),r.style.setProperty(c,T)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},$t=(e,r)=>{if(ar(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};ke();var Lr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},m=(e,r)=>`var(--${e}, var(--oc-${Lr[e]}, ${r}))`,z=m("surface-background","transparent"),Be=m("surface-elevated","transparent"),ce=m("surface-elevated-foreground","inherit"),G=m("surface-foreground","inherit"),x=m("surface-muted-foreground","gray"),Pr=m("surface-muted","transparent"),q=m("interactive-border","currentColor"),v=m("interactive-hover","transparent"),Z=m("interactive-active","transparent"),Vt=m("interactive-selection","transparent"),Ft=m("interactive-selection-foreground","inherit"),j=m("primary","currentColor"),Bt=m("primary-text","inherit"),Kt=m("error-text","inherit"),wr=m("font-sans","inherit"),Wt=m("font-mono","monospace"),pr=m("radius","9px"),jt=`calc(${pr} - 2px)`,cr=`calc(${pr} - 4px)`,g=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,lr=`background-image: linear-gradient(${v}, ${v});`,zt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Jt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",dr="box-shadow: var(--oc-sdk-lit);",Yt=`inset 0 0.5px 0 0 ${g(G,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Gr=`
:root {
  --oc-sdk-edge: ${g(G,16)};
  --oc-sdk-field-bg: ${Be};
  --oc-sdk-raised-bg: ${z};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${g(G,14)};
  --oc-sdk-field-bg: ${g(z,50,Be)};
  --oc-sdk-raised-bg: ${Be};
  --oc-sdk-field-lift: ${Yt};
  --oc-sdk-raised-lift: ${Yt};
  --oc-sdk-lit: ${Yt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Fe=(e)=>{let r=m(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${m(`${e}-text`,"inherit")}; }`},n=(e)=>`calc(${e}rem / 14)`,Dr=`
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
`,_r=`${Gr}
.oc-sdk { color: ${G}; font-family: ${wr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${lr} }
.oc-sdk-mono { font-family: ${Wt}; }
.oc-sdk-muted { color: ${x}; }
${Fe("success")}${Fe("warning")}${Fe("error")}${Fe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${j}; --oc-sdk-tone-text: ${Bt}; }

.oc-sdk-btn { border-radius: ${jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${cr}; }
.oc-sdk-btn[data-variant="default"] { color: ${Bt}; background: ${g(j,10,z)}; border-color: ${g(j,12)}; ${dr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${g(j,16,z)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${g(j,22,z)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Pr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Z}, ${Z}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ce}; ${Jt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Z}, ${Z}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${v}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Z}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${m("status-error","red")}; color: ${Kt}; background: ${g("var(--oc-sdk-tone)",7,z)}; border-color: ${g("var(--oc-sdk-tone)",12)}; ${dr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${g("var(--oc-sdk-tone)",9,z)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${g("var(--oc-sdk-tone)",11,z)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Kt}; }
.oc-sdk-input { border-radius: ${jt}; background: var(--oc-sdk-field-bg); color: ${ce}; ${zt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${zt(g(G,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${zt(m("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Wt}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${j}; }
.oc-sdk-search-clear { border-radius: ${cr}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${v}; color: ${G}; }

.oc-sdk-trigger { border-radius: ${jt}; background: var(--oc-sdk-raised-bg); color: ${ce}; ${Jt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${v}, ${v}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Z}, ${Z}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ce}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Be}; background-clip: padding-box; color: ${ce}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${v}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Vt}; color: ${Ft}; }
.oc-sdk-option-check { color: ${G}; }
.oc-sdk-option[data-destructive="true"] { color: ${Kt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${g(m("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${q}; border-radius: 4px; color: ${G}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${g(G,60,q)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${q}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${z}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${j}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${lr} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${g(G,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${G}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ft}; background: ${Vt}; border-color: ${q}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ce}; background: var(--oc-sdk-raised-bg); ${Jt} }
.oc-sdk-tab-count { color: ${x}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${g(G,6)}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${g("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${v}; }
.oc-sdk-row[aria-selected="true"] { background: ${Vt}; color: ${Ft}; }
.oc-sdk-row-lead { font-family: ${Wt}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${q}; border-top-color: ${j}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${g("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${g(q,40)}; }

.oc-sdk-progress-label { color: ${x}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${g(G,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${j}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${m("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${m("success-text","inherit")}; }

.oc-sdk-text a { color: ${Bt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${g(q,60)}; }
`,M=`
${ot}
${Dr}
${_r}`;ke();eo();var Sr=Xt(),Y=document.getElementById("root");if(!Y)throw Error("Missing #root");var K=null,Q=null,to=null;function Wr(){if(K?.model)return K.model;if(Q?.model)return Q.model;if(!to)return"Mirage";let e=to.omlx.active_models??[];if(e.length>0)return e[0].id;return"Mirage"}function jr(e){to=e;let r=e.omlx.active_models;K=null,Q=null;for(let s of r){if(!K&&s.prefilling.length>0){let c=s.prefilling[0];if(!c)continue;let d=c.total!=null&&c.total>0?Math.round((c.processed??0)/c.total*100):null;K={model:s.id,tokens:`${c.processed??0} tokens`,tps:`${c.speed!=null?c.speed.toFixed(2):"0"} tps`,percent:d}}if(!Q&&s.generating.length>0){let c=s.generating[0];if(!c)continue;Q={model:s.id,tokens:`${c.generated_tokens??0} tokens`,tps:`${c.tokens_per_second!=null?c.tokens_per_second.toFixed(2):"0"} tps`,percent:null}}}}function zr(){let e=document.createElement("div");if(e.className="progress-container",!K){let d=document.createElement("div");d.className="progress-track";let T=document.createElement("div");T.className="progress-fill",T.style.width="0%",T.style.setProperty("--pct","0%"),d.append(T),e.append(d);let h=document.createElement("span");return h.className="progress-text",h.textContent="Idle",e.append(h),e}let r=document.createElement("div");r.className="progress-track";let s=document.createElement("div");s.className="progress-fill",s.style.width=`${K.percent??0}%`,s.style.setProperty("--pct",`${K.percent??0}%`),r.append(s),e.append(r);let c=document.createElement("span");return c.className="progress-text",c.textContent=`${K.percent??"-"}% @ ${K.tps}`,e.append(c),e}function Jr(){let e=document.createElement("div");return e.className="progress-generate",e.textContent=Q?`${Q.tokens} @ ${Q.tps}`:"Idle",e}function Yr(e){Y.innerHTML="";let r=document.createElement("div");r.className="kv-row",r.innerHTML=`
    <span class="kv-label">OMLX Status</span>
    <span class="kv-value ${e.omlx.authenticated?"live":"offline"}">
      ${e.omlx.authenticated?"live":"offline"}
    </span>
  `,Y.append(r);let s=document.createElement("div");s.className="kv-row",s.innerHTML=`
    <span class="kv-label">Model Name</span>
    <span class="kv-value">${Wr()}</span>
  `,Y.append(s);let c=document.createElement("div");c.className="kv-row",c.innerHTML=`
    <span class="kv-label">PREFILL</span>
  `,c.append(zr()),Y.append(c);let d=document.createElement("div");d.className="kv-row",d.innerHTML=`
    <span class="kv-label">GENERATE</span>
  `,d.append(Jr()),Y.append(d)}function Qr(e){Y.innerHTML="";let r=document.createElement("div");r.style.color="var(--oc-error)",r.innerText=Zt[e]??"oMLX Monitor offline",Y.append(r)}var Tr=document.createElement("style");Tr.textContent=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .kv-row { display: flex; align-items: center; justify-content: space-between; }
  .kv-label {
    flex-shrink: 0;
    font-size: 10px;
    color: var(--oc-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: left;
  }
  .kv-value {
    flex: 1;
    font-size: 12px;
    font-weight: 500;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .kv-value.live { color: var(--oc-success); }
  .kv-value.offline { color: var(--oc-error); }

  .progress-container {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .progress-track {
    flex: 1;
    min-width: 0;
    height: 8px;
    background: color-mix(in srgb, var(--oc-fg) 10%, transparent);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .progress-fill {
    position: absolute;
    inset: 0;
    background: var(--oc-success);
    border-radius: 4px;
    transition: width 0.2s ease;
  }
  .progress-text {
    font-size: 11px;
    color: var(--oc-muted);
    white-space: nowrap;
    flex: none;
    margin-left: 8px;
  }
  .progress-generate {
    flex: none;
    font-size: 12px;
    font-weight: 500;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;document.head.append(Tr);Sr.onReady(async(e)=>{$t(e,document.documentElement);let{startPolling:r}=await Promise.resolve().then(() => (eo(),Er));r(Sr,Y,(c)=>{jr(c),Yr(c)},Qr).refresh()});

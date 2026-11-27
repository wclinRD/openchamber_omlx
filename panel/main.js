// @bun
var f="openchamber.sdk",A=1;var Ye=`
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
`;function Yt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(_)=>{let i=_.target===e?r:_.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let T=s.get(i);if(T!==void 0)clearTimeout(T);s.set(i,setTimeout(()=>{s.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var jo=`(${Yt.toString()})(document);`;var Qe=128,qe=65536;var ge=128;var Ie=65536;var Ze=8000,et=192000,tt=120000;var Qt=(e)=>{let r=[],s=0,_=0;return{push:(i)=>{r.push(i),_+=i.length;while(_-s>e&&r.length>1){let T=r.shift();_-=T?.length??0,s=0}},pull:(i)=>{let T=0;while(T<i.length&&r.length>0){let p=r[0],S=Math.min(i.length-T,p.length-s);if(i.set(p.subarray(s,s+S),T),T+=S,s+=S,s>=p.length)r.shift(),_-=p.length,s=0}i.fill(0,T)},clear:()=>{r.length=0,s=0,_=0},get size(){return _-s}}};var to=/^[a-z][a-z0-9-]{0,39}$/;var qt=(e)=>Object(e)===e&&!Array.isArray(e),ot=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),Zt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,eo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,oo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!qt(s)||!to.test(s.id)||!Zt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!ot(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!ot(s,["kind","id","label","value","options","disabled"]))return!1;if(!eo(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let _=new Set;for(let i of s.options){if(!qt(i)||!ot(i,["value","label"])||!eo(i.value)||!Zt(i.label)||_.has(i.value))return!1;_.add(i.value)}if(!_.has(s.value))return!1}return!0};var ro=["{id}","{segment}","{segments+}"];var yr=new Set(ro);var no=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var vr=new Set(no);var be=20000000,Ce=256;var rt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,so=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var io=/^[A-Za-z0-9_-]{1,80}$/;var ao=["left","right","top","bottom"];var co=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let _=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of _)if(!co(i,r+1,s))return!1;return!0},nt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(nt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(nt)}return String(e)===e||Number.isFinite(e)},st=(e)=>{try{if(String(e.id)!==e.id||!io.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ao.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!co(e.data)||!nt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var lo=/^[0-9a-f]{7,64}$/i,po=(e)=>lo.test(e),it=255,_o=(e,r,s)=>({openCommit:(_)=>po(_)?e({channel:f,v:A,type:"open-commit",id:r(),payload:{sha:_}}):s("Commit id must be 7 to 64 hex characters."),openWalkthrough:({base:_})=>{let i=_.trim();if(!i||i.length>it)return s(`Base must contain 1 to ${it} characters.`);return e({channel:f,v:A,type:"open-walkthrough",id:r(),payload:{base:i}})}});var ct=2000;var Eo=["file","directory","other","missing"],lt=(e)=>Boolean(e&&"sessionId"in e),dt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Ue=500,ke=32000,To=16000,So=128,fo=200,Ao=2000,mo=16000,Oo=80,Ro=200,ho=16000;var xo=2000;var pt=20000,Me=1024,ye=2000000;var Ne=64000,ve=8000,_t=4000;var ut=960000;var go=999,Io=1e4,Te=500,bo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Co=["stopped","starting","ready","failed"],Yo=new Set(bo),Uo=(e)=>Yo.has(e),ko=(e)=>e&&Uo(e)?e:"HOST_REJECTED",ne=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ne);if(Object(e)===e)return Object.values(e).every(ne);return!1},Mo=(e)=>ne(e)&&JSON.stringify(e).length<=ho,uo=(e)=>e?.trim().slice(0,Ro)??"",se=(e)=>{let r=e.id.trim().slice(0,So),s=e.title.trim().slice(0,fo),_=e.url.trim().slice(0,Ao),i=e.text?.trim().slice(0,mo),T=e.author?.trim().slice(0,Oo),p=e.kind==="pull"?"pull":"issue",S={providerId:e.providerId.trim(),id:r,title:s||r,url:_,kind:p};if(i)S.text=i;if(T)S.author=T;if(p==="pull"){let m=uo(e.branches?.head),O=uo(e.branches?.base);if(m&&O)S.branches={head:m,base:O}}if(Mo(e.data))S.data=e.data;return S},Et=(e)=>{let r=se(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},Tt=(e)=>{let r={text:e.text.trim().slice(0,To)};if(e.send)r.send=!0;return r},St=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(go,Math.max(0,Math.round(e)))},ft=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Io,Math.max(0,Math.ceil(e)))};var ie=(e)=>e.length>0&&e.length<=Me&&!e.includes("\x00")&&!e.includes("\\");var Le=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>xo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Qo=new Set(Co),At=(e)=>Boolean(e&&"status"in e&&Qo.has(String(e.status))&&!("body"in e)),Pe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),mt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ot=(e)=>Boolean(e&&"written"in e&&e.written===!0),Rt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),qo=new Set(Eo),ht=(e)=>Boolean(e&&"kind"in e&&"size"in e&&qo.has(String(e.kind))&&Number.isFinite(e.size)),xt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Zo=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),er=(e)=>Object(e)===e?e:null,at=(e)=>String(e)===e&&e.length>0,tr=(e)=>{if(!at(e.id))return null;if(e.ok===!0){let r={channel:f,v:A,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&at(e.error))return{channel:f,v:A,type:"result",id:e.id,ok:!1,error:e.error,code:ko(at(e.code)?e.code:void 0)};return null},gt=(e)=>{let r=er(e);if(!r||r.channel!==f||r.v!==A)return null;if(r.type==="result")return tr(r);if(!Zo.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var yo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),or=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var No=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),we=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Me} characters without NUL or backslash.`)),Ge=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},E=(e)=>(e.value+=1,`oc-${e.value}`),It=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),_=e.requestTimeoutMs??pt,i=new Set,T=new Set,p=new Set,S=new Set,m=new Set,O=new Set,x=new Set,y=new Set,D=new Set,V=new Set,Ae=new Set,Z=new Set,Be=[],le=null,de=null,me=new Set,Oe=new Set,pe=null,_e=null,Ke=!1,ee=new Map,te=new Map,oe=new Map,B=!1,u={value:0},d=null,z=null,ue=!1,Ee=!1,Dt=null,X=null,Xt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},L=(t)=>{r.parent.postMessage(t,"*")},Ht=()=>{if(B||r.parent===r||Z.size===0||d?.features?.lateGenerateResults!==!0)return;L({channel:f,v:A,type:"generate-late-listen"})},g=(t,o)=>{for(let c of t)try{c(o)}catch(a){console.error(a)}},$t=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=gt(t.data);if(!o)return;if(o.type==="workspace"){let a=te.get(o.payload.subscriptionId);if(a)g([a],o.payload.snapshot);return}if(o.type==="shells"){let a=oe.get(o.payload.subscriptionId);if(a)g([a],o.payload.snapshot);return}if(o.type==="microphone-audio"){X?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let a=X;if(!a)return;X=null,a.release(),g(a.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(d=o.payload,z=Xt(o.payload.session),g(i,o.payload),g(T,o.payload.directory),g(p,o.payload.session),z)g(S,z);if(g(m,o.payload.connection),g(O,o.payload.settings),g(x,o.payload.item),o.payload.block)g(y,o.payload.block);Ht();return}if(o.type==="service-event"){g(D,o.payload);return}if(o.type==="generate-late"){if(Z.size===0)Be.push(o.payload);else g(Z,o.payload);return}if(o.type==="directory"){if(d)d={...d,directory:o.payload.directory};g(T,o.payload.directory);return}if(o.type==="session"){if(d)d={...d,session:o.payload.session};if(!o.payload.session)z=null;else if(z?.sessionId!==o.payload.session.id)z=Xt(o.payload.session);g(p,o.payload.session);return}if(o.type==="session-lifecycle"){z=o.payload,g(S,o.payload);return}if(o.type==="connection"){if(d)d={...d,connection:o.payload.connection};g(m,o.payload.connection);return}if(o.type==="settings"){if(d)d={...d,settings:o.payload.settings};g(O,o.payload.settings);return}if(o.type==="item"){if(d)d={...d,item:o.payload.item};g(x,o.payload.item);return}if(o.type==="status-control-event"){g(V,o.payload);return}if(o.type==="popover-closed"){g(Ae,o.payload);return}if(o.type==="action"){let a=(h)=>{if(!B)L({channel:f,v:A,type:"action-result",id:o.id,payload:h})},R=de;if(!R){a({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>R(o.payload)).then(()=>a({ok:!0}),(h)=>{let I=(h instanceof Error?h.message:String(h)).trim();a({ok:!1,error:(I||"Action failed.").slice(0,Te)})});return}if(o.type==="file-open"){let a=o.payload;if(_e&&so(_e,a))return;_e=a,g(me,o.payload);return}if(o.type==="file-saved"){g(Oe,o.payload.version);return}if(o.type==="file-snapshot"){let a=(I)=>{if(!B)L({channel:f,v:A,type:"file-snapshot-result",id:o.id,payload:I})},R=(I)=>a({error:(I.trim()||"Could not read the edited file.").slice(0,Te)}),h=pe;if(!h){R("This extension does not edit files.");return}Promise.resolve().then(()=>h(o.payload.purpose)).then((I)=>{if(rt(I)>be){R(`The file is over ${be} ${"bytes"in I?"bytes":"characters"}.`);return}if(I.version.length>Ce){R(`The snapshot version is over ${Ce} characters.`);return}a({snapshot:"bytes"in I?{bytes:I.bytes,version:I.version}:{content:I.content,version:I.version}})},(I)=>R(I instanceof Error?I.message:String(I)));return}if(o.type==="resolve"){let a=(h)=>{L({channel:f,v:A,type:"resolve-result",id:o.id,payload:h})},R=le;if(!R){a({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>R(o.payload)).then((h)=>a({item:h?se(h):null}),(h)=>{let I=(h instanceof Error?h.message:String(h)).trim();a({error:(I||"Command failed.").slice(0,Te)})});return}let c=ee.get(o.id);if(!c)return;if(clearTimeout(c.timer),ee.delete(o.id),o.ok){c.resolve(o.payload);return}c.reject(new l(o.code,o.error))};r.addEventListener("message",$t),L({channel:f,v:A,type:"hello"});let N=(t,o=_)=>{if(B||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((c,a)=>{let R=setTimeout(()=>{ee.delete(t.id),a(new l("HOST_TIMEOUT","Host did not answer in time."))},o);ee.set(t.id,{resolve:c,reject:a,timer:R}),L(t)})},M=(t)=>N(t).then(()=>{return}),C={channel:f,v:A},We=(t)=>{if(!B&&r.parent!==r)L(t)},Vt=()=>We({...C,type:"file-save"}),ze=()=>{if(!B&&r.parent!==r)L({...C,type:"microphone-close",id:E(u)})},Wo=async()=>{if(X)throw new l("HOST_REJECTED","The microphone is already open in this frame.");if(d?.features?.microphone!==!0)throw new l("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new l("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<Ze||o.sampleRate>et)throw o.close().catch(()=>{return}),new l("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let c=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,a=Qt(Math.round(o.sampleRate/4)),R=o.createScriptProcessor(1024,1,1);R.onaudioprocess=(F)=>a.pull(F.outputBuffer.getChannelData(0));let h=o.createMediaStreamDestination();R.connect(h);let I=new Set,re={queue:a,endedListeners:I,release:()=>{R.onaudioprocess=null,R.disconnect(),a.clear();for(let F of h.stream.getTracks())F.stop();o.close().catch(()=>{return})}};X=re;try{let F=await N({...C,type:"microphone-open",id:E(u),payload:{sampleRate:o.sampleRate}},tt);if(!F||!("opened"in F)||F.opened!==!0)throw new l("HOST_REJECTED","Host did not open the microphone.");if(await c,X!==re)throw new l("DISCONNECTED","The microphone closed while it was opening.")}catch(F){if(X===re)X=null;throw re.release(),ze(),F}return{stream:h.stream,close:()=>{if(X!==re)return;X=null,re.release(),ze()},onEnded:(F)=>(I.add(F),()=>{I.delete(F)})}},Ft=(t)=>{if(!yo(t)||!or(t))return;t.preventDefault(),Vt()},Bt=(t)=>{if(!yo(t)||t.key!=="Escape"||d?.surface!=="popover"||!d.popover)return;t.preventDefault(),jt(d.popover.id,"escape").catch(()=>{return})},Re=()=>{let t=d?.surface==="popover"?d.popover:void 0;if(!t)return;let o=ue||Ee;if(Dt===o)return;Dt=o,Jt(t.id,o).catch(()=>{return})},he=()=>{if(d?.surface!=="popover"||ue)return;ue=!0,Re()},Kt=(t)=>{if(d?.surface!=="popover"||t.relatedTarget!==null||!ue)return;ue=!1,Re()},Wt=()=>{if(d?.surface!=="popover"||Ee)return;Ee=!0,Re()},zt=()=>{if(d?.surface!=="popover"||!Ee)return;Ee=!1,Re()},K=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},je=async(t)=>{if(t.kind!=="projects")K(t.projectId);let o=await N({...C,type:"workspace-read",id:E(u),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},Je=async(t,o)=>{if(t.kind!=="projects")K(t.projectId);let c=E(u);te.set(c,o);try{await M({...C,type:"workspace-subscribe",id:E(u),payload:{subscriptionId:c,query:t}})}catch(a){if(te.delete(c),!B)L({...C,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:c}});throw a}return()=>{if(!te.delete(c)||B)return;L({...C,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:c}})}},zo=async(t,o)=>{if(t.kind==="session")K(t.sessionId);if(t.kind==="project")K(t.projectId);let c=E(u);oe.set(c,o);try{await M({...C,type:"shells-subscribe",id:E(u),payload:{subscriptionId:c,scope:t}})}catch(a){if(oe.delete(c),!B)L({...C,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:c}});throw a}return()=>{if(!oe.delete(c)||B)return;L({...C,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:c}})}},xe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Qe))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ne(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>qe)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&d?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await N({...C,type:"storage",id:E(u),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},jt=(t,o)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):M({...C,type:"popover-close",id:E(u),payload:o?{id:t,reason:o}:{id:t}}),Jt=(t,o)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):M({...C,type:"popover-anchor",id:E(u),payload:{id:t,active:o}});return r.addEventListener("keydown",Bt,!0),r.addEventListener("pointerover",he),r.addEventListener("pointermove",he),r.addEventListener("pointerout",Kt),r.addEventListener("focus",Wt),r.addEventListener("blur",zt),{onAction:(t)=>(de=t,()=>{if(de===t)de=null}),listProjects:async()=>{let t=await je({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await je({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await je({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Je({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Je({kind:"worktrees",projectId:t},(c)=>{if(c.kind==="worktrees")o(c)}),onSessions:(t,o)=>Je({kind:"sessions",projectId:t},(c)=>{if(c.kind==="sessions")o(c)}),onRunningShells:(t,o)=>zo(t,o),readShellOutput:async(t,o)=>{K(t,ge);let c=o?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let a=o?.tailBytes;if(a!==void 0&&(!Number.isInteger(a)||a<1||a>Ie))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ie}.`);let h=await N({...C,type:"shell-output",id:E(u),payload:{shellId:t,cursor:c,tailBytes:a}});if(!h||typeof h.output!=="string"||!Number.isFinite(h.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return h},stopShell:async(t)=>{if(K(t,ge),(await N({...C,type:"shell-stop",id:E(u),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{K(t),await M({...C,type:"open-session",id:E(u),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let c=Ge(o),a={op:"get",key:t};if(c)a.scope=c;let R=await xe(a);return R.op==="get"&&R.found?R.value:void 0},set:async(t,o,c)=>{let a=Ge(c),R={op:"set",key:t,value:o};if(a)R.scope=a;await xe(R)},delete:async(t,o)=>{let c=Ge(o),a={op:"delete",key:t};if(c)a.scope=c;await xe(a)},keys:async(t)=>{let o=Ge(t),c={op:"keys"};if(o)c.scope=o;let a=await xe(c);if(a.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return a.keys}},onReady:(t)=>{if(i.add(t),d)t(d);return()=>{i.delete(t)}},onDirectory:(t)=>{if(T.add(t),d)t(d.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(p.add(t),d)t(d.session);return()=>{p.delete(t)}},onSessionLifecycle:(t)=>{if(S.add(t),z)t(z);return()=>{S.delete(t)}},onConnection:(t)=>{if(m.add(t),d)t(d.connection);return()=>{m.delete(t)}},onSettings:(t)=>{if(O.add(t),d)t(d.settings);return()=>{O.delete(t)}},onItem:(t)=>{if(x.add(t),d)t(d.item);return()=>{x.delete(t)}},onBlock:(t)=>{if(y.add(t),d?.block)t(d.block);return()=>{y.delete(t)}},onServiceEvent:(t)=>(D.add(t),()=>{D.delete(t)}),onStatusControl:(t)=>(V.add(t),()=>{V.delete(t)}),onPopoverClosed:(t)=>(Ae.add(t),()=>{Ae.delete(t)}),setStatusControls:(t)=>{if(d?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!oo(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return M({...C,type:"status-controls",id:E(u),payload:{controls:t}})},openPopover:(t)=>{if(d?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!st(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return M({...C,type:"popover-open",id:E(u),payload:t})},closePopover:jt,setPopoverAnchorActive:Jt,onResolve:(t)=>(le=t,()=>{if(le===t)le=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ue)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Ue} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ke))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${ke} characters.`));return M({channel:f,v:A,type:"toast",id:E(u),payload:{...t,message:o}})},openUrl:(t)=>M({channel:f,v:A,type:"open-url",id:E(u),payload:{url:t}}),..._o(M,()=>E(u),(t)=>Promise.reject(new l("HOST_REJECTED",t))),answerBlock:(t)=>M({channel:f,v:A,type:"block-answer",id:E(u),payload:{text:t.trim().slice(0,ct)}}),openSurface:(t)=>M({channel:f,v:A,type:"open-surface",id:E(u),payload:{surfaceId:t}}),writeClipboard:(t)=>M({channel:f,v:A,type:"clipboard-write",id:E(u),payload:{text:t}}),compose:(t)=>M({channel:f,v:A,type:"compose",id:E(u),payload:t}),attach:(t)=>M({channel:f,v:A,type:"attach",id:E(u),payload:se(t)}),startSession:async(t)=>{if(t.projectId!==void 0)K(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")K(o.directory);else{if(o.name!==void 0)K(o.name,200);if(o.baseBranch!==void 0)K(o.baseBranch,200)}let c=await N({channel:f,v:A,type:"start-session",id:E(u),payload:Et(t)},e.requestTimeoutMs??180000);if(!lt(c))throw new l("HOST_REJECTED","Host did not return a session.");return c},prompt:(t)=>N({channel:f,v:A,type:"prompt",id:E(u),payload:Tt(t)}).then((o)=>{if(!dt(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>M({channel:f,v:A,type:"session-link",id:E(u),payload:se(t)}),close:()=>M({channel:f,v:A,type:"close",id:E(u)}),oauthStart:()=>M({channel:f,v:A,type:"oauth-start",id:E(u)}),oauthDisconnect:()=>M({channel:f,v:A,type:"oauth-disconnect",id:E(u)}),request:(t)=>(Le(t.path)?N({channel:f,v:A,type:"request",id:E(u),payload:t}):No()).then((o)=>{if(!Pe(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Le(t.path)?N({channel:f,v:A,type:"service-request",id:E(u),payload:t}):No()).then((o)=>{if(!Pe(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>N({channel:f,v:A,type:"service-status",id:E(u)}).then((t)=>{if(!At(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ie(t)?N({channel:f,v:A,type:"file-read",id:E(u),payload:{path:t}}):we()).then((o)=>{if(!mt(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ie(t))return we();if(o.length>ye)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${ye} characters.`));return N({channel:f,v:A,type:"file-write",id:E(u),payload:{path:t,content:o}}).then((c)=>{if(!Ot(c))throw new l("HOST_REJECTED","Host did not confirm the write.");return c})},listDir:(t)=>(ie(t)?N({channel:f,v:A,type:"file-list",id:E(u),payload:{path:t}}):we()).then((o)=>{if(!Rt(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ie(t)?N({channel:f,v:A,type:"file-stat",id:E(u),payload:{path:t}}):we()).then((o)=>{if(!ht(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),c=t.system?.trim();if(o.length===0||o.length>Ne)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ne} characters.`));if(c!==void 0&&(c.length===0||c.length>ve))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${ve} characters.`));let a=t.maxOutputTokens===void 0?void 0:Math.min(_t,Math.max(1,Math.floor(t.maxOutputTokens)));if(a!==void 0&&!Number.isFinite(a))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let R={prompt:o};if(c!==void 0)R.system=c;if(a!==void 0)R.maxOutputTokens=a;return N({channel:f,v:A,type:"generate",id:E(u),payload:R},e.requestTimeoutMs??ut).then((h)=>{if(!xt(h))throw new l("HOST_REJECTED","Host did not return generated text.");return h})},onLateGenerateResult:(t)=>{Z.add(t);for(let o of Be.splice(0))g([t],o);return Ht(),()=>{Z.delete(t)}},openMicrophone:Wo,setBadge:(t)=>M({channel:f,v:A,type:"badge",id:E(u),payload:{count:St(t)}}),setHeight:(t)=>M({channel:f,v:A,type:"resize",id:E(u),payload:{height:ft(t)}}),onFileOpen:(t)=>{if(me.add(t),!Ke)Ke=!0,r.addEventListener("keydown",Ft,!0);if(_e)t(_e);return()=>{me.delete(t)}},onFileSnapshot:(t)=>(pe=t,()=>{if(pe===t)pe=null}),onFileSaved:(t)=>(Oe.add(t),()=>{Oe.delete(t)}),reportFileChange:(t)=>We({...C,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Vt,reportFileUnsupported:()=>We({...C,type:"file-unsupported"}),dispose:()=>{for(let t of te.keys())L({...C,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:t}});te.clear();for(let t of oe.keys())L({...C,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:t}});if(oe.clear(),X)ze(),X.release(),X=null;if(B=!0,le=null,de=null,pe=null,me.clear(),Oe.clear(),Ke)r.removeEventListener("keydown",Ft,!0);r.removeEventListener("message",$t),r.removeEventListener("keydown",Bt,!0),r.removeEventListener("pointerover",he),r.removeEventListener("pointermove",he),r.removeEventListener("pointerout",Kt),r.removeEventListener("focus",Wt),r.removeEventListener("blur",zt);for(let t of ee.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));ee.clear(),i.clear(),T.clear(),p.clear(),S.clear(),m.clear(),O.clear(),x.clear(),y.clear(),D.clear(),V.clear(),Ae.clear(),Z.clear(),Be.length=0}}};var vo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Zr=new Set(vo);var Lo=["none","agent","user"];var tn=new Set(Lo);var rr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],nr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Po=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,_]of rr)r.style.setProperty(s,e.tokens[_]);for(let[s,_,i]of nr){let T=e.tokens[i]??"";r.style.setProperty(s,T),r.style.setProperty(_,T)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},bt=(e,r)=>{if(Po(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var sr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,r)=>`var(--${e}, var(--oc-${sr[e]}, ${r}))`,J=b("surface-background","transparent"),Xe=b("surface-elevated","transparent"),ae=b("surface-elevated-foreground","inherit"),H=b("surface-foreground","inherit"),U=b("surface-muted-foreground","gray"),ir=b("surface-muted","transparent"),Q=b("interactive-border","currentColor"),P=b("interactive-hover","transparent"),q=b("interactive-active","transparent"),Ct=b("interactive-selection","transparent"),Ut=b("interactive-selection-foreground","inherit"),j=b("primary","currentColor"),kt=b("primary-text","inherit"),Mt=b("error-text","inherit"),ar=b("font-sans","inherit"),yt=b("font-mono","monospace"),Xo=b("radius","9px"),Nt=`calc(${Xo} - 2px)`,wo=`calc(${Xo} - 4px)`,k=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,Go=`background-image: linear-gradient(${P}, ${P});`,vt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Lt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Do="box-shadow: var(--oc-sdk-lit);",Pt=`inset 0 0.5px 0 0 ${k(H,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,cr=`
:root {
  --oc-sdk-edge: ${k(H,16)};
  --oc-sdk-field-bg: ${Xe};
  --oc-sdk-raised-bg: ${J};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(H,14)};
  --oc-sdk-field-bg: ${k(J,50,Xe)};
  --oc-sdk-raised-bg: ${Xe};
  --oc-sdk-field-lift: ${Pt};
  --oc-sdk-raised-lift: ${Pt};
  --oc-sdk-lit: ${Pt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,De=(e)=>{let r=b(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},n=(e)=>`calc(${e}rem / 14)`,lr=`
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
.oc-sdk { color: ${H}; font-family: ${ar}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Go} }
.oc-sdk-mono { font-family: ${yt}; }
.oc-sdk-muted { color: ${U}; }
${De("success")}${De("warning")}${De("error")}${De("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${j}; --oc-sdk-tone-text: ${kt}; }

.oc-sdk-btn { border-radius: ${Nt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${wo}; }
.oc-sdk-btn[data-variant="default"] { color: ${kt}; background: ${k(j,10,J)}; border-color: ${k(j,12)}; ${Do} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(j,16,J)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(j,22,J)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ir}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ae}; ${Lt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${q}, ${q}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${P}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${q}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${b("status-error","red")}; color: ${Mt}; background: ${k("var(--oc-sdk-tone)",7,J)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${Do} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,J)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,J)}; box-shadow: none; }

.oc-sdk-field-note { color: ${U}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Mt}; }
.oc-sdk-input { border-radius: ${Nt}; background: var(--oc-sdk-field-bg); color: ${ae}; ${vt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${U}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${vt(k(H,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${vt(b("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${yt}; }

.oc-sdk-search-icon { color: ${U}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${j}; }
.oc-sdk-search-clear { border-radius: ${wo}; color: ${U}; }
.oc-sdk-search-clear:hover { background: ${P}; color: ${H}; }

.oc-sdk-trigger { border-radius: ${Nt}; background: var(--oc-sdk-raised-bg); color: ${ae}; ${Lt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${U}; }
.oc-sdk-trigger-chevron { color: ${U}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ae}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Xe}; background-clip: padding-box; color: ${ae}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${P}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ct}; color: ${Ut}; }
.oc-sdk-option-check { color: ${H}; }
.oc-sdk-option[data-destructive="true"] { color: ${Mt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(b("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${U}; }
.oc-sdk-popup-empty { color: ${U}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Q}; border-radius: 4px; color: ${H}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(H,60,Q)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Q}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${J}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${j}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Go} }
.oc-sdk-check-desc { color: ${U}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(H,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${U}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${H}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ut}; background: ${Ct}; border-color: ${Q}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ae}; background: var(--oc-sdk-raised-bg); ${Lt} }
.oc-sdk-tab-count { color: ${U}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(H,6)}; color: ${U}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${P}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ct}; color: ${Ut}; }
.oc-sdk-row-lead { font-family: ${yt}; color: ${U}; }
.oc-sdk-row-sub { color: ${U}; }
.oc-sdk-row-meta { color: ${U}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${U}; }

.oc-sdk-empty-body { color: ${U}; }

.oc-sdk-spinner { color: ${U}; }
.oc-sdk-spinner-ring { border-color: ${Q}; border-top-color: ${j}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${U}; }

.oc-sdk-separator { color: ${U}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(Q,40)}; }

.oc-sdk-progress-label { color: ${U}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(H,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${j}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${b("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${b("success-text","inherit")}; }

.oc-sdk-text a { color: ${kt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(Q,60)}; }
`,v=`
${Ye}
${lr}
${Ho}`;var $o=2000;var fe=(e)=>typeof e==="object"&&e!==null,Er=(e)=>{if(!fe(e))return!1;if(typeof e.at!=="number"||typeof e.intervalMs!=="number")return!1;if(!fe(e.omlx)||!fe(e.omlx.summary))return!1;if(!Array.isArray(e.omlx.active_models))return!1;if(!fe(e.history))return!1;let r=e.history;if(!Array.isArray(r.omlx))return!1;if(!fe(r.system))return!1;let s=r.system;if(!Array.isArray(s.cpu)||!Array.isArray(s.memory))return!1;if(!Array.isArray(e.warnings))return!1;return!0},Tr=(e)=>{if(!(e instanceof l))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Gt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Vo=(e,r,s,_)=>{let i=!1,T=$o,p=async()=>{if(i)return;i=!0;try{if(!Gt(r))return;let x=await e.serviceRequest({method:"GET",path:"/snapshot"}),y;try{y=JSON.parse(x.body)}catch{y=null}if(x.status===200&&Er(y))s(y),T=y.omlx.summary.total_active_requests>0?100:$o;else _(x.status===200?"bad-answer":"service-failed")}catch(x){_(Tr(x))}finally{i=!1,setTimeout(()=>{p()},T)}};p();let S=Gt(r),m=()=>{let x=Gt(r);if(x&&!S)p();S=x};document.addEventListener("visibilitychange",m);let O=new ResizeObserver(m);return O.observe(document.documentElement),O.observe(r),{refresh:()=>{p()}}};var Fo=It(),W=document.getElementById("root");if(!W)throw Error("Missing #root");var Ko=document.createElement("style");Ko.textContent=`
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
  .memory-bar { height: 8px; border-radius: 999px; background: var(--oc-border); position: relative; margin: 6px 0; }
  .memory-fill { height: 100%; border-radius: 999px; transition: width .2s ease; }
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
`;document.head.append(Ko);function Sr(e){return`oc-sdk-badge ${e==="loaded"?"success":e==="loading"?"info":e==="error"?"error":"muted"}`}function fr(e){if(e.processed===null||e.total===null||e.total===0)return null;return Math.min(100,Math.round(e.processed/e.total*100))}function Bo(e){if(e===null)return"\u2014";if(e<60)return`${e.toFixed(1)}s`;return`${Math.floor(e/60)}m${Math.floor(e%60)}s`}function Ar(e){let r=document.createElement("div");r.className="card";let s=document.createElement("div");s.className="card-title",s.append(e.id,document.createElement("span"),document.createElement("span").className=Sr(e.state),document.createElement("span").innerText=e.state);let _=document.createElement("div");if(_.className="req-list",e.prefilling.length>0){let i=document.createElement("div");i.className="row-head",i.innerText="Prefill",_.append(i);for(let T of e.prefilling){let p=document.createElement("div");p.style.margin="4px 0";let S=document.createElement("div");S.className="progress";let m=document.createElement("div");m.className="progress-fill";let O=fr(T);if(O!==null)m.style.transform=`scaleX(${O/100})`;S.append(m),p.append(S);let x=document.createElement("div");x.className="req-row";let y=document.createElement("span");y.className="req-lead",y.innerText="req";let D=document.createElement("span");D.className="req-main",D.innerText=`${T.processed??0}/${T.total??0} tokens`;let V=document.createElement("span");V.className="req-meta",V.innerText=O!==null?`${O}%`:`${T.speed??0} tps`,x.append(y,D,V),_.append(p,x)}}if(e.generating.length>0){let i=document.createElement("div");i.className="row-head",i.innerText="Generate",_.append(i);for(let T of e.generating){let p=document.createElement("div");p.className="req-row";let S=document.createElement("span");S.className="req-lead",S.innerText="req";let m=document.createElement("span");m.className="req-main",m.innerText=`${T.generated_tokens??0} tokens`;let O=document.createElement("span");O.className="req-meta",O.innerText=`${T.tokens_per_second??0} tps \xB7 ${Bo(T.elapsed_seconds)}`,p.append(S,m,O),_.append(p)}}if(e.waiting.length>0){let i=document.createElement("div");i.className="row-head",i.innerText="Waiting",_.append(i);for(let T of e.waiting){let p=document.createElement("div");p.className="req-row";let S=document.createElement("span");S.className="req-lead",S.innerText=`#${T.queue_position}`;let m=document.createElement("span");m.className="req-main",m.innerText=`${T.prompt_tokens} tokens`;let O=document.createElement("span");O.className="req-meta",O.innerText=Bo(T.elapsed_seconds),p.append(S,m,O),_.append(p)}}if(!e.prefilling.length&&!e.generating.length&&!e.waiting.length){let i=document.createElement("div");i.className="empty",i.innerText="No active requests",_.append(i)}return r.append(s,_),r}function mr(e){if(W.innerHTML="",e.warnings.length>0){let p=document.createElement("div");p.className="banner",p.innerText=e.warnings.map((S)=>S.message).join("; "),W.append(p)}let r=document.createElement("div");r.className="head",r.append(document.createElement("span").className="live".concat(!e.omlx.authenticated?" stale":""),document.createElement("span").className="grow",document.createElement("span").className="big".concat(" num"),document.createElement("span").innerText=`${e.omlx.summary.models_loaded} models`,document.createElement("span").innerText="Live"),W.append(r);let s=document.createElement("div");s.className="grid";let _=(p,S)=>{let m=document.createElement("div");m.className="card";let O=document.createElement("div");O.className="card-title",O.innerText=p;let x=document.createElement("div");return x.className="big".concat(" num"),x.innerText=S,m.append(O,x),m};if(s.append(_("Active",String(e.omlx.summary.total_active_requests)),_("Waiting",String(e.omlx.summary.total_waiting_requests)),_("Prefill",String(e.omlx.summary.total_prefilling)),_("Generate",String(e.omlx.summary.total_generating))),W.append(s),e.omlx.memory_pressure){let p=e.omlx.memory_pressure,S=document.createElement("div");S.className="card";let m=document.createElement("div");m.className="card-title",m.innerText="\u6D3B\u8E8D\u6A21\u578B";let O=p.soft_bytes>0?Math.min(100,Math.round(p.current_bytes/p.soft_bytes*100)):0,x=document.createElement("div");x.className="memory-bar";let y=document.createElement("div");y.className="memory-fill",y.style.width=`${O}%`;let D="success";if(p.pressure_level==="soft")D="warning";if(p.pressure_level==="hard")D="error";let V=document.createElement("div");V.style.cssText="display: flex; justify-content: space-between; font-size: 11px; color: var(--oc-muted); margin-top: 4px;",V.innerHTML=`<span>${p.current_formatted} / ${p.soft_formatted} soft / ${p.hard_formatted} hard</span><span class="oc-sdk-badge ${D}">${p.pressure_level}</span>`,x.append(y),S.append(m,x,V),W.append(S)}let i=document.createElement("h2");i.innerText=`Models (${e.omlx.active_models.length})`,W.append(i);for(let p of e.omlx.active_models)W.append(Ar(p));let T=document.createElement("div");T.className="footer",T.innerText=`Updated every ${e.intervalMs} ms`,W.append(T)}function Or(e){W.innerHTML=`<div class="banner">${"oMLX monitor "+(e==="service-failed"?"stopped":e==="needs-approval"?"permission denied":e==="paused"?"paused":e==="bad-answer"?"unexpected response":"unreachable")}</div>`}Fo.onReady(async(e)=>{bt(e,document.documentElement),Vo(Fo,W,mr,Or).refresh()});

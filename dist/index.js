module.exports=function(e,t){"use strict";var n={};function __webpack_require__(t){if(n[t]){return n[t].exports}var r=n[t]={i:t,l:false,exports:{}};var o=true;try{e[t].call(r.exports,r,r.exports,__webpack_require__);o=false}finally{if(o)delete n[t]}r.l=true;return r.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(526)}return startup()}({16:function(e){e.exports=require("tls")},82:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.toCommandProperties=t.toCommandValue=void 0;function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue;function toCommandProperties(e){if(!Object.keys(e).length){return{}}return{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}}t.toCommandProperties=toCommandProperties},87:function(e){e.exports=require("os")},102:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);o(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issueCommand=void 0;const s=i(n(747));const a=i(n(87));const u=n(82);function issueCommand(e,t){const n=process.env[`GITHUB_${e}`];if(!n){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!s.existsSync(n)){throw new Error(`Missing file at path: ${n}`)}s.appendFileSync(n,`${u.toCommandValue(t)}${a.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},129:function(e){e.exports=require("child_process")},141:function(e,t,n){"use strict";var r=n(631);var o=n(16);var i=n(605);var s=n(211);var a=n(614);var u=n(357);var c=n(669);t.httpOverHttp=httpOverHttp;t.httpsOverHttp=httpsOverHttp;t.httpOverHttps=httpOverHttps;t.httpsOverHttps=httpsOverHttps;function httpOverHttp(e){var t=new TunnelingAgent(e);t.request=i.request;return t}function httpsOverHttp(e){var t=new TunnelingAgent(e);t.request=i.request;t.createSocket=createSecureSocket;t.defaultPort=443;return t}function httpOverHttps(e){var t=new TunnelingAgent(e);t.request=s.request;return t}function httpsOverHttps(e){var t=new TunnelingAgent(e);t.request=s.request;t.createSocket=createSecureSocket;t.defaultPort=443;return t}function TunnelingAgent(e){var t=this;t.options=e||{};t.proxyOptions=t.options.proxy||{};t.maxSockets=t.options.maxSockets||i.Agent.defaultMaxSockets;t.requests=[];t.sockets=[];t.on("free",function onFree(e,n,r,o){var i=toOptions(n,r,o);for(var s=0,a=t.requests.length;s<a;++s){var u=t.requests[s];if(u.host===i.host&&u.port===i.port){t.requests.splice(s,1);u.request.onSocket(e);return}}e.destroy();t.removeSocket(e)})}c.inherits(TunnelingAgent,a.EventEmitter);TunnelingAgent.prototype.addRequest=function addRequest(e,t,n,r){var o=this;var i=mergeOptions({request:e},o.options,toOptions(t,n,r));if(o.sockets.length>=this.maxSockets){o.requests.push(i);return}o.createSocket(i,function(t){t.on("free",onFree);t.on("close",onCloseOrRemove);t.on("agentRemove",onCloseOrRemove);e.onSocket(t);function onFree(){o.emit("free",t,i)}function onCloseOrRemove(e){o.removeSocket(t);t.removeListener("free",onFree);t.removeListener("close",onCloseOrRemove);t.removeListener("agentRemove",onCloseOrRemove)}})};TunnelingAgent.prototype.createSocket=function createSocket(e,t){var n=this;var r={};n.sockets.push(r);var o=mergeOptions({},n.proxyOptions,{method:"CONNECT",path:e.host+":"+e.port,agent:false,headers:{host:e.host+":"+e.port}});if(e.localAddress){o.localAddress=e.localAddress}if(o.proxyAuth){o.headers=o.headers||{};o.headers["Proxy-Authorization"]="Basic "+new Buffer(o.proxyAuth).toString("base64")}l("making CONNECT request");var i=n.request(o);i.useChunkedEncodingByDefault=false;i.once("response",onResponse);i.once("upgrade",onUpgrade);i.once("connect",onConnect);i.once("error",onError);i.end();function onResponse(e){e.upgrade=true}function onUpgrade(e,t,n){process.nextTick(function(){onConnect(e,t,n)})}function onConnect(o,s,a){i.removeAllListeners();s.removeAllListeners();if(o.statusCode!==200){l("tunneling socket could not be established, statusCode=%d",o.statusCode);s.destroy();var u=new Error("tunneling socket could not be established, "+"statusCode="+o.statusCode);u.code="ECONNRESET";e.request.emit("error",u);n.removeSocket(r);return}if(a.length>0){l("got illegal response body from proxy");s.destroy();var u=new Error("got illegal response body from proxy");u.code="ECONNRESET";e.request.emit("error",u);n.removeSocket(r);return}l("tunneling connection has established");n.sockets[n.sockets.indexOf(r)]=s;return t(s)}function onError(t){i.removeAllListeners();l("tunneling socket could not be established, cause=%s\n",t.message,t.stack);var o=new Error("tunneling socket could not be established, "+"cause="+t.message);o.code="ECONNRESET";e.request.emit("error",o);n.removeSocket(r)}};TunnelingAgent.prototype.removeSocket=function removeSocket(e){var t=this.sockets.indexOf(e);if(t===-1){return}this.sockets.splice(t,1);var n=this.requests.shift();if(n){this.createSocket(n,function(e){n.request.onSocket(e)})}};function createSecureSocket(e,t){var n=this;TunnelingAgent.prototype.createSocket.call(n,e,function(r){var i=e.request.getHeader("host");var s=mergeOptions({},n.options,{socket:r,servername:i?i.replace(/:.*$/,""):e.host});var a=o.connect(0,s);n.sockets[n.sockets.indexOf(r)]=a;t(a)})}function toOptions(e,t,n){if(typeof e==="string"){return{host:e,port:t,localAddress:n}}return e}function mergeOptions(e){for(var t=1,n=arguments.length;t<n;++t){var r=arguments[t];if(typeof r==="object"){var o=Object.keys(r);for(var i=0,s=o.length;i<s;++i){var a=o[i];if(r[a]!==undefined){e[a]=r[a]}}}}return e}var l;if(process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)){l=function(){var e=Array.prototype.slice.call(arguments);if(typeof e[0]==="string"){e[0]="TUNNEL: "+e[0]}else{e.unshift("TUNNEL:")}console.error.apply(console,e)}}else{l=function(){}}t.debug=l},177:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.checkBypass=t.getProxyUrl=void 0;function getProxyUrl(e){const t=e.protocol==="https:";if(checkBypass(e)){return undefined}const n=(()=>{if(t){return process.env["https_proxy"]||process.env["HTTPS_PROXY"]}else{return process.env["http_proxy"]||process.env["HTTP_PROXY"]}})();if(n){return new URL(n)}else{return undefined}}t.getProxyUrl=getProxyUrl;function checkBypass(e){if(!e.hostname){return false}const t=process.env["no_proxy"]||process.env["NO_PROXY"]||"";if(!t){return false}let n;if(e.port){n=Number(e.port)}else if(e.protocol==="http:"){n=80}else if(e.protocol==="https:"){n=443}const r=[e.hostname.toUpperCase()];if(typeof n==="number"){r.push(`${r[0]}:${n}`)}for(const e of t.split(",").map(e=>e.trim().toUpperCase()).filter(e=>e)){if(r.some(t=>t===e)){return true}}return false}t.checkBypass=checkBypass},211:function(e){e.exports=require("https")},357:function(e){e.exports=require("assert")},413:function(e,t,n){e.exports=n(141)},425:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);o(t,e);return t};var s=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});t.HttpClient=t.isHttps=t.HttpClientResponse=t.HttpClientError=t.getProxyUrl=t.MediaTypes=t.Headers=t.HttpCodes=void 0;const a=i(n(605));const u=i(n(211));const c=i(n(177));const l=i(n(413));var d;(function(e){e[e["OK"]=200]="OK";e[e["MultipleChoices"]=300]="MultipleChoices";e[e["MovedPermanently"]=301]="MovedPermanently";e[e["ResourceMoved"]=302]="ResourceMoved";e[e["SeeOther"]=303]="SeeOther";e[e["NotModified"]=304]="NotModified";e[e["UseProxy"]=305]="UseProxy";e[e["SwitchProxy"]=306]="SwitchProxy";e[e["TemporaryRedirect"]=307]="TemporaryRedirect";e[e["PermanentRedirect"]=308]="PermanentRedirect";e[e["BadRequest"]=400]="BadRequest";e[e["Unauthorized"]=401]="Unauthorized";e[e["PaymentRequired"]=402]="PaymentRequired";e[e["Forbidden"]=403]="Forbidden";e[e["NotFound"]=404]="NotFound";e[e["MethodNotAllowed"]=405]="MethodNotAllowed";e[e["NotAcceptable"]=406]="NotAcceptable";e[e["ProxyAuthenticationRequired"]=407]="ProxyAuthenticationRequired";e[e["RequestTimeout"]=408]="RequestTimeout";e[e["Conflict"]=409]="Conflict";e[e["Gone"]=410]="Gone";e[e["TooManyRequests"]=429]="TooManyRequests";e[e["InternalServerError"]=500]="InternalServerError";e[e["NotImplemented"]=501]="NotImplemented";e[e["BadGateway"]=502]="BadGateway";e[e["ServiceUnavailable"]=503]="ServiceUnavailable";e[e["GatewayTimeout"]=504]="GatewayTimeout"})(d=t.HttpCodes||(t.HttpCodes={}));var f;(function(e){e["Accept"]="accept";e["ContentType"]="content-type"})(f=t.Headers||(t.Headers={}));var p;(function(e){e["ApplicationJson"]="application/json"})(p=t.MediaTypes||(t.MediaTypes={}));function getProxyUrl(e){const t=c.getProxyUrl(new URL(e));return t?t.href:""}t.getProxyUrl=getProxyUrl;const h=[d.MovedPermanently,d.ResourceMoved,d.SeeOther,d.TemporaryRedirect,d.PermanentRedirect];const m=[d.BadGateway,d.ServiceUnavailable,d.GatewayTimeout];const v=["OPTIONS","GET","DELETE","HEAD"];const g=10;const y=5;class HttpClientError extends Error{constructor(e,t){super(e);this.name="HttpClientError";this.statusCode=t;Object.setPrototypeOf(this,HttpClientError.prototype)}}t.HttpClientError=HttpClientError;class HttpClientResponse{constructor(e){this.message=e}readBody(){return s(this,void 0,void 0,function*(){return new Promise(e=>s(this,void 0,void 0,function*(){let t=Buffer.alloc(0);this.message.on("data",e=>{t=Buffer.concat([t,e])});this.message.on("end",()=>{e(t.toString())})}))})}}t.HttpClientResponse=HttpClientResponse;function isHttps(e){const t=new URL(e);return t.protocol==="https:"}t.isHttps=isHttps;class HttpClient{constructor(e,t,n){this._ignoreSslError=false;this._allowRedirects=true;this._allowRedirectDowngrade=false;this._maxRedirects=50;this._allowRetries=false;this._maxRetries=1;this._keepAlive=false;this._disposed=false;this.userAgent=e;this.handlers=t||[];this.requestOptions=n;if(n){if(n.ignoreSslError!=null){this._ignoreSslError=n.ignoreSslError}this._socketTimeout=n.socketTimeout;if(n.allowRedirects!=null){this._allowRedirects=n.allowRedirects}if(n.allowRedirectDowngrade!=null){this._allowRedirectDowngrade=n.allowRedirectDowngrade}if(n.maxRedirects!=null){this._maxRedirects=Math.max(n.maxRedirects,0)}if(n.keepAlive!=null){this._keepAlive=n.keepAlive}if(n.allowRetries!=null){this._allowRetries=n.allowRetries}if(n.maxRetries!=null){this._maxRetries=n.maxRetries}}}options(e,t){return s(this,void 0,void 0,function*(){return this.request("OPTIONS",e,null,t||{})})}get(e,t){return s(this,void 0,void 0,function*(){return this.request("GET",e,null,t||{})})}del(e,t){return s(this,void 0,void 0,function*(){return this.request("DELETE",e,null,t||{})})}post(e,t,n){return s(this,void 0,void 0,function*(){return this.request("POST",e,t,n||{})})}patch(e,t,n){return s(this,void 0,void 0,function*(){return this.request("PATCH",e,t,n||{})})}put(e,t,n){return s(this,void 0,void 0,function*(){return this.request("PUT",e,t,n||{})})}head(e,t){return s(this,void 0,void 0,function*(){return this.request("HEAD",e,null,t||{})})}sendStream(e,t,n,r){return s(this,void 0,void 0,function*(){return this.request(e,t,n,r)})}getJson(e,t={}){return s(this,void 0,void 0,function*(){t[f.Accept]=this._getExistingOrDefaultHeader(t,f.Accept,p.ApplicationJson);const n=yield this.get(e,t);return this._processResponse(n,this.requestOptions)})}postJson(e,t,n={}){return s(this,void 0,void 0,function*(){const r=JSON.stringify(t,null,2);n[f.Accept]=this._getExistingOrDefaultHeader(n,f.Accept,p.ApplicationJson);n[f.ContentType]=this._getExistingOrDefaultHeader(n,f.ContentType,p.ApplicationJson);const o=yield this.post(e,r,n);return this._processResponse(o,this.requestOptions)})}putJson(e,t,n={}){return s(this,void 0,void 0,function*(){const r=JSON.stringify(t,null,2);n[f.Accept]=this._getExistingOrDefaultHeader(n,f.Accept,p.ApplicationJson);n[f.ContentType]=this._getExistingOrDefaultHeader(n,f.ContentType,p.ApplicationJson);const o=yield this.put(e,r,n);return this._processResponse(o,this.requestOptions)})}patchJson(e,t,n={}){return s(this,void 0,void 0,function*(){const r=JSON.stringify(t,null,2);n[f.Accept]=this._getExistingOrDefaultHeader(n,f.Accept,p.ApplicationJson);n[f.ContentType]=this._getExistingOrDefaultHeader(n,f.ContentType,p.ApplicationJson);const o=yield this.patch(e,r,n);return this._processResponse(o,this.requestOptions)})}request(e,t,n,r){return s(this,void 0,void 0,function*(){if(this._disposed){throw new Error("Client has already been disposed.")}const o=new URL(t);let i=this._prepareRequest(e,o,r);const s=this._allowRetries&&v.includes(e)?this._maxRetries+1:1;let a=0;let u;do{u=yield this.requestRaw(i,n);if(u&&u.message&&u.message.statusCode===d.Unauthorized){let e;for(const t of this.handlers){if(t.canHandleAuthentication(u)){e=t;break}}if(e){return e.handleAuthentication(this,i,n)}else{return u}}let t=this._maxRedirects;while(u.message.statusCode&&h.includes(u.message.statusCode)&&this._allowRedirects&&t>0){const s=u.message.headers["location"];if(!s){break}const a=new URL(s);if(o.protocol==="https:"&&o.protocol!==a.protocol&&!this._allowRedirectDowngrade){throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.")}yield u.readBody();if(a.hostname!==o.hostname){for(const e in r){if(e.toLowerCase()==="authorization"){delete r[e]}}}i=this._prepareRequest(e,a,r);u=yield this.requestRaw(i,n);t--}if(!u.message.statusCode||!m.includes(u.message.statusCode)){return u}a+=1;if(a<s){yield u.readBody();yield this._performExponentialBackoff(a)}}while(a<s);return u})}dispose(){if(this._agent){this._agent.destroy()}this._disposed=true}requestRaw(e,t){return s(this,void 0,void 0,function*(){return new Promise((n,r)=>{function callbackForResult(e,t){if(e){r(e)}else if(!t){r(new Error("Unknown error"))}else{n(t)}}this.requestRawWithCallback(e,t,callbackForResult)})})}requestRawWithCallback(e,t,n){if(typeof t==="string"){if(!e.options.headers){e.options.headers={}}e.options.headers["Content-Length"]=Buffer.byteLength(t,"utf8")}let r=false;function handleResult(e,t){if(!r){r=true;n(e,t)}}const o=e.httpModule.request(e.options,e=>{const t=new HttpClientResponse(e);handleResult(undefined,t)});let i;o.on("socket",e=>{i=e});o.setTimeout(this._socketTimeout||3*6e4,()=>{if(i){i.end()}handleResult(new Error(`Request timeout: ${e.options.path}`))});o.on("error",function(e){handleResult(e)});if(t&&typeof t==="string"){o.write(t,"utf8")}if(t&&typeof t!=="string"){t.on("close",function(){o.end()});t.pipe(o)}else{o.end()}}getAgent(e){const t=new URL(e);return this._getAgent(t)}_prepareRequest(e,t,n){const r={};r.parsedUrl=t;const o=r.parsedUrl.protocol==="https:";r.httpModule=o?u:a;const i=o?443:80;r.options={};r.options.host=r.parsedUrl.hostname;r.options.port=r.parsedUrl.port?parseInt(r.parsedUrl.port):i;r.options.path=(r.parsedUrl.pathname||"")+(r.parsedUrl.search||"");r.options.method=e;r.options.headers=this._mergeHeaders(n);if(this.userAgent!=null){r.options.headers["user-agent"]=this.userAgent}r.options.agent=this._getAgent(r.parsedUrl);if(this.handlers){for(const e of this.handlers){e.prepareRequest(r.options)}}return r}_mergeHeaders(e){if(this.requestOptions&&this.requestOptions.headers){return Object.assign({},w(this.requestOptions.headers),w(e||{}))}return w(e||{})}_getExistingOrDefaultHeader(e,t,n){let r;if(this.requestOptions&&this.requestOptions.headers){r=w(this.requestOptions.headers)[t]}return e[t]||r||n}_getAgent(e){let t;const n=c.getProxyUrl(e);const r=n&&n.hostname;if(this._keepAlive&&r){t=this._proxyAgent}if(this._keepAlive&&!r){t=this._agent}if(t){return t}const o=e.protocol==="https:";let i=100;if(this.requestOptions){i=this.requestOptions.maxSockets||a.globalAgent.maxSockets}if(n&&n.hostname){const e={maxSockets:i,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(n.username||n.password)&&{proxyAuth:`${n.username}:${n.password}`}),{host:n.hostname,port:n.port})};let r;const s=n.protocol==="https:";if(o){r=s?l.httpsOverHttps:l.httpsOverHttp}else{r=s?l.httpOverHttps:l.httpOverHttp}t=r(e);this._proxyAgent=t}if(this._keepAlive&&!t){const e={keepAlive:this._keepAlive,maxSockets:i};t=o?new u.Agent(e):new a.Agent(e);this._agent=t}if(!t){t=o?u.globalAgent:a.globalAgent}if(o&&this._ignoreSslError){t.options=Object.assign(t.options||{},{rejectUnauthorized:false})}return t}_performExponentialBackoff(e){return s(this,void 0,void 0,function*(){e=Math.min(g,e);const t=y*Math.pow(2,e);return new Promise(e=>setTimeout(()=>e(),t))})}_processResponse(e,t){return s(this,void 0,void 0,function*(){return new Promise((n,r)=>s(this,void 0,void 0,function*(){const o=e.message.statusCode||0;const i={statusCode:o,result:null,headers:{}};if(o===d.NotFound){n(i)}function dateTimeDeserializer(e,t){if(typeof t==="string"){const e=new Date(t);if(!isNaN(e.valueOf())){return e}}return t}let s;let a;try{a=yield e.readBody();if(a&&a.length>0){if(t&&t.deserializeDates){s=JSON.parse(a,dateTimeDeserializer)}else{s=JSON.parse(a)}i.result=s}i.headers=e.message.headers}catch(e){}if(o>299){let e;if(s&&s.message){e=s.message}else if(a&&a.length>0){e=a}else{e=`Failed request: (${o})`}const t=new HttpClientError(e,o);t.result=i.result;r(t)}else{n(i)}}))})}}t.HttpClient=HttpClient;const w=e=>Object.keys(e).reduce((t,n)=>(t[n.toLowerCase()]=e[n],t),{})},431:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);o(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issue=t.issueCommand=void 0;const s=i(n(87));const a=n(82);function issueCommand(e,t,n){const r=new Command(e,t,n);process.stdout.write(r.toString()+s.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const u="::";class Command{constructor(e,t,n){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=n}toString(){let e=u+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const n in this.properties){if(this.properties.hasOwnProperty(n)){const r=this.properties[n];if(r){if(t){t=false}else{e+=","}e+=`${n}=${escapeProperty(r)}`}}}}e+=`${u}${escapeData(this.message)}`;return e}}function escapeData(e){return a.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return a.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},470:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);o(t,e);return t};var s=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});t.getIDToken=t.getState=t.saveState=t.group=t.endGroup=t.startGroup=t.info=t.notice=t.warning=t.error=t.debug=t.isDebug=t.setFailed=t.setCommandEcho=t.setOutput=t.getBooleanInput=t.getMultilineInput=t.getInput=t.addPath=t.setSecret=t.exportVariable=t.ExitCode=void 0;const a=n(431);const u=n(102);const c=n(82);const l=i(n(87));const d=i(n(622));const f=n(742);var p;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(p=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const n=c.toCommandValue(t);process.env[e]=n;const r=process.env["GITHUB_ENV"]||"";if(r){const t="_GitHubActionsFileCommandDelimeter_";const r=`${e}<<${t}${l.EOL}${n}${l.EOL}${t}`;u.issueCommand("ENV",r)}else{a.issueCommand("set-env",{name:e},n)}}t.exportVariable=exportVariable;function setSecret(e){a.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){u.issueCommand("PATH",e)}else{a.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${d.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const n=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!n){throw new Error(`Input required and not supplied: ${e}`)}if(t&&t.trimWhitespace===false){return n}return n.trim()}t.getInput=getInput;function getMultilineInput(e,t){const n=getInput(e,t).split("\n").filter(e=>e!=="");return n}t.getMultilineInput=getMultilineInput;function getBooleanInput(e,t){const n=["true","True","TRUE"];const r=["false","False","FALSE"];const o=getInput(e,t);if(n.includes(o))return true;if(r.includes(o))return false;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n`+`Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}t.getBooleanInput=getBooleanInput;function setOutput(e,t){process.stdout.write(l.EOL);a.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){a.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=p.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){a.issueCommand("debug",{},e)}t.debug=debug;function error(e,t={}){a.issueCommand("error",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.error=error;function warning(e,t={}){a.issueCommand("warning",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.warning=warning;function notice(e,t={}){a.issueCommand("notice",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.notice=notice;function info(e){process.stdout.write(e+l.EOL)}t.info=info;function startGroup(e){a.issue("group",e)}t.startGroup=startGroup;function endGroup(){a.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return s(this,void 0,void 0,function*(){startGroup(e);let n;try{n=yield t()}finally{endGroup()}return n})}t.group=group;function saveState(e,t){a.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState;function getIDToken(e){return s(this,void 0,void 0,function*(){return yield f.OidcClient.getIDToken(e)})}t.getIDToken=getIDToken;var h=n(665);Object.defineProperty(t,"summary",{enumerable:true,get:function(){return h.summary}});var m=n(665);Object.defineProperty(t,"markdownSummary",{enumerable:true,get:function(){return m.markdownSummary}});var v=n(573);Object.defineProperty(t,"toPosixPath",{enumerable:true,get:function(){return v.toPosixPath}});Object.defineProperty(t,"toWin32Path",{enumerable:true,get:function(){return v.toWin32Path}});Object.defineProperty(t,"toPlatformPath",{enumerable:true,get:function(){return v.toPlatformPath}})},526:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;var o=Object.getOwnPropertyDescriptor(t,n);if(!o||("get"in o?!t.__esModule:o.writable||o.configurable)){o={enumerable:true,get:function(){return t[n]}}}Object.defineProperty(e,r,o)}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.prototype.hasOwnProperty.call(e,n))r(t,e,n);o(t,e);return t};var s=this&&this.__await||function(e){return this instanceof s?(this.v=e,this):new s(e)};var a=this&&this.__asyncValues||function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof __values==="function"?__values(e):e[Symbol.iterator](),n={},verb("next"),verb("throw"),verb("return"),n[Symbol.asyncIterator]=function(){return this},n);function verb(t){n[t]=e[t]&&function(n){return new Promise(function(r,o){n=e[t](n),settle(r,o,n.done,n.value)})}}function settle(e,t,n,r){Promise.resolve(r).then(function(t){e({value:t,done:n})},t)}};var u=this&&this.__asyncDelegator||function(e){var t,n;return t={},verb("next"),verb("throw",function(e){throw e}),verb("return"),t[Symbol.iterator]=function(){return this},t;function verb(r,o){t[r]=e[r]?function(t){return(n=!n)?{value:s(e[r](t)),done:r==="return"}:o?o(t):t}:o}};var c=this&&this.__asyncGenerator||function(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o={},verb("next"),verb("throw"),verb("return"),o[Symbol.asyncIterator]=function(){return this},o;function verb(e){if(r[e])o[e]=function(t){return new Promise(function(n,r){i.push([e,t,n,r])>1||resume(e,t)})}}function resume(e,t){try{step(r[e](t))}catch(e){settle(i[0][3],e)}}function step(e){e.value instanceof s?Promise.resolve(e.value.v).then(fulfill,reject):settle(i[0][2],e)}function fulfill(e){resume("next",e)}function reject(e){resume("throw",e)}function settle(e,t){if(e(t),i.shift(),i.length)resume(i[0][0],i[0][1])}};var l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const d=i(n(470));const f=n(747);const p=l(n(622));const h=l(n(669));const m=n(129);const v=n(765);const g=h.default.promisify(m.exec);const y=v.env["TEMP"]+"\\certificate.pfx";const w="C:/Program Files (x86)/Windows Kits/10/bin/10.0.17763.0/x86/signtool.exe";const _=[".dll",".exe",".sys",".vxd",".msix",".msixbundle",".appx",".appxbundle",".msi",".msp",".msm",".cab",".ps1",".psm1"];function sleep(e){if(e>0)console.log(`Waiting for ${e} seconds.`);return new Promise(t=>setTimeout(t,e*1e3))}async function createCertificatePfx(){const e=d.getInput("certificate");const t=Buffer.from(e,"base64");if(t.length==0){console.log('The value for "certificate" is not set.');return false}console.log(`Writing ${t.length} bytes to ${y}.`);await f.promises.writeFile(y,t);return true}async function addCertificateToStore(){try{const t=d.getInput("password");if(t==""){console.log("Password is required to add pfx certificate to store");return false}var e=`certutil -f -p ${t} -importpfx ${y}`;console.log("Adding cert to store command: "+e);const{stdout:n}=await g(e);console.log(n);return true}catch(e){console.log(e.stdout);console.log(e.stderr);return false}}async function signWithSigntool(e){try{var t=false;var n=d.getInput("timestampUrl");if(n===""){n="http://timestamp.verisign.com/scripts/timstamp.dll"}const i=d.getInput("debug")=="true";var r=i?"/debug /v":"";var o=`"${w}" sign ${r} /sm /t ${n}`;const s=d.getInput("certificatesha1");if(s!=""){o=o+` /sha1 "${s}"`;t=true}const a=d.getInput("certificatename");if(a!=""){t=true;o=o+` /n "${a}"`}if(!t){console.log("You need to include a NAME or a SHA1 Hash for the certificate to sign with.")}o=o+` ${e}`;console.log("Signing command: "+o);const{stdout:u}=await g(o);console.log(u);return true}catch(e){console.log(e.stdout);console.log(e.stderr);return false}}async function trySignFile(e){console.log(`Signing ${e}.`);const t=p.default.extname(e);for(let n=0;n<10;n++){await sleep(n);if(_.includes(t)){if(await signWithSigntool(e))return}}throw`Failed to sign '${e}'.`}function getFiles(e,t){return c(this,arguments,function*getFiles_1(){const n=yield s(f.promises.readdir(e));for(const r of n){const n=`${e}/${r}`;const o=yield s(f.promises.stat(n));if(o.isFile()){const e=p.default.extname(r);if(_.includes(e)||e==".nupkg")yield yield s(n)}else if(o.isDirectory()&&t){yield s(yield*u(a(getFiles(n,t))))}}})}async function signFiles(){var e,t;const n=d.getInput("folder",{required:true});const r=d.getInput("recursive")=="true";try{for(var o=a(getFiles(n,r)),i;i=await o.next(),!i.done;){const e=i.value;await trySignFile(e)}}catch(t){e={error:t}}finally{try{if(i&&!i.done&&(t=o.return))await t.call(o)}finally{if(e)throw e.error}}}async function run(){try{if(await createCertificatePfx()){if(await addCertificateToStore())await signFiles()}}catch(e){d.setFailed(`Action failed with error: ${e}`)}}run()},554:function(e,t){"use strict";var n=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});t.PersonalAccessTokenCredentialHandler=t.BearerCredentialHandler=t.BasicCredentialHandler=void 0;class BasicCredentialHandler{constructor(e,t){this.username=e;this.password=t}prepareRequest(e){if(!e.headers){throw Error("The request has no headers")}e.headers["Authorization"]=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`}canHandleAuthentication(){return false}handleAuthentication(){return n(this,void 0,void 0,function*(){throw new Error("not implemented")})}}t.BasicCredentialHandler=BasicCredentialHandler;class BearerCredentialHandler{constructor(e){this.token=e}prepareRequest(e){if(!e.headers){throw Error("The request has no headers")}e.headers["Authorization"]=`Bearer ${this.token}`}canHandleAuthentication(){return false}handleAuthentication(){return n(this,void 0,void 0,function*(){throw new Error("not implemented")})}}t.BearerCredentialHandler=BearerCredentialHandler;class PersonalAccessTokenCredentialHandler{constructor(e){this.token=e}prepareRequest(e){if(!e.headers){throw Error("The request has no headers")}e.headers["Authorization"]=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`}canHandleAuthentication(){return false}handleAuthentication(){return n(this,void 0,void 0,function*(){throw new Error("not implemented")})}}t.PersonalAccessTokenCredentialHandler=PersonalAccessTokenCredentialHandler},573:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))r(t,e,n);o(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.toPlatformPath=t.toWin32Path=t.toPosixPath=void 0;const s=i(n(622));function toPosixPath(e){return e.replace(/[\\]/g,"/")}t.toPosixPath=toPosixPath;function toWin32Path(e){return e.replace(/[/]/g,"\\")}t.toWin32Path=toWin32Path;function toPlatformPath(e){return e.replace(/[/\\]/g,s.sep)}t.toPlatformPath=toPlatformPath},605:function(e){e.exports=require("http")},614:function(e){e.exports=require("events")},622:function(e){e.exports=require("path")},631:function(e){e.exports=require("net")},665:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});t.summary=t.markdownSummary=t.SUMMARY_DOCS_URL=t.SUMMARY_ENV_VAR=void 0;const o=n(87);const i=n(747);const{access:s,appendFile:a,writeFile:u}=i.promises;t.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY";t.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";class Summary{constructor(){this._buffer=""}filePath(){return r(this,void 0,void 0,function*(){if(this._filePath){return this._filePath}const e=process.env[t.SUMMARY_ENV_VAR];if(!e){throw new Error(`Unable to find environment variable for $${t.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`)}try{yield s(e,i.constants.R_OK|i.constants.W_OK)}catch(t){throw new Error(`Unable to access summary file: '${e}'. Check if the file has correct read/write permissions.`)}this._filePath=e;return this._filePath})}wrap(e,t,n={}){const r=Object.entries(n).map(([e,t])=>` ${e}="${t}"`).join("");if(!t){return`<${e}${r}>`}return`<${e}${r}>${t}</${e}>`}write(e){return r(this,void 0,void 0,function*(){const t=!!(e===null||e===void 0?void 0:e.overwrite);const n=yield this.filePath();const r=t?u:a;yield r(n,this._buffer,{encoding:"utf8"});return this.emptyBuffer()})}clear(){return r(this,void 0,void 0,function*(){return this.emptyBuffer().write({overwrite:true})})}stringify(){return this._buffer}isEmptyBuffer(){return this._buffer.length===0}emptyBuffer(){this._buffer="";return this}addRaw(e,t=false){this._buffer+=e;return t?this.addEOL():this}addEOL(){return this.addRaw(o.EOL)}addCodeBlock(e,t){const n=Object.assign({},t&&{lang:t});const r=this.wrap("pre",this.wrap("code",e),n);return this.addRaw(r).addEOL()}addList(e,t=false){const n=t?"ol":"ul";const r=e.map(e=>this.wrap("li",e)).join("");const o=this.wrap(n,r);return this.addRaw(o).addEOL()}addTable(e){const t=e.map(e=>{const t=e.map(e=>{if(typeof e==="string"){return this.wrap("td",e)}const{header:t,data:n,colspan:r,rowspan:o}=e;const i=t?"th":"td";const s=Object.assign(Object.assign({},r&&{colspan:r}),o&&{rowspan:o});return this.wrap(i,n,s)}).join("");return this.wrap("tr",t)}).join("");const n=this.wrap("table",t);return this.addRaw(n).addEOL()}addDetails(e,t){const n=this.wrap("details",this.wrap("summary",e)+t);return this.addRaw(n).addEOL()}addImage(e,t,n){const{width:r,height:o}=n||{};const i=Object.assign(Object.assign({},r&&{width:r}),o&&{height:o});const s=this.wrap("img",null,Object.assign({src:e,alt:t},i));return this.addRaw(s).addEOL()}addHeading(e,t){const n=`h${t}`;const r=["h1","h2","h3","h4","h5","h6"].includes(n)?n:"h1";const o=this.wrap(r,e);return this.addRaw(o).addEOL()}addSeparator(){const e=this.wrap("hr",null);return this.addRaw(e).addEOL()}addBreak(){const e=this.wrap("br",null);return this.addRaw(e).addEOL()}addQuote(e,t){const n=Object.assign({},t&&{cite:t});const r=this.wrap("blockquote",e,n);return this.addRaw(r).addEOL()}addLink(e,t){const n=this.wrap("a",e,{href:t});return this.addRaw(n).addEOL()}}const c=new Summary;t.markdownSummary=c;t.summary=c},669:function(e){e.exports=require("util")},742:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});t.OidcClient=void 0;const o=n(425);const i=n(554);const s=n(470);class OidcClient{static createHttpClient(e=true,t=10){const n={allowRetries:e,maxRetries:t};return new o.HttpClient("actions/oidc-client",[new i.BearerCredentialHandler(OidcClient.getRequestToken())],n)}static getRequestToken(){const e=process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];if(!e){throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable")}return e}static getIDTokenUrl(){const e=process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];if(!e){throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable")}return e}static getCall(e){var t;return r(this,void 0,void 0,function*(){const n=OidcClient.createHttpClient();const r=yield n.getJson(e).catch(e=>{throw new Error(`Failed to get ID Token. \n \n        Error Code : ${e.statusCode}\n \n        Error Message: ${e.result.message}`)});const o=(t=r.result)===null||t===void 0?void 0:t.value;if(!o){throw new Error("Response json body do not have ID Token field")}return o})}static getIDToken(e){return r(this,void 0,void 0,function*(){try{let t=OidcClient.getIDTokenUrl();if(e){const n=encodeURIComponent(e);t=`${t}&audience=${n}`}s.debug(`ID token url is ${t}`);const n=yield OidcClient.getCall(t);s.setSecret(n);return n}catch(e){throw new Error(`Error message: ${e.message}`)}})}}t.OidcClient=OidcClient},747:function(e){e.exports=require("fs")},765:function(e){e.exports=require("process")}});
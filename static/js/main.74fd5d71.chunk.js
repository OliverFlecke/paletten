(this["webpackJsonptemperature-website"]=this["webpackJsonptemperature-website"]||[]).push([[0],{158:function(e,n){},159:function(e,n){},166:function(e,n,t){},167:function(e,n,t){"use strict";t.r(n);var o=t(0),c=t.n(o),a=t(59),r=t.n(a),i=(t(66),t(29)),l=t(60),u=t.n(l),s=(t(166),[{id:"C4402D",name:"Table"},{id:"C431FB",name:"Sofa"},{id:"10DB9C",name:"Bedroom"}]),m=u.a.connect("ws://palletten.northeurope.azurecontainer.io:9001");function f(e){m.publish("shellies/shelly1-".concat(e.id,"/relay/0/command"),"toggle")}m.on("connect",(function(){console.log("connected"),s.forEach((function(e){m.subscribe("shellies/shelly1-".concat(e.id,"/relay/0"),(function(e){}))})),m.subscribe("temperature",(function(e){})),m.subscribe("humidity",(function(e){}))}));var b=function(){var e=Object(o.useState)(),n=Object(i.a)(e,2),t=n[0],a=n[1],r=Object(o.useState)(),l=Object(i.a)(r,2),u=l[0],b=l[1];Object(o.useEffect)((function(){m.on("message",(function(e,n){switch(e){case"temperature":console.log(n.toString()),a(Number(n));break;case"humidity":console.log(n.toString()),b(Number(n))}}))}),[]);var h=Object(o.useCallback)((function(){s.forEach((function(e){return f(e)}))}),[]);return c.a.createElement("div",{className:"App"},c.a.createElement("h1",null,"Palletten"),c.a.createElement("div",null,"Current temperature: ",null!==t&&void 0!==t?t:"unknown"," \xb0C"),c.a.createElement("div",null,"Current humidity: ",u),c.a.createElement("div",null,s.map((function(e){return c.a.createElement(d,{key:e.id,shelly:e})}))),c.a.createElement("button",{onClick:h},"Toggle all"))},d=function(e){var n=e.shelly,t=Object(o.useCallback)((function(){f(n)}),[n]);return c.a.createElement("button",{onClick:t},n.name)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},61:function(e,n,t){e.exports=t(167)},66:function(e,n,t){},69:function(e,n){},71:function(e,n){}},[[61,1,2]]]);
//# sourceMappingURL=main.74fd5d71.chunk.js.map
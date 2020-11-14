(this["webpackJsonptemperature-website"]=this["webpackJsonptemperature-website"]||[]).push([[0],{109:function(e,t){},110:function(e,t){},112:function(e,t){},114:function(e,t){},123:function(e,t,n){"use strict";n.r(t);var c,r=n(0),s=n(1),i=n.n(s),a=n(59),u=n.n(a),l=(n(67),n(27)),o=n(8),f=n(26),b=n(60),d=function(e){var t=e.color,n=e.children,c=e.className,s=e.onClick;return Object(r.jsx)("button",{onClick:s,className:"text-white p-2 m-2 text-xl rounded ".concat(j(null!==t&&void 0!==t?t:"blue")," ").concat(c),children:n})};function j(e){switch(e){case"blue":return"bg-blue-900";case"red":return"bg-red-900";case"green":return"bg-green-900";default:return"bg-gray-700"}}!function(e){e[e.On=0]="On",e[e.Off=1]="Off"}(c||(c={}));var m=function(e){var t=e.state,n=e.name;return Object(r.jsxs)("div",{className:"w-full max-w-xs",children:[Object(r.jsx)("h3",{className:"text-xl",children:n}),Object(r.jsxs)("div",{className:"flex justify-between w-full",children:["Temperatur: ",Object(r.jsxs)("span",{children:[t.temperature," \xb0C"]})]}),Object(r.jsxs)("div",{className:"flex justify-between w-full",children:["Fugtighed:",Object(r.jsxs)("span",{children:[t.humidity," %"]})]})]})},h=n(61),x=function(e){var t=e.shelly,n=Object(s.useCallback)((function(){p(t)}),[t]);return Object(r.jsxs)(d,{onClick:n,color:w(t.state),children:[Object(r.jsx)("span",{className:"inline-flex flex-col h-full justify-center px-2",children:Object(r.jsx)(h.a,{size:"20px"})}),Object(r.jsx)("span",{children:t.name})]})},O=[{id:"C4402D",name:"Spisebord"},{id:"C431FB",name:"Sofa"},{id:"10DB9C",name:"Sovev\xe6relse"}],v=Object(b.connect)("wss://palletten.northeurope.azurecontainer.io:8083");function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"toggle";v.publish("shellies/shelly1-".concat(e.id,"/relay/0/command"),t)}function g(e){var t=e.match(Object(f.a)(/\/([0-9A-Z_a-z]+)$/,{place:1}));return(null===t||void 0===t?void 0:t.groups)?null===t||void 0===t?void 0:t.groups.place:void 0}function w(e){switch(e){case c.Off:return"red";case c.On:return"green";default:return"grey"}}function y(){var e=Object(s.useState)(),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(s.useState)(),i=Object(o.a)(r,2);return[{temperature:n,humidity:i[0]},{setTemperature:c,setHumidity:i[1]}]}var N=function(){var e=y(),t=Object(o.a)(e,2),n=t[0],i=t[1],a=y(),u=Object(o.a)(a,2),b=u[0],j=u[1],h=Object(s.useState)(O),w=Object(o.a)(h,2),N=w[0],C=w[1],S=N.map((function(e){return e.id}));Object(s.useEffect)((function(){v.on("connect",(function(){console.log("connected"),S.forEach((function(e){v.subscribe("shellies/shelly1-".concat(e,"/relay/0"),(function(e){return console.error(e)}))})),["inside","outside"].forEach((function(e){v.subscribe("temperature/".concat(e),(function(e){return console.error(e)})),v.subscribe("humidity/".concat(e),(function(e){return console.error(e)}))}))}))}),[]),Object(s.useEffect)((function(){v.on("message",(function(e,t){if(e.startsWith("temperature/"))switch(g(e)){case"inside":null===i||void 0===i||i.setTemperature(Number(t));break;case"outside":null===j||void 0===j||j.setTemperature(Number(t))}else if(e.startsWith("humidity/"))switch(g(e)){case"inside":i.setHumidity(Number(t));break;case"outside":j.setHumidity(Number(t))}if(e.startsWith("shellies")){var n=e.match(Object(f.a)(/\x2D([0-9A-Z_a-z]*)/,{id:1}));if(null===n||void 0===n?void 0:n.groups){var r="on"===t.toString()?c.On:c.Off,s=null===n||void 0===n?void 0:n.groups.id;C((function(e){return e.map((function(e){return Object(l.a)(Object(l.a)({},e),{},{state:e.id===s?r:e.state})}))}))}}}))}),[j,i]);var E=Object(s.useCallback)((function(){N.forEach((function(e){return p(e,"on")}))}),[N]),T=Object(s.useCallback)((function(){N.forEach((function(e){return p(e,"off")}))}),[N]);return Object(r.jsxs)("div",{className:"flex flex-col justify-center items-center text-center mx-4 text-black dark:text-gray-500",children:[Object(r.jsx)("h1",{className:"text-4xl",children:"Palletten"}),Object(r.jsxs)("div",{className:"flex justify-between space-x-6 pb-4 max-w-lg w-full",children:[Object(r.jsx)(m,{name:"Inde",state:n}),Object(r.jsx)(m,{name:"Ude",state:b})]}),Object(r.jsx)("div",{className:"w-full flex flex-col justify-center align-middle",children:N.map((function(e){return Object(r.jsx)(x,{shelly:e},e.id)}))}),Object(r.jsx)("hr",{className:"w-full my-4"}),Object(r.jsxs)("div",{className:"w-full flex flex-col justify-center align-middle",children:[Object(r.jsx)(d,{onClick:E,children:"T\xe6nd alt"}),Object(r.jsx)(d,{onClick:T,children:"Sluk alt"})]}),Object(r.jsx)("hr",{className:"w-full my-4"}),Object(r.jsx)(k,{})]})},k=function(){var e=Object(s.useState)(0),t=Object(o.a)(e,2),n=t[0],c=t[1],i=Object(s.useCallback)((function(e){var t=e.currentTarget.valueAsNumber;c(t),v.publish("temperature/set",t.toString(),{retain:!0})}),[c]);return Object(s.useEffect)((function(){v.subscribe("temperature/set"),v.on("message",(function(e,t){if("temperature/set"===e){var n=Number(t.toString());c(n),v.unsubscribe("temperature/set")}}))}),[c]),Object(r.jsxs)("div",{className:"w-full",children:[Object(r.jsx)("input",{className:"w-11/12",type:"range",min:"0",max:"25",value:n,onChange:i}),Object(r.jsxs)("div",{children:["\xd8nskede temperature: ",n," \xb0C"]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(N,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},67:function(e,t,n){},71:function(e,t){},73:function(e,t){},89:function(e,t){},91:function(e,t){}},[[123,1,2]]]);
//# sourceMappingURL=main.6125720b.chunk.js.map
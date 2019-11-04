!function(e){var n={};function o(t){if(n[t])return n[t].exports;var c=n[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=1)}([function(e,n,o){"use strict";var t=function(e,n){var o=e.match(n);return o&&2==o.length?o[1]:null},c=function(e,n){for(var o=e.split(" "),t=new Array,c=0,i=0;i<o.length;i++)3===c&&(t[c++]=n),o[i]!==n&&(t[c++]=o[i]);return t.join(" ")},i=function(e,n){for(var o=e[n].split(" "),c=e.length-1;c>=0;c--){var i=t(e[c],/a=rtpmap:(\d+) CN\/\d+/i);if(i){var r=o.indexOf(i);-1!==r&&o.splice(r,1),e.splice(c,1)}}return e[n]=o.join(" "),e};e.exports={preferOpus:function(e){for(var n=e.split("\r\n"),o=0;o<n.length;o++)if(-1!==n[o].search("m=audio")){var r=o;break}if(null===r)return e;for(o=0;o<n.length;o++)if(-1!==n[o].search("opus/48000")){var a=t(n[o],/:(\d+) opus\/48000/i);a&&(n[r]=c(n[r],a));break}return e=(n=i(n,r)).join("\r\n")}}},function(e,n,o){"use strict";var t,c,i,r,a=o(0),s=(t=a)&&t.__esModule?t:{default:t};var l,d,u,f={audio:!0},m=!1,p=!1,g=null,h=null,C=null,v=document.createElement("audio");v.setAttribute("preload","auto"),v.load;var w,y,b=0,O=1,R=!1;function T(){var e=k;S.emit("disconnect room",{room:e}),D.getAudioTracks()[0].stop();for(var n=Object.keys(N),o=0;o<n.length;o++)N[n[o]].rtcConn.close(),delete N[n[o]];N={},D=null,k=null,l=null,b=Object.keys(N).length,x()}function I(e){e.on("room null",function(){console.log("invalid room"),g=null,v.srcObject=null,p=!1,h=null,x()}),e.on("src ice",function(n){n.room===h&&n.id===e.id?C.addIceCandidate(new RTCIceCandidate(n.candidate)).then(console.log("Ice Candidate added successfully")).catch(function(e){return console.log("ERROR on addIceCandidate: "+e)}):console.log("ICE Candidate not for me")}),e.on("src desc",function(n){n.room===h&&n.id===e.id?C.setRemoteDescription(new RTCSessionDescription(n.desc)).then(function(){console.log("Setting remote description success"),j(n.desc)}):console.log("ICE Candidate not for me")})}function j(e){C.createAnswer().then(function(e){C.setLocalDescription(new RTCSessionDescription(e)).then(function(){S.emit("peer new desc",{id:S.id,room:h,desc:e})})})}chrome.runtime.onConnect.addListener(function(e){d=e,e.onMessage.addListener(function(e){var n,o;"init"==e.type&&(S.emit("create room",e.roomName),chrome.tabs.onUpdated.addListener(function(e,n){n.title&&e===l&&(console.log(n.title),w=n.title,console.log("sending new title to all peers"),Object.keys(N).forEach(function(e){var n=N[e].dataChannel;if("open"===n.readyState){var o=JSON.stringify({title:w});n.send(o)}}),x())})),"play"==e.type&&(h||(h=e.roomName,console.log("Active session with ID: "+h+" found!"),S.emit("new peer",h),I(S),(C=new RTCPeerConnection(A,{optional:[{RtpDataChannels:!0}]})).onicecandidate=function(e){e.candidate?(S.emit("peer new ice",{id:S.id,room:h,candidate:e.candidate}),console.log(S.id)):console.log("No candidate for RTC connection")},C.ondatachannel=function(e){e.channel.onmessage=function(e){try{var n=JSON.parse(e.data);y=n.title,console.log(y),x()}catch(e){console.log(e)}}},C.ontrack=function(e){g=new MediaStream([e.track]);try{v.srcObject=g}catch(e){console.log(e)}},v.pause(),p=!1),h!=e.roomName&&(console.log("changing room"),h=e.roomName,S.emit("new peer",h),I(S),(C=new RTCPeerConnection(A)).onicecandidate=function(e){e.candidate?S.emit("peer new ice",{id:S.id,room:h,candidate:e.candidate}):console.log("No candidate for RTC connection")},C.ondatachannel=function(e){e.channel.onmessage=function(e){try{var n=JSON.parse(e.data);y=n.title,console.log(y)}catch(e){console.log(e)}}},C.ontrack=function(e){g=new MediaStream([e.track]);try{v.srcObject=g,v.play(),p=!0}catch(e){console.log(e)}}),p?(v.pause(),p=!1):(v.play(),p=!0),x()),"stopToonin"==e.type&&(S.emit("logoff",{from:S.id,to:h}),g=null,v.srcObject=null,p=!1,h=null,C=null,x()),"stopSharing"==e.type&&T(),"toggleMute"==e.type&&(D.getAudioTracks()[0].enabled=Boolean(e.value),m=!e.value),"volume"==e.type&&(n=e.value,o=parseInt(n,10)/parseInt(100,10),O=o*o,console.log(o),R||C?C&&(v.volume=O):r.gain.value=O)})}),chrome.tabs.onRemoved.addListener(function(e,n){e===l&&T()}),chrome.runtime.onMessage.addListener(function(e,n,o){"extension_state"===e.message&&x()}),chrome.tabs.onUpdated.addListener(function(e,n){n.mutedInfo&&e===l&&(n.mutedInfo.muted?(R=!0,r.gain.value=0):(R=!1,r.gain.value=O),x())}),console.log("application script running");var D,k,S=io("http://www.toonin.ml:8100"),N={},A={iceServers:[{urls:["stun:stun.l.google.com:19302","stun:stun2.l.google.com:19302","stun:stun3.l.google.com:19302","stun:stun4.l.google.com:19302"]}]},M={offerToReceiveAudio:1};function x(){var e={roomID:k,tabID:l,playing:v.srcObject,room:h,muted:m,peerCounter:b,hostTitle:y,title:w,volume:O,tabMute:R};chrome.runtime.sendMessage({message:"extension_state_from_background",data:e})}S.on("room created",function(e){console.log("New room created with ID: "+e),k=e,chrome.tabCapture.capture(f,function(e){if(e){var n=e.getAudioTracks();D=new MediaStream(n),u=new AudioContext,(r=u.createGain()).connect(u.destination),(i=u.createMediaStreamSource(D)).connect(r),r.gain.value=1,c=u.createMediaStreamDestination(),i.connect(c),console.log("Tab audio captured. Now sending url to injected content script"),chrome.tabs.query({active:!0,currentWindow:!0},function(e){var n=e[0];n&&(l=n.id,w=n.title,x())})}else console.error("Error starting tab capture: "+(chrome.runtime.lastError.message||"UNKNOWN"))})}),S.on("room creation failed",function(e){d.postMessage({type:"room creation fail",reason:e})}),S.on("peer joined",function(e){console.log("New peer has joined the room"),N[e.id]={id:e.id,room:e.room,iceCandidates:[]},b=Object.keys(N).length,x(),function(e){console.log("Starting new connection for peer: "+e);var n=new RTCPeerConnection(A,{optional:[{RtpDataChannels:!0}]});n.addTrack(c.stream.getAudioTracks()[0]),N[e].rtcConn=n,N[e].dataChannel=N[e].rtcConn.createDataChannel("mediaDescription"),N[e].rtcConn.onicecandidate=function(n){n.candidate?(N[e].iceCandidates.push(n.candidate),S.emit("src new ice",{id:e,room:k,candidate:n.candidate})):console.log("No candidate for RTC connection")},n.createOffer(M).then(function(o){s.default.preferOpus(o.sdp),n.setLocalDescription(new RTCSessionDescription(o)).then(function(){N[e].localDesc=o,S.emit("src new desc",{id:e,room:k,desc:o})})}),N[e].dataChannel.addEventListener("open",function(n){console.log("sending title to new peer"),N[e].dataChannel.send(JSON.stringify({title:w}))})}(e.id)}),S.on("peer ice",function(e){console.log("Ice Candidate from peer: "+e.id+" in room: "+e.room),console.log("Ice Candidate: "+e.candidate),k==e.room&&e.id in N?N[e.id].rtcConn.addIceCandidate(new RTCIceCandidate(e.candidate)).then(console.log("Ice Candidate added successfully for peer: "+e.id)).catch(function(e){console.log("Error on addIceCandidate: "+e)}):console.log("Ice Candidate not for me")}),S.on("peer desc",function(e){console.log("Answer description from peer: "+e.id+" in room: "+e.room),console.log("Answer description: "+e.desc),k==e.room&&e.id in N?N[e.id].rtcConn.setRemoteDescription(new RTCSessionDescription(e.desc)).then(function(){console.log("Remote description set successfully for peer: "+e.id)}).catch(function(e){console.log("Error on setRemoteDescription: "+e)}):console.log("Answer Description not for me")}),S.on("peer disconnected",function(e){console.log("peer disconnected");try{N[e.id].rtcConn.removeTrack(c.stream.getAudioTracks()[0])}catch(e){console.log(e)}N[e.id].rtcConn=void 0,delete N[e.id],b=Object.keys(N).length,x()}),S.on("host disconnected",function(){console.log("host disconnected"),g=null,v.srcObject=null,p=!1,h=null,C=null,x()})}]);
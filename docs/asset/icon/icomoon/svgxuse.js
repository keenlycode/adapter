var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});(function(){"use strict";if(typeof window<"u"&&window.addEventListener){var cache=Object.
create(null),checkUseElems,tid,debouncedCheck=__name(function(){clearTimeout(tid),
tid=setTimeout(checkUseElems,100)},"debouncedCheck"),unobserveChanges=__name(function(){},
"unobserveChanges"),observeChanges=__name(function(){var observer;window.addEventListener(
"resize",debouncedCheck,!1),window.addEventListener("orientationchange",debouncedCheck,
!1),window.MutationObserver?(observer=new MutationObserver(debouncedCheck),observer.
observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),unobserveChanges=
__name(function(){try{observer.disconnect(),window.removeEventListener("resize",
debouncedCheck,!1),window.removeEventListener("orientationchange",debouncedCheck,
!1)}catch{}},"unobserveChanges")):(document.documentElement.addEventListener("DO\
MSubtreeModified",debouncedCheck,!1),unobserveChanges=__name(function(){document.
documentElement.removeEventListener("DOMSubtreeModified",debouncedCheck,!1),window.
removeEventListener("resize",debouncedCheck,!1),window.removeEventListener("orie\
ntationchange",debouncedCheck,!1)},"unobserveChanges"))},"observeChanges"),createRequest=__name(
function(url){function getOrigin(loc){var a;return loc.protocol!==void 0?a=loc:(a=
document.createElement("a"),a.href=loc),a.protocol.replace(/:/g,"")+a.host}__name(
getOrigin,"getOrigin");var Request,origin,origin2;return window.XMLHttpRequest&&
(Request=new XMLHttpRequest,origin=getOrigin(location),origin2=getOrigin(url),Request.
withCredentials===void 0&&origin2!==""&&origin2!==origin?Request=XDomainRequest||
void 0:Request=XMLHttpRequest),Request},"createRequest"),xlinkNS="http://www.w3.\
org/1999/xlink";checkUseElems=__name(function(){var base,bcr,fallback="",hash,href,
i,inProgressCount=0,isHidden,Request,url,uses,xhr;function observeIfDone(){inProgressCount-=
1,inProgressCount===0&&(unobserveChanges(),observeChanges())}__name(observeIfDone,
"observeIfDone");function attrUpdateFunc(spec){return function(){cache[spec.base]!==
!0&&(spec.useEl.setAttributeNS(xlinkNS,"xlink:href","#"+spec.hash),spec.useEl.hasAttribute(
"href")&&spec.useEl.setAttribute("href","#"+spec.hash))}}__name(attrUpdateFunc,"\
attrUpdateFunc");function onloadFunc(xhr2){return function(){var body=document.body,
x=document.createElement("x"),svg;xhr2.onload=null,x.innerHTML=xhr2.responseText,
svg=x.getElementsByTagName("svg")[0],svg&&(svg.setAttribute("aria-hidden","true"),
svg.style.position="absolute",svg.style.width=0,svg.style.height=0,svg.style.overflow=
"hidden",body.insertBefore(svg,body.firstChild)),observeIfDone()}}__name(onloadFunc,
"onloadFunc");function onErrorTimeout(xhr2){return function(){xhr2.onerror=null,
xhr2.ontimeout=null,observeIfDone()}}for(__name(onErrorTimeout,"onErrorTimeout"),
unobserveChanges(),uses=document.getElementsByTagName("use"),i=0;i<uses.length;i+=
1){try{bcr=uses[i].getBoundingClientRect()}catch{bcr=!1}href=uses[i].getAttribute(
"href")||uses[i].getAttributeNS(xlinkNS,"href")||uses[i].getAttribute("xlink:hre\
f"),href&&href.split?url=href.split("#"):url=["",""],base=url[0],hash=url[1],isHidden=
bcr&&bcr.left===0&&bcr.right===0&&bcr.top===0&&bcr.bottom===0,bcr&&bcr.width===0&&
bcr.height===0&&!isHidden?(fallback&&!base.length&&hash&&!document.getElementById(
hash)&&(base=fallback),uses[i].hasAttribute("href")&&uses[i].setAttributeNS(xlinkNS,
"xlink:href",href),base.length&&(xhr=cache[base],xhr!==!0&&setTimeout(attrUpdateFunc(
{useEl:uses[i],base,hash}),0),xhr===void 0&&(Request=createRequest(base),Request!==
void 0&&(xhr=new Request,cache[base]=xhr,xhr.onload=onloadFunc(xhr),xhr.onerror=
onErrorTimeout(xhr),xhr.ontimeout=onErrorTimeout(xhr),xhr.open("GET",base),xhr.send(),
inProgressCount+=1)))):isHidden?base.length&&cache[base]&&setTimeout(attrUpdateFunc(
{useEl:uses[i],base,hash}),0):cache[base]===void 0?cache[base]=!0:cache[base].onload&&
(cache[base].abort(),delete cache[base].onload,cache[base]=!0)}uses="",inProgressCount+=
1,observeIfDone()},"checkUseElems");var winLoad;winLoad=__name(function(){window.
removeEventListener("load",winLoad,!1),tid=setTimeout(checkUseElems,0)},"winLoad"),
document.readyState!=="complete"?window.addEventListener("load",winLoad,!1):winLoad()}})();
/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
//# sourceMappingURL=svgxuse.js.map

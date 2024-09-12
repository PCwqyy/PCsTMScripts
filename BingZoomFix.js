// ==UserScript==
// @name        Bing zoom fix
// @match       https://cn.bing.com/*
// @grant       none
// @version     1.0
// @author      PCwqyy
// @description bing is suck!
// ==/UserScript==
(window.onresize=function(){
    document.getElementsByTagName('body')[0].style.zoom=0.85;
})()
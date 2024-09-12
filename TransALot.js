// ==UserScript==
// @name         Transition alot
// @namespace    http://tampermonkey.net/
// @version      v1.1
// @description  make the world transition!
// @author       PCwqyy
// @match        http://*/*
// @match        https://*/*
// @icon         https://cdn.luogu.com.cn/upload/usericon/567385.png
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    var Body114=document.querySelector("body");
    var Style114=document.createElement('style');
    Style114.textContent="*{transition: 2s;}a{transition: 0.5s;}span{transition: 0s;}";
    Body114.appendChild(Style114);
})();
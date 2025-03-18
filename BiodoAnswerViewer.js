// ==UserScript==
// @name		Biodo Answer Viewer
// @namespace	http://tampermonkey.net/
// @version		v1.1
// @description	Show the correct ans of biodo test
// @author		PCwqyy
// @match		examin.biodo.com/examin/*
// @icon		
// @grant		none
// @license		MIT
// @downloadURL	https://update.greasyfork.org/scripts/524276/Biodo%20Answer%20Viewer.user.js
// @updateURL	https://update.greasyfork.org/scripts/524276/Biodo%20Answer%20Viewer.meta.js
// ==/UserScript==

(function() {
	var a;
	var ChoosedCell=document.getElementsByClassName('choose');
	var Result=jQuery('table:not(.answercell)')[0];
	Result.classList.add('Result');
	var Ansing=document.getElementById('bnt2')!=null;
	try
	{
		for(var i in ChoosedCell)
		{
			if(ChoosedCell[i].style.backgroundColor=='red')
			{
				a=i-(i%2*2-1);
				ChoosedCell[a].style.backgroundColor='limegreen',
				ChoosedCell[a].style.color='white';
				ChoosedCell[i].style.color='white';
			}
			else if(ChoosedCell[i].style.backgroundColor=='green')
			{
				ChoosedCell[i].style.backgroundColor='limegreen',
				ChoosedCell[i].style.color='white';
			}
		}
	}
	catch(error){console.error('err',error);}
	var Body=document.getElementsByTagName('body')[0];
	var StyleSheet=document.createElement('style');
	StyleSheet.textContent=`
		*{
			user-select: none;
		}
		.answercell td.choose {
			border: gray;
			background-color: white;
			${
				Ansing?
				`padding: 0.5vh 1vw;
				font-size: 20px;`:
				`pointer-events: none;`
			}
		}
		.answercell td.choose:hover {
			background-color: aliceblue;
			color: lightseagreen;
		}
		.answercell td:not(.choose) {
			padding: 0 2px !important;
		}
		.answercell td.choose.choice {
			background-color: deepskyblue;
			color: white;
		}
		.answercell td.choose.choice:hover {
			background-color: dodgerblue;
			color: white;
		}
		table:not(.answercell) {
			border: none !important;
			padding: 2vh;
			background-color: azure !important;
			font-weight: normal !important;
			border-radius: 10px;
		}
		body>div {
			background-color: white !important;
			padding: 5vh 1vw !important;
			margin: 2vh 2vw !important;
			width: unset !important;
			box-shadow: gray 2px 2px 10px;
		}
	`
	Body.appendChild(StyleSheet);

	var ScoreNew=Result.textContent.match(/得分（新）：\s+(\d+)/m)[0].match(/\d+/m)[0];
	var ScoreOld=Result.textContent.match(/得分（旧）：\s+(\d+)/m)[0].match(/\d+/m)[0];
})();

(function(){
	var Body=document.getElementsByTagName('body')[0];
	var StyleSheet=document.createElement('style');
	StyleSheet.textContent=`
	span.player {
		position: fixed;
			display: flex;
			top: 0;
			left: 0;
			width: 4vmin;
			height: 4vmin;
			border: green solid 1vmin;
			border-radius: 50%;
			background-color: limegreen;
			transition: 0.3s;
			transition-timing-function: leaner;
		}
	`
	Body.appendChild(StyleSheet);
	var Player=document.createElement('span');
	Player.classList.add('player');
	Body.appendChild(Player);
	var wi=Player.getBoundingClientRect().width;
	var hi=Player.getBoundingClientRect().height;
	var aG=10,af=1,aF=10,aN=-30,x=0,y=0,speed=[0,0];
	var keys=[];
	function KeyDown(k){return keys[k]==true;}
	function KeyUp(k){return keys[k]==false&&keys[k]==undefined;}
	Body.addEventListener('keydown',(e)=>{
		var key=e.key;
		keys[key]=true;
	});
	Body.addEventListener('keyup',(e)=>{
		var key=e.key;
		keys[key]=false;
	});
	setInterval(()=>{
		// a
if(Player.getBoundingClientRect().bottom>=window.innerHeight)
    speed[1]=0;
		if(KeyDown('a'))	speed[0]=-aF;
		if(KeyDown('d'))	speed[0]=aF;
		if(KeyDown('w')&&Player.getBoundingClientRect().bottom>=window.innerHeight)	speed[1]=aN;
		if(speed[0]>0)
				speed[0]=Math.max(speed[0]-af,0);
		else
			speed[0]=Math.min(speed[0]+af,0);
		if(Player.getBoundingClientRect().bottom<=window.innerHeight+1)
			speed[1]=speed[1]+aG;
		// v
		x=Math.max(0,x+speed[0]);
		x=Math.min(window.innerWidth-wi,x);
		y=Math.max(0,y+speed[1]);
		y=Math.min(window.innerHeight-hi,y);
		// x
		Player.style.left=`${x}px`;
		Player.style.top=`${y}px`;
	},50);
})();
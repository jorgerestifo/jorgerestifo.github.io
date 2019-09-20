!function(e){"use strict";function t(){}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function o(e,t){var n=e.toLowerCase().replace(/-(.)|_(.)/g,function(e,t,n){var o="";return t&&(o+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(o+=n.toUpperCase()),o});return t[n]=document.getElementById(e)}function r(e,t,n){for(var r=e.length,a;r--;)a=o(e[r],t),n.push(a)}var a;t.prototype={constructor:t,debug:!1,trace:function(t){this.debug&&e.console&&e.console.log(t)},timerStart:function(){a=(new Date).getTime()},timerStop:function(){var e=(new Date).getTime()-a;this.trace("seconds elapsed: "+.001*e)},preloadImages:function(t){for(var n=t.length,o=e.document,r=o.body,a=("fileSize"in o),i;n--;)a?(new Image).src=t[n]:(i=o.createElement("object"),i.data=t[n],i.width=i.height=0,r.appendChild(i))},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},on:function(e,t,n,o){var r;r="string"==typeof e?qs(e):e,r.addEventListener(t,n,o||!1)},delegate:function(e,t,n,o){function r(n){var r=n.target,i=a.qsa(t,e),c=Array.prototype.indexOf.call(i,r)>=0;c&&o.call(r,n)}var a=this,i="blur"===n||"focus"===n;this.on(e,n,r,i)},parent:function(e,t){return e.parentNode?e.parentNode.tagName.toLowerCase()===t.toLowerCase()?e.parentNode:this.parent(e.parentNode,t):void 0},makeVarsFromIds:function(t,n,o){for(var a=t.getElementsByTagName("*"),i=[],c=a.length;c--;)a[c].hasAttribute("id")&&i.push(a[c].id);r(i,n||e,o||[])},recordStates:function(e){for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){for(var n=e.length;n--;)e[n].cl?e[n].className=e[n].cl:e[n].className="";if(t){var o=10*e.length;setTimeout(function(){t.apply()},o)}}},NodeList.prototype.forEach=Array.prototype.forEach;var i,c;e.addEventListener?(i=function(e,t,n){e.addEventListener(t,n,!1)},c=function(e,t,n){e.removeEventListener(t,n,!1)}):(i=function(t,n,o){t["e"+n+o]=o,t[n+o]=function(){t["e"+n+o](e.event)},t.attachEvent("on"+n,t[n+o])},c=function(e,t,n){e.detachEvent("on"+t,e[t+n]),e[t+n]=null}),t.prototype.addListener=i,t.prototype.removeListener=c;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var u;u=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=u;var l;l=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=l;var m;m=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return e.currentStyle},t.prototype.getStyle=m;var p,f,d;"classList"in document.documentElement?(p=function(e,t){return e.classList.contains(t)},f=function(e,t){e.classList.add(t)},d=function(e,t){e.classList.remove(t)}):(p=function(e,t){return n(t).test(e.className)},f=function(e,t){p(e,t)||(e.className=e.className+" "+t)},d=function(e,t){e.className=e.className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=d,t.prototype.hasClass=p,t.prototype.replaceClass=function(e,t,n){d(e,t),f(e,n)},e.BannerUtils=t}(window);

// @codekit-prepend "BannerUtils.min.js";

var Banner = {

	init: function(){

		'use strict';

		var bu = new BannerUtils(); // utilities class
		var adContent = bu.qs('#ad_content'), 
			devices = bu.qs('#devices'), 
			device2 = bu.qs('#device2'), 
			deviceScreen = bu.qs('#device_screen'), 
			worm = bu.qs('#worm'),
			fly = bu.qs('#fly'),
			fly2 = bu.qs('#fly2'),
			flyGroup = bu.qs('#fly_group'),
			cta = bu.qs('#cta'), 
			ctaOver = bu.qs('#cta_over'), 
			ctaUp = bu.qs('#cta_up'), 
			replay = bu.qs('#replay'), 
			replayArrow = bu.qs('#replay_arrow'), 
			whiteout = bu.qs('#whiteout'), 
			blackoutCenter = bu.qs('#blackout_center'), 
			blackoutLeft = bu.qs('#blackout_left'), 
			blackoutRight = bu.qs('#blackout_right'), 
			text1 = bu.qs('#text1'), 
			text2 = bu.qs('#text2'), 
			legal = bu.qs('#legal'), 
			logo = bu.qs('#logo');
		var adLog = [adContent, fly, fly2, flyGroup, worm, cta, ctaUp, ctaOver, replay, replayArrow, devices, device2, deviceScreen, whiteout, blackoutCenter, blackoutLeft, blackoutRight, text1, text2, legal, logo]; // this an array of all the same elements above for reset purposes
		bu.debug = true; // set this to false before final publishing

		var adWidth = 300,
			adHeight = 600,
			adSeen = false;

		//var flyAnim = new Fly(fly);
		//var fly2Anim = new Fly(fly2);
		var flyAnim = new Fly([fly,fly2]); // for synchronization
		var wormAnim = new Worm(worm);


		////////////////////////////////////////////////////// GSAP ANIMATION //////////////////////////////////////////////////////

		function adReset() {
			if(adSeen){
				flyAnim.reset();
				disableRollover();
				TweenLite.set(adLog,{clearProps:'all'}); // reset all the tweens
				bu.resetStates(adLog, frame0); // put back the original classes
			} else {
				bu.recordStates(adLog);
				frame0();
			}
		}

		function frame0() {
			bu.timerStart();
			wormAnim.play();
			bu.removeClass(adContent, 'vis-off');
			TweenLite.to(devices, 8, {scale:0.8, ease:Power3.easeInOut, force3D:false});

			TweenLite.delayedCall(4.5, frame1);
		}

		function frame1() {
			flyAnim.play();
			TweenLite.to(adContent, 0.25, {backgroundColor:'#fff', ease:Sine.easeInOut});
			TweenLite.to(flyGroup, 0.25, {opacity:1, ease:Sine.easeInOut, force3D:false});
			TweenLite.delayedCall(0.25, function(){
				wormAnim.stop();
			});

			TweenLite.delayedCall(1, frame2);
		}

		function frame2() {
			TweenLite.to([fly, fly2], 2, {x:95, scale:1.3, ease:Sine.easeInOut, force3D:false});
			TweenLite.to([fly, fly2], 1, {rotation:-12, ease:Sine.easeInOut, force3D:false});
			TweenLite.to([fly, fly2], 1, {delay:1, rotation:12, ease:Sine.easeInOut, force3D:false});
			TweenLite.to(devices, 1, {x:-77, ease:Sine.easeInOut, force3D:false});
			TweenLite.to(device2, 1, {x:-128, ease:Sine.easeOut, force3D:false});
			TweenLite.from(fly2, 1, {left:'-400', ease:Sine.easeOut, force3D:false});
			TweenLite.delayedCall(2.25, frame3);
		}

		function frame3() {
			TweenLite.to(whiteout, 0.4, {opacity:1, ease:Sine.easeInOut, onComplete:frame3a});
			TweenLite.to(legal, 0.4, {opacity:0, ease:Sine.easeInOut});
			TweenLite.to(text1, 0.4, {delay:0.2, opacity:1, ease:Sine.easeInOut});
			TweenLite.to([fly, fly2], 1, {delay:0.4, x:0, rotation:6, scale:1, ease:Sine.easeInOut, force3D:false});

			TweenLite.delayedCall(2.5, frame4);
		}

		function frame3a() {
			flyAnim.pause();
			TweenLite.set(devices, {x:0, y:52, scale:0.9});
			TweenLite.set(device2, {x:400});
		}

		function frame4() {
			TweenLite.to(blackoutCenter, 0.4, {scaleX:1, opacity:1, ease:Power3.easeOut});
			TweenLite.to(text1, 0.25, {opacity:0, ease:Sine.easeInOut});
			TweenLite.to(text2, 0.4, {delay:0.125, opacity:1, ease:Sine.easeInOut});

			TweenLite.delayedCall(2.5, frame5);
		}

		function frame5() {
			flyAnim.slow = true;
			flyAnim.play();
			bu.addClass(whiteout, 'vis-off');
			bu.removeClass(blackoutLeft, 'vis-off');
			bu.removeClass(blackoutRight, 'vis-off');
			bu.addClass(blackoutCenter, 'vis-off');
			bu.replaceClass(adContent, 'bg-black', 'bg-white');
			TweenLite.to(blackoutLeft, 0.4, {x:adWidth * -0.5, ease:Power3.easeOut});
			TweenLite.to(blackoutRight, 0.4, {x:adWidth * 0.5, ease:Power3.easeOut});
			TweenLite.to(text2, 0.2, {opacity:0, ease:Sine.easeInOut});

			TweenLite.delayedCall(0.25, frame6);
		}

		function frame6() {
			TweenLite.to(logo, 0.5, {opacity:1, ease:Cubic.easeInOut});

			TweenLite.delayedCall(0.5, frame7);
		}

		function frame7() {
			TweenLite.to(cta, 0.5, {opacity:1, ease:Cubic.easeInOut});

			TweenLite.delayedCall(0.5, frame8);
		}

		function frame8() {
			TweenLite.to(replay, 0.5, {opacity:1, ease:Cubic.easeInOut, onComplete:enableReplay});
			enableRollover();
			adSeen = true;

			TweenLite.delayedCall(0.25, frame9);
		}

		function frame9() {
			flyAnim.pause(9);
			TweenLite.delayedCall(0.4, frame10);
		}

		function frame10() {
			bu.timerStop();
		}


		////////////////////////////////////////////////////// ANIMATION HELPERS //////////////////////////////////////////////////////

		function Fly(elem) {
			var scope = this;
			var el = elem;
			var len = (Array.isArray(el)) ? len = el.length : len = 1;
			var i = 0;
			var high = (len > 1) ? parseInt(bu.getStyle(el[0]).height) : parseInt(bu.getStyle(el).height);
			var frm = 0;
			var fwd = true;
			var loop = 0;
			var even = true;
			var playing = false;
			var pauseOnFrame = -1;
			this.slow;
			function flapWings() {
				if(even === true){
					if(scope.slow === true) even = false;
					if(len > 1) {
						i = len;
						while(i--) el[i].style.backgroundPosition = '0 '+ (frm * -high) +'px';
					} else {
						el.style.backgroundPosition = '0 '+ (frm * -high) +'px';
					}
					if(pauseOnFrame === frm) {
						scope.pause();
					} else {
						if(fwd === true) {
							if(frm > 9) {
								fwd = false;
								frm--;
							} else {
								frm++;
							}
						} else {
							if(frm < 1) {
								fwd = true;
								frm++;
							} else {
								frm--;
							}
						}
					}	
				} else {
					even = true;
				}
				if(playing === true) bu.requestFrame(flapWings);
			}
			this.play = function() {
				if(playing === false) {
					playing = true;
					pauseOnFrame = -1;
					flapWings();
				}
			};
			this.pause = function($frm) {
				if($frm){
					pauseOnFrame = $frm;
				} else {
					playing = false;
					pauseOnFrame = -1;
				}
			};
			this.reset = function() {
				this.slow = false;
				frm = 0;
				fwd = 0;
				if(len > 1) {
					i = len;
					while(i--) el[i].style.backgroundPosition = '0 0';
				} else {
					el.style.backgroundPosition = '0 0';
				}
			};
			this.stop = function() {
				this.pause();
				this.reset();
			};
		}

		function Worm(elem) {
			var scope = this;
			var el = elem;
			var wide = parseInt(bu.getStyle(el).width);
			var stride = parseInt(wide * 0.9643);
			var frm = 0;
			var cycle = 0;
			var bgX = 0;
			var bgY = 0;
			var loop = 0;
			var even = true;
			var playing = false;
			function crawl() {
				if(even === true) {
					even = false;
					if(frm > 28) {
						frm = 0;
						cycle++;
						bgY = cycle * -stride;
					} else {
						frm++;
					}
					bgX = frm * -wide;
					el.style.backgroundPosition = bgX+'px '+bgY+'px';
				} else {
					even = true;
				}
				if(playing === true) bu.requestFrame(crawl);
			}
			this.play = function() {
				if(playing === false) {
					playing = true;
					crawl();
				}
			};
			this.pause = function() {
				playing = false;
			};
			this.reset = function() {
				frm = 0;
				cycle = 0;
				even = true;
				bgX = 0;
				bgY = 0;
				el.style.backgroundPosition = '0 0';
			};
			this.stop = function() {
				this.pause();
				this.reset();
			};
		}


		////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

		function onAdClick(e) {
			window.open(window.clickTag);
		}

		function onAdHover(e) {
			flyAnim.slow = false;
			flyAnim.play();
			TweenLite.to(ctaOver, 0.25, {opacity:1, ease:Sine.easeInOut});
			TweenLite.to(ctaUp, 0.25, {opacity:0, ease:Sine.easeIn});
		}

		function onAdOut(e) {
			flyAnim.pause(9);
			TweenLite.to(ctaOver, 0.25, {opacity:0, ease:Sine.easeInOut});
			TweenLite.to(ctaUp, 0.25, {opacity:1, ease:Sine.easeOut});
		}

		function adClickThru() {
			adContent.style.cursor = 'pointer';
			bu.addListener(adContent, 'touchEnd', onAdClick, false);
			bu.addListener(adContent, 'click',    onAdClick, false);
		}

		function enableRollover() {
			adContent.style.cursor = 'pointer';
			bu.addListener(adContent, 'mouseenter', onAdHover, false);
			bu.addListener(adContent, 'mouseleave', onAdOut, false);
		}

		function disableRollover() {
			bu.removeListener(adContent, 'mouseenter', onAdHover, false);
			bu.removeListener(adContent, 'mouseleave', onAdOut, false);
		}

		function replayHandler(e) {
			bu.stopPropagation(e);
			disableReplay();
			adReset();
		}

		function replayHover(e) {
			TweenLite.to(replayArrow, 0.5, {rotation:-360, ease:Cubic.easeInOut});
		}

		function replayOut(e) {
			TweenLite.set(replayArrow,{clearProps:'all'});
		}

		function enableReplay() {
			bu.addListener(replay, 'touchEnd', replayHandler, false);
			bu.addListener(replay, 'click',    replayHandler, false);
			bu.addListener(replay, 'mouseenter', replayHover, false);
			bu.addListener(replay, 'mouseleave', replayOut, false);
		}

		function disableReplay() {
			bu.removeListener(replay, 'touchEnd', replayHandler, false);
			bu.removeListener(replay, 'click',    replayHandler, false);
			bu.removeListener(replay, 'mouseenter', replayHover, false);
			bu.removeListener(replay, 'mouseleave', replayOut, false);
		}


		////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

		adClickThru();
		adReset();
	}
};

window.onload = function(){
	Banner.init();
};


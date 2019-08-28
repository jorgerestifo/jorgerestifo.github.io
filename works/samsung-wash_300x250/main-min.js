!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return"undefined"==typeof a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),a},getMobileOS:function(){var t,n=navigator.userAgent||navigator.vendor||e.opera;return t=n.match(/iPad/i)||n.match(/iPhone/i)||n.match(/iPod/i)?"iOS":n.match(/Android/i)||n.match(/Silk/i)?"Android":"unknown"},getBrowser:function(){if("undefined"==typeof o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){var t;return t="string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o,a=e.length;a--;)o=i.makeVar(e[a],t,r),n.push(o)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;s<u;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+'.qs("#'+r[s].id+'")',s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)"undefined"!=typeof e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var m;m=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.mozRequestAnimationFrame?function(t){return e.mozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=m;var l;l=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.mozCancelAnimationFrame?function(t){return e.mozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=l;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var f,g,p;"classList"in document.documentElement?(f=function(e,t){return i.targ(e).classList.contains(t)},g=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(f=function(e,t){return n(t).test(i.targ(e).className)},g=function(e,t){f(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=g,t.prototype.removeClass=p,t.prototype.hasClass=f,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);
/*!
 * VERSION: 0.1.0
 * DATE: 2016-07-12
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";function a(a,b,c,d){return c=parseFloat(c)-parseFloat(a),d=parseFloat(d)-parseFloat(b),Math.sqrt(c*c+d*d)}function b(a){return"string"!=typeof a&&a.nodeType||(a=_gsScope.TweenLite.selector(a),a.length&&(a=a[0])),a}function c(a,b,c){var d,e,f=a.indexOf(" ");return-1===f?(d=void 0!==c?c+"":a,e=a):(d=a.substr(0,f),e=a.substr(f+1)),d=-1!==d.indexOf("%")?parseFloat(d)/100*b:parseFloat(d),e=-1!==e.indexOf("%")?parseFloat(e)/100*b:parseFloat(e),d>e?[e,d]:[d,e]}function d(c){if(!c)return 0;c=b(c);var d,e,f,g,i,j,k,l=c.tagName.toLowerCase();if("path"===l){g=c.style.strokeDasharray,c.style.strokeDasharray="none",d=c.getTotalLength()||0;try{e=c.getBBox()}catch(m){}c.style.strokeDasharray=g}else if("rect"===l)d=2*c.getAttribute("width")+2*c.getAttribute("height");else if("circle"===l)d=2*Math.PI*parseFloat(c.getAttribute("r"));else if("line"===l)d=a(c.getAttribute("x1"),c.getAttribute("y1"),c.getAttribute("x2"),c.getAttribute("y2"));else if("polyline"===l||"polygon"===l)for(f=c.getAttribute("points").match(h)||[],"polygon"===l&&f.push(f[0],f[1]),d=0,i=2;i<f.length;i+=2)d+=a(f[i-2],f[i-1],f[i],f[i+1])||0;else"ellipse"===l&&(j=parseFloat(c.getAttribute("rx")),k=parseFloat(c.getAttribute("ry")),d=Math.PI*(3*(j+k)-Math.sqrt((3*j+k)*(j+3*k))));return d||0}function e(a,c){if(!a)return[0,0];a=b(a),c=c||d(a)+1;var e=g(a),f=e.strokeDasharray||"",h=parseFloat(e.strokeDashoffset),i=f.indexOf(",");return 0>i&&(i=f.indexOf(" ")),f=0>i?c:parseFloat(f.substr(0,i))||1e-5,f>c&&(f=c),[Math.max(0,-h),Math.max(0,f-h)]}var f,g=document.defaultView?document.defaultView.getComputedStyle:function(){},h=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi;f=_gsScope._gsDefine.plugin({propName:"drawSVG",API:2,version:"0.1.0",global:!0,overwriteProps:["drawSVG"],init:function(a,b,f,g){if(!a.getBBox)return!1;var h,i,j,k=d(a)+1;return this._style=a.style,"function"==typeof b&&(b=b(g,a)),b===!0||"true"===b?b="0 100%":b?-1===(b+"").indexOf(" ")&&(b="0 "+b):b="0 0",h=e(a,k),i=c(b,k,h[0]),this._length=k+10,0===h[0]&&0===i[0]?(j=Math.max(1e-5,i[1]-k),this._dash=k+j,this._offset=k-h[1]+j,this._addTween(this,"_offset",this._offset,k-i[1]+j,"drawSVG")):(this._dash=h[1]-h[0]||1e-6,this._offset=-h[0],this._addTween(this,"_dash",this._dash,i[1]-i[0]||1e-5,"drawSVG"),this._addTween(this,"_offset",this._offset,-i[0],"drawSVG")),!0},set:function(a){this._firstPT&&(this._super.setRatio.call(this,a),this._style.strokeDashoffset=this._offset,1===a||0===a?this._style.strokeDasharray=this._offset<.001&&this._length-this._dash<=10?"none":this._offset===this._dash?"0px, 999999px":this._dash+"px,"+this._length+"px":this._style.strokeDasharray=this._dash+"px,"+this._length+"px")}}),f.getLength=d,f.getPosition=e}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"function"==typeof define&&define.amd?define(["TweenLite"],b):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=b())}("DrawSVGPlugin");
var Banner = {

    init: function() {
        'use strict';

        var time = 0.2;
        var count = 0; 

        var bu = new BannerUtils(); // utilities class

        // Debug mode. Comment this line for final publishing
        bu.debug = true;

        // Log all IDs and create variables. Comment this line for final publishing
        //bu.getAllIds(document, true);

        // Set up variables
        var ad_content = bu.qs('#ad_content');


        ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

        function frameStart() {
            bu.timerStart();
            frame0();
        }

        // this is the first frame on your animation
        function frame0() {
            var tl = new TimelineMax({repeat: 1, delayRepeat: 0.5, onRepeat:onRepeat, onComplete: frameStop} );
            tl
                .to(['#f01', '#f02', '#f03', '#f04', '#f05', '#f06', '#f07', '#f08', '#f09', '#f10', '#f11', '#f12', '#f13', '#f14', '#f15', '#f16', '#f17'], 0, { autoAlpha: 1 })
                .add(animate)
                .set('#bg_over',{ autoAlpha:0})
                .from('#txt1', 0.5, { x: '-10', autoAlpha: 0 })
                .to('#txt1', 0.5, { delay: 1, autoAlpha: 0 })
                .from('#txt2', 0.5, { x: '-10', autoAlpha: 0 })
                .add(animateCTA)
                .to('#bg_over',0.30,{delay: 0.75, autoAlpha:1})
                .to('#sprite',0.25, {autoAlpha:0}, '-=0.30')
                .from('#glow', 0.5, { autoAlpha: 0 })
                .fromTo('#glow', 0.5, {x:'-30',y:'-30'},{x:'+30',y:'+50'},'-=0.25')
                .to('#glow',0.5,{ autoAlpha: 0 })
                .to('#glow', 0.5, { autoAlpha: 1},'-=0.25')
                .fromTo('#glow', 0.75, {x:'-30',y:'-30'},{x:'+30',y:'+50'})
                .to('#glow',0.25,{autoAlpha:0})
                .to('#bg_glow', 0, { autoAlpha: 0 });
        }

        function animateCTA(){
            if (count === 0) {
                var tl = new TimelineMax({ onComplete: enableRollover} );
                tl
                    .to('#cta', 0.5, {  autoAlpha: 1 })
                    .from('#cta_box', 0.75, { drawSVG: '0%' }, '-=0.5')
                    .to('#cta_txt', 0.5, { autoAlpha: 1 });
            }

        }

        function animate() {
            var tl_animation = new TimelineMax({ onComplete: updateTime });
            tl_animation
                .to('#f17', time, { autoAlpha: 0 })
                .to('#f01', time, { autoAlpha: 0 })
                .to('#f02', time, { autoAlpha: 0 })
                .to('#f03', time, { autoAlpha: 0 })
                .to('#f04', time, { autoAlpha: 0 })
                .to('#f05', time, { autoAlpha: 0 })
                .to('#f06', time, { autoAlpha: 0 })
                .to('#f07', time, { autoAlpha: 0 })
                .to('#f08', time, { autoAlpha: 0 })
                .to('#f09', time, { autoAlpha: 0 })
                .to('#f10', time, { autoAlpha: 0 })
                .to('#f11', time, { autoAlpha: 0 })
                .to('#f12', time, { autoAlpha: 0 })
                .to('#f13', time, { autoAlpha: 0 })
                .to('#f14', time, { autoAlpha: 0 })
                .to('#f15', time, { autoAlpha: 0 })
                .to('#f16', time, { autoAlpha: 0 })
                .to('#f17', time, { autoAlpha: 0 })
                .to(['#f01', '#f02', '#f03', '#f04', '#f05', '#f06', '#f07', '#f08', '#f09', '#f10', '#f11', '#f12', '#f13', '#f14', '#f15', '#f16', '#f17'], 0, { autoAlpha: 1 });
        }

        function animateStop() {
            var tl_stop = new TimelineMax();

            tl_stop
                .to('#f17', time + 0.1 , { autoAlpha: 0 })
                .to(['#f01','#f02','#f03','#f04'], time + 0.2, { autoAlpha: 0 })
                .to(['#f05','#f06','#f07','#f08'], time + 0.3, { autoAlpha: 0 })
                .to(['#f09','#f10','#f11','#f12'], time + 0.4, { autoAlpha: 0 })
                .to(['#f13','#f14','#f15'], time + 0.4, { autoAlpha: 0 });
        }

        function onRepeat() {
          count++;
        }                           


        function updateTime() {
            if (time < 0.2) {
                animate();
            } else {
                animateStop();
            }
            time = time + 0.1;
        }

        function frameStop() {
            bu.timerStop();
        }


        ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

        function onAdClick() {
            EB.clickthrough();
        }

        function onAdHover() {
            TweenMax.to('#cta_box', 0.3, { fill: '#fff' });
            TweenMax.to('#cta_txt', 0.3, { fill: '#000' });
        }

        function onAdOut() {
            TweenMax.to('#cta_box', 0.1, { fill: 'transparent' });
            TweenMax.to('#cta_txt', 0.1, { fill: '#fff' });

        }

        function adClickThru() {
            bu.addListener(ad_content, 'click', onAdClick);
        }

        function enableRollover() {
            bu.addListener(ad_content, 'mouseenter', onAdHover);
            bu.addListener(ad_content, 'mouseleave', onAdOut);
        }



        ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

        adClickThru();
        frameStart();
    }
};


function initEB() {
  if (!EB.isInitialized()) {
    EB.addEventListener(EBG.EventName.EB_INITIALIZED, Banner.init);
  } else {
    Banner.init();
  }
}

window.onload = function(){
  initEB();
};

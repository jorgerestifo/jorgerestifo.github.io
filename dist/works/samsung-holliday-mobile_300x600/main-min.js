!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return void 0===a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?!0:!1),a},getMobileOS:function(){var t=navigator.userAgent||navigator.vendor||e.opera;return t.match(/iPad/i)||t.match(/iPhone/i)||t.match(/iPod/i)?"iOS":t.match(/Android/i)||t.match(/Silk/i)?"Android":"unknown"},getBrowser:function(){if(void 0===o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){return"string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o=e.length,a;o--;)a=i.makeVar(e[o],t,r),n.push(a)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;u>s;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+".qs('#"+r[s].id+"')",s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)void 0!==e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var l;l=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=l;var m;m=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=m;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var g,f,p;"classList"in document.documentElement?(g=function(e,t){return i.targ(e).classList.contains(t)},f=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(g=function(e,t){return n(t).test(i.targ(e).className)},f=function(e,t){g(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=p,t.prototype.hasClass=g,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);
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
/*global BannerUtils, TweenMax, Power0, Power1, Power2, Back */

var Banner = {

    init: function() {

        'use strict';

        var bu = new BannerUtils(); // utilities class

        // Debug mode. Comment this line for final publishing
        bu.debug = true;

        // Log all IDs and create variables.
        bu.getAllIds(document, true);

        // Check for IE 9 or earlier
        function preIE10Check() {
            if (window.attachEvent && !window.navigator.msPointerEnabled) {
                return true;
            } else {
                return false;
            }
        }

        function frameStart() {
            if (!preIE10Check()) {
                bu.timerStart();
                frame0();
            } else {
                TweenMax.set('#backup', {autoAlpha:1});
            }
            TweenMax.set('#blocker', {autoAlpha:0});
            TweenMax.set('#ad_content', {autoAlpha:1, delay:.25});
        }

        function setup(){
          TweenMax.set('#penguin', {x:-50, y:85});
        }

        function sledding(){
          TweenMax.set('#penguin', {opacity:1, delay:.5});
          // TweenMax.to('#slope', 2, {x:'-=260', y:'-=80', repeat:1, ease:Power0.easeNone, onComplete:slopeEnd});
          TweenMax.to('#penguin', 1.5, {x:'+=270', y:'+=115', repeat:1, ease:Power0.easeIn, delay:1, onComplete:penguinEndFrame});
          // TweenMax.to('#penguin_shadow', 1, {y:'-=10', yoyo:true, repeat:3, ease:Power2.easeInOut});
          // TweenMax.to('#scarf', 1, {rotation:'+=30', yoyo:true, repeat:3, ease:Back.easeInOut, easeParams:[3], delay:.2});
          // TweenMax.to('#headwing', 1, {rotation:'+=10', y:'-=2', yoyo:true, repeat:3, ease:Back.easeInOut, easeParams:[2], delay:.1});
          TweenMax.to('#snow1', .7, {x:'-=90', y:'+=20', rotation:'-=360', scale:2, repeat:20, ease:Power0.easeOut, delay:.5});
          TweenMax.to('#snow2', .8, {x:'-=80', y:'+=20', rotation:'-=180', scale:2, repeat:20, ease:Power0.easeOut, delay:.5});
          TweenMax.to('#snow3', .9, {x:'-=60', y:'+=20', rotation:'-=270', scale:2, repeat:20, ease:Power0.easeOut, delay:.5});
        }

        // function slopeEnd(){
        //   bu.trace('slopeEnd');
        //   TweenMax.to('#slope', 2, {x:'-=424', y:'-=148', ease:Power1.easeOut});
        // }

        // function penguinSlideOff(){
        //   bu.trace('penguinEnd');
        //   TweenMax.to(['#penguin','#penguin_shadow'], 1, {x:'+=70', y:'+=20', ease:Back.easeIn, onComplete:penguinEndFrame});
        //   TweenMax.killTweensOf(['#scarf','#headwing']);
        // }

        function penguinEndFrame(){
          TweenMax.killTweensOf(['#snow1','#snow2','#snow3']);
          TweenMax.set(['#snow1','#snow2','#snow3'],{opacity:0});

          TweenMax.set('#penguin',{clearProps:'x,y'});
          TweenMax.set('#penguin', {x:-50, y:85});
          TweenMax.set('#snow_final',{opacity:1});
          TweenMax.to('#penguin', 1, {x:'+=91', y:'+=35', ease:Power2.easeOut});
          //TweenMax.set('#penguin',{opacity:0, className:'+=penguinposition'});
        }

        function twinkle(){
          TweenMax.staggerFrom(['#star1','#star2','#star3','#star4'], 1, {opacity:.2, ease:Power1.easeOut, yoyo:true, repeat:10},.5);
        }

        function killit(){
          TweenMax.killAll();
        }

        /////////// ANIMATION /////////////////

        // this is the first frame on your animation
        function frame0() {
            setup();
            // twinkle();

            var del = 0;

            TweenMax.to('#lid', 1, {x:'+=120', y:'+=270', rotation:'40', ease:Power1.easeInOut, delay:del+=1.5, onStart:sledding});
            TweenMax.to('#box', 1, {y:'+=80', ease:Power1.easeInOut, delay:del});
            TweenMax.to('#lidlip', .5, {opacity:1, ease:Power2.easeOut, delay:del+=.5});

            TweenMax.to('#legal', .5, {opacity:1, delay:del});
            TweenMax.to(['#headline_ef','#suhd_logo'], .5, {opacity:1, delay:del+=.5});

            TweenMax.fromTo('#cta_box', .5, {drawSVG:'100% 100%'}, {drawSVG:'100% 0%', delay:del+=.5}); /// counter clockwise animation
            TweenMax.from('#arrow', .25, {drawSVG:'50% 50%', ease:Power1.easeOut, delay:del+=.5});
            TweenMax.from('#arrow_holder', .25, {left:'-=16', ease:Power1.easeOut, delay:del});

            TweenMax.delayedCall(del, frameStop);

            //TweenMax.delayedCall(del+3.25, killit);
        }

        function frameStop() {
            enableRollover();
            bu.timerStop();
        }


        //////////////////////////// EVENT HANDLERS /////////////////////////////////

        function onAdClick() {
            window.open(window.clickTag);
        }

        function onAdHover() {
            TweenMax.set('#cta_box',{fill:'#000'});
            TweenMax.set('#arrow',{stroke:'#fff'});
        }

        function onAdOut() {
          TweenMax.set('#cta_box',{clearProps:'fill'});
          TweenMax.set('#arrow',{clearProps:'stroke'});
        }

        function adClickThru() {
            bu.addListener('#ad_content', 'click', onAdClick);
        }

        function enableRollover() {
            bu.addListener('#ad_content', 'mouseenter', onAdHover);
            bu.addListener('#ad_content', 'mouseleave', onAdOut);
        }

        // function disableRollover() {
        //     bu.removeListener(ad_content, 'mouseenter', onAdHover);
        //     bu.removeListener(ad_content, 'mouseleave', onAdOut);
        // }


        ////////////////////////// INIT //////////////////////////////////////////

        adClickThru();
        frameStart();
    }
};

window.onload = function() {
    Banner.init();
};

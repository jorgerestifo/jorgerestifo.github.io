!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return void 0===a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?!0:!1),a},getMobileOS:function(){var t=navigator.userAgent||navigator.vendor||e.opera;return t.match(/iPad/i)||t.match(/iPhone/i)||t.match(/iPod/i)?"iOS":t.match(/Android/i)||t.match(/Silk/i)?"Android":"unknown"},getBrowser:function(){if(void 0===o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){return"string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o=e.length,a;o--;)a=i.makeVar(e[o],t,r),n.push(a)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;u>s;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+".qs('#"+r[s].id+"')",s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)void 0!==e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var l;l=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=l;var m;m=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=m;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var g,f,p;"classList"in document.documentElement?(g=function(e,t){return i.targ(e).classList.contains(t)},f=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(g=function(e,t){return n(t).test(i.targ(e).className)},f=function(e,t){g(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=p,t.prototype.hasClass=g,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);
/*global BannerUtils, TweenMax, Power0, Power1, Power2*/

var Banner = {

    init: function() {

        'use strict';

        var bu = new BannerUtils(); // utilities class

        // Debug mode. Comment this line for final publishing
        bu.debug = true;

        // Log all IDs and create variables.
        bu.getAllIds(document, true);

        // Set up variables
        var ad_content = bu.qs('#ad_content');

        // var samsung_logo = bu.qs('#samsung_logo');
        // var cta = bu.qs('#cta');
        var cta_border = bu.qs('#cta_border');
        var cta_border_left = bu.qs('#cta_border_left');
        var cta_border_right = bu.qs('#cta_border_right');
        var cta_border_holder_left = bu.qs('#cta_border_holder_left');
        var cta_border_holder_right = bu.qs('#cta_border_holder_right');
        var cta_arrow = bu.qs('#cta_arrow');
        var cta_over = bu.qs('#cta_over');
        // var image1 = bu.qs('#image1');
        // var tv = bu.qs('#tv');
        var headline1 = bu.qs('#headline1');
        var headline2 = bu.qs('#headline2');
        var headline_ef = bu.qs('#headline_ef');
        var suhd_logo = bu.qs('#suhd_logo');
        var legal = bu.qs('#legal');
        var backup = bu.qs('#backup');

        // Set banner dimensions
        // var adHeight = 250;

        // Check for IE 9 or earlier
        function preIE10Check() {
            if (window.attachEvent && !window.navigator.msPointerEnabled) {
                return true;
            } else {
                return false;
            }
        }

        /////////// ANIMATION /////////////////

        function frameStart() {
            if (!preIE10Check()) {
                bu.timerStart();
                frame0();
            } else {
                TweenMax.set(backup, {className: 'backup'});
                TweenMax.set(ad_content, {autoAlpha:1});
            }
        }

        function setup(){
          //TweenMax.set(cta_border_holder_right,{rotation:"+=180"});
        }

        // this is the first frame on your animation
        function frame0() {
            setup();
            var del = 0;

            TweenMax.set(ad_content, {autoAlpha:1});

            TweenMax.to([headline1], .25, {opacity:1, delay:del+=.5});
            TweenMax.to('.tv_start', 1, {className: '+=tv_end', ease:Power1.easeOut, delay:del+=2});
            TweenMax.to('.image_start', .95, {className: '+=image_end', ease:Power1.easeInOut, delay:del+=.05});
            TweenMax.to(headline1, .5, {opacity:0, delay:del});
            TweenMax.to([headline2, legal], .5, {opacity:1, delay:del+=.5});
            TweenMax.to([headline2, legal], .5, {opacity:0, delay:del+=2, overwrite:false});
            TweenMax.to([suhd_logo], .5, {opacity:1, delay:del+=.5});
            TweenMax.to(headline_ef, .5, {opacity:1, delay:del+=.25});
            // TweenMax.to([cta], .5, {opacity:1, delay:del+=.25});
            TweenMax.from(cta_border_holder_left, .2, {height:0, ease:Power0.easeIn, delay:del+=.5});
            TweenMax.from(cta_border_right, .2, {top:'-=32', ease:Power0.easeOut, delay:del+=.2});
            TweenMax.from(cta_border_holder_right, .2, {top:'+=32', ease:Power0.easeOut, delay:del, onComplete:ctaBorderBandaid});

            TweenMax.to(cta_arrow, .25, {left:'+=16', ease:Power1.easeOut, delay:del+=.5});
            TweenMax.from(cta_arrow, .1, {opacity:0, scale:.1, ease:Power0.easeOut, delay:del, overwrite:false});

            TweenMax.delayedCall(del, frameStop);
        }

        function ctaBorderBandaid() {
          TweenMax.set(cta_border,{opacity:1});
          TweenMax.set([cta_border_left,cta_border_right],{opacity:0});
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
            TweenMax.to(cta_over, .25, {opacity: 1});
            TweenMax.to([cta_border], .25, {opacity: 0});
        }

        function onAdOut() {
          TweenMax.to(cta_over, .25, {opacity: 0});
          TweenMax.to([cta_border], .25, {opacity: 1});
        }

        function adClickThru() {
            bu.addListener(ad_content, 'click', onAdClick);
        }

        function enableRollover() {
            bu.addListener(ad_content, 'mouseenter', onAdHover);
            bu.addListener(ad_content, 'mouseleave', onAdOut);
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

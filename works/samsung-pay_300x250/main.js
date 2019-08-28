!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return void 0===a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?!0:!1),a},getBrowser:function(){if(void 0===o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){return"string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o=e.length,a;o--;)a=i.makeVar(e[o],t,r),n.push(a)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length;u--;)r[u].hasAttribute("id")&&(o.push(r[u].id),t&&(a+=r[u].id.replace(/-/g,"_")+" = "+c+".qs('#"+r[u].id+"')",u>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)void 0!==e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var l;l=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=l;var m;m=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=m;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var g,f,p;"classList"in document.documentElement?(g=function(e,t){return i.targ(e).classList.contains(t)},f=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(g=function(e,t){return n(t).test(i.targ(e).className)},f=function(e,t){g(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=p,t.prototype.hasClass=g,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);

// @codekit-prepend "libs/BannerUtils.min.js";
// @disabled-append "libs/gsap/easing/EasePack.min.js", "libs/gsap/plugins/CSSPlugin.min.js", "libs/gsap/TweenLite.min.js";

var Banner = {

  init: function(){

    'use strict';

    var bu = new BannerUtils(); // utilities class

    bu.debug = true; // set this to false before final publishing
    //bu.getAllIds(document, true); // !!!!!!!!!!!!!!!! use this to generate all the var declarations below (copy/paste from console.log) !!!!!!!!!!!!!!!!
    var ad_content = bu.qs('#ad_content');

    var cta_down = bu.qs('#cta_down'),
    cta_up = bu.qs('#cta_up'),
    cta = bu.qs('#cta'),
    logo = bu.qs('#logo'),
    headline_2 = bu.qs('#headline_2'),
    headline_1 = bu.qs('#headline_1'),
    img3 = bu.qs('#img3'),
    img2 = bu.qs('#img2'),
    img1 = bu.qs('#img1'),
    pin_anim = bu.qs('#pin_anim'),
    animFrames = 29,
    animOffsetY = 0,
    animInterval;

    var adLog = bu.getAllIdElements(document);

    var adWidth = 300,
        adHeight = 250,
        adSeen = false;

    var tDelay=0;

    // -----------------------------------------------------------
    // REPLAY FUNCTIONALITY --------------------------------------
    // -----------------------------------------------------------
    function enableReplay() {
      replay.addEventListener('touchEnd', replayHandler, false);
      replay.addEventListener('click',    replayHandler, false);
      replay.addEventListener('mouseover', replayHover, false);
      replay.addEventListener('mouseout', replayOut, false);
    }

    function disableReplay() {
      replay.removeEventListener('touchEnd', replayHandler, false);
      replay.removeEventListener('click',    replayHandler, false);
      replay.removeEventListener('mouseover', replayHover, false);
      replay.removeEventListener('mouseout', replayOut, false);
    }

    function replayHover() {
        replay.style.cursor = 'pointer';
        TweenLite.set(replay, {rotation:0});
        TweenLite.to(replay, 1, {rotation:"-360", ease:Strong.easeOut});
    }

    function replayOut() {
        replay.style.cursor = 'none';
    }

    function replayHandler() {
      TweenLite.set(replay, {display:"none"});
      startAnimation()
    }

    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

    function startAnimation() {
      if(adSeen){
        TweenLite.set(adLog,{clearProps:'all'}); // reset all the tweens
        bu.resetStates(adLog, frame0); // put back the original classes
      } else {
        bu.recordStates(adLog);
        adClickThru();
        frame0();
      }
    }

    function frame0() {
      adSeen = true;
      bu.timerStart();
      TweenLite.delayedCall(.1, frame1); // !!! if using TweenLite, don't use setTimeout
    }

    function frame1() {

      tDelay = 0;

      bu.removeClass(img1,'alpha-0');
      TweenLite.from(img1, .5, {alpha:0, ease:Sine.easeOut});

      bu.removeClass(headline_1,'alpha-0');
      TweenLite.from(headline_1, .5, {x:'-10',alpha:0, delay:tDelay+=.5, ease:Sine.easeOut});

      TweenLite.to([headline_1,img1], .5, {alpha:0, delay:tDelay+=2, ease:Sine.easeOut});

      TweenLite.delayedCall(tDelay+.3, frame2);
    }

    function frame2() {

      tDelay = 0;

      bu.removeClass(img2,'alpha-0');
      TweenLite.from(img2, .5, {alpha:0, ease:Sine.easeOut});

      bu.removeClass(headline_2,'alpha-0');
      TweenLite.from(headline_2, .5, {x:'-10',alpha:0, delay:tDelay+=.5, ease:Sine.easeOut});

      TweenLite.to([headline_2,img2,logo], .5, {alpha:0, delay:tDelay+=2, ease:Sine.easeOut});

      TweenLite.delayedCall(tDelay+.3, frame3);
    }


     function frame3() {

      tDelay = 0;
      var speed = .5;

      bu.removeClass(img3,'alpha-0');
      TweenLite.from(img3, .5, {alpha:0, ease:Sine.easeOut});

      bu.removeClass(pin_anim,'alpha-0')
      TweenLite.from(pin_anim, .5, {alpha:0,ease:Sine.easeOut});

      TweenLite.delayedCall(tDelay+1, playAnim);


      bu.removeClass(cta,'alpha-0');
      TweenLite.from(cta, .3, {alpha:0, delay:tDelay+=1, ease:Sine.easeOut});

      TweenLite.delayedCall(tDelay+1, adEnd);
    }

    function playAnim() {
      console.log('aca')
       bu.addClass(pin_anim,'play_pin_anim')
    }


    function adEnd() {
      TweenLite.set(replay, {display:"block"});
      TweenLite.from(replay, .5, {alpha:0, ease:Linear.easeNone});

      enableReplay();
      enableRollover();
      bu.timerStop();
    }

    function adFallback() {
      bu.removeClass(pin_anim,'alpha-0');
      pin_anim.style.backgroundPosition = "0 996px";
      bu.removeClass(img3,'alpha-0');
      bu.removeClass(pin_anim,'alpha-0');
      bu.removeClass(cta,'alpha-0');
      bu.removeClass(legal,'alpha-0');
      enableRollover();
      adClickThru();
    }


    ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

    function onAdClick(e) {
      window.open(window.clickTag);
    }

    function onAdHover(e) {
       bu.addClass(cta_up,'alpha-0');
       TweenLite.set(cta_up,{alpha:0})
       bu.removeClass(cta_down,'alpha-0');
       TweenLite.set(cta_down,{alpha:1});
    }

    function onAdOut(e) {
       bu.removeClass(cta_up,'alpha-0');
       TweenLite.set(cta_up,{alpha:1})
       bu.addClass(cta_down,'alpha-0');
       TweenLite.set(cta_down,{alpha:0});
    }

    function adClickThru() {
      // don't use 'touchend', it's not worth it
      bu.addListener(ad_content, 'click', onAdClick);
    }

    function enableRollover() {
      bu.addListener(ad_content, 'mouseenter', onAdHover);
      bu.addListener(ad_content, 'mouseleave', onAdOut);
    }

    function disableRollover() {
      bu.removeListener(ad_content, 'mouseenter', onAdHover);
      bu.removeListener(ad_content, 'mouseleave', onAdOut);
    }


    ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////
    // -----------------------------------------------------------
    // VERSION DETECTION -----------------------------------------
    // -----------------------------------------------------------
    if ( window.attachEvent && !window.navigator.msPointerEnabled ) {
      adFallback();
    }
    else {
      startAnimation();
    }

  }
};

window.onload = function(){
  Banner.init();
};



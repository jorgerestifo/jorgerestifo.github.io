!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return void 0===a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?!0:!1),a},getBrowser:function(){if(void 0===o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){return"string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o=e.length,a;o--;)a=i.makeVar(e[o],t,r),n.push(a)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;u>s;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+".qs('#"+r[s].id+"')",s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)void 0!==e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var l;l=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=l;var m;m=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=m;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var g,f,p;"classList"in document.documentElement?(g=function(e,t){return i.targ(e).classList.contains(t)},f=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(g=function(e,t){return n(t).test(i.targ(e).className)},f=function(e,t){g(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=p,t.prototype.hasClass=g,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);
var Banner = {

  init: function() {

    'use strict';

    var bu = new BannerUtils(); // utilities class

    // Debug mode. Comment this line for final publishing
    // bu.debug = true;

    // Log all IDs and create variables. Comment this line for final publishing
    // bu.getAllIds(document, true);

    // Set up variables
    var ad_content = bu.qs('#ad_content'),
        mask = bu.qs('#mask'),
        wall = bu.qs('#wall'),
        wall_reflection = bu.qs('#wall_reflection'),
        floor = bu.qs('#floor'),
        logo_1 = bu.qs('#logo_1'),
        car = bu.qs('#car'),
        shoe = bu.qs('#shoe'),
        shoe_part_1 = bu.qs('#shoe_part_1'),
        shoe_part_2 = bu.qs('#shoe_part_2'),
        shoe_part_3 = bu.qs('#shoe_part_3'),
        shoe_part_4 = bu.qs('#shoe_part_4'),
        shoe_part_5 = bu.qs('#shoe_part_5'),
        wall_wrapper_ef = bu.qs('#wall_wrapper_ef'),
        wall_ef = bu.qs('#wall_ef'),
        fade_1 = bu.qs('#fade_1'),
        fade_2 = bu.qs('#fade_2'),
        shoe_ef = bu.qs('#shoe_ef'),
        logo_2 = bu.qs('#logo_2'),
        cta = bu.qs('#cta'),
        cta_bg = bu.qs('#cta_bg'),
        cta_text = bu.qs('#cta_text'),
        cta_text_hover = bu.qs('#cta_text_hover'),
        backup = bu.qs('#backup'),

        shoe_parts = [shoe_part_1, shoe_part_2, shoe_part_3, shoe_part_4, shoe_part_5];

        var tl = new TimelineMax();

    // Set banner dimensions
    var adWidth = 336,
        adHeight = 280;

     // Check for IE 9 or earlier
    function preIE10Check() {
      if (window.attachEvent && !window.navigator.msPointerEnabled) {
        // console.log('IE 9 or below detected.');
        return true;
      } else {
        // console.log('This browsers is not IE 9 or below. 001');
        return false;
      }
    }    


    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

     function frameStart() {
      if(!preIE10Check()){
        bu.timerStart();
        frame0();
      } else {
        TweenMax.set(backup, {className:'backup'});
      }
    }

    // this is the first frame on your animation
    function frame0(){
      var tDelay = 0;

      tl.to(mask, 1, { x: adWidth }, tDelay)
        .to([wall, wall_reflection, floor], 3, { backgroundPosition: "top left", ease:Linear.easeInOut, repeat: 2 }, tDelay)
        .to(logo_1, 1.25, { x: adWidth, ease:Sine.easeInOut }, tDelay += 2)
        .from(car, 0.5, { autoAlpha: 0 }, tDelay)
        .to(car, 2, { x: 1250 }, tDelay += 0.75)
        .from(shoe, 1, { x: -adWidth }, tDelay += 1)
        .to([wall, floor], 0.5, { alpha: 0.6 }, tDelay)
        .staggerTo(shoe_parts, 2, { cycle: { y: ["-30", "-10", "-5", 10, 20] }, ease: Sine.ease }, 0, tDelay += 1)
        .staggerTo(shoe_parts, 0.5, { cycle: { y: ["-200", "-150", "-100", 150, 200] }, ease: Sine.ease }, 0, tDelay += 0.75)
        .to([wall, wall_reflection, floor, shoe], 0.25, { autoAlpha: 0 }, tDelay += 0.25)
        .from(wall_wrapper_ef, 1, { autoAlpha: 0, y: "500" }, tDelay)
        .to(wall_ef, 10, { backgroundPosition: "top left", ease: Sine.easeInOut }, tDelay)
        .from(shoe_ef, 2, { autoAlpha: 0, x: "-500", ease:Expo.easeOut }, tDelay)
        .from(logo_2, 2, { autoAlpha: 0, x: 200, ease:Expo.easeOut }, tDelay += 0.25)
        .from(cta, 2, { autoAlpha: 0, x: 200, ease:Expo.easeOut }, tDelay += 0.25);

        TweenMax.delayedCall(tDelay + 1, frameStop);
    }

    function frameStop() {
      tl.kill(null, wall_ef);
      enableRollover();
      bu.timerStop();
    }


    ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

    function onAdClick(e) {
      window.open(window.clickTag);
    }

   function onAdHover(e) {
      TweenMax.set(cta_bg, { clearProps: "all" });
      TweenMax.to(cta, 0.5, { borderColor: "white" });
      TweenMax.from(cta_bg, 0.5, { scaleX: 0, autoAlpha: 0 });
      TweenMax.to(cta_text, 0.5, { autoAlpha: 0 });
      TweenMax.to(cta_text_hover, 0.5, { autoAlpha: 1 });
    }

    function onAdOut(e) {
      TweenMax.to(cta, 0.5, { borderColor: "#ff0d6a" });
      TweenMax.to(cta_bg, 0.5, { scaleX: 0, autoAlpha: 1 });
      TweenMax.to(cta_text, 0.5, { autoAlpha: 1 });
      TweenMax.to(cta_text_hover, 0.5, { autoAlpha: 0 });
    }

    function adClickThru() {
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

    adClickThru();
    frameStart();
  }
};

window.onload = function(){
  Banner.init();
};
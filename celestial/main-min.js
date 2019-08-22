!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return"undefined"==typeof a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),a},getMobileOS:function(){var t,n=navigator.userAgent||navigator.vendor||e.opera;return t=n.match(/iPad/i)||n.match(/iPhone/i)||n.match(/iPod/i)?"iOS":n.match(/Android/i)||n.match(/Silk/i)?"Android":"unknown"},getBrowser:function(){if("undefined"==typeof o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){var t;return t="string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o,a=e.length;a--;)o=i.makeVar(e[a],t,r),n.push(o)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;s<u;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+'.qs("#'+r[s].id+'")',s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)"undefined"!=typeof e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var m;m=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.mozRequestAnimationFrame?function(t){return e.mozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=m;var l;l=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.mozCancelAnimationFrame?function(t){return e.mozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=l;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var f,g,p;"classList"in document.documentElement?(f=function(e,t){return i.targ(e).classList.contains(t)},g=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(f=function(e,t){return n(t).test(i.targ(e).className)},g=function(e,t){f(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=g,t.prototype.removeClass=p,t.prototype.hasClass=f,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);
var Banner = {

  init: function() {

    'use strict';

    var bu = new BannerUtils(); // utilities class
    var gs = TweenMax;
    var dom = {}; // holds references to id elements

    bu.debug = true; // set this to false before final publishing
    bu.makeVarsFromIds(document, dom);

    var adWidth = 300,
        adHeight = 250,
        interval,
        row=0,
        frameCount=140,
        col = 62,
        frames = 55,
        offsetX = 0,
        anim = document.getElementById('deer_anim'),
        lteIE9 = document.all && !window.atob;


    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

     function frameStart() {
      if(lteIE9) {
        // IE9 or below detected
        TweenMax.set(dom.fallback, { className:'backup' });
      } else {
        bu.timerStart();
        frame0();
      }
    }

    function deer_anim() {
    

      if(frames > 1){



        if(frameCount==col){

        row-=120
        frameCount=0
        offsetX=0
         //clearInterval(interval);
        }

      anim.style.backgroundPosition = (offsetX)+"px "+(row)+"px";

      frameCount++
      offsetX -= 132;
      frames--;
      console.log(frameCount)
     
      } else {
        clearInterval(interval);
      }

    }

     function triggerAnim() {

        interval = setInterval(deer_anim, 60);
      
      }


    function frame0() {

       

      var dly = 0.5;
      var scaleDown = 0.59;
      var scaleUp = 1.3;
     
      gs.set(dom.artwork, {scale: scaleDown, y:23});
      gs.set(dom.ad_content, {autoAlpha: 1});
      gs.set(dom.tea_bag, {filter: 'blur(0px)'});
      gs.set(dom.headline1, {filter: 'drop-shadow(2px 2px 5px #999'});
      gs.set(dom.endcard_bg, {filter: 'blur(10px)'});

      gs.from(dom.headline1, 1, {delay: dly, autoAlpha: 0, ease:Power2.easeOut});
      gs.to(dom.tea_bag, 5, {delay: dly -= 0.5 , rotation: -1440, ease:Sine.easeInOut});
      gs.to(dom.tea_bag, 4, {delay: dly, filter: 'blur(3px)', ease:Sine.easeInOut});
      gs.from(dom.tea_center, 3.5, {delay: dly += 1, rotation: 180, autoAlpha: 0, ease:Sine.easeInOut});
      gs.to(dom.tea_bag, 1, {delay: dly += 1, filter: 'blur(0px)', autoAlpha: 0});
      gs.from(dom.tea_edge, 5, {delay: dly, rotation: 180, ease:Power0.easeNone});
      gs.from(dom.tea_edge, 2.5, {delay: dly, autoAlpha: 0, ease:Power2.easeOut});
      gs.from(dom.leaves, 1, {delay: dly += 1, autoAlpha: 0, scale: 0, ease:Back.easeOut.config(.7)});
      gs.to(dom.imagery, 2, {delay: dly += 1.25, y: (-23 * scaleUp), scale: scaleUp, ease:Power2.easeIn});
      gs.to(dom.headline1, 1, {delay: dly, autoAlpha:0, ease:Power2.easeInOut});
      gs.to(dom.logo, 0.5, {delay: dly, autoAlpha: 0, ease:Power2.easeIn});
      gs.from(dom.whiteout, 1.5, {delay: dly, autoAlpha: 0, ease:Power2.easeIn});
      gs.from(dom.steam, 1, {delay: dly, autoAlpha: 0, ease:Power2.easeIn});
      gs.to(dom.steam, 2, {delay: dly, scale: 3, ease:Power2.easeIn});
      gs.to(dom.steam, 0.5, {delay: dly += 1.5, autoAlpha: 0, ease:Power2.easeIn});
      gs.from(dom.artwork, 0.5, {delay: dly,autoAlpha: 0, ease:Power1.easeIn, onComplete:frame1});
      gs.to(dom.whiteout, 1, {delay: dly, autoAlpha: 0, ease:Power2.easeIn});
    }

    function frame1() {
      var del_2 = 0;

      triggerAnim()

      gs.to(dom.imagery, 3, {scale: 1, x:0, y:0, ease:Power1.easeOut});
      gs.to(dom.artwork, 3, {scale: 0.8, x:0, y:0, ease:Power1.easeOut});
      gs.set([dom.tea_cup, dom.tea_edge, dom.tea_center, dom.leaves], {autoAlpha: 0});
     
      gs.to(dom.candy_1,4,{y:"+=5",ease:Back.easeOut})
      gs.to(dom.candy_1_drops,4,{y:"-=50"})
      gs.to(dom.candy_1_water,4,{y:"-=5",ease:Back.easeOut})
      gs.to(dom.candy_1,4,{y:"-=5",ease:Back.easeOut,delay:1})
     // gs.to(dom.candy_1_drops,4,{y:"+=50",delay:1})
      gs.to(dom.candy_1_water,4,{y:"+=5",ease:Back.easeOut,delay:1})

      gs.to(dom.candy_2,4,{y:"-=5",ease:Back.easeOut,delay:del_2})
      gs.to(dom.candy_2_drops,4,{y:"-=20",delay:del_2})
      gs.to(dom.candy_2_water,4,{y:"+=5",ease:Back.easeOut,delay:del_2})
      gs.to(dom.candy_2,4,{y:"+=5",ease:Back.easeOut,delay:1})
     // gs.to(dom.candy_2_drops,4,{y:"-=50",delay:1})
      gs.to(dom.candy_2_water,4,{y:"-=5",ease:Back.easeOut,delay:1})

      gs.to(dom.candy_3,4,{y:"+=5",ease:Back.easeOut})
      gs.to(dom.candy_3_drops,4,{y:"-=50"})
      gs.to(dom.candy_3_water,4,{y:"-=5",ease:Back.easeOut})
      gs.to(dom.candy_3,4,{y:"-=5",ease:Back.easeOut,delay:1})
     // gs.to(dom.candy_3_drops,4,{y:"+=50",delay:1})
      gs.to(dom.candy_3_water,4,{y:"+=5",ease:Back.easeOut,delay:1})


      gs.delayedCall(2.75, frame2);
    }

    function frame2() {
      var transform = {x: -33, y: -7, scaleX: 3.8, scaleY: 3.2};
      // gs.set(dom.endcard_bg, {autoAlpha: 0.5, x: transform.x, y: transform.y, scaleX: transform.scaleX, scaleY: transform.scaleY}); // use images300x250.psd to figure out position, or uncomment this line and comment out the lines below to align dom.endcard_bg over dom.artwork
      gs.from(dom.endcard_bg, 1, {autoAlpha: 0, ease: Power2.easeInOut});
      gs.from(dom.endcard_bg, 1.25, {x: transform.x, y: transform.y, scaleX: transform.scaleX, scaleY: transform.scaleY, ease: Power2.easeInOut});
      gs.to(dom.endcard_bg,1, {filter: 'blur(0px)'});
      gs.to(dom.artwork, 1.25, {x: ((transform.x * -1) / transform.scaleX), y: ((transform.y * -1) / transform.scaleY), scaleX: (1 / transform.scaleX), scaleY: (1 / transform.scaleY), ease: Power2.easeInOut});
      gs.from([dom.headline2, dom.tagline], 0.67, {delay: 1.15, autoAlpha:0, ease: Power2.easeOut});
      gs.from(dom.cta, 0.5, {delay: 1.25, autoAlpha: 0, y: adHeight, ease: Power2.easeOut, onComplete: frameEnd});
    }

    function frameEnd() {
      enableRollover();
      bu.timerStop();
    }


    ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

    function onAdClick() {
      window.open(window.clickTag);
    }

   function onAdHover() {
      gs.to(dom.cta, 0.5, {backgroundColor: '#a7162a', ease: Power2.easeOut});
    }

    function onAdOut() {
      gs.to(dom.cta, 0.5, {backgroundColor: '#bb142b', ease: Power2.easeOut});
      // normal state
    }

    function adClickThru() {
      bu.addListener(dom.ad_content, 'click', onAdClick);
    }

    function enableRollover() {
      bu.addListener(dom.ad_content, 'mouseenter', onAdHover);
      bu.addListener(dom.ad_content, 'mouseleave', onAdOut);
    }

    // function disableRollover() {
    //   bu.removeListener(dom.ad_content, 'mouseenter', onAdHover);
    //   bu.removeListener(dom.ad_content, 'mouseleave', onAdOut);
    // }


    ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

    adClickThru();
    frameStart();
  }
};

window.onload = function(){
  Banner.init();
};

!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return void 0===a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?!0:!1),a},getBrowser:function(){if(void 0===o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){return"string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o=e.length,a;o--;)a=i.makeVar(e[o],t,r),n.push(a)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;u>s;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+".qs('#"+r[s].id+"')",s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)void 0!==e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var l;l=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=l;var m;m=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=m;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var g,f,p;"classList"in document.documentElement?(g=function(e,t){return i.targ(e).classList.contains(t)},f=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(g=function(e,t){return n(t).test(i.targ(e).className)},f=function(e,t){g(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=p,t.prototype.hasClass=g,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);
var Banner = {

  init: function() {

    'use strict';

    var bu = new BannerUtils(); // utilities class

    // Debug mode. Comment this line for final publishing
    // bu.debug = true;

    // Log all IDs and create variables. Comment this line for final publishing
    bu.getAllIds(document, true);

    // Set up variables
var __bs_script__ = bu.qs('#__bs_script__'),
    ad_content = bu.qs('#ad_content'),
    frame1 = bu.qs('#frame1'),
    f1_keyb_6_cont = bu.qs('#f1_keyb_6_cont'),
    f1_keyb_6 = bu.qs('#f1_keyb_6'),
    f1_keyb_5_cont = bu.qs('#f1_keyb_5_cont'),
    f1_keyb_5 = bu.qs('#f1_keyb_5'),
    headline_1 = bu.qs('#headline_1'),
    f1_keyb_4_cont = bu.qs('#f1_keyb_4_cont'),
    f1_gradient_4 = bu.qs('#f1_gradient_4'),
    f1_keyb_4 = bu.qs('#f1_keyb_4'),
    f1_keyb_3_cont = bu.qs('#f1_keyb_3_cont'),
    f1_keyb_3 = bu.qs('#f1_keyb_3'),
    f1_keyb_2_cont = bu.qs('#f1_keyb_2_cont'),
    f1_keyb_2 = bu.qs('#f1_keyb_2'),
    f1_keyb_1_cont = bu.qs('#f1_keyb_1_cont'),
    f1_keyb_1 = bu.qs('#f1_keyb_1'),
    f1_cover = bu.qs('#f1_cover'),
    frame2 = bu.qs('#frame2'),
    f2_tablet_1_cont = bu.qs('#f2_tablet_1_cont'),
    f2_tablet_2_cont = bu.qs('#f2_tablet_2_cont'),
    f2_tablet_3_cont = bu.qs('#f2_tablet_3_cont'),
    f2_tablet_4_cont = bu.qs('#f2_tablet_4_cont'),
    f2_tablet_5_cont = bu.qs('#f2_tablet_5_cont'),
    f2_tablet_6_cont = bu.qs('#f2_tablet_6_cont'),
    f2_tablet_7_cont = bu.qs('#f2_tablet_7_cont'),
    headline_2 = bu.qs('#headline_2'),
    f2_cover = bu.qs('#f2_cover'),
    frame3 = bu.qs('#frame3'),
    f3_keyboard = bu.qs('#f3_keyboard'),
    f3_tablet = bu.qs('#f3_tablet'),
    f3_cover = bu.qs('#f3_cover'),
    frame4 = bu.qs('#frame4'),
    par_keyboard = bu.qs('#par_keyboard'),
    par_tablet_2 = bu.qs('#par_tablet_2'),
    par_tab2_screen = bu.qs('#par_tab2_screen'),
    par_tablet_1 = bu.qs('#par_tablet_1'),
    par_screen_1 = bu.qs('#par_screen_1'),
    par_screen_2 = bu.qs('#par_screen_2'),
    f4_cover = bu.qs('#f4_cover'),
    frame5 = bu.qs('#frame5'),
    unpar_tab = bu.qs('#unpar_tab'),
    unpar_laptop = bu.qs('#unpar_laptop'),
    headline_3 = bu.qs('#headline_3'),
    f5_cover = bu.qs('#f5_cover'),
    EF = bu.qs('#EF'),
    work = bu.qs('#work'),
    play = bu.qs('#play'),
    tab_logo = bu.qs('#tab_logo'),
    unpar_tab = bu.qs('#unpar_tab'),
    two_in_one = bu.qs('#two_in_one'),
    sponsors = bu.qs('#sponsors'),
    legal = bu.qs('#legal'),
    cta = bu.qs('#cta'),
    arrow = bu.qs('#arrow'),
    unpar_laptop = bu.qs('#unpar_laptop'),
    logo = bu.qs('#logo');

    // Set banner dimensions
    var adWidth = 300,
        adHeight = 600;


    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

    function frameStart() {
      bu.timerStart();
      frame0();
    }

    function frame0(){

     var tDelay=0

      var tl = new TimelineMax();
       //// frame 1

     tl.set(frame1,{autoAlpha:1})
      .staggerTo([f1_keyb_1_cont,f1_keyb_2_cont,f1_keyb_3_cont,f1_keyb_4_cont,f1_keyb_5_cont,f1_keyb_6_cont],10,{cycle:{y:["-30","-25","-20","-15","-10","-5"]}/*,repeat:-1*/})
      .to(f1a_cover, 1, { autoAlpha:0}, tDelay)
      //.from([f1_keyb_1_cont,f1_keyb_2_cont,f1_keyb_3_cont,f1_keyb_4_cont,f1_keyb_5_cont,f1_keyb_6_cont],0.5, { autoAlpha:0 }, .5)
      .to(f1_keyb_4_cont, 2.75, {y:"+50", ease:Sine.easeIn },tDelay)
      .to(f1_gradient_4, 2.75, {y:"+90", ease:Sine.easeIn },tDelay)
      .to(f1_keyb_4, 2.75, { scale: 0.85, ease:Sine.easeIn },tDelay)
      // .from(headline_1, 1, { autoAlpha: 0 },tDelay+= .5)

      .from(f1_cover, 1, { autoAlpha:0},tDelay+=2)

      //// frame 2

    
     .set(frame2,{autoAlpha:1},tDelay+=1)
     .to(f2a_cover, 2, { autoAlpha:0}, tDelay)
     .from(legal, 2, { autoAlpha:0},tDelay)
     .staggerTo([f2_tablet_1_cont,f2_tablet_2_cont,f2_tablet_3_cont,f2_tablet_4_cont,f2_tablet_5_cont, f2_tablet_6_cont, f2_tablet_7_cont],5, { cycle:{y:["+5","+10","+15","+20","+25","+30","+35"]},ease:Linear.easeNone}, 0.2,tDelay-1)
    //  .staggerFrom([f2_tablet_1_cont,f2_tablet_2_cont,f2_tablet_3_cont,f2_tablet_4_cont,f2_tablet_5_cont],5, { cycle:{x:["-150","-140","-180","-170","-150"]},ease:Linear.easeNone}, 0.2,tDelay-1)

    //  .from(f2_tablet_7_cont, 2.5, {x:"-50",ease:Linear.easeNone},tDelay)
     .from(f2_tablet_6_cont, 3, {x:"-60",ease:Linear.easeIn},tDelay)
     .from(f2_cover, 1, { autoAlpha:0},tDelay+=2)

     //// frame 3

     .set(frame3,{autoAlpha:1},tDelay+=1)
     .from(f3_tablet, 0.2, { autoAlpha: 0 },tDelay)
     
     .from(f3_cover, 1, { autoAlpha:1},tDelay)
     .to(f3_tablet, 20,{y:"-500"},tDelay )
     .from(f3_keyboard, 0.2, { autoAlpha: 0 },tDelay)
     .to(f3_keyboard, 20, {y:"+500"},tDelay )
     .from(f3_cover, 1, { autoAlpha:0},tDelay+=1.2)

      //// frame 4
     .set(frame4,{autoAlpha:1},tDelay+=1)
     .set(par_screen_2,{autoAlpha:0},tDelay)
     .from([par_keyboard,par_tablet_1,par_screen_1], 1, { autoAlpha: 0 },tDelay)
     .from(par_keyboard, 1.5, { y:"+20" },tDelay)
     .from(par_tablet_1, 1.5, { y:"-20" },tDelay)
     .set(par_screen_2,{autoAlpha:1},tDelay+=1.5)
     .from([par_tab2_screen,par_tablet_2], .1, { autoAlpha: 0 },tDelay)
     .to(par_tablet_2, 1.5, { x: +20,y:-20 },tDelay)
     .from(f4_cover, 1, { autoAlpha:0},tDelay+=1)
     .to(legal, 1, { autoAlpha:0},tDelay)

      //// frame 5
     .set(frame5,{autoAlpha:1},tDelay+=1)
     .set(f5_cover,{autoAlpha:1},tDelay)
     .to(f5_cover, 1, { autoAlpha:0},tDelay)
     .set([unpar_laptop,unpar_tab],{autoAlpha:1},tDelay)
     .from(headline_3, 0.5, { autoAlpha: 0 },tDelay)
     .from(unpar_tab, 1, { x: -20,y:+20 },tDelay)


      //// EF
     .set(EF,{autoAlpha:1},tDelay+=1)
     .to(headline_3, 0.5, { autoAlpha: 0 },tDelay+=0.5)
     .staggerFrom([work,play], 0.5, { autoAlpha: 0 },0.5,tDelay+=0.5)
     .from([tab_logo,two_in_one,cta,arrow,sponsors,legal], 0.5, { autoAlpha: 0 },tDelay+=1)

     TweenMax.delayedCall(tDelay,frameStop);

    }

    function frameStop() {

      enableRollover();
      bu.timerStop();
    }


    ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

    function onAdClick(e) {
      window.open(window.clickTag);
    }

   function onAdHover(e) {
      TweenMax.to(arrow,0.2,{x:+2})
      TweenMax.to(arrow,0.2,{x:0,delay:0.2})
    }

    function onAdOut(e) {

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

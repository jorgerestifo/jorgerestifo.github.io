!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return void 0===a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?!0:!1),a},getMobileOS:function(){var t=navigator.userAgent||navigator.vendor||e.opera;return t.match(/iPad/i)||t.match(/iPhone/i)||t.match(/iPod/i)?"iOS":t.match(/Android/i)||t.match(/Silk/i)?"Android":"unknown"},getBrowser:function(){if(void 0===o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){return"string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o=e.length,a;o--;)a=i.makeVar(e[o],t,r),n.push(a)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;u>s;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+".qs('#"+r[s].id+"')",s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)void 0!==e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var l;l=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=l;var m;m=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=m;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var g,f,p;"classList"in document.documentElement?(g=function(e,t){return i.targ(e).classList.contains(t)},f=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(g=function(e,t){return n(t).test(i.targ(e).className)},f=function(e,t){g(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=p,t.prototype.hasClass=g,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);
var Banner = {

  init: function() {

    'use strict';

    var bu = new BannerUtils(); // utilities class

    // Debug mode. Comment this line for final publishing
    bu.debug = true;

    // Log all IDs and create variables. Comment this line for final publishing
    bu.getAllIds(document, true);

    // Set up variables
    var ad_content = bu.qs('#ad_content');
    var divArr= [];
    var updateBg = false;
    var bg_anim = document.getElementById("bg_anim");
    var scaleVal = 1.4;
    var moveVal = 150;
    var triangles = 15;
    var itm = document.getElementById("svgTriangle");
    var tDelay = 0;
    // Set banner dimensions
    var adWidth = 300,
        adHeight = 250;

     // Check for IE 9 or earlier
    function preIE10Check() {
      if (window.attachEvent && !window.navigator.msPointerEnabled) {
        return true;
      } else {
        return false;
      }
    }    


    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

   

     function draw() {
        
          
   
          for (var i = 0; i < triangles; i++) { 
           
      // Copy the <li> element and its child nodes
            var cln = itm.cloneNode(true);
      
      // Append the cloned <li> element to <ul> with id="myList1"
            bg_anim.appendChild(cln);
            TweenMax.set(cln,{autoAlpha:1})
     
      /// add item to array      
            divArr.push(cln) 

            TweenMax.set(divArr[i],{transformOrigin:"40% 50%",force3D:false})
            TweenMax.to(divArr[i],1,{scale:scaleVal,x:i+10})

            scaleVal = scaleVal+.4;
         
          }

           TweenMax.set(bg_anim,{scale:3})


        }


      function moveTunnel(){

           for (var i = 0; i < divArr.length; i++) { 
           
                 TweenMax.to(divArr[i],10,{x:moveVal,y:30,repeat:-1, repeatDelay:1, yoyo:true,ease: Sine.EaseOut})
                 moveVal = moveVal - 5 ;
            }
      }

      function scaleStrokes() {
          for (var i = 0; i < divArr.length; i++) { 
            TweenMax.to(divArr[i].childNodes[1],.5,{strokeWidth:0.5, repeatDelay:1.5, repeat:-1, yoyo:true,delay:i*.125})
          }  
      }  

      function fadeStrokes() {
          for (var i = 0; i < divArr.length; i++) { 
            TweenMax.to(divArr[i],.5,{alpha:0,delay:i/5*.2,onComplete:remChild, onCompleteParams:[divArr[i],i]})
          }  
      }

      function remChild(elem,i){
        bg_anim.removeChild(elem);
        divArr.splice(i, 1);
      }

     
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

      TweenLite.delayedCall(tDelay, draw);
      TweenLite.delayedCall(tDelay, scaleStrokes);
      TweenMax.set(["#diploPresents","#dino"],{autoAlpha:1,delay:tDelay})
      TweenMax.from("#diploPresentsWrapper",.5,{x:-adWidth,delay:tDelay})
      TweenMax.from("#diploPresents",.5,{x:adWidth,delay:tDelay})
      TweenMax.from("#dinoWrapper",.5,{x:-adWidth,delay:tDelay})
      TweenMax.from("#dino",.5  ,{x:adWidth,delay:tDelay})

      TweenLite.delayedCall(tDelay+=1, moveTunnel)
      TweenMax.to(bg_anim,1,{scale:1.5,x:300,y:50,delay:tDelay,force3D:false})
      
      TweenMax.to("#diploPresents",.5,{x:adWidth,delay:tDelay+=1})
      TweenMax.to("#diploPresentsWrapper",.5,{x:-adWidth,delay:tDelay})
      TweenMax.to("#dino",.5,{x:adWidth,delay:tDelay })
      TweenMax.to("#dinoWrapper",.5,{x:-adWidth,delay:tDelay })

      TweenMax.set("#cantStop",{autoAlpha:1})
      TweenMax.from("#cantStop",.5  ,{x:adWidth,delay:tDelay})
      TweenMax.set("#theMix",{autoAlpha:1,delay:tDelay+=.5  })
      TweenMax.from("#theMix",.5  ,{x:adWidth,delay:tDelay})
      TweenMax.from("#theMixWrapper",.5  ,{x:-adWidth,delay:tDelay})
      
      TweenLite.delayedCall(tDelay+=2, fadeStrokes);

      TweenMax.to("#cantStopWrapper",.5  ,{x:adWidth,delay:tDelay})
      TweenMax.to("#cantStop",.5  ,{x:-adWidth,delay:tDelay})
      TweenMax.to("#theMix",.5  ,{x:adWidth,delay:tDelay})
      TweenMax.to("#theMixWrapper",.5  ,{x:-adWidth,delay:tDelay})
      


      TweenMax.set("#cta",{scaleX:0.02,autoAlpha:1,delay:tDelay+=.5})
      TweenMax.to("#cta",.2,{scale:1,delay:tDelay+=.1})
      TweenMax.set("#cta_text",{autoAlpha:1,delay:tDelay+=.3})
     

       TweenLite.delayedCall(tDelay, frameStop); 
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
      TweenMax.set(cta,{backgroundColor:"#333"})
    }

    function onAdOut(e) {
      TweenMax.set(cta,{backgroundColor:"#000"})
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
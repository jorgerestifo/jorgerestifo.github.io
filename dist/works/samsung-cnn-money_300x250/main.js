!function(e){"use strict";function t(){i=this}function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var r,o,a,i;t.prototype={constructor:t,debug:!1,dom:{},trace:function(t){i.debug&&e.console&&e.console.log(t)},getTouch:function(){return void 0===a&&(a="ontouchstart"in e||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?!0:!1),a},getBrowser:function(){if(void 0===o){var t="WebkitAppearance"in document.documentElement.style,n=!!e.opera||/opera|opr/i.test(navigator.userAgent);o=t?e.chrome?e.chrome&&e.chrome.webstore?"Chrome 14+":n?"Opera 14+":"Android 4+":"//"==/a/.__proto__?"Safari 5-":"Safari 6+ or other Webkit":n?"Opera 13-":e.sidebar?e.globalStorage?"Firefox 13-":"Firefox 14+":e.navigator.msPointerEnabled?"IE10+":document.all&&document.addEventListener&&!e.atob?"IE9":document.all&&!document.addEventListener?"IE8-":"unknown"}return o},timerStart:function(){r=(new Date).getTime()},getMilliseconds:function(){return(new Date).getTime()-r},getSeconds:function(){return.001*((new Date).getTime()-r)},timerStop:function(){var e=(new Date).getTime()-r;i.trace("seconds elapsed: "+.001*e)},preloadImages:function(e){function t(){o++;var e=.001*((new Date).getTime()-n);c.trace("image "+o+"/"+i.length+" loaded @ "+e),o===i.length&&a(r)}for(var n=(new Date).getTime(),r=[],o=0,a=function(){},i="object"!=typeof e?[e]:e,c=this,u=0;u<i.length;u++)r[u]=new Image,r[u].onload=t,r[u].onerror=t,r[u].src=i[u];return{done:function(e){a=e||a}}},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},targ:function(e){return"string"==typeof e?i.qs(e):e},makeVar:function(e,t,n){var r;return r=n?e.replace(/-(.)|_(.)/g,function(e,t,n){var r="";return t&&(r+=t.charAt(0).toUpperCase()+t.substring(1,t.length)),n&&(r+=n.toUpperCase()),r}):e.replace(/-/g,"_"),t[r]=document.getElementById(e),t[r]},makeVars:function(e,t,n,r){for(var o=e.length,a;o--;)a=i.makeVar(e[o],t,r),n.push(a)},getAllIdElements:function(e){for(var t=e.getElementsByTagName("*"),n=[],r=t.length;r--;)t[r].hasAttribute("id")&&n.push(t[r]);return n},getAllIds:function(e,t,n){for(var r=e.getElementsByTagName("*"),o=[],a="var ",c=n||"bu",u=r.length,s=0;u>s;s++)r[s].hasAttribute("id")&&(o.push(r[s].id),t&&(a+=r[s].id.replace(/-/g,"_")+" = "+c+".qs('#"+r[s].id+"')",s>-1&&(a+=",\n    ")));return t&&(a=a.replace(/,\s([^,]+)$/,"; $1"),i.trace(a)),o},makeVarsFromIds:function(e,t,n,r){var o=i.getAllIds(e||document);i.makeVars(o,t||i.dom,n||[],r)},recordStates:function(e){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var t=e.length;t--;)e[t].cl="",e[t].cl+=e[t].className},resetStates:function(e,t){(!e||e.length<1)&&(e=i.getAllIdElements(document));for(var n=e.length;n--;)void 0!==e[n].cl?e[n].className=e[n].cl:i.trace("initial state not recorded for: "+e[n].id);if(t){var r=10*e.length;setTimeout(function(){t.apply()},r)}}},NodeList.prototype.forEach=Array.prototype.forEach;var c,u;e.addEventListener?(c=function(e,t,n,r){i.targ(e).addEventListener(t,n,r||!1)},u=function(e,t,n,r){i.targ(e).removeEventListener(t,n,r||!1)}):e.attachEvent&&(c=function(t,n,r){var o=i.targ(t);o["e"+n+r]=r,o[n+r]=function(){o["e"+n+r](e.event)},o.attachEvent("on"+n,o[n+r])},u=function(e,t,n){var r=i.targ(e);r.detachEvent("on"+t,r[t+n]),r[t+n]=null}),t.prototype.addListener=c,t.prototype.removeListener=u;var s;s=e.stopPropagation?function(e){e.stopPropagation(),e.preventDefault()}:function(e){e.returnValue=!1,e.cancelBubble=!0},t.prototype.stopPropagation=s;var l;l=e.requestAnimationFrame?function(t){return e.requestAnimationFrame(t)}:e.webkitRequestAnimationFrame?function(t){return e.webkitRequestAnimationFrame(t)}:e.MozRequestAnimationFrame?function(t){return e.MozRequestAnimationFrame(t)}:function(t){return e.setTimeout(t,17)},t.prototype.requestFrame=l;var m;m=e.cancelAnimationFrame?function(t){return e.cancelAnimationFrame(t)}:e.webkitCancelAnimationFrame?function(t){return e.webkitCancelAnimationFrame(t)}:e.MozCancelAnimationFrame?function(t){return e.MozCancelAnimationFrame(t)}:function(t){return e.clearTimeout(t)},t.prototype.cancelFrame=m;var d;d=e.getComputedStyle?function(t){return e.getComputedStyle(t)}:function(e){return i.targ(e).currentStyle},t.prototype.getStyle=d;var g,f,p;"classList"in document.documentElement?(g=function(e,t){return i.targ(e).classList.contains(t)},f=function(e,t){i.targ(e).classList.add(t)},p=function(e,t){i.targ(e).classList.remove(t)}):(g=function(e,t){return n(t).test(i.targ(e).className)},f=function(e,t){g(e,t)||(i.targ(e).className=i.targ(e).className+" "+t)},p=function(e,t){i.targ(e).className=i.targ(e).className.replace(n(t)," ")}),t.prototype.addClass=f,t.prototype.removeClass=p,t.prototype.hasClass=g,t.prototype.replaceClass=function(e,t,n){i.removeClass(e,t),i.addClass(e,n)},e.BannerUtils=t}(window);

!function($){"use strict";var t,e=function(t){t=t||{};for(var e=1;e<arguments.length;e++)if(arguments[e])for(var s in arguments[e])arguments[e].hasOwnProperty(s)&&(t[s]=arguments[e][s]);return t},s=function(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)},r=function(r,i){t=this,this.el=r,this.options=e({},t.typed.defaults,i),this.isInput=s(this.el,"input"),this.attr=this.options.attr,this.showCursor=this.isInput?!1:this.options.showCursor,this.elContent=this.attr?this.el.setAttribute(this.attr):this.el.textContent,this.contentType=this.options.contentType,this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.backDelay=this.options.backDelay,this.stringsElement=this.options.stringsElement,this.strings=this.options.strings,this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.stop=!1,this.cursorChar=this.options.cursorChar,this.shuffle=this.options.shuffle,this.sequence=[],this.build()};r.prototype={constructor:r,init:function(){var t=this;t.timeout=setTimeout(function(){for(var e=0;e<t.strings.length;++e)t.sequence[e]=e;t.shuffle&&(t.sequence=t.shuffleArray(t.sequence)),t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},t.startDelay)},build:function(){var t=this;if(this.showCursor===!0&&(this.el.insertAdjacentHTML("afterend",'<span class="typed-cursor">'+this.cursorChar+"</span>"),this.cursor=this.el.querySelector("typed-cursor")),this.stringsElement){t.strings=[],this.stringsElement.style.display="none";for(var e=this.stringsElement.querySelectorAll("p"),s=0;s<e.length;s++)t.strings.push(e[s].innerHTML)}this.init()},typewrite:function(t,e){if(this.stop!==!0){var s=Math.round(Math.random()*this.typeSpeed)+this.typeSpeed,r=this;r.timeout=setTimeout(function(){var s=0,i=t.substr(e);if("^"===i.charAt(0)){var o=1;/^\^\d+/.test(i)&&(i=/\d+/.exec(i)[0],o+=i.length,s=parseInt(i)),t=t.substring(0,e)+t.substring(e+o)}if("html"===r.contentType){var n=t.substr(e).charAt(0);if("<"===n||"&"===n){var a="",h="";for(h="<"===n?">":";";t.substr(e).charAt(0)!==h;)a+=t.substr(e).charAt(0),e++;e++,a+=h}}r.timeout=setTimeout(function(){if(e===t.length){if(r.options.onStringTyped(r.arrayPos),r.arrayPos===r.strings.length-1&&(r.options.callback(),r.curLoop++,r.loop===!1||r.curLoop===r.loopCount))return;r.timeout=setTimeout(function(){r.backspace(t,e)},r.backDelay)}else{0===e&&r.options.preStringTyped(r.arrayPos);var s=t.substr(0,e+1);r.attr?r.el.attr(r.attr,s):r.isInput?r.el.val(s):"html"===r.contentType?r.el.innerHTML=s:r.el.textContent=s,e++,r.typewrite(t,e)}},s)},s)}},backspace:function(t,e){if(this.stop!==!0){var s=Math.round(Math.random()*this.typeSpeed)+this.backSpeed,r=this;r.timeout=setTimeout(function(){if("html"===r.contentType&&">"===t.substr(e).charAt(0)){for(var s="";"<"!==t.substr(e).charAt(0);)s-=t.substr(e).charAt(0),e--;e--,s+="<"}var i=t.substr(0,e);r.attr?r.el.attr(r.attr,i):r.isInput?r.el.val(i):"html"===r.contentType?r.el.innerHTML=i:r.el.textContent=i,e>r.stopNum?(e--,r.backspace(t,e)):e<=r.stopNum&&(r.arrayPos++,r.arrayPos===r.strings.length?(r.arrayPos=0,r.shuffle&&(r.sequence=r.shuffleArray(r.sequence)),r.init()):r.typewrite(r.strings[r.sequence[r.arrayPos]],e))},s)}},shuffleArray:function(t){var e,s,r=t.length;if(r)for(;--r;)s=Math.floor(Math.random()*(r+1)),e=t[s],t[s]=t[r],t[r]=e;return t},reset:function(){var t=this;clearInterval(t.timeout);var e=this.el.getAttribute("id");this.el.insertAdjacentHTML("afterend",'<span id="'+e+'"/>'),this.el.parentNode.removeChild(this.el),"undefined"!=typeof this.cursor&&this.cursor.parentNode.removeChild(this.cursor),t.options.resetCallback()}},r.prototype.typed=function(t){},r.prototype.typed.defaults={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,shuffle:!1,backDelay:500,loop:!1,loopCount:!1,showCursor:!0,cursorChar:"|",attr:null,contentType:"html",callback:function(){},preStringTyped:function(){},onStringTyped:function(){},resetCallback:function(){}},$.Typed=r}(window);

// @codekit-prepend "libs/BannerUtils.min.js";
// @codekit-prepend "libs/typed.min.js";
// @disabled-append "libs/gsap/easing/EasePack.min.js", "libs/gsap/plugins/CSSPlugin.min.js", "libs/gsap/TweenLite.min.js";

var Banner = {

  init: function(){

    'use strict';

    var bu = new BannerUtils(); // utilities class
    // var typo = new Typed(); // typing class

    bu.debug = true; // set this to false before final publishing
    // bu.getAllIds(document, true); // !!!!!!!!!!!!!!!! use this to generate all the var declarations below (copy/paste from console.log) !!!!!!!!!!!!!!!!
    var ad_content = bu.qs('#ad_content'),
        typed_strings = bu.qs('#typed-strings'),
        typed = bu.qs('#typed'),
        second_frame = bu.qs('#second_frame'),
        device_holder = bu.qs('#device_holder'),
        device_screen = bu.qs('#device_screen'),
        ai_canvas = bu.qs('#ai_canvas'),
        third_frame = bu.qs('#third_frame'),
        end_frame = bu.qs('#end_frame'),
        endframe_txt = bu.qs('#endframe_txt'),
        galaxy_logo_small = bu.qs('#galaxy_logo_small'),
        endframe_txt1 = bu.qs('#endframe_txt1'),
        endframe_device = bu.qs('#endframe_device'),
        legal1 = bu.qs('#legal1'),
        branding = bu.qs('#branding'),
        cta = bu.qs('#cta'),
        cta_up = bu.qs('#cta_up'),
        cta_over = bu.qs('#cta_over'),
        typed2_strings = bu.qs('#typed2-strings'),
        typed2 = bu.qs('#typed2'),
        typed_cursor;

    var adLog = bu.getAllIdElements(document);

    var adWidth = 300,
        adHeight = 250,
        adSeen = false,
        delay = 0,
        ai_img = new Image(),
        ai_sprite;


    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

    function startAnimation() {
      if(adSeen){
        // TweenLite.set(adLog,{clearProps:'all'}); // reset all the tweens
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

      //  Image sequence setup
      ai_sprite.pause();
      ai_sprite.every = 3;

      var typo = new Typed(typed, {
          stringsElement: typed_strings,
          showCursor: false,
          typeSpeed: 30,
          backDelay: 1000,
          loop: false,
          contentType: 'html', // or text
          loopCount: false, // defaults to false for infinite loop
          callback: function(){ frame1(); },
      });
      typed_cursor = bu.qs('.typed-cursor');
      bu.removeClass(ad_content, 'invisible');
    }

    function frame1() {
      setTimeout(frame2, 1500);
    }

    function frame2() {
      bu.addClass(second_frame, 'trans-250');
      bu.addClass(second_frame, 'ease-out-cubic');
      bu.removeClass(second_frame, 'alpha-0');

      setTimeout(device_anime, 250);
    }

    function device_anime() {
      delay = 0;

      // //  Show phone
      bu.removeClass(device_holder, 'alpha-0');

      //  Animate phone_sheen
      setTimeout(function(){
        ai_sprite.play();

        bu.addClass(device_screen, 'trans-2000');
        bu.addClass(device_screen, 'ease-out-cubic');
        bu.removeClass(device_screen, 'alpha-0');
      }, delay += 500);

      setTimeout(frame3, delay += 4000);
    }

    function frame3() {
      bu.replaceClass(device_holder, 'scale-start','scale-down');

      setTimeout(show_endframe, 500);
    }

    function show_endframe() {
      bu.addClass(end_frame, 'trans-250');
      bu.addClass(end_frame, 'ease-out-cubic');
      bu.removeClass(end_frame, 'alpha-0');

      bu.addClass(endframe_txt1, 'trans-250');
      bu.addClass(endframe_txt1, 'ease-out-cubic');
      bu.removeClass(endframe_txt1, 'alpha-0');

      bu.addClass(galaxy_logo_small, 'trans-250');
      bu.addClass(galaxy_logo_small, 'ease-out-cubic');
      bu.removeClass(galaxy_logo_small, 'alpha-0');

      bu.addClass(legal1, 'trans-250');
      bu.addClass(legal1, 'ease-out-cubic');
      bu.removeClass(legal1, 'alpha-0');

      bu.addClass(cta, 'trans-250');
      bu.addClass(cta, 'ease-out-cubic');
      bu.removeClass(cta, 'alpha-0');

      setTimeout(frameEnd, 250);
    }

    function frameEnd() {
      // bu.addClass(cta, 'trans-250');
      // bu.addClass(cta, 'ease-out-cubic');
      // bu.removeClass(cta, 'alpha-0');
      enableRollover();
      bu.timerStop();
    }

    function showFallback() {
      //  Show fallback endFrame
      adClickThru();
      adSeen = true;
      enableRollover();
      bu.removeClass(ad_content, 'invisible');

      show_endframe();
    }


    ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

    function loadImage(elem, path, callback){
      elem.onload = callback;
      elem.src = path;
    }

    function makeAnimatedSprite(){
      ai_sprite = new AnimatedSprite(ai_canvas, ai_img, 216, 440, 65);

      //  Show fallback
      if ( window.attachEvent && !window.navigator.msPointerEnabled ) {
        showFallback();
        //bu.trace('IE');
      } else {
        //bu.trace('not IE');
        startAnimation();
      }

      //startAnimation();
    }

    function AnimatedSprite(canvas, img, w, h, frames, record){
      var self = this,
          cols = Math.floor(img.width / w) - 1,
          rows = Math.floor(img.height / h) - 1,
          ctx = canvas.getContext('2d'),
          frame = 0,
          col = 0,
          row = 0,
          tick = 1,
          playing = false;
      if(record){
        var history = new Array(frames+1);
      }
      canvas.width = w;
      canvas.height = h;
      function update(){
        if(tick % self.every === 0){
          render();
        }
        tick++;
        if(playing === true) {
          bu.requestFrame(update);
        }
      }
      function render(){
        // bu.trace(row+' '+col+' '+frame);
        if(record){
          if(history[frame]){
            ctx.drawImage(history[frame], 0, 0, w, h, 0, 0, w, h);
          } else {
            ctx.drawImage(img, w * col, h * row, w, h, 0, 0, w, h);
            history[frame] = new Image();
            history[frame].src = canvas.toDataURL();
            // history[frame].onload = function(){ bu.trace('onload: ' + this.src); }
          }
        } else {

           ctx.clearRect(0, 0, w, h); // this will clear the canvas before repaint
           ctx.drawImage(img, w * col, h * row, w, h, 0, 0, w, h);
         }
        if(frame > (frames - 1) && !self.reverse){
          playing = false;
          self.reverse = true;
        } else if(frame < 1 && self.reverse){
          playing = false;
          self.reverse = false;
        } else {
          if(self.reverse){
            frame--;
            (col > 0) ? col-- : col = cols;
          } else {
            frame++;
            (col < cols) ? col++ : col = 0;
          }
          row = Math.floor(frame / (cols + 1));
        }
      }
      self.every = 1;
      self.reverse = false;
      self.play = function(){
        playing = true;
        update();
      }
      self.pause = function(){
        playing = false;
      }
      render(); // show the first frame
    }

    loadImage(ai_img, 'control_anime.png', makeAnimatedSprite);



    ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

    function onAdClick(e) {
      window.open(window.clickTag);
    }

    function onAdHover(e) {
      bu.removeClass(cta_over, 'alpha-0');
      bu.addClass(cta_up, 'alpha-0');
    }

    function onAdOut(e) {
      bu.addClass(cta_over, 'alpha-0');
      bu.removeClass(cta_up, 'alpha-0');
    }

    function adClickThru() {
      // don't use 'touchend', it's not worth it
      bu.addListener(ad_content, 'click', onAdClick);
    }

    function enableRollover() {
      bu.addClass(cta_over, 'trans-250');
      bu.addClass(cta_over, 'ease-out-cubic');
      bu.addClass(cta_up, 'trans-250');
      bu.addClass(cta_up, 'ease-out-cubic');
      bu.addListener(ad_content, 'mouseenter', onAdHover);
      bu.addListener(ad_content, 'mouseleave', onAdOut);
    }

    function disableRollover() {
      bu.removeListener(ad_content, 'mouseenter', onAdHover);
      bu.removeListener(ad_content, 'mouseleave', onAdOut);
    }


    ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

    //startAnimation();

  }
};

window.onload = function(){
  Banner.init();
};



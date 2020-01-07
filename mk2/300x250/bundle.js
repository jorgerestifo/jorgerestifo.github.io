(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      log.debug = false; // set to false before publishing

      var dom = domIds(),
          tl = new TimelineMax({
        paused: true,
        onComplete: addRollover
      }); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
          var video = document.getElementById('video');
          video.src = '300x250_video.mp4';
          video.load();
          video.pause();

          video.oncanplay = function () {
            tl.play();
            video.play();
          }; // video.addEventListener('loadeddata', function() {
          //   tl.play()
          //   video.play()
          // }, false);

        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        tl.from('#prism', 1, {
          x: '+=250',
          y: '-=10',
          ease: Cubic.easeInOut
        }, "+=4").staggerTo(['#red', '#yellow', '#blue', '#white', '#green'], 1, {
          cycle: {
            rotation: [-242, -242, -332, -242, -152]
          },
          ease: Cubic.easeInOut
        }, 0.04, '-=1.25').set("#logo-game", {
          className: "+=logo-game-ef"
        }, "-=0.5").set("#logo-gpo-white", {
          autoAlpha: 0
        }, "-=0.5").set("#logo-gpo-grey", {
          autoAlpha: 1
        }, "-=0.5").from('#headline', 1, {
          autoAlpha: 0
        });
        dom.ad_content.classList.remove('invisible');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        videoEnded = true;
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenLite.to('#cta', 0.25, {
            boxShadow: '0 2px 4px rgb(30, 140, 80)'
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          TweenLite.to('#cta', 0.25, {
            boxShadow: 'none'
          });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());

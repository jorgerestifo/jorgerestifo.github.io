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

      var dom = domIds(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function float() {
        var tl = new TimelineMax({
          yoyo: true,
          repeat: 1
        });
        tl.to('#main-character', 2, {
          rotation: 1,
          x: 2,
          ease: Cubic.easeInOut
        });
        return tl;
      }

      function frame0() {
        var tl = new TimelineMax({
          onComplete: addRollover
        });
        tl.from('#background-blur', 0.5, {
          autoAlpha: 0
        }, '+=0.5').from('#prism', 1, {
          x: '+=250',
          y: '-=10',
          ease: Cubic.easeInOut
        }).staggerTo(['#red', '#yellow', '#blue', '#white', '#green'], 1, {
          cycle: {
            rotation: [-240, -240, -330, -240, -150]
          },
          ease: Cubic.easeInOut
        }, 0.04, '-=1.25').from('#main-character', 0.5, {
          scale: 0.6,
          x: '+=600',
          ease: Cubic.easeinOut
        }, '-=0.6').to('#main-character', 0.25, {
          rotation: '-2',
          transformOrigin: 'bottom left',
          repeat: 1,
          yoyo: true
        }, '-=0.25').from(['#logo-game', '#logo-gpo', '#headline', '#cta'], 1, {
          autoAlpha: 0
        }).add(float(), '-=1').from(['#background', '#background-blur'], 4, {
          scale: 1.25,
          rotation: -5,
          ease: Cubic.easeOut
        }, 0);
        dom.ad_content.classList.remove('invisible');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenLite.to('#cta', 0.25, {
            boxShadow: '0 2px 4px rgb(30, 140, 80)'
          });

          if (!TweenMax.isTweening('#main-character')) {
            float();
          }
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

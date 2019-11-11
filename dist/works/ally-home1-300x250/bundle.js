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
  var domUtils = {
    // DOM UTILS
    getAllIdElements: function getAllIdElements(scope) {
      if (scope === void 0) {
        scope = document;
      }

      // returns an array of all elements in scope that have an ID
      var items = scope.getElementsByTagName('*');
      var elements = [];

      for (var i = items.length; i--;) {
        if (items[i].hasAttribute('id')) {
          elements.push(items[i]);
        }
      }

      return elements;
    },
    varName: function varName(id, camel) {
      var newname;
      camel ? newname = id.replace(/[-_]([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }).replace(/[-_]/g, '') : newname = id.replace(/-/g, '_');
      return newname;
    },
    getAllIds: function getAllIds(scope, trace, camel) {
      if (scope === void 0) {
        scope = document;
      }

      // returns an array of strings of all the id names in scope
      var items = scope.getElementsByTagName('*');
      var ids = [];
      var varlist = "\nfunction getEl(id){\n    return document.getElementById(id);\n}\nvar ";
      var len = items.length;

      for (var i = 0; i < len; i++) {
        if (items[i].hasAttribute('id')) {
          ids.push(items[i].id);

          if (trace) {
            varlist += this.varName(items[i].id, camel) + " = getEl('" + items[i].id + "')";

            if (i > -1) {
              varlist += ',\n    ';
            }
          }
        }
      }

      if (trace) {
        varlist = varlist.replace(/,\s([^,]+)$/, '; $1\n\n');
        log.trace(varlist);
      }

      return ids;
    },
    makeVarsFromIds: function makeVarsFromIds(scope, camel) {
      if (scope === void 0) {
        scope = document;
      }

      var ids = this.getAllIds(scope);
      var i = ids.length;
      var elements = {};

      while (i--) {
        elements[this.varName(ids[i], camel)] = document.getElementById(ids[i]);
      }

      return elements;
    },
    recordClasses: function recordClasses(elements) {
      if (elements === void 0) {
        elements = this.getAllIdElements(document);
      }

      // record each element's current classList
      var i = elements.length;

      while (i--) {
        elements[i].cl = '';
        elements[i].cl += elements[i].className;
      }
    },
    resetClasses: function resetClasses(elements, callback) {
      if (elements === void 0) {
        elements = this.getAllIdElements(document);
      }

      // resets the classes to their recorded state (you must call recordStates() before using this method)
      var i = elements.length;

      while (i--) {
        if (typeof elements[i].cl !== 'undefined') {
          elements[i].className = elements[i].cl;
        } else {
          this.trace("initial state not recorded for: " + elements[i].id);
        }
      }

      if (callback) {
        var dly = elements.length * 10; // KLUDGE adds .01 seconds delay for each element

        setTimeout(function () {
          callback.apply();
        }, dly);
      }
    }
  };

  var Banner = {
    init: function init() {
      log.debug = false; // set to false before publishing

      var dom = domUtils.makeVarsFromIds(),
          txt1_split = new SplitText('#txt1-wrap', {
        type: 'chars'
      }),
          txt2_split = new SplitText('#txt2-wrap', {
        type: 'chars'
      }),
          ef_txt_split = new SplitText('#ef-txt-wrap', {
        type: 'chars'
      }),
          master = new TimelineMax(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        function houseEF() {
          var tl = new TimelineLite(); // TweenLite.set('#h2-sign-sold', { autoAlpha: 0 }); // not needed for this creative, but available to use for other ones.

          tl.set('#house-ef', {
            autoAlpha: 1
          }).staggerFrom(['#h2-grass-center , #h2-grass-right', '#h2-grass-left'], 0.25, {
            scale: 0,
            transformOrigin: 'bottom center',
            ease: Back.easeOut
          }, 0.15).staggerFrom(['#h2-house-floor', '#h2-house-entrance', '#h2-house-living', '#h2-house-bedroom'], 0.5, {
            scaleY: 0,
            transformOrigin: 'bottom center',
            ease: Back.easeOut
          }, 0.15, '-=0.25').staggerFrom(['#h2-tree-left', '#h2-tree-right'], 1, {
            scale: 0,
            transformOrigin: 'bottom center',
            ease: Cubic.easeOut
          }, 0.25, "-=1").staggerFrom(['#h2-cloud-xl-t', '#h2-cloud-sm-b', '#h2-cloud-xl-b', '#h2-cloud-sm-t'], 3, {
            cycle: {
              x: ['-=30', '-=10', '-=60', '-=20']
            },
            autoAlpha: 0,
            ease: Cubic.easeOut
          }, 0.1, "-=1").from('#h2-bike', 0.5, {
            autoAlpha: 0
          }, 2);
          return tl;
        }

        function f2Zoom() {
          var tl = new TimelineLite();
          tl.set("#computer-wrap", {
            autoAlpha: 1
          }, "computerIn").from("#computer", 1, {
            scale: 1,
            ease: Cubic.easeOut,
            force3D: false
          }, "computerIn").to("#house-f1", 1, {
            scale: .25,
            x: "+=27",
            y: "+=7",
            ease: Cubic.easeOut
          }, "computerIn");
          return tl;
        }

        function houseF1() {
          var tl = new TimelineLite();
          TweenLite.set('#h1-sign-sold', {
            autoAlpha: 0
          }); // not needed for this creative, but available to use for other ones.

          tl.from('#h1-sun', 2, {
            scale: 0,
            transformOrigin: 'bottom center',
            ease: Back.easeOut
          }, 0.15, 0).from('#h1-sun', 2, {
            x: "-=70",
            ease: Sine.easeIn
          }, 0.15, 0).from('#h1-sun', 2, {
            y: "+=150",
            ease: Sine.easeInOut
          }, 0.15, 0).staggerFrom(['#h1-grass-center, #h1-grass-right', '#h1-grass-left'], 0.25, {
            scale: 0,
            transformOrigin: 'bottom center',
            ease: Back.easeOut
          }, 0.15, 0).staggerFrom(['#h1-house-floor', '#h1-entrance', '#h1-living', '#h1-bedroom'], 0.5, {
            scaleY: 0,
            transformOrigin: 'bottom center',
            ease: Back.easeOut
          }, 0.15, '-=2.25').staggerFrom(['#h1-tree-left, #h1-tree-right'], 1, {
            scale: 0,
            transformOrigin: 'bottom center',
            ease: Cubic.easeOut
          }, 0.25, 1).staggerFrom(['#h1-cloud-xl-t', '#h1-cloud-sm-b'], 3, {
            cycle: {
              x: ['-=30', '-=10', '-=60', '-=20']
            },
            autoAlpha: 0,
            ease: Cubic.easeOut
          }, 0.1, 1).from('#h1-sign-forsale', 0.5, {
            autoAlpha: 0
          }, 2).to('#paint', 0.2, {
            backgroundPosition: 'right'
          }, 2.5);
          return tl;
        }

        master // .set('#ad_content', {background: '#fcf4ed'background: '#fcf4ed'})
        .staggerFrom(txt1_split.chars, 0.1, {
          autoAlpha: 0,
          x: '-=5'
        }, 0.01).add(houseF1()).staggerTo(txt1_split.chars, 0.1, {
          autoAlpha: 0,
          x: '+=5'
        }, 0.01, '-=1.75').add(f2Zoom(), '-=1.5').staggerFrom(txt2_split.chars, 0.1, {
          autoAlpha: 0,
          x: '-=5'
        }, 0.01).staggerTo(txt2_split.chars, 0.1, {
          autoAlpha: 0,
          x: '+=5'
        }, 0.01, '+=2').to(['#house-f1,#computer-wrap'], 0.5, {
          autoAlpha: 0
        }).from("#legal", 0.5, {
          autoAlpha: 0
        }).add(houseEF()).add("efIn", "-=3").staggerFrom(ef_txt_split.chars, 0.1, {
          autoAlpha: 0,
          x: '-=5'
        }, 0.01, "efIn").from('#cta', 0.67, {
          autoAlpha: 0,
          onComplete: addRollover
        }, 'efIn');
        dom.ad_content.classList.remove('invisible');
        console.log("BANNER DURATION :", master.duration());
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenLite.to('#cta-hover', 0.5, {
            autoAlpha: 1
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          TweenLite.to('#cta-hover', 0.5, {
            autoAlpha: 0
          });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.Enabler.exit('main');

          if (master.totalProgress() < 1) {
            master.totalProgress(1, false);
          }
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    if (window.Enabler) {
      if (!window.Enabler.isInitialized()) {
        window.Enabler.addEventListener(window.studio.events.StudioEvent.INIT, Banner.init);
      } else {
        window.requestAnimationFrame(Banner.init);
      }
    } else {
      document.getElementById('backup').className = 'backup';
    }
  };

}());

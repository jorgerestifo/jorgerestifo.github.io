(function () {
  'use strict';

  // BannerUtils version 3.1.5
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    debug: true,
    trace: function trace(message) {
      if (window.console && this.debug) {
        window.console.log(message);
      }
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

      var dom = domUtils.makeVarsFromIds(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        function draw() {
          var tl = new TimelineLite(),
              path_1 = MorphSVGPlugin.pathDataToBezier('.path-01', {
            align: 'relative'
          }),
              path_2 = MorphSVGPlugin.pathDataToBezier('.path-02', {
            align: 'relative'
          }); // .to(['#spen', '#spen-reflection'], 2, { bezier: { curviness: 0.4, values: motionPath2, type: 'cubic' }, ease: Sine.easeInOut }, 0).from('#draw-path-2', 2, { drawSVG: '0%', ease: Sine.easeInOut }, '-=2').to(['#spen', '#spen-reflection'], 0.25, { x: '-=70', y: '+=7' }).to(['#spen', '#spen-reflection'], 1, { bezier: { curviness: 0.4, values: motionPath3, type: 'cubic' }, ease: Sine.easeInOut }).from('#draw-path-3', 1, { drawSVG: '0%', ease: Sine.easeInOut }, '-=1').to('#spen', 1, { rotation: '+=5', repeat: 1, yoyo: true, ease: Sine.easeInOut }, '-=2').to('#spen-reflection', 1, { rotation: '-=5', repeat: 1, yoyo: true, ease: Sine.easeInOut }, '-=2').to(['#text-headline', '#phone-wrapper'], 0.5, { autoAlpha: 0 }, '+=1').from('#deviceCont', 0.5, { autoAlpha: 0 }).from('#device', 1, { y: '+=10', ease: Sine.easeInOut, force3D: false }, '-=0.5').from('#device_shadow', 1, { y: '-=30', ease: Sine.easeInOut }, '-=1').staggerFrom(['#logo', '#text-subline', '#cta'], 0.5, { autoAlpha: 0 }, 0.5);

          tl.add('draw1').from('.path-01', 1, {
            drawSVG: 0,
            ease: Linear.easeNone
          }, 'draw1').to('#spen', 1, {
            bezier: {
              curviness: 0.4,
              values: path_1,
              type: 'cubic'
            },
            ease: Linear.easeNone
          }, 'draw1').to('#spen', 1, {
            x: 7,
            y: 16,
            ease: Sine.easeInOut
          }).add('draw2').from('.path-02', 0.75, {
            drawSVG: 0,
            ease: Sine.easeInOut
          }, 'draw2').to('#spen', 0.75, {
            bezier: {
              curviness: 0.4,
              values: path_2,
              type: 'cubic'
            },
            ease: Sine.easeInOut
          }, 'draw2').to('#spen', 1, {
            x: 400,
            rotation: -15,
            ease: Sine.easeInOut
          }, "+=0.5").add('scale', "-=0.5").from('#phone', 0.5, {
            autoAlpha: 0
          }, "scale").to(['#drawing'], 0.5, {
            autoAlpha: 0
          }, "scale").to('#phone-wrap', 1, {
            scale: 0.38,
            x: 170,
            y: 85,
            ease: Sine.easeInOut
          }, "scale").to('#black-bg', 1, {
            autoAlpha: 0
          }, "scale").from(['#verizon-black', '#samsung-black'], 1, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
          }, 'scale').from('#headline-01', 1, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
          }, '-=0.5').to('#headline-01', 1, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
          }, '+=0.75').to('#phone-01', 1, {
            scale: 0.55,
            y: 260,
            ease: Cubic.easeInOut
          }).from('#headline-02', 1, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
          }, '-=1').to(['#phone-wrap', '#headline-02'], 1, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
          }, '+=1.5');
          return tl;
        }

        function endframe() {
          var tl = new TimelineLite();
          tl.staggerFrom(['#phone-ef', '#headline-ef', '#subline', '#cta', '#legal'], 1, {
            autoAlpha: 0
          }, 0.5);
          return tl;
        }

        var master = new TimelineMax({
          onComplete: addRollover
        });
        master.add(draw()).add(endframe());
        dom.ad_content.classList.remove('invisible');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenLite.to('#cta-black', 1, {
            autoAlpha: 1
          });
          TweenLite.to('#cta-white', 1, {
            autoAlpha: 0
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          TweenLite.to('#cta-black', 1, {
            autoAlpha: 0
          });
          TweenLite.to('#cta-white', 1, {
            autoAlpha: 1
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
    Banner.init();
  };

}());

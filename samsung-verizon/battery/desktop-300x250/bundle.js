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
        function battery() {
          function counter() {
            var progress = {
              value: 80
            };
            var final = 100;
            TweenMax.to(progress, 1, {
              value: final,
              roundProps: 'value',
              onUpdate: addValue,
              ease: Linear.easeNone
            });

            function addValue() {
              if (progress.value < 100) {
                dom.counter.innerHTML = progress.value + '%';
              } else {
                dom.counter.innerHTML = final + '%';
              }
            }
          }

          var tl = new TimelineLite();
          tl.from(['#glow', '#spin', '#counter'], 0.5, {
            autoAlpha: 0
          }).call(counter, [], this, '-=0.5').to('#spin', 1, {
            rotation: "+=360"
          }, '-=0.5').to(['#counter', '#spin'], 1, {
            autoAlpha: 0
          }, '+=0.5');
          return tl;
        }

        function phones() {
          var tl = new TimelineLite();
          tl.staggerFrom(['#phone-01-image', '#headline-01'], 1, {
            autoAlpha: 0
          }, 0.5).to('#headline-01', 1, {
            autoAlpha: 0
          }, '+=1').set('#ad_content', {
            background: 'none #edf2f7'
          }, '-=0.5').add('#scale').from('#phone-01-body', 1, {
            autoAlpha: 0
          }, 'scale').to('#phone-01', 1, {
            scale: 0.22,
            x: 167,
            y: 86,
            ease: Cubic.easeInOut,
            force3D: false
          }, 'scale').to('#phone-01-image', 1, {
            scale: 2,
            top: "+=150",
            ease: Cubic.easeInOut,
            force3D: false
          }, 'scale').from(['#samsung-black', '#verizon-black'], 0.5, {
            autoAlpha: 0
          }, 'scale').to(['#glow', '#spin'], 0.5, {
            autoAlpha: 0
          }, 'scale').set('#phone-02', {
            autoAlpha: 1
          }, '-=1').from('#phone-02', 1, {
            x: '-=95',
            ease: Cubic.easeInOut,
            force3D: false
          }, '-=1').from('#headline-02', 1, {
            autoAlpha: 0
          }, '-=0.5').to(['#headline-02', '#phone-01', '#phone-02'], 0.5, {
            autoAlpha: 0
          }, '+=1.5');
          return tl;
        }

        function endframe() {
          var tl = new TimelineLite();
          tl.staggerFrom(['#phones-ef', '#headline-ef', '#subline', '#cta', '#legal'], 1, {
            autoAlpha: 0
          }, 0.5);
          return tl;
        }

        var master = new TimelineMax({
          onComplete: addRollover
        });
        master.add(battery()).add(phones(), '-=0.25').add(endframe());
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
        dom.legal.addEventListener('mouseenter', function () {
          TweenLite.to('#legal-box', 0.5, {
            autoAlpha: 1
          });
        });
        dom.legal.addEventListener('mouseleave', function () {
          TweenLite.to('#legal-box', 0.5, {
            autoAlpha: 0
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

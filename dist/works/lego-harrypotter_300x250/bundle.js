(function () {
  'use strict';

  // BannerUtils version 3.1.3

  function es5() {
    // ES5 compliance for: IE10 99%, FF38 99%, CH43 98%, OP38 98%, AN4.4 98%, iOS7 97%, SF6 96%
    // const LEADING_ZEROS = (parseInt('010', 10) === 10); // IE9, FF21, CH23, SF6, OP15, iOS7, AN4.4
    // const USE_STRICT = (function(){return !this;})(); // IE10, FF4, CH13, SF6, OP12.1, iOS5.1, AN3
    // const DATE_ISO_STRING = !!(Date && Date.prototype && Date.prototype.toISOString); // IE9, FF3.5, CH13, SF5, OP10.5, iOS6, AN4
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
    getAllIdElements: function getAllIdElements() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

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
      var newname = void 0;
      camel ? newname = id.replace(/[-_]([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }).replace(/[-_]/g, '') : newname = id.replace(/-/g, '_');
      return newname;
    },
    getAllIds: function getAllIds() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var trace = arguments[1];
      var camel = arguments[2];

      // returns an array of strings of all the id names in scope
      var items = scope.getElementsByTagName('*');
      var ids = [];
      var varlist = '\nfunction getEl(id){\n    return document.getElementById(id);\n}\nvar ';
      var len = items.length;
      for (var i = 0; i < len; i++) {
        if (items[i].hasAttribute('id')) {
          ids.push(items[i].id);
          if (trace) {
            varlist += this.varName(items[i].id, camel) + ' = getEl(\'' + items[i].id + '\')';
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
    makeVarsFromIds: function makeVarsFromIds() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var camel = arguments[1];

      var ids = this.getAllIds(scope);
      var i = ids.length;
      var elements = {};
      while (i--) {
        elements[this.varName(ids[i], camel)] = document.getElementById(ids[i]);
      }
      return elements;
    },
    recordClasses: function recordClasses() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getAllIdElements(document);

      // record each element's current classList
      var i = elements.length;
      while (i--) {
        elements[i].cl = '';
        elements[i].cl += elements[i].className;
      }
    },
    resetClasses: function resetClasses() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getAllIdElements(document);
      var callback = arguments[1];

      // resets the classes to their recorded state (you must call recordStates() before using this method)
      var i = elements.length;
      while (i--) {
        if (typeof elements[i].cl !== 'undefined') {
          elements[i].className = elements[i].cl;
        } else {
          this.trace('initial state not recorded for: ' + elements[i].id);
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

      log.debug = true; // set to false before publishing
      var dom = domUtils.makeVarsFromIds();
      var halfAdd = dom.ad_content.offsetWidth / 2;
      var step_left = 7;
      var step_right = 7;
      var step = 174;
      var tl_eyes = new TimelineMax({ repeat: 1 });

      function blink() {
        tl_eyes.to('#top_eyelid', 0.1, { top: '1', ease: Sine.easeOut }).to('#bottom_eyelid', 0.1, { top: '5', ease: Sine.easeOut }, '-=0.1').to('#top_eyelid', 0.1, { top: '-6', ease: Sine.easeOut }, '+=0.1').to('#bottom_eyelid', 0.1, { top: '11', ease: Sine.easeOut }, '-=0.1');
      }

      function move_left() {
        if (!TweenMax.isTweening('#character')) {
          TweenMax.set('#character', { backgroundPosition: '0px' });
          TweenMax.to('#character', 1, { delay: 0.3, onComplete: function onComplete() {
              blink();
            }, backgroundPosition: '-=' + step * step_left + 'px', ease: SteppedEase.config(step_left) });
        }
      }

      function move_right() {
        if (!TweenMax.isTweening('#character')) {
          TweenMax.set('#character', { backgroundPosition: step * step_left + 'px' });
          TweenMax.to('#character', 0.9, { delay: 0.3, onComplete: function onComplete() {
              blink();
            }, backgroundPosition: '-=' + step * step_right + 'px', ease: SteppedEase.config(step_right) });
        }
      }
      ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function randomMove() {
        Math.random() >= 0.5 ? move_left() : move_right();
      }

      function frame0() {
        var tl = new TimelineMax({ onComplete: addRollover });

        dom.ad_content.classList.remove('invisible');

        tl.from('#text_1', 1.5, { autoAlpha: '0', ease: Sine.easeOut }).from('#background_dark', 4, { autoAlpha: '0', ease: Sine.easeOut }, '-=0.75').add(randomMove, '-=2').to('#character', 2, { autoAlpha: '0', ease: Sine.easeOut }, '+=2').to('#background', 2, { autoAlpha: '0', ease: Sine.easeOut }, '-=2').from('#background_2', 2, { autoAlpha: '0', ease: Sine.easeOut }, '-=2').from('#text_2', 2, { autoAlpha: '0', ease: Sine.easeOut }, '-=2').from('#product', 2, { autoAlpha: '0', ease: Sine.easeOut }, '-=2').to('#background_dark', 2, { autoAlpha: '0', ease: Sine.easeOut }, '-=1').from('#cta', 0.5, { autoAlpha: '0', ease: Sine.easeOut }, '-=1');

        blink();
      }

      ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenMax.to('#text_cta', 0.5, { autoAlpha: '0', ease: Sine.easeOut });
          TweenMax.to('#text_cta_over', 0.5, { autoAlpha: '1', ease: Sine.easeOut });
          TweenMax.to('#cta', 0.5, { backgroundColor: 'white', ease: Sine.easeOut });
        });

        dom.ad_content.addEventListener('mouseleave', function () {
          TweenMax.to('#text_cta', 0.5, { autoAlpha: '1', ease: Sine.easeOut });
          TweenMax.to('#text_cta_over', 0.5, { autoAlpha: '0', ease: Sine.easeOut });
          TweenMax.to('#cta', 0.5, { backgroundColor: 'transparent', ease: Sine.easeOut });
        });
      }

      function addRolloverAnimations() {
        dom.ad_content.addEventListener('mouseleave', function () {
          TweenMax.to('#character', 0.5, { x: '=175', ease: Sine.easeOut, delay: 1 });
          TweenMax.to('#background', 0.5, { x: 0, ease: Sine.easeOut, delay: 1 });
        });

        dom.ad_content.addEventListener('mousemove', function (event) {
          var xMouse = event.clientX; // Get the horizontal coordinate

          if (event.clientX <= dom.character.offsetLeft + dom.character.offsetWidth / 2) {
            move_left();
          } else {
            move_right();
          }

          TweenMax.to('#background', 0.75, { x: -xMouse * 0.01, ease: Sine.easeOut });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      }

      ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////
      addRolloverAnimations();
      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    Banner.init();
  };

}());

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
      var dom = domUtils.makeVarsFromIds(),
          adWidth = 300;

      ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          document.getElementById('backup').className = 'backup';
        }
      }

      function frame0() {
        TweenMax.set("#ad_content", { autoAlpha: 1 });
        var tl = new TimelineMax({ onComplete: enableRollOver });
        tl.from("#box1", .5, { autoAlpha: 0, scale: 0, ease: Back.easeOut }).from("#box2", .5, { autoAlpha: 0, scale: 0, ease: Back.easeOut }).to(["#box1", "#box2"], .5, { x: -adWidth, ease: Sine.easeInOut }, "+=1.5").to("#bg1", .5, { x: -adWidth, ease: Sine.easeInOut }, "-=.4").from("#bg2", .5, { x: adWidth, ease: Sine.easeInOut }, "-=.5").from("#box3", .5, { autoAlpha: 0, scale: 0, ease: Back.easeOut }).to("#box3", .5, { x: -adWidth, ease: Sine.easeInOut }, "+=1.5").to("#bg2", .5, { x: -adWidth, ease: Sine.easeInOut }, "-=.4").from("#bg3", .5, { x: adWidth, ease: Sine.easeInOut }, "-=.5").from("#box4", .5, { autoAlpha: 0, scale: 0, ease: Back.easeOut }).to("#box4", .5, { y: -40, ease: Back.easeOut }, "+=1.5").from("#cta", .5, { autoAlpha: 0, scale: 0, ease: Back.easeOut }, "-=.5").to("#bg3", .5, { x: -adWidth, ease: Sine.easeInOut }, "-=.5").from("#bg4", .5, { x: adWidth, ease: Sine.easeInOut }, "-=.5");
      }

      ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

      function enableRollOver() {
        dom.ad_content.addEventListener('mouseenter', ctaOver);
        dom.ad_content.addEventListener('mouseleave', ctaOut);
      }

      function onAdClick() {

        window.open(window.clickTag || window.clickTAG);
      }

      function ctaOver() {
        TweenMax.set('#cta', { backgroundColor: "#f5cb09" });
      }

      function ctaOut() {
        TweenMax.set('#cta', { backgroundColor: "#1aa8dc" });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', onAdClick);
      }

      ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    Banner.init();
  };

}());

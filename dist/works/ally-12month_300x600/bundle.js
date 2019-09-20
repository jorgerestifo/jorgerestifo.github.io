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

  function parseRates(url, params, success, failure) {
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5000;

    var x = new window.XMLHttpRequest();
    var rateValue = [];
    try {
      x.open('GET', url);
      x.timeout = timeout;
      if (!window.ActiveXObject && 'ActiveXObject' in window) {
        x.responseType = 'msxml-document';
      }
      // Internet Explorer
      // try {x.responseType = 'msxml-document';} catch(e){}
      x.send(null);

      x.onreadystatechange = function () {
        if (x.status === 200) {
          if (x.readyState === 4) {
            if (x.responseXML !== null) {
              var doc = x.responseXML;
              // create rate array
              // loop through requested parameters
              for (var i = 0; i < params.length; i++) {
                // find rate node and get rate value
                var getrate = void 0;

                if (doc.evaluate) {
                  getrate = doc.evaluate("//product/term[@id='" + params[i].termId + "']/rate[@min='" + params[i].min + "' and @max='" + params[i].max + "']/apy/text()", doc, null, 0, null).iterateNext();
                } else {
                  getrate = doc.selectNodes("//product/term[@id='" + params[i].termId + "']/rate[@min='" + params[i].min + "' and @max='" + params[i].max + "']/apy/text()")[0];
                }

                // validate rate
                if (getrate !== null) {
                  if (doc.evaluate) {
                    // Firefox, Opera, Google Chrome and Safari
                    if (getrate.textContent.length !== 0 && getrate.textContent.indexOf('.') !== -1) {
                      // add rate to array
                      rateValue.push(getrate.textContent);
                      window.console && console.log && console.log('Term= ' + params[i].termId + ', Min=' + params[i].min + ', Max=' + params[i].max + ', Rate=' + rateValue[i] + '%');
                    }
                  } else {
                    // Internet Explorer
                    if (getrate.text.length !== 0 && getrate.text.indexOf('.') !== -1) {
                      // add rate to array
                      rateValue.push(getrate.text);
                      window.console && console.log && console.log('Term= ' + params[i].termId + ', Min=' + params[i].min + ', Max=' + params[i].max + ', Rate=' + rateValue[i] + '%');
                    }
                  }
                } else {
                  break;
                }
              }
              success(rateValue);
            }
          }
        } else {
          failure('Status: ' + x.status); // also fired ontimeout
        }
      };
    } catch (e) {
      failure('Parsing error: ' + e.message);
      // window.console && console.error && console.error('Parsing error:' + e.message);
    }
  }

  var Banner = {

    init: function init() {

      log.debug = false; // set to false before publishing
      var dom = domUtils.makeVarsFromIds(),
          txt1a_split = new SplitText('#txt1a', { type: 'chars' }),
          txt1b_split = new SplitText('#txt1b', { type: 'chars' }),
          txt2_split = new SplitText('#txt2-wrap', { type: ['lines', 'chars'] }),
          txt3_split = new SplitText('#txt3-wrap', { type: 'chars' });
      var rate_value = void 0,
          called = false;

      // Detect the OS
      var OSName = 'Unknown OS';
      if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
      if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS';
      if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX';
      if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux';

      if (OSName === 'Windows') {
        TweenLite.set(['#rate', '#rate_perc', '#fallback_rate'], { lineHeight: 0.85 }); // fix for misaligned elements in Windows (all browsers)
        TweenLite.set(['#ef_txt'], { lineHeight: 1 }); // fix for misaligned elements in Windows (all browsers)
      }

      ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////


      function frameStart() {
        if (es5()) {
          var xmlURL = 'https://www.ally.com/apps/global/xml/rates.xml';
          var product = [{
            'productCode': 'CD',
            'termId': 'CD-12',
            'min': '25000',
            'max': '9.9999999999E8'
          }];
          parseRates(xmlURL, product, handleRate, handleFail);
        } else {
          document.getElementById('backup').className = 'backup';
        }
      }

      function handleRate(rate) {
        // log.trace(rate);
        if (rate && Array.isArray(rate) && rate.length > 0) rate_value = rate[0];
        if (called === false) {
          frame0();
        }
      }

      function handleFail(msg) {
        // log.trace(msg);
        if (called === false) {
          frame0();
        }
      }

      function rateCounter() {
        var progress = void 0;
        if (rate_value) {
          progress = { value: '0.00' };
          TweenMax.to(progress, 1.5, { value: rate_value, onUpdate: addrate, ease: Sine.easeInOut });
          TweenMax.to(['#rate_txt', '#rate_perc'], 0.67, { delay: 0.33, autoAlpha: 1 });
        } else {
          TweenMax.to('#fallback_rate', 0.67, { delay: 0.33, autoAlpha: 1 });
        }
        function addrate() {
          if (progress.value < rate_value) {
            dom.rate.innerHTML = progress.value.toFixed(2); // HACK: not sure how this is working because progress.value is a string. UPDATE: Added toFixed() to avoid white space between round number and percentage character.
            // if(Math.round(progress.value * 100) / 100 == rate_value) {
            //   dom.rate.innerHTML = rate_value.toFixed(1);
            // }
          }
        }
      }

      function frame0() {
        called = true;
        var tl = new TimelineMax();
        // TweenMax.set('#coins',{scale:2.3})
        dom.ad_content.classList.remove('invisible');

        tl.from("#coin", 2, { y: "-=500", rotationX: 720, ease: Bounce.easeOut }).staggerFrom(txt1a_split.chars, 0.5, { x: '-=500', ease: Power4.easeOut }, 0).staggerFrom(txt1b_split.chars, 0.5, { x: '+=500', ease: Power4.easeOut }, 0).staggerTo(txt1a_split.chars, 0.1, { autoAlpha: 0, x: '+=5' }, 0.01, '+=1.5').staggerTo(txt1b_split.chars, 0.1, { autoAlpha: 0, x: '+=5' }, 0.01)
        // .to("#coin", 0.5, {autoAlpha:0, ease: Power4.easeOut},"-=0.1")

        .from("#f2_legal", .5, { autoAlpha: 0 }).from("#txt2-wrap", 0.5, { x: '-=500', ease: Power4.easeOut }).staggerFrom("#coins div", .01, { autoAlpha: 0 }, .075, "-=.5").set("#coin", { autoAlpha: 0 }, "-=.7").staggerTo(txt2_split.chars, 0.1, { autoAlpha: 0, x: '+=5' }, 0.01, "+=2.5").to(["#coins", "#f2_legal"], 0.5, { autoAlpha: 0 }, "-=.2").from('#txt3-wrap', 0.67, { x: '-=500', ease: Power4.easeOut }).staggerTo(txt3_split.chars, 0.1, { autoAlpha: 0, x: '+=5' }, 0.01, '+=2').call(rateCounter).staggerFrom(['#ef_txt', '#ef_txt2'], 0.5, { autoAlpha: 0 }, '+=1.5').from('#cta', 0.67, { autoAlpha: 0, ease: Power4.easeOut }).to('#logo', 0.67, { y: "-=19", ease: Power4.easeOut }).from("#tagline", 0.5, { autoAlpha: 0, ease: Power4.easeOut }, "-=.5").from('#legal', 0.5, { autoAlpha: 0 });

        // tl.seek(15)
      }

      ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

      function onAdClick() {
        window.Enabler.exit('main');
      }

      function ctaOver() {
        TweenMax.to("#cta_arrow", 0.25, { x: 10, ease: Power2.easeOut });
        TweenMax.to("#cta_bg", 0.25, { attr: { width: "30" }, ease: Power2.easeOut });
      }

      function ctaOut() {
        TweenMax.to("#cta_arrow", 0.25, { x: 0, ease: Power2.easeOut });
        TweenMax.to("#cta_bg", 0.25, { attr: { width: "20" }, ease: Power2.easeOut });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('mouseenter', ctaOver);
        dom.ad_content.addEventListener('mouseleave', ctaOut);
        dom.ad_content.addEventListener('click', onAdClick);
      }

      ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    if (window.Enabler) {
      if (!window.Enabler.isInitialized()) {
        window.Enabler.addEventListener(window.studio.events.StudioEvent.INIT, Banner.init);
      } else {
        Banner.init();
      }
    } else {
      document.getElementById('backup').className = 'backup';
    }
  };

}());

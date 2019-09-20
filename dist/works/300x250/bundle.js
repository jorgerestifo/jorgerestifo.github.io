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
  var timer = {
    start: function start() {
      this.startTime = new Date().getTime();
    },
    get milliseconds() {
      return new Date().getTime() - this.startTime;
    },
    get seconds() {
      return (new Date().getTime() - this.startTime) * 0.001;
    },
    stop: function stop() {
      var elapsed = new Date().getTime() - this.startTime;
      log.trace('seconds elapsed: ' + elapsed * 0.001);
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

      log.debug = false; // set to false before publishing
      var dom = domUtils.makeVarsFromIds(),
          txt1_split = new SplitText('#txt1', { type: 'words' }),
          txt2_split = new SplitText('#txt2', { type: 'words' }),
          txt3_split = new SplitText('#txt3', { type: 'words' }),
          txt4_split = new SplitText('#txt4', { type: 'words' }),
          txtTap_split = new SplitText('#txt-tap', { type: 'words' }),
          txtInter1_split = new SplitText('#txt-inter1', { type: 'words' }),
          txtInter2_split = new SplitText('#txt-inter2', { type: 'words' }),
          txtInter3_split = new SplitText('#txt-inter3', { type: 'words' }),
          txtInter4_split = new SplitText('#txt-inter4', { type: 'words' }),
          txtInter5_split = new SplitText('#txt-inter5', { type: 'words' }),
          txtInter6_split = new SplitText('#txt-inter6', { type: 'words' }),
          txtInter7_split = new SplitText('#txt-inter7', { type: 'words' }),
          txtInter8_split = new SplitText('#txt-inter8', { type: 'words' }),
          ctaTxt_split = new SplitText('#cta', { type: 'words' });

      var tablet1W = 181,
          tablet1frames = 40,
          tablet2frames = 18,
          adWidth = 300,
          count = 0,
          clickOk = true;

      ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
          timer.start();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function txtIn(c, splitter) {
        var tl = new TimelineMax();
        tl.set('.' + c, { clearProps: 'all' }).staggerFrom(splitter, 1, { autoAlpha: 0, y: '+=50', ease: Elastic.easeOut }, 0.1);
      }

      function bubbleAnim(b, c, s, hide, moveRight) {
        var tl = new TimelineMax();
        tl.set(b, { clearProps: 'all' }).set('#' + c, { autoAlpha: 1 }).call(txtIn, [c, s]).set(b, { autoAlpha: 1 }).from(b, 0.7, { rotation: '-50', scale: 0, transformOrigin: 'bottom right', ease: Back.easeOut });

        if (moveRight) {
          tl.set('#bubble2', { x: '+=50' }, '-=1');
        }

        if (hide) {
          tl.to(b, 0.7, { rotation: '-50', scale: 0, transformOrigin: 'bottom right', ease: Back.easeIn }, '+=2').set('#' + c, { autoAlpha: 0 });
        }
      }

      function drag() {
        var tl = new TimelineMax({ repeat: 3 });
        tl.to('#char-drag-arm-big', 0.5, { rotation: 15, scaleX: 1.6, ease: Strong.easeOut }).to('#char-drag-arm-big', 0.5, { rotation: 12, scaleX: 1.6 }, '+=1')
        // .to('#char-drag-arm-big', 0.5, { rotation: 0, scaleX: 1.3 }, '-=.5')
        .to('#char-drag-arm-big', 0.5, { scaleX: 2, ease: Sine.easeOut }, "-=.2");

        tl.timeScale(1.4);

        var tl2 = new TimelineMax({ onComplete: pauseTl });
        tl2.to('#shows', 0.3, { x: '+=540', ease: Linear.easeNone }).to('#shows', 0.3, { x: '+=560', ease: Linear.easeNone }, '+=2').to('#shows', 0.3, { x: '+=590', ease: Linear.easeNone }, '+=2').to('#shows', 0.3, { x: '+=600', ease: Linear.easeNone }, '+=2').to('#char-drag-arm-big', 0.5, { rotation: -30, scaleX: 1, ease: Sine.easeOut });

        tl2.timeScale(1.4);

        function pauseTl() {
          tl.pause();
        }
      }

      function frame0() {
        var tl = new TimelineMax({ onComplete: addRollover });
        dom.ad_content.classList.remove('invisible');

        tl.from('#char', .7, { scale: 0.4, ease: Back.easeOut }).call(bubbleAnim, ['#bubble', 'txt1', txt1_split.words, true], this, '-=.5').call(bubbleAnim, ['#bubble', 'txt2', txt2_split.words, true], this, '+=3').set('#char-1', { autoAlpha: 0 }, '+=3.5').set('#char-3', { autoAlpha: 1 }).set('#tablet_anim1', { rotation: 10, y: "-=25", x: "+=5" }).call(bubbleAnim, ['#bubble', 'txt3', txt3_split.words, true]).set('#char-3', { autoAlpha: 0 }, '+=3.5').set(['#char-drag-head', '#char-drag-arm', '#char-drag-body'], { autoAlpha: 1 }).set('#tablet_anim1', { x: "+=15" }).to('#char-drag-arm', .5, { rotation: 20, scaleX: 1.6, repeat: 1, yoyo: true, ease: Strong.easeInOut }).set('#tablet1', { autoAlpha: 0 }).to('#tablet_anim1', 1.5, { x: '+=10', backgroundPosition: '-=' + tablet1frames * tablet1W + 'px', ease: SteppedEase.config(tablet1frames) }).set(['#tablet_anim1', '#char-drag-head', '#char-drag-arm', '#char-drag-body', '#shadow'], { autoAlpha: 0 }).set(['#char-drag-head-big', '#char-drag-arm-big', '#char-drag-body-big', '#tablet-big-wrap'], { autoAlpha: 1 }).set('#char', { x: '+=10' }).to('#char-drag-arm-big', 1, { rotation: 12, scaleX: 2, ease: Strong.easeInOut }).call(drag, [], this, '-=.2').set(['#char-drag-head-big', '#char-drag-arm-big', '#char-drag-body-big', '#tablet-big-wrap'], { autoAlpha: 0 }, '+=6.2').set(['#char-drag-head', '#char-drag-arm', '#char-drag-body', '#shadow'], { autoAlpha: 1 }).set('#tablet_anim2', { x: "+=20", autoAlpha: 1 }).from(['#tablet_anim2', '#char-4'], .7, { scale: 0.4, ease: Back.easeOut }).set('#tap-bg', { autoAlpha: 1 }).from('#tap-bg', .5, { x: -adWidth, ease: Back.easeOut }).from('#branding', .1, { autoAlpha: 0, ease: Back.easeOut }, "-=1.2").staggerFrom(txt4_split.words, 2, { x: '-100', autoAlpha: 0, ease: Elastic.easeOut }, .2, '-=.5').set('#click', { width: adWidth, height: '50' }).to('#char-drag-arm', .5, { rotation: 10, scaleX: 1.5, repeat: 1, yoyo: true, ease: Strong.easeInOut }, "-=3").to('#tablet_anim2', 1.5, { backgroundPosition: '-=' + tablet2frames * tablet1W + 'px', ease: SteppedEase.config(tablet2frames) }, '-=2.5').to('#final-frame', .2, { autoAlpha: 0 }, '-=2.5').to('#final-frame', .2, { autoAlpha: 1 }, '-=1.2').set(['#char-drag-head', '#char-drag-arm', '#char-drag-body'], { autoAlpha: 0 }, "-=1.5").set("#char-4", { autoAlpha: 1 }, "-=1.5").set('#tablet_anim2', { x: "-=25", autoAlpha: 1 }, "-=1.5").call(bubbleAnim, ['#bubble3', 'txt-tap', txtTap_split.words], this, "-=1.5").call(enableCharClick);

        // tl.seek(12);
      }

      function clickeable(last) {
        if (!last) {
          count++;
        } else {
          count = 0;
        }

        var tl = new TimelineMax();
        tl.call(bubbleAnim, ['#bubble3', 'txt-tap', txtTap_split.words]).set('#char-4', { autoAlpha: 1 }).set('#char-1', { autoAlpha: 0 }).set('#tablet_anim2', { rotation: 0, y: "+=10", x: "-=20", autoAlpha: 1 }).call(enableCharClick, [], this, "+=2");
      }

      function txt1() {
        var tl = new TimelineMax();
        tl.call(bubbleAnim, ['#bubble2', 'txt-inter1', txtInter1_split.words, true, true]).call(bubbleAnim, ['#bubble2', 'txt-inter2', txtInter2_split.words, true, true], this, '+=4').call(clickeable, [], this, '+=4');
      }

      function txt2() {
        var tl = new TimelineMax();
        tl.call(bubbleAnim, ['#bubble2', 'txt-inter3', txtInter3_split.words, true, true]).call(bubbleAnim, ['#bubble2', 'txt-inter4', txtInter4_split.words, true, true], this, '+=4').call(clickeable, [], this, '+=4');
      }

      function txt3() {
        var tl = new TimelineMax();
        tl.call(bubbleAnim, ['#bubble2', 'txt-inter5', txtInter5_split.words, true, true]).call(bubbleAnim, ['#bubble2', 'txt-inter6', txtInter6_split.words, true, true], this, '+=4').call(clickeable, [], this, '+=4');
      }

      function txt4() {
        var tl = new TimelineMax();
        tl.call(bubbleAnim, ['#bubble2', 'txt-inter7', txtInter7_split.words, true, true]).call(bubbleAnim, ['#bubble2', 'txt-inter8', txtInter8_split.words, true, true], this, '+=4').call(clickeable, [true], this, '+=4');
      }

      function interact(count) {
        switch (count) {
          case 0:
            txt1();
            break;
          case 1:
            txt2();
            break;
          case 2:
            txt3();
            break;
          case 3:
            txt4();
            break;
        }
      }

      ////////////////////////////// UTILS //////////////////////////

      function click_char() {
        if (clickOk) {
          disableCharClick();
          var tl = new TimelineMax();
          tl.set('#char-4', { autoAlpha: 0 }).set('#char-1', { autoAlpha: 1 }).set('#tablet_anim2', { rotation: 10, y: "-=10", x: "+=20", autoAlpha: 1 }).to('#bubble3', .2, { rotation: '-50', scale: 0, transformOrigin: 'bottom right', ease: Back.easeIn }).set(['#bubble3', '#txt-tap'], { autoAlpha: 0 }).call(interact, [count], this, '+=0.5');
        }
      }

      function disableCharClick() {
        dom.char_click.removeEventListener('click', click_char);
        TweenMax.set('#char_click', { className: 'wait' });
        clickOk = false;
      }

      function enableCharClick() {
        clickOk = true;
        dom.char_click.addEventListener('click', click_char);
        TweenMax.set('#char_click', { className: 'pointer' });
      }

      ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

      function addRollover() {
        timer.stop();
        dom.char_click.addEventListener('mouseenter', function () {
          if (clickOk) {
            clickOk = false;
            var tl = new TimelineMax({ onComplete: function onComplete() {
                clickOk = true;
              } });
            tl.to('#bubble3', 0.2, { scale: 1.2, transformOrigin: 'bottom right', repeat: 1, yoyo: true }).staggerTo(txtTap_split.words, 0.2, { y: '-=20', repeat: 1, yoyo: true }, 0.05, '-=0.3');
          }
        });
      }

      function adClickThru() {
        dom.click.addEventListener('click', function () {
          window.open(clickTAGvalue, landingpagetarget);
        });
        dom.click.addEventListener('mouseenter', function () {
          TweenLite.set('#cta', { boxShadow: '0 0 0 7px white' });
        });

        dom.click.addEventListener('mouseleave', function () {
          TweenLite.set('#cta', { clearProps: 'boxShadow' });
        });
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

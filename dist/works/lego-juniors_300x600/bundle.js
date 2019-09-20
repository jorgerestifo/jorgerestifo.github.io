(function () {
'use strict';

function es5() {
  return parseInt('010', 10) === 10 && function () {
    return !this;
  }() && !!(Date && Date.prototype && Date.prototype.toISOString);
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
  getAllIdElements: function getAllIdElements() {
    var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

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

    var i = elements.length;
    while (i--) {
      elements[i].cl = '';
      elements[i].cl += elements[i].className;
    }
  },
  resetClasses: function resetClasses() {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getAllIdElements(document);
    var callback = arguments[1];

    var i = elements.length;
    while (i--) {
      if (typeof elements[i].cl !== 'undefined') {
        elements[i].className = elements[i].cl;
      } else {
        this.trace('initial state not recorded for: ' + elements[i].id);
      }
    }
    if (callback) {
      var dly = elements.length * 10;
      setTimeout(function () {
        callback.apply();
      }, dly);
    }
  }
};

var Banner = {

  init: function init() {

    'use strict';

    var dom = domUtils.makeVarsFromIds();
    timer.start();


    function frameStart() {
      if (es5()) {
        frame0();
      } else {
        document.getElementById('backup').className = 'backup';
      }
    }

    function frame0() {

      dom.ad_content.classList.toggle('invisible');
      var tl = new TimelineMax({ onComplete: enableRollOver });

      tl.from(['#circ', '#txt1'], 1, { autoAlpha: 0 }).from('#img1', 1, { scale: 0, ease: Back.easeOut }, "-=1").set(['#txt1', '#img1'], { autoAlpha: 0 }, "+=2").from('#txt2', 1, { autoAlpha: 0 }).from('#img2', 1, { autoAlpha: 0, ease: Back.easeOut }, "-=1").set(['#txt2', '#img2'], { autoAlpha: 0 }, "+=.5").from('#txt3', 1, { autoAlpha: 0 }).from('#img3', 1, { autoAlpha: 0, ease: Back.easeOut }, "-=1").set(['#txt3', '#img3'], { autoAlpha: 0 }, "+=.5").set('#box', { autoAlpha: 1 }).to('#box_top', 1, { y: "-=550" }).to('#box_bottom', 1, { y: "+=550" }, "-=1").from('#confeti_box', .5, { scale: 0, y: "+=400" }, "-=1").staggerFrom(['#confeti_1', '#confeti_2'], 2, { y: "-=600" }, .3).from('#txt4', 1, { autoAlpha: 0 }, "-=3").from('#img4', 1, { scale: 0, ease: Back.easeOut }, "-=3").set(['#txt4', '#img4'], { autoAlpha: 0 }, "+=0").from('#txt5', 1, { autoAlpha: 0 }).from('#img5', 1, { scale: 0, ease: Back.easeOut }, "-=1").set(['#txt5', '#img5'], { autoAlpha: 0 }, "+=1").from('#txt6', 1, { autoAlpha: 0 }).from('#img6', 1, { scale: 0, ease: Back.easeOut }, "-=1").to(['#img6', '#txt6'], .5, { autoAlpha: 0 }, "+=1").to('#img4', 1, { autoAlpha: 1 }).set('#bg_fix', { autoAlpha: 0 }, "-=1").set('#ef_fix', { autoAlpha: 1 }, "-=1").staggerFrom(['#legal', '#txt_ef', '#cta'], .5, { autoAlpha: 0 }, .2, "-=1");
    }

    function enableRollOver() {
      timer.stop();
      dom.ad_content.addEventListener('mouseenter', ctaOver);
      dom.ad_content.addEventListener('mouseleave', ctaOut);
    }

    function onAdClick() {
      window.open(window.clickTag || window.clickTAG);
    }

    function ctaOver() {
      TweenMax.set('#cta_bg', { backgroundColor: "#33cc99" });
    }

    function ctaOut() {
      TweenMax.set('#cta_bg', { backgroundColor: "#ff6633" });
    }

    function adClickThru() {
      dom.ad_content.addEventListener('click', onAdClick);
    }

    adClickThru();
    frameStart();
  }
};

window.onload = function () {
  Banner.init();
};

}());

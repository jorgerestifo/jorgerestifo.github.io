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


    function frameStart() {
      if (es5()) {

        frame0();
      } else {
        document.getElementById('backup').className = 'backup';
      }
    }

    function frame0() {

      dom.ad_content.classList.toggle('invisible');
      var tl = new TimelineMax();

      tl.staggerFrom(['#head1', '#device , #card'], 1, { autoAlpha: 0 }, .5).to("#card", 2, { y: 220, ease: Cubic.easeInOut }).staggerFrom(["#t1", "#t2", "#t3", "#t4"], .3, { scale: .5, autoAlpha: 0, ease: Cubic.easeOut }, .05, "-=1").to(['#head1', '#logo'], .2, { autoAlpha: 0 }).staggerFrom(['#head_ef', '#cta'], 2, { autoAlpha: 0 }, .5).add(enableRollOver);
    }

    function enableRollOver() {
      dom.ad_content.addEventListener('mouseenter', ctaOver);
      dom.ad_content.addEventListener('mouseleave', ctaOut);
    }

    function onAdClick() {
      window.open(window.clickTag || window.clickTAG);
    }

    function ctaOver() {
      TweenMax.set('#cta_over', { autoAlpha: 1 });
      TweenMax.set('#cta_up', { autoAlpha: 0 });
    }

    function ctaOut() {
      TweenMax.set('#cta_over', { autoAlpha: 0 });
      TweenMax.set('#cta_up', { autoAlpha: 1 });
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

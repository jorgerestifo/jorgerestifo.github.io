(function () {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

function es5() {
  var LEADING_ZEROS = parseInt('010', 10) === 10;
  var USE_STRICT = function () {
    return !this;
  }();
  var DATE_ISO_STRING = !!(Date && Date.prototype && Date.prototype.toISOString);
  return LEADING_ZEROS && USE_STRICT && DATE_ISO_STRING;
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
  getAllIds: function getAllIds() {
    var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var trace = arguments[1];

    var items = scope.getElementsByTagName('*');
    var ids = [];
    var varlist = '\nfunction getEl(id){\n    return document.getElementById(id);\n}\nvar ';
    var len = items.length;
    for (var i = 0; i < len; i++) {
      if (items[i].hasAttribute('id')) {
        ids.push(items[i].id);
        if (trace) {
          varlist += items[i].id.replace(/-/g, '_') + ' = getEl(\'' + items[i].id + '\')';
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
  makeVar: function makeVar(id, camel) {
    var newname = void 0;
    camel ? newname = id.replace(/[-_]([a-z])/g, function (g) {
      return g[1].toUpperCase();
    }).replace(/[-_]/g, '') : newname = id.replace(/-/g, '_');
    return {
      key: newname,
      val: document.getElementById(id)
    };
  },
  makeVars: function makeVars(ids, camel) {
    var i = ids.length;
    var elements = {};
    var elem = void 0;
    while (i--) {
      elem = this.makeVar(ids[i], camel);
      elements[elem.key] = elem.val;
    }
    return elements;
  },
  makeVarsFromIds: function makeVarsFromIds() {
    var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var camelCase = arguments[1];

    var ids = this.getAllIds(scope);
    return this.makeVars(ids, camelCase);
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

    log.debug = true;
    var dom = domUtils.makeVarsFromIds();
    var gsap = TweenMax;

    function frameStart() {
      if (es5()) {
        frame0();
      } else {
        gsap.set('#backup', { className: 'backup' });
      }
    }

    function frame0() {
      dom.ad_content.classList.remove('invisible');
      var tl = new TimelineMax({ onComplete: addRollOver });
      tl.from("#txt1", .5, { autoAlpha: 0, ease: Sine.easeOut }).to(["#txt1", "#img1"], .5, { autoAlpha: 0, ease: Sine.easeIn }, "+=2").from("#txt2", .5, { autoAlpha: 0, ease: Sine.easeOut }).to(["#txt2", "#img2"], .5, { autoAlpha: 0, ease: Sine.easeIn }, "+=2").from("#txt3", .5, { autoAlpha: 0, ease: Sine.easeOut }).to(["#txt3", "#img3"], .5, { autoAlpha: 0, ease: Sine.easeIn }, "+=2").from("#ef_txt", .5, { autoAlpha: 0, ease: Sine.easeOut }).from("#cta", .5, { x: -200, ease: Sine.easeOut }).from("#legal", .5, { autoAlpha: 0, ease: Sine.easeOut }).set(["#ef1", "#ef2", "#ef3", "#ef4", "#ef5", "#ef6", "#ef7", "#branding"], { transformOrigin: "50% 50%" }).staggerTo(["#ef1", "#ef2", "#ef3", "#ef4", "#ef5", "#ef6", "#ef7"], .2, { cycle: { y: ["+=0", "+=2", "+=0", "+=1", "+=3", "+=0", "+=0"], x: ["+=1", "+=2", "+=2", "+=1", "+=0", "-=1", "-=1"], rotation: [10, -10, 10, -10, 11, -15, 15] }, ease: Strong.easeIn }).staggerTo(["#ef1", "#ef2", "#ef3", "#ef4", "#ef5", "#ef6", "#ef7"], .2, { cycle: { rotation: [-10, +10, -10, +10, -11, 15, -15] } }).staggerTo(["#ef1", "#ef2", "#ef3", "#ef4", "#ef5", "#ef6", "#ef7"], .2, { cycle: { rotation: [5, -9, 3, 10, -11, 5, -5] } }).staggerTo(["#ef1", "#ef2", "#ef3", "#ef4", "#ef5", "#ef6", "#ef7"], .2, { cycle: { rotation: [-5, 9, -3, -10, 11, -5, 5] }, ease: Sine.easeOut }).to("#branding", .2, { rotation: -10, yoyo: true, repeat: 1, ease: Sine.easeIn });
    }

    function adClickThru() {
      dom.ad_content.addEventListener('click', function () {
        window.open(window.clickTag);
      });
    }
    function addRollOver() {
      dom.ad_content.addEventListener('mouseenter', function () {
        TweenMax.to("#cta_txt", .2, { scale: 1.1, force3D: false });
      });
      dom.ad_content.addEventListener('mouseleave', function () {
        TweenMax.to("#cta_txt", .2, { scale: 1, force3D: false });
      });
    }

    adClickThru();
    frameStart();
  }
};

window.onload = function () {
  Banner.init();
};

}());

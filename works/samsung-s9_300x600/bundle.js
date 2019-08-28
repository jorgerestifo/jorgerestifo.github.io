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





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
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
    if (camel) {
      newname = id.replace(/-(.)|_(.)/g, function (match, group1, group2) {
        var result = '';
        if (group1) {
          result += group1.charAt(0).toUpperCase() + group1.substring(1, group1.length);
        }
        if (group2) {
          result += group2.toUpperCase();
        }
        return result;
      });
    } else {
      newname = id.replace(/-/g, '_');
    }
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

var particleList;
var animationTime = 15;
var particleList;
var imgSrc = 'petal.png';

function particlesInit() {
  var i;
  var numParticles = 50;
  var tempParticle;
  var tempDiv;
  var adDiv;
  var tempScale;
  var tempVX;
  var tempVY;
  var tempVR;
  var startX;
  var startY;
  var tempRotation;
  var tempImage;
  var horizontalBasePosition = 100;
  var maxAdditiveHorizonalDistance = 80;
  var verticalCenter = 75;
  var verticalSpread = 1;
  var baseHorizontalSpeed = -.6;
  var maxAdditiveHorizontalSpeed = -.7;
  var baseVerticalSpeed = -.18;
  var maxAdditiveVerticalSpeed = .35;

  particleList = [];

  for (i = 0; i < numParticles; i++) {
    adDiv = document.getElementById("d1petals");
    tempDiv = document.createElement("div");
    tempImage = new Image(20, 20);
    tempImage.src = imgSrc;
    tempDiv.appendChild(tempImage);
    tempDiv.id = "temp" + i;
    tempDiv.style.height = 10;
    tempDiv.style.width = 10;

    tempDiv.style.position = "absolute";

    tempScale = 0.5 + Math.random() * .5;
    tempVX = baseHorizontalSpeed + Math.random() * maxAdditiveHorizontalSpeed;
    tempVY = baseVerticalSpeed + Math.random() * maxAdditiveVerticalSpeed;
    startX = horizontalBasePosition + Math.random() * maxAdditiveHorizonalDistance;
    startY = verticalCenter + (-1 * (verticalSpread * .5) + Math.random() * verticalSpread);

    tempVR = Math.random() * 2;
    tempRotation = Math.random() * 360;

    tempParticle = new Particle(tempDiv, startX, startY, tempRotation, tempScale, tempVX, tempVY, tempVR);
    particleList.push(tempParticle);

    adDiv.appendChild(tempDiv);
  }

  updateParticles();
}

function updateParticles() {

  var i;
  var numParticles = particleList ? particleList.length : 0;
  var tempParticle;

  for (i = 0; i < numParticles; i++) {
    var tempParticle = particleList[i];

    tempParticle.xPos = -tempParticle.vx * animationTime * 30;
    tempParticle.yPos = tempParticle.vy * animationTime * 30;
    tempParticle.r = tempParticle.vr * animationTime * 30;

    TweenMax.to(tempParticle, animationTime, { x: '-=' + tempParticle.xPos, y: '+=' + tempParticle.yPos, rotation: tempParticle.r });
  }
}

var Particle = function () {
  function Particle(target, x, y, rotation, scale, vx, vy, vr) {
    classCallCheck(this, Particle);

    this._target = target;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.vx = vx;
    this.vy = vy;
    this.vr = vr;
    this.scale = scale;

    if (this._target) {
      this._target.style.rotationPoint = "50% 50%";
    }

    this.updateTransform();
  }

  createClass(Particle, [{
    key: 'updateTransform',
    value: function updateTransform() {
      if (this._target) {
        var val = "scale(" + this._scale + "," + this._scale + ")" + "rotate(" + this._rotation + "deg)";
        this._target.style.transform = val;
      }
    }
  }, {
    key: 'x',
    get: function get$$1() {
      return this._x;
    },
    set: function set$$1(val) {
      this._x = val;
      this._target.style.left = val;
    }
  }, {
    key: 'y',
    get: function get$$1() {
      return this._y;
    },
    set: function set$$1(val) {
      this._y = val;
      this._target.style.top = val;
    }
  }, {
    key: 'rotation',
    get: function get$$1() {
      return this._rotation;
    },
    set: function set$$1(val) {
      this._rotation = val;
      this.updateTransform();
    }
  }, {
    key: 'scale',
    get: function get$$1() {
      return this._scale;
    },
    set: function set$$1(val) {
      this._scale = val;
      this.updateTransform();
    }
  }, {
    key: 'vx',
    get: function get$$1() {
      return this._vx;
    },
    set: function set$$1(val) {
      this._vx = val;
    }
  }, {
    key: 'vy',
    get: function get$$1() {
      return this._vy;
    },
    set: function set$$1(val) {
      this._vy = val;
    }
  }, {
    key: 'vr',
    get: function get$$1() {
      return this._vr;
    },
    set: function set$$1(val) {
      this._vr = val;
    }
  }, {
    key: 'target',
    get: function get$$1() {
      return this._target;
    },
    set: function set$$1(val) {
      this._target = val;
    }
  }]);
  return Particle;
}();

var Banner = {

  init: function init() {

    'use strict';

    var dom = domUtils.makeVarsFromIds();


    function frameStart() {
      if (es5()) {

        var img = new Image();

        img.onload = function () {
          frame0();
        };

        img.src = imgSrc;
      } else {
        document.getElementById('backup').className = 'backup';
      }
    }

    function frame0() {

      particlesInit();

      dom.ad_content.classList.toggle('invisible');
      var tl = new TimelineMax();

      tl.from('#device2', .5, { x: '+=10', autoAlpha: 0 }, '-=1').from('#device1', 1, { x: '+=10', autoAlpha: 0 }, '-=1').from('#device3', 1, { x: '-=10', autoAlpha: 0 }, '-=1').from('#logo', 1, { autoAlpha: 0 }, '-=.5').staggerFrom(['#text_1', '#text_2'], 2, { autoAlpha: 0 }, .5, '-=.5').from('#cta_up', 1, { autoAlpha: 0, force3D: true }, '-=1.5').add(enableRollOver, '-=1.5').staggerFrom(['#d2p7', '#d2p8', '#d2p9', '#d2p10'], 2, { autoalpha: 0, x: '+=70', ease: Sine.easeInOut, repeat: 2 }, .3, '-=5').from('#d1p1', 6, { rotation: 80, y: '+=20', x: '+=200', ease: Sine.easeInOut }, '-=6.5').from('#d2p2', 4, { rotation: -80, x: '+=90', ease: Sine.easeInOut }, '-=4.5').from('#d1p2', 7, { rotation: -80, y: '+=80', x: '+=200', ease: Sine.easeInOut }, '-=5.5').from('#d2p3', 3, { rotation: -80, x: '+=70', y: '+=20', ease: Sine.easeInOut }, '-=6').from('#d1p3', 6, { rotation: -80, x: '+=200', ease: Sine.easeInOut }, '-=6.5').from('#d2p4', 3, { rotation: 80, x: '+=70', y: '+=20', ease: Sine.easeInOut }, '-=5').from('#d1p4', 5, { rotation: 80, y: '-=150', x: '+=200', ease: Sine.easeInOut }, '-=6').from('#d2p5', 3, { rotation: 50, x: '+=90', y: '+=5', ease: Sine.easeInOut }, '-=4').from('#d1p5', 5, { rotation: 80, y: '-=150', x: '+=200', ease: Sine.easeInOut }, '-=6').from('#d2p6', 4, { y: '+=50', x: '+=10', ease: Sine.easeInOut }, '-=4');
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

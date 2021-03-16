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

    log.debug = false;
    var dom = domUtils.makeVarsFromIds();
    var adStyle = getComputedStyle(dom.ad_content);
    var adHeight = parseInt(adStyle.height, 10);
    var adWidth = parseInt(adStyle.width, 10);
    var wallPattern = [[1, 4, 4, 3], [3, 4, 4, 1], [2, 2, 4, 2, 2], [1, 4, 4, 3], [2, 4, 20, 4], [3, 20, 40, 2, 1], [2, 40, 40, 2], [1, 40, 40, 3], [2, 40, 20, 4], [1, 4, 20, 4, 1], [2, 4, 4, 2], [3, 4, 2, 3], [2, 2, 4, 2, 2], [1, 4, 4, 2, -1], [2, 4, 2, 2, -2], [-3, 2, 4, -2, -1], [-2, -4, -4, -2], [-4, -4, -4], [-1, -2, -4, -2, -3], [-4, -2, -4, -2], [-3, -2, -4, -2, -1]];
    var blastOrigin = { x: 150, y: 200 };
    var stud = { w: 25, h: 30 };
    var bricks_front = [];
    var bricks_mid = [];
    var bricks_back = [];

    function frameStart() {
      if (es5()) {
        frame0();
      } else {
        TweenMax.set('#backup', { className: 'backup' });
      }
    }

    function buildWall() {
      var abc = 'abcdefghijklmnopqrstuvwxyz';
      var i = wallPattern.length;

      var _loop = function _loop() {
        var left = 0;
        wallPattern[i].forEach(function (code, j) {
          var studCount = code > 9 ? code / 10 : Math.abs(code);
          var brickElem = document.createElement('div');
          var anim = document.createElement('div');
          var type = studCount > 2 ? { w: 4, class: '2x4' } : { w: 2, class: '2x2' };
          var top = i * stud.h;
          if (j === 0 && studCount % 2 !== 0) left -= stud.w;
          var zIndex = 1000 - Math.round(Math.sqrt(Math.pow(left + stud.w * type.w * 0.5 - blastOrigin.x, 2) + Math.pow(top + stud.h * 0.5 - blastOrigin.y, 2)));
          brickElem.id = 'row' + (i + 1) + abc.charAt(j);
          brickElem.classList.add('brick-' + type.class);
          brickElem.style.left = left + 'px';
          brickElem.style.top = top + 'px';
          anim.classList.add('brick-sequence-' + type.class);
          brickElem.appendChild(anim);
          dom.wall.appendChild(brickElem);
          dom[brickElem.id] = brickElem;
          var brickObj = { elem: brickElem, x: left, y: top, w: stud.w * studCount, h: stud.h, z: zIndex };
          if (code > 9) bricks_front.push(brickObj);else if (code < 0) bricks_back.push(brickObj);else bricks_mid.push(brickObj);

          left += stud.w * type.w;
        });
      };

      while (i--) {
        _loop();
      }

      bricks_front.sort(function (a, b) {
        return a.z - b.z;
      });
      bricks_mid.sort(function (a, b) {
        return a.z - b.z;
      });
    }

    function playBricks(bricks, explode) {
      var len = bricks.length;
      var i = len;

      var _loop2 = function _loop2() {
        var brick = bricks[i];
        TweenMax.delayedCall((len - i) * 0.0075, function () {
          playBrick(brick, explode);
        });
      };

      while (i--) {
        _loop2();
      }
    }

    function playBrick(brick, explode) {
      brick.elem.style.zIndex = brick.z;
      var child = brick.elem.children[0];
      var bp = child.classList.contains('brick-sequence-2x2') ? '-2000px' : '-3000px';
      var spd = 0.5 + Math.random();
      var tx = brick.x + brick.w * 0.5 - adWidth * 0.666;
      var ts = 1 + (adWidth - Math.abs(tx)) / adWidth;
      if (explode) {
        tx *= 10;
        TweenMax.to(brick.elem, 0.75, { y: adHeight + 100, ease: Power2.easeIn });
      } else {
        ts = ts * 0.05 + 1;
        TweenMax.to(brick.elem, 0.5, { y: adHeight + 100, ease: Power1.easeIn });
      }

      TweenMax.to(child, spd, { backgroundPosition: bp, ease: SteppedEase.config(20) });
      TweenMax.to(brick.elem, 0.5, { x: tx, scale: ts, ease: Power1.easeIn });
    }

    function playJaw() {
      var dur = 0.3;
      TweenMax.to('#dino_jaw', dur, { backgroundPosition: '-959px', ease: SteppedEase.config(7) });
      TweenMax.to('#dino_jaw', dur, { backgroundPosition: '-548px', ease: SteppedEase.config(3), delay: dur });
    }

    function frame0() {
      var tl = new TimelineMax();
      buildWall();
      TweenMax.set('#ad_content', { autoAlpha: 1, delay: 0.5 });
      tl.from(['#dino-head', '#dino'], 0.5, { autoAlpha: 0, scale: 0.5, transformOrigin: 'right center', ease: Back.easeInOut }, 2).set('#dino-head', { zIndex: 1 }, 2).add(function () {
        playBricks(bricks_front, true);
      }, 2.1).to('#dino-head', 0.25, { scale: 0.6, transformOrigin: 'right center', zIndex: 0, ease: Sine.easeInOut }, '+=0.75').to('#dino', 0.25, { scale: 0.6, transformOrigin: '80% 30%', ease: Sine.easeInOut }, '-=0.25').to(['#dino-head', '#dino'], 0.25, { x: '300', ease: Sine.easeInOut }).set(['#dino-head', '#dino'], { clearProps: 'x, scale', autoAlpha: 0 }).set('#dino-head', { scale: 0.5, zIndex: 3 }).to(['#dino-head', '#dino'], 0.5, { autoAlpha: 1, scale: 1, transformOrigin: 'right center', ease: Back.easeInOut }).add(playJaw, '-=0.5').add(frame1, '-=0.25');
    }

    function frame1() {
      playBricks(bricks_mid);
      TweenMax.from('#text-1', 0.5, { autoAlpha: 0 });
      TweenMax.delayedCall(2, frame3);
    }

    function frame3() {
      TweenMax.to('#text-1', 0.5, { autoAlpha: 0 });
      TweenMax.to(['#dino', '#dino-head'], 0.5, { x: '300', ease: Back.easeIn.config(0.5) });
      TweenMax.from('#text-ef', 0.5, { delay: 1, autoAlpha: 0 });
      TweenMax.from('#cta', 0.5, { delay: 1.5, autoAlpha: 0, onComplete: addRollover });
    }

    function addRollover() {
      dom.ad_content.addEventListener('mouseenter', function () {
        TweenMax.to('#cta-arrow', 0.5, { x: '2', ease: Power2.easeInOut });
      });

      dom.ad_content.addEventListener('mouseleave', function () {
        TweenMax.to('#cta-arrow', 0.5, { x: '0', ease: Power2.easeInOut });
      });
    }

    function adClickThru() {
      dom.ad_content.addEventListener('click', function () {
        window.open(window.clickTag || window.clickTAG);
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

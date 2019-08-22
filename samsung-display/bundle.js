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

var imgSrc = 'petal.png';

function particlesInit() {
  var particleList = [];
  var animationTime = 15;
  var numParticles = 50;
  var adDiv = document.getElementById('petals');
  var horizontalBasePosition = 50;
  var maxAdditiveHorizonalDistance = 600;
  var verticalCenter = 350;
  var verticalSpread = 300;
  var baseHorizontalSpeed = 1;
  var maxAdditiveHorizontalSpeed = 1.4;
  var baseVerticalSpeed = -1;
  var maxAdditiveVerticalSpeed = 1.4;
  var i = void 0,
      tempScale = void 0,
      tempVX = void 0,
      tempVY = void 0,
      tempVR = void 0,
      startX = void 0,
      startY = void 0,
      tempRotation = void 0,
      tempImage = void 0;


  for (i = 0; i < numParticles; i++) {
    tempImage = new Image(20, 20);
    tempImage.src = imgSrc;
    tempImage.style.position = 'absolute';
    tempScale = 2 + Math.random() * 3;
    tempVX = baseHorizontalSpeed + Math.random() * maxAdditiveHorizontalSpeed;
    tempVY = baseVerticalSpeed + Math.random() * maxAdditiveVerticalSpeed;
    startX = horizontalBasePosition + Math.random() * maxAdditiveHorizonalDistance;
    startY = verticalCenter + (-1 * (verticalSpread * .5) + Math.random() * verticalSpread);

    tempVR = Math.random() * 2;
    tempRotation = Math.random() * 360;

    tempImage.style.left = startX + 'px';
    tempImage.style.top = startY + 'px';
    tempImage.style.transform = 'scale(' + tempScale + ') rotate(' + tempRotation + 'deg)';
    var mult = animationTime * 30;
    particleList.push(tempImage);
    adDiv.appendChild(tempImage);
    TweenMax.to(tempImage, animationTime, { x: '-=' + tempVX * -mult, y: '+=' + tempVY * mult, rotation: tempVR * mult });
  }
}

var Banner = {

  init: function init() {

    'use strict';

    var dom = domUtils.makeVarsFromIds();
    var instantAds = window.hasOwnProperty('myFT') && myFT.instantAds ? myFT.instantAds : {};


    function frameStart() {
      if (es5()) {
        var img = new Image();
        img.onload = frame0;
        if (instantAds) {
          if (instantAds.f1_head) dom.head1.innerHTML = instantAds.f1_head;
          if (instantAds.f1_head_style) dom.head1.style.cssText = instantAds.f1_head_style;
          if (instantAds.f2_head) dom.head2.innerHTML = instantAds.f2_head;
          if (instantAds.f2_head_style) dom.head2.style.cssText = instantAds.f2_head_style;
          if (instantAds.f3_head) dom.head_ef.innerHTML = instantAds.f3_head;
          if (instantAds.f3_head_style) dom.head_ef.style.cssText = instantAds.f3_head_style;
        }
        img.src = imgSrc;
      } else {
        document.getElementById('backup').className = 'backup';
      }
    }

    function frame0() {

      TweenMax.set('#ef_device_1', { transformOrigin: '50% 50%' });
      dom.ad_content.classList.toggle('invisible');
      var tl = new TimelineMax();

      tl.staggerFrom(['#head1', '#ef_device_1'], 1, { autoAlpha: 0 }, .5).from('#ef_device_1', 8, { x: -85, y: -50, scale: 0.793, ease: Sine.easeInOut, force3D: false }, '-=1.5').from('#head2', 2, { autoAlpha: 0 }, '-=5').to(['#head1', '#head2', '#logo'], .2, { autoAlpha: 0 }, '-=2').staggerFrom(['#head_ef', '#cta'], 2, { autoAlpha: 0 }, .5, '-=2').add(enableRollOver, '-=1.5').from('#ef_device_2', 1, { x: '-=10', autoAlpha: 0, force3D: false }, '-=2').add(particlesInit, '-=8').from('#petal1', 6, { x: '-=250', y: '+=50', rotation: 12, force3D: false }, '-=8').from('#petal2', 6, { x: '-=225', y: '+=500', rotation: -25, force3D: false }, '-=8').from('#petal3', 5, { x: '-=250', y: '+=500', rotation: 25, force3D: false }, '-=8').add(TweenMax.killAll);
    }

    function enableRollOver() {
      dom.ad_content.addEventListener('mouseenter', ctaOver);
      dom.ad_content.addEventListener('mouseleave', ctaOut);
    }

    function onAdClick() {
      if (instantAds && instantAds.click_thru_url) {
        myFT.clickTag(1, instantAds.click_thru_url);
      } else {
        window.open(window.clickTag || window.clickTAG);
      }
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

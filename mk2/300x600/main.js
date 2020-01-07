import { es5, domIds, log } from 'banner-utils';

const Banner = {

  init: () => {

    log.debug = false; // set to false before publishing
    const dom = domIds(),
           tl = new TimelineMax({paused:true, onComplete: addRollover });

    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

    function frameStart() {
      if(es5()) {
        frame0();
        var video = document.getElementById('video');
        video.src = '300x600_video.mp4';
        video.load();
        video.pause();
        video.oncanplay = function() {
          tl.play()
          video.play()
        }
        // video.addEventListener('loadeddata', function() {
          
        //   tl.play()
        //   video.play()
        // }, false);

        
      } else {
        dom.backup.classList.add('backup');
      }
    }

    function frame0() {
      
     
      tl
        .from('#prism', 1, { x: '+=250', y: '-=10', ease: Cubic.easeInOut },"+=4")
        .staggerTo(['#red', '#yellow', '#blue', '#white', '#green'], 1, { cycle: { rotation: [-215,-215,-305,-215,-125] }, ease: Cubic.easeInOut }, 0.03, '-=1.25')
        .to("#cta",0.2,{autoAlpha:0},"-=1")
        .set("#logo-gpo-white",{autoAlpha:0},"-=1")
        .set("#logo-gpo-grey",{autoAlpha:1},"-=1")
        .from(['#headline', '#subline'], 1, { autoAlpha: 0 })
        .set("#cta",{className:"+=cta-ef"},"-=1")
        .to("#cta",0.5,{autoAlpha:1},"-=1")


      dom.ad_content.classList.remove('invisible');
    }


    ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

    function addRollover() {

      videoEnded = true;

      dom.ad_content.addEventListener('mouseenter', () => {
        TweenLite.to('#cta', 0.25, { boxShadow: '0 2px 4px rgb(30, 140, 80)' });

      });

      dom.ad_content.addEventListener('mouseleave', () => {
        TweenLite.to('#cta', 0.25, { boxShadow: 'none' });
      });
    }

    function adClickThru() {
      dom.ad_content.addEventListener('click', () => {
        window.open(window.clickTag || window.clickTAG);
      });
    }


    ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

    adClickThru();
    frameStart();
  }
};

window.onload = () => {
  window.requestAnimationFrame(Banner.init);
};
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
        video.src = '320x50_video.mp4';
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
        .from('#prism', 1, { x: '-=100', y: '-=10', ease: Cubic.easeInOut },"+=4")
        .staggerTo(['#red', '#yellow', '#blue', '#white', '#green'], 1, { cycle: { rotation: [320, 320, 320, 320, 120] }, ease: Cubic.easeInOut }, 0.1, '-=1.25')
        .set("#logo-game",{className:"+=logo-game-ef"},"-=0.5")        
        .from('#logo-gpo', 1, { autoAlpha: 0 })
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
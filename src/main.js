function init() {

  var content = document.getElementById("content"),
      loader = document.getElementById("loader"),
      index,
      replayTime = 30000,
      noTweenUp = true,
      noTweenDown = true,
      urls = ["ally-home2-300x600","ally-home1-300x250","samsung-butterfly_300x600","samsung-display_300x600","samsung-bogo_300x600","toonix_300x250","ally-12month_300x600","battery_300x600","celestial_300x250","lego_300x600","lego_easytobuild_300x600","lego-harrypotter_300x250","lego-juniors_300x600","Rihanna-teaser-A_300x250",
      "multitask_300x600","nike-flyknit_300x250","nike-janosky_300x250","nike-nrc_300x600","nike-tempo_300x250","nike-vomero_300x600","personal-prepago_300x250","Rihanna-teaser-B_300x250",
      "samsung_tab_300x600","samsung-battery_300x600","samsung-camera-300x600","samsung-cnn-money_300x250","samsung-diplo_300x250","samsung-emoji_300x600",
      "samsung-gametime_300x250","samsung-holliday_300x250","ally-11month_300x250","samsung-holliday-mobile_300x600","samsung-memory_300x250","samsung-ocean_300x250","samsung-s9_300x600",
      "samsung-wash_300x250","storage-300x600","svedka-300x600","samsung-pay_300x250"];

  function loadAds() {
    for (var i=0;i<urls.length;i++){
      var ifrm = document.createElement("iframe");
      var preloader = document.createElement("DIV");
      var replay = document.createElement("div");
        preloader.className = "preloader center-middle";
        replay.className = "fas fa-play-circle center-middle-trans replay";
        preloader.style.display = "none";
        replay.style.display = "none";
      var div = document.createElement("DIV");
     
        ifrm.setAttribute("src", "works/"+urls[i]+"/index.html");
        ifrm.id=i;
        ifrm.style.display="none";
        div.className = "ad";
        ifrm.className = "ifrm";
        div.addEventListener("click", reloadAd);
        div.appendChild(preloader);
        div.appendChild(replay);
        div.appendChild(ifrm);
        container.appendChild(div);
        

        iframeLoad(div,ifrm);
    } 

    function iframeLoad(div,iframe) {
         
        iframe.onload = function () {
            $(window).trigger("lazyupdate");
            var metaData = iframe.contentDocument,
            dimensionsStr = metaData.querySelector('meta[name="ad.size"]').content,
            matched = dimensionsStr.match(/=(.*?),(.*?)=(.*?)$/),
            width = parseInt(matched[1]),
            height = parseInt(matched[3]);
            
            iframe.style.width = width+"px";
            iframe.style.height = height+"px";
            div.style.width = width+"px";
            div.style.height = height+"px";
            iframe.style.display = "block";
            iframe.style.opacity = "0";
        }
    }

    ////////////////////////////// LAZY LOADING UTILS ///////////////////////////////
    $(function() {
      
    $(".ifrm").recliner({
        attrib: "src", // selector for attribute containing the media src
        throttle: 100,      // millisecond interval at which to process events
        threshold: 25,     // scroll distance from element before its loaded
        live: true          // auto bind lazy loading to ajax loaded elements
    });
    });

    $(document).on('lazyshow', '.ifrm', function() {
    var $e = $(this);
    let replay =  $e.parent().get(0).childNodes[1];
    let preloader =  $e.parent().get(0).childNodes[0];
    preloader.style.display = "none";
    TweenMax.to($e,1,{autoAlpha:1})
    showReplay(replay);
    });

    $(document).on('lazyload', '.ifrm', function() {
    var $e = $(this);
    let preloader =  $e.parent().get(0).childNodes[0];
    preloader.style.display = "block";
    
    });

    }
  //////////////////////////////////////////////////////////////////////////////////////    
  
  loadAds();

  function reloadAd(e) {
    let replay = e.currentTarget.childNodes[1];
    replay.style.display = "none";
    e.currentTarget.childNodes[2].contentWindow.location.reload();
    showReplay(replay);
  }

  function detect() {
            //create a iframe. Append the iframe to the body. And then after 100ms check if their offsetHeight, display or visibility is set such a way that user cannot see them.
            //In the URL use the words specific to advertising so that Adblock can do string matching.
            var iframe = document.createElement("iframe");
            iframe.height = "1px";
            iframe.width = "1px";
            iframe.id = "ads-text-iframe";
            iframe.src = "http://domain.com/ads.html";
           
            document.body.appendChild(iframe);
           
            setTimeout(function()
                       {
                           var iframe = document.getElementById("ads-text-iframe");
                           if(iframe.style.display == "none" || iframe.style.display == "hidden" || iframe.style.visibility == "hidden" || iframe.offsetHeight == 0)
                           {
                                var adBlockDetected = document.getElementById("adBlockDetected");
                                var containerWrap = document.getElementById("container-wrap");
                                var bgCover = document.getElementById("bgCover");
                                adBlockDetected.style.display = "block";
                                bgCover.style.display = "block";
                                containerWrap.style.display = "none";
                                iframe.remove();
                           }
                           else
                           {
                                // alert("Adblock is not detecting ads on this page");
                                iframe.remove();
                           }
                       }, 2000);
  }

   function showReplay(elem) {
    setTimeout(function(){elem.style.display = "block"},replayTime)
  }

  var scrollableElement = document.body;

    scrollableElement.addEventListener('wheel', findScrollDirectionOtherBrowsers);

    function findScrollDirectionOtherBrowsers(event){
        var delta;

        if (event.wheelDelta){
            delta = event.wheelDelta;
        }else{
            delta = -1 * event.deltaY;
        }

        if (delta < 0){
            noTweenDown = true;
            if(noTweenUp) {
              noTweenUp = false;  
            TweenMax.to("#header",0.5,{y:-10,ease:Sine.easeIn,onComplete: function(){noTweenUp = true}})
            }
        }else if (delta > 0){
            noTweenUp = true;
            if(noTweenDown) {
              noTweenDown = false;  
            TweenMax.to("#header",0.5,{y:0,ease:Sine.easeIn,onComplete: function(){noTweenDown = true}})
            }
        }

    }

  detect();


}
window.onload = function(){
 init();
};
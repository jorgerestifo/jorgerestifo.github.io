function init() {

  var content = document.getElementById("content"),
      loader = document.getElementById("loader"),
      index,
      urls = ["5g-bogo","battery","celestial","multitask","nike_MercurialX","nike_mercurialX_336x280","nike_tempo_800x550","nike-nrc","Rihanna_teaser_A_300x250","Rihanna_teaser_B_300x250","samsung_butterfly_300x600","samsung_tab_300x600","samsung-display","samsung-emoji","samsung-s9","storage"];

      
    
  function showAd() {


      var elem = document.querySelector('#ad');
      
      if(elem!=null) elem.parentNode.removeChild(elem);
   
      
      var random = Math.floor(Math.random()*urls.length);

      if(random===index) {
        random = Math.floor(Math.random()*urls.length)
      }

      index = random;
      
      loader.style.display="block";

        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "works/"+urls[index]+"/index.html");
        ifrm.id="ad";
        ifrm.style.display="none";
        ifrm.className = "center-middle-trans"
        content.appendChild(ifrm);
        var iframe = document.getElementById("ad");


        
        iframe.onload = function () {
          var metaData = iframe.contentDocument,
          dimensionsStr = metaData.querySelector('meta[name="ad.size"]').content,
          matched = dimensionsStr.match(/=(.*?),(.*?)=(.*?)$/),
          width = parseInt(matched[1]),
          height = parseInt(matched[3]);

          iframe.style.width = width+"px";
          iframe.style.height = height+"px";
          loader.style.display="none";
          ifrm.style.display="block";

         
        }


            
        // console.log(heigth)
       
    }


  content.addEventListener("click", showAd);





}
window.onload = function(){
 init();
};
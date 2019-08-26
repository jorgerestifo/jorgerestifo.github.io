const fs = require('fs-extra');
const path = require('path');
const targDir = process.argv[2] || 'dist';
const projectDir = path.resolve(targDir).split('/').slice(-2, -1)[0]; // parent dir of targDir
const glob = require('glob');
const sizeOf = require('image-size');
const file = fs.createWriteStream(`${targDir}/index.html`);
const placeholderSrc = 'assets/rga-logo.png';
const previewScale = 0.3333;
const css = `html, body{
        padding: 0px;
        margin: 0px;
        font-family: "HelveticaNeue", "Helvetica Neue", "HelveticaNeueRoman", "HelveticaNeue-Roman", "Helvetica Neue Roman", Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-stretch: normal;
        font-size: 1rem;
        font-weight: 400;
      }
      h1{font-size: 2rem;}
      h2{font-size: 1.5rem;}
      h3{font-size: 1.125rem;}
      .header {
        height: auto;
        position: relative;
        top: 0;
        height: 100%;
        margin: 0;
        padding: 1.75rem;
        background-color: transparent;
        font-weight: 300;
        line-height: 1.2rem;
      }
      .header svg{
        top: 1px;
        position: relative;
      }
      .showcase{
        max-width: 800px;
        margin: 0 auto;
        padding: 10px;
      }
      ol, ul{font-size: 0.8125rem;}
      ul{list-style: square inside;}
      li {
        line-height: 1.875rem;
        text-align: left;
      }
      a {
        color: #000;
        cursor: pointer;
        text-decoration: none;
        font-size: 0.8125rem;
        letter-spacing: 0.0575em;
        display: inline-block;
      }
      a:hover{
        color: #e51837;
        background-color: #e0e0e0;
      }
      .none {display: none;}
      .faded {opacity: 0.25;}
      .list-view {
        margin: 0;
        padding: 0;
        width: 100%;
      }
      .list-view a {
        width: 94%;
        /* text-indent: 0.625rem; */
        word-break: keep-all;
      }
      #view_toggle {
        position: relative;
        top: 0;
        right: 0;
      }
      #grid_icon, #list_icon {
        cursor: pointer;
        position: absolute;
        top: 0;
      }
      #grid_icon {right: 40px;}
      #list_icon {right: 0;}
      #preview_box{
        position: absolute;
        display: none;
        background-color: rgba(0, 0, 0, 0.25);
        padding: 0;
        left: 0;
        top: 0;
      }
      #image{
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
      }
      .thumb {
        color: #000;
        text-align: center;
        font-size: 0.8125rem;
        letter-spacing: 0.0575em;
        line-height: 1.5rem;
        min-width: 120px;
        display: inline-block;
      }
      .thumb .pic{
        width: 120px;
        height: 120px;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .thumb img{
        display: block;
        padding: 0;
        margin: 0 auto;
      }
      a:hover div{
        color: #e51837;
      }
      @media only screen and (max-width: 480px){
        h1{font-size: 1.5rem;}
        h2{font-size: 1.125rem;}
        h3{font-size: 0.875rem;}
        .header{padding-left: 10px;}
        .labelMobile{display: none;}
        .list-view a {
          width: 90%;
        }
        li{
          font-weight: 400;
          font-size: 0.75rem;
          line-height: 2.25rem;
        }
      }`;
const js = `var backupURL = '';
    var showcase = document.querySelector('.showcase');
    var previewBox = document.getElementById('preview_box');
    var image = document.getElementById('image');
    var listItems = document.querySelectorAll('li');
    var i = listItems.length;
    var btnGrid = document.getElementById('grid_icon');
    var btnList = document.getElementById('list_icon');
    var elemsGrid = document.querySelectorAll('.grid-view');
    var elemsList = document.querySelectorAll('.list-view');
    var currentView = 'grid';
    var imgSize = '160x600';
    var imgW = 160;
    var imgH = 600;

    function updateHash(anchor){
      var hash = (/^#/.test(anchor)) ? anchor : '#' + anchor;
      (history.pushState) ? history.pushState(null, null, hash) : location.hash = hash;
    }

    function updateView(type){
      type = type.replace(/^#/, '');
      if((type === 'grid' || type === 'list') && currentView !== type){
        btnGrid.classList.toggle('faded');
        btnList.classList.toggle('faded');
        var l = elemsGrid.length;
        while(l--) {
          elemsGrid[l].classList.toggle('none');
          elemsList[l].classList.toggle('none');
        }
        currentView = type;
        updateHash(currentView);
      }
      showcase.classList.remove('none');
    }

    btnGrid.addEventListener('click', function(){
      updateView('grid');
    });

    btnList.addEventListener('click', function(){
      updateView('list');
    });

    document.addEventListener('mousemove', function(e){
      var thumbWidth = imgW * ${previewScale};
      var thumbHeight = imgH * ${previewScale};
      var pad = 10;
      scrollbar = 16;
      var translateX = (e.clientX + thumbWidth + pad + scrollbar < window.innerWidth) ? e.pageX + pad : e.pageX - pad - thumbWidth;
      var translateY = (e.clientY + thumbHeight + pad + scrollbar < window.innerHeight) ? e.pageY + pad : e.pageY - pad - thumbHeight;
      previewBox.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px';
    });

    while(i--){
      listItems[i].addEventListener('mouseover', function(e){
        backupURL = e.target.dataset.backup; // dataset: ie11+
        imgW = e.target.dataset.width;
        imgH = e.target.dataset.height;
        if(backupURL){
          previewBox.style.display = 'inline';
          image.style.width = Math.round(imgW * ${previewScale}) + 'px';
          image.style.height = Math.round(imgH * ${previewScale}) + 'px';
          image.style.backgroundImage = 'url(' + backupURL + ')';
        }
      });
      listItems[i].addEventListener('mouseout', function(){
        backupURL = '';
        previewBox.style.display = 'none';
        image.style.backgroundImage = 'url()';
      });
    }
    window.onload = function(){
      updateView(window.location.hash);
    };`;
function groupBy(arr, property){
  return arr.reduce((memo, x) => {
    if(!memo[x[property]]) memo[x[property]] = [];
    memo[x[property]].push(x);
    return memo;
  }, {});
}
glob(`${targDir}/*/**/index.html`, (err, files) => {
  const links = files.map(file => {
    const link = file.replace(`${targDir}/`, '');
    const group = link.split('/').slice(0,-2).join('/');
    const ad = link.split('/').slice(-2,-1)[0];
    let backup;
    ['jpg', 'png', 'gif'].forEach(ext => {
      const imgPath = (group) ? `${group}/${ad}/backup.${ext}` : `${ad}/backup.${ext}`;
      if(fs.existsSync(`dist/${imgPath}`)) backup = imgPath;
    });
    if(!backup) {
      const placeholder = `${placeholderSrc.split('/').pop()}`;
      try {
        fs.copySync(placeholderSrc, `dist/${placeholder}`);
        backup = placeholder;
      } catch (err) {
        console.error(err);
      }
    }
    const dimensions = (backup) ? sizeOf(`dist/${backup}`) : {width: 300, height: 250};
    const width = dimensions.width;
    const height = dimensions.height;
    const size = `${dimensions.width}x${dimensions.height}`;
    return {group: group, link: link, ad: ad, size: size, backup: backup, width: width, height: height};
  });
  const groups = groupBy(links, 'group');
  const lists = Object.keys(groups).map((group) => {
    return `<h3>${group}</h3>
      <ul class="list-view none">
        ${groups[group].map(banner => {
          return `<li><a href="${banner.link}" data-backup="${banner.backup}" data-size="${banner.size}" data-width="${banner.width}" data-height="${banner.height}">${banner.ad}</a></li>`;
        }).join('\n        ')}
      </ul>
      <div class="grid-view">
        ${groups[group].map(banner => {
          const imgW = Math.round(banner.width * 0.2);
          const imgH = Math.round(banner.height * 0.2);
          return `<a href="${banner.link}">
          <div class="thumb">
            <div class="pic">
              <img width="${imgW}" height="${imgH}" src="${banner.backup}">
            </div>
            <div>${banner.ad}</div>
          </div>
        </a>`;
        }).join('\n        ')}
      </div>`;
  });
  const html = `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <title>${projectDir}</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <style>
      ${css}
    </style>
  </head>

  <body>
    <div class="header"><span><svg xmlns="http://www.w3.org/2000/svg" width="73.3" height="16.6" viewBox="743.5 358.801 73.3 16.6"><path d="M772.48 364.04c0 1.6-.84 2.24-2.4 2.24h-3.84v-4.44h3.84c1.56.04 2.4.68 2.4 2.2m1 3.52c1.76-.76 2.52-2.16 2.52-4 0-2.4-1.84-4.4-4.64-4.4h-8.56v15.882h3.48v-6.2h3.478c1.76 0 2.4.72 2.64 2.4.2 1.28.16 2.84.56 3.76h3.48c-.6-.92-.6-2.76-.68-3.76-.078-1.6-.598-3.24-2.28-3.68m6.402 7.44l5.92-15.882h-2.52L777.36 375h2.52zm18.12 0h2.24v-8.562h-6.64v2.6h3.48c-.2 2.2-1.52 3.44-3.76 3.44-3.16 0-4.28-2.68-4.28-5.32 0-2.76 1.2-5.44 4.28-5.44 1.6 0 2.96.92 3.36 2.68h3.36c-.4-3.6-3.44-5.6-6.682-5.6-4.92 0-7.8 3.68-7.8 8.36 0 4.6 2.88 8.24 7.8 8.24 1.52 0 3.16-.6 4.36-2.16L798 375zm13.08-6.12h-4.12l2.08-5.84h.04l2 5.84zm5.72 6.12l-5.92-15.882h-3.6l-6 15.88h3.52l1.24-3.52h5.92l1.2 3.52h3.64z"></path><path fill="#CE2434" d="M743.5 359.1h16v16h-16z"></path></svg> Showcase</span></div>
    <div class="showcase none">
      <div id="view_toggle">
        <div id="grid_icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><path d="M0 0h10v10H0V0zm15 0h10v10H15V0zM0 15h10v10H0V15zm15 0h10v10H15V15z" fill-rule="evenodd"/></svg></div>
        <div id="list_icon" class="faded"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><path d="M0 0h25v5H0V0zm0 10h25v5H0v-5zm0 10h25v5H0v-5z" fill-rule="evenodd"/></svg></div>
      </div>
      <h1 style="margin-top: 0">${projectDir}</h1>
      <div style="width: 50px; height: 25px; border-top: 1px solid black"></div>
      ${lists.join('\n      ')}
    </div>
    <div id="preview_box">
      <div id="image"></div>
    </div>
  </body>
  <script>
    ${js}
  </script>
</html>`;
  file.write(html);
  file.end();
});

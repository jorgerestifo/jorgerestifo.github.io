function initAd(){function e(e){return document.getElementById(e)}function t(e,t){var n=new RegExp("\\b"+t+"\\b","gi");return e.className.match(n)?!0:!1}function n(e,n){t(e,n)?console.log('addClass warning: "'+n+'" already exists on '+e.innerHTML):e.className+=" "+n}function a(e,n){t(e,n)?e.className.indexOf(" "+n)>-1?e.className=e.className.replace(" "+n,""):e.className.indexOf(n+" ")>-1?e.className=e.className.replace(n+" ",""):e.className=e.className.replace(n,""):console.log('removeClass warning: "'+n+'" not found on '+e.innerHTML)}function i(e,t,i){a(e,t),n(e,i)}function o(){TweenLite.from(x,1,{alpha:0}),d.src="txt1.jpg",TweenLite.from(m,2,{alpha:0,ease:Sine.easeInOut}),delay=setTimeout(c,1e3)}function c(){TweenLite.to(x,.5,{alpha:1}),d.src="txt2.jpg",delay=setTimeout(s,1e3)}function s(){TweenLite.from(x,.5,{alpha:0}),d.src="txt1.jpg",delay=setTimeout(l,500)}function l(){TweenLite.from(x,3,{alpha:0}),TweenLite.to(m,.1,{alpha:0}),n(x,"animation"),delay=setTimeout(r,2e3)}function r(){TweenLite.to(m,.1,{alpha:1}),a(x,"animation"),v="txt",d.src="txt1.jpg",TweenLite.to(m,.1,{alpha:1,ease:Sine.easeInOut}),delay=setTimeout(c,1e3)}var m=e("canvas"),u=m.getContext("2d"),d=new Image,h,f,g,w,p=300,T=250,x=e("anim"),v="txt";d.onload=function(){L()};var L=function(){clearInterval(w),m.width=h=p,m.height=f=T;var e=(T-d.height)/2,t=(p-d.width)/2;"pic"==v&&(m.height=f=d.height,e=0),w=setInterval(function(){N(),u.drawImage(d,0,0,d.width,d.height,t,e,d.width,d.height),setTimeout(I,y(250,1e3))},200)},N=function(){u.rect(0,0,h,f),u.fill()},I=function(){for(var e=0;e<y(1,13);e++){var t=Math.random()*h,n=Math.random()*f,a=y(0,5),i=h-t,o=y(5,f/3);"pic"==v&&(o=y(15,f/3)),u.drawImage(m,0,n,i,o,t,n+a,i,o),u.drawImage(m,i,n,t,o,0,n-a,t,o)}},y=function(e,t){return~~(Math.random()*(t-e)+e)};o()}window.onload=function(){initAd()};
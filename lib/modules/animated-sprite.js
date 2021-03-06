// Version 1.5.2

export class AnimatedSprite {
  constructor(target, image, width, height, frameCount, options){
    // last 4 args ...canvasW,canvasH,offsetX,offsetY) are for multiple animations on the same canvas
    const RAD = Math.PI / 180;
    const RAD90 = RAD * 90;
    const self = this;
    const img = image;
    const w = width;
    const h = height;
    const frames = frameCount;
    const opts = options || {};
    const record = opts.heapDraw;
    const cols = Math.floor(img.width / w) - 1;
    const targIsCanvas = target.tagName.toLowerCase() === 'canvas';
    const canvas = targIsCanvas ? target : createCanvas();
    const ctx = canvas.getContext('2d');
    const points = [];

    if (typeof window.Event !== 'function'){
      const Event = function(event, params){
        params = params || {bubbles: false, cancelable: false};
        let evt = document.createEvent('Event');
        evt.initEvent(event, params.bubbles, params.cancelable);
        return evt;
      };
      Event.prototype = window.Event.prototype;
      window.Event = Event;
    }

    function createCanvas(){
      const ref = document.createElement('canvas');
      ref.width = opts.canvasW || w;
      ref.height = opts.canvasH || h;
      ref.style.position = 'absolute';
      target.appendChild(ref);
      return ref;
    }

    let frame = 0;
    let nextframe = -1;
    let col = 0;
    let row = 0;
    let tick = 1;
    let every = 1;
    let remainder = 0;
    let updating = false;
    let rafid;
    let timestamp = 0;
    let playing = false;
    let ended = false;
    let crossfade = false;
    let transparency = false;
    let reverse = false;
    const ox = opts.offsetX || 0;
    const oy = opts.offsetY || 0;
    this.canvas = canvas;
    const eventPlaying = new Event('playing');
    const eventPaused = new Event('paused');
    const eventEnded = new Event('ended');
    const eventForward = new Event('forward');
    const eventReverse = new Event('backward');
    const eventFPSChange = new Event('fpschange');
    let history = [];
    if(record) history.length = frames + 1;
    // canvas.width = canvasW || w;
    // canvas.height = canvasH || h;
    let i = 0;
    let j = 0;
    while(i < frames){
      points.push({x: w * col, y: h * row});
      // console.log('x:'+points[i].x+',y:'+points[i].y);
      (col < cols) ? col++ : col = 0;
      j++; // don't delete
      row = Math.floor(j / (cols + 1));
      i++;
    }
    col = row = 0; // temporary
    function startUpdate(){
      if(!updating){
        updating = true;
        playing = true;
        update();
        canvas.dispatchEvent(eventPlaying);
      }
    }
    function stop(){
      cancelAnimationFrame(rafid);
      updating = false;
      playing = false;
      canvas.dispatchEvent(eventPaused);
    }
    let alpha;
    // let opacity;
    function update($timestamp){
      if(timestamp !== $timestamp){
        timestamp = $timestamp; // HACK: never figured out why this was doubling up. This bug indicates larger problems
        remainder = tick % every;
        if(remainder === 0){
          advance();
          render(frame);
          alpha = 1;
          // opacity = 1;
          // window.console.log(`step: ${remainder}, alpha: ${alpha}, opacity: ${opacity}`);
        } else if(crossfade){
          if(transparency){
            const angle = remainder / every * RAD90;
            render(frame, Math.cos(angle), true);
            render(nextframe, Math.sin(angle));
          } else {
            if (remainder === 1){
              alpha = 1 / every;
              // opacity = alpha;
            } else {
              alpha = (1 / every) * 2; // so close, but not exact
              // opacity = opacity / (1 + alpha) + alpha;
            }
            // window.console.log(`step: ${remainder}, alpha: ${alpha}, opacity: ${opacity}`);
            render(nextframe, alpha);
            // (opacity === 0) ? opacity = alpha : opacity *= 1 + Math.sin(alpha); // sin 10 steps = 2.51, 50 steps = 1107501.45
          }
        }
        tick++;
        if(playing === true){
          rafid = requestAnimationFrame(update);
        }
      }
    }
    function render($frame, $alpha, $clear){
      // console.log(row+' '+col+' '+$frame);
      if(points[$frame]){
        ctx.globalAlpha = $alpha || 1;
        if($clear) ctx.clearRect(ox, oy, w, h); // clear the canvas before repaint
        if(history[$frame]){
          // if(reverse) ctx.clearRect(ox, oy, w, h);
          ctx.drawImage(history[$frame], 0, 0, w, h, ox, oy, w, h);
        } else {
          ctx.drawImage(img, points[$frame].x, points[$frame].y, w, h, ox, oy, w, h);
        }
      }
    }
    function advance(){
      if(record && !history[frame]){
        history[frame] = new Image();
        history[frame].src = canvas.toDataURL();
      }
      if(frame > (frames - 2) && !reverse){
        stop();
        ended = true;
        canvas.dispatchEvent(eventEnded);
        if(self.onComplete){
          self.onComplete();
        }
        // reverse = true;
      } else if(frame < 1 && reverse){
        stop();
        ended = true;
        canvas.dispatchEvent(eventEnded);
        // reverse = false;
      } else {
        if(reverse){
          frame--;
          nextframe = frame - 1;
        } else {
          frame++;
          nextframe = frame + 1;
        }
        if(!record || reverse) ctx.clearRect(ox, oy, w, h);
      }
    }
    this.getCrossfade = () => crossfade;
    this.setCrossfade = bool => {
      crossfade = bool;
    };
    this.getTransparency = () => transparency;
    this.setTransparency = bool => {
      if(!bool){ canvas.style.opacity = 1; }
      transparency = bool;
    };
    this.initCrossfade = () => {
      crossfade = true; // in case this is invoked directly
    };
    this.getPlaying = () => playing;
    this.getEvery = () => every;
    this.setEvery = num => {
      let int = Math.round(num);
      if (int < 1){ int = 1; }
      if (int > 60){ int = 60; }
      every = int;
      canvas.dispatchEvent(eventFPSChange);
    };
    this.getReverse = () => reverse;
    this.setReverse = $bool => {
      if(reverse !== $bool){
        reverse = $bool;
        ended = false;
        if($bool){
          canvas.dispatchEvent(eventReverse);
        } else {
          canvas.dispatchEvent(eventForward);
        }
      }
    };
    this.onComplete = () => {};
    this.play = $frame => {
      if($frame !== undefined){
        if($frame < 0){
          $frame = 0;
        } else if($frame > frames){
          $frame = frames;
        }
        if(frame !== $frame){
          frame = $frame;
          if(!playing){
            ended = false;
            startUpdate();
          }
        }
      } else if(!playing && !ended){
        startUpdate();
      }
    };
    this.pause = () => {
      if(playing){
        stop();
      }
    };
    this.destroyCanvas = () => {
      const parent = canvas.parentNode;
      if(!targIsCanvas) parent.removeChild(canvas);
    };
    render(frame); // show the first frame
  }
  get every(){
    return this.getEvery();
  }
  set every(num){
    this.setEvery(num);
  }
  get playing(){
    return this.getPlaying();
  }
  get transparency(){
    return this.getTransparency();
  }
  set transparency(bool){
    this.setTransparency(bool);
  }
  get backward(){
    return this.getReverse();
  }
  set backward(bool){
    this.setReverse(bool);
  }
  get crossfade(){
    return this.getCrossfade();
  }
  set crossfade(bool){
    this.setCrossfade(bool);
  }
  addEventListener(type, func, capture){
    this.canvas.addEventListener(type, func, capture || false);
  }
  removeEventListener(type, func, capture){
    this.canvas.removeEventListener(type, func, capture || false);
  }
  destroy(){
    this.destroyCanvas();
  }
}

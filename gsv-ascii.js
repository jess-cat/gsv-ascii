/*!
 * GSV ASCII Anim — turn any ASCII art into the GSV "assemble" animation.
 * Zero dependencies. Embeds Departure Mono. Works fully offline.
 *
 *   GSVAscii.mount(el, asciiText, opts) -> { replay, destroy, setOptions }
 *   GSVAscii.exportGIF(asciiText, opts, gifOpts) -> Promise<Blob>
 *
 * opts: {
 *   accentColor:'#8071dd', background:'#0a0713',
 *   fontSize:8, wind:'right'|'left'|'up'|'down'|'scatter',
 *   assembleSeconds:1.7, holdSeconds:1.6, loop:true, starfield:true, glow:true
 * }
 * gifOpts: { fps:16, maxWidth:520, frames:auto, onProgress }
 */
(function (global) {
  'use strict';

  var FONT_DATAURL = "data:font/woff2;base64,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";
  var RAMP = " .\u00b7-:=+*o\u00d8#@";

  var _fontInjected = false;
  function ensureFont() {
    if (_fontInjected || typeof document === 'undefined') return;
    _fontInjected = true;
    var s = document.createElement('style');
    s.setAttribute('data-gsv-ascii-font', '');
    s.textContent =
      "@font-face{font-family:'Departure Mono';src:url(" + FONT_DATAURL +
      ") format('woff2');font-weight:normal;font-style:normal;font-display:block;}";
    (document.head || document.documentElement).appendChild(s);
  }

  // ---------- math helpers ----------
  function mk(seed){ var s = seed >>> 0; return function(){ s = (s*1664525 + 1013904223) >>> 0; return s/4294967296; }; }
  function clamp(x,a,b){ return x<a?a:(x>b?b:x); }
  function easeOut(x){ x=clamp(x,0,1); return 1-(1-x)*(1-x); }
  function hexToRgb(h){ h=(h||'').replace('#',''); if(h.length===3) h=h.split('').map(function(c){return c+c;}).join(''); var n=parseInt(h,16); return [(n>>16)&255,(n>>8)&255,n&255]; }

  // ---------- parse ASCII into grid + cells ----------
  function parse(text){
    var raw = String(text==null?'':text).replace(/\r/g,'').split('\n');
    var pw = 1; for (var i=0;i<raw.length;i++) if (raw[i].length>pw) pw=raw[i].length;
    var rows = raw.map(function(r){ return r.length<pw ? r + new Array(pw-r.length+1).join(' ') : r; });
    var ph = rows.length;
    var cells = [];
    for (var y=0;y<ph;y++){ var srow=rows[y]; for (var x=0;x<pw;x++){ var ch=srow[x]; if(ch!==' '&&ch!==undefined) cells.push({x:x,y:y,ch:ch}); } }
    return { rows: rows, cells: cells, pw: pw, ph: ph };
  }

  // ---------- particle field (fly-in by wind) ----------
  function buildParticles(cells, seed, pw, ph, wind){
    var rnd = mk(seed*13+5);
    return cells.map(function(c){
      var sx, sy, base;
      var jitterX=(rnd()-0.5)*60, jitterY=(rnd()-0.5)*60, push=42+rnd()*80;
      if (wind==='left'){      sx=c.x-push;        sy=c.y+jitterY*0.4-4; base=(c.x/pw)*0.26; }
      else if (wind==='up'){   sx=c.x+jitterX*0.4; sy=c.y-push;          base=(c.y/ph)*0.26; }
      else if (wind==='down'){ sx=c.x+jitterX*0.4; sy=c.y+push;          base=(1-c.y/ph)*0.26; }
      else if (wind==='scatter'){ var an=rnd()*6.283, d=46+rnd()*90; sx=c.x+Math.cos(an)*d; sy=c.y+Math.sin(an)*d; base=rnd()*0.22; }
      else {                   sx=c.x+push;        sy=c.y+jitterY*0.4-4; base=(1-c.x/pw)*0.26; }
      return { tx:c.x, ty:c.y, ch:c.ch, sx:sx, sy:sy,
        delay:clamp(base+rnd()*0.16,0,0.44), phase:rnd()*6.283,
        flRate:3.2+rnd()*4.6, amp:2.0+rnd()*4.0 };
    });
  }

  function buildStars(seed, pw, ph){
    var rnd=mk(seed), stars=[], N=pw*ph;
    for (var i=0;i<N;i++){ if(rnd()>0.972){ var r=rnd(); stars.push({ idx:i, phase:rnd()*6.283, rate:0.7+rnd()*2.4, bright:rnd()>0.82, base:0.2+rnd()*0.45 }); } }
    return stars;
  }

  // ---------- compute one formation frame into a char buffer ----------
  // lt = seconds since this run started. Returns {done}
  function formationBuf(buf, parts, lt, T, pw, ph){
    for (var i=0;i<buf.length;i++) buf[i]=' ';
    var ft = clamp(lt/T, 0, 1);
    for (var p=0;p<parts.length;p++){
      var pr=parts[p];
      var local = clamp((ft-pr.delay)/(1-pr.delay), 0, 1);
      if (local<=0.02) continue;
      var e = easeOut(local);
      var dx=pr.tx-pr.sx, dy=pr.ty-pr.sy, len=Math.hypot(dx,dy)||1;
      var px=-dy/len, py=dx/len;
      var fl=(1-e)*pr.amp*Math.sin(lt*pr.flRate+pr.phase);
      var x=pr.sx+dx*e+px*fl, y=pr.sy+dy*e+py*fl;
      var xi=Math.round(x), yi=Math.round(y);
      if (xi<0||xi>=pw||yi<0||yi>=ph) continue;
      var ch;
      if (e>0.82) ch=pr.ch;
      else { var ci=Math.floor(e*RAMP.length); ci=clamp(ci,1,RAMP.length-1); ch=RAMP[ci]; }
      buf[yi*pw+xi]=ch;
    }
    return ft>=1;
  }

  function starBuf(buf, stars, pw, ph, t){
    for (var i=0;i<buf.length;i++) buf[i]=' ';
    for (var s=0;s<stars.length;s++){
      var st=stars[s];
      var tw=0.5+0.5*Math.sin(t*st.rate+st.phase);
      var lvl=st.base+tw*0.62, c;
      if (st.bright) c = lvl>0.95?'*':lvl>0.72?'+':lvl>0.48?'\u00b7':lvl>0.27?'.':' ';
      else           c = lvl>0.8?'+':lvl>0.52?'\u00b7':lvl>0.32?'.':' ';
      buf[st.idx]=c;
    }
  }

  function joinBuf(buf, pw, ph){
    var out='';
    for (var y=0;y<ph;y++){ var line='', b=y*pw; for(var x=0;x<pw;x++) line+=buf[b+x]; out+=(y?'\n':'')+line; }
    return out;
  }

  function normOpts(o){
    o=o||{};
    return {
      accentColor: o.accentColor || '#8071dd',
      background:  o.background  || '#0a0713',
      fontSize:    o.fontSize    || 8,
      wind:        o.wind        || 'right',
      assembleSeconds: o.assembleSeconds!=null ? o.assembleSeconds : 1.7,
      holdSeconds: o.holdSeconds!=null ? o.holdSeconds : 1.6,
      loop:        o.loop!==false,
      starfield:   o.starfield!==false,
      glow:        o.glow!==false,
      seed:        o.seed!=null ? o.seed : 7
    };
  }

  function glowStr(accent){ var c=hexToRgb(accent); return '0 0 '+ '5px rgba('+c[0]+','+c[1]+','+c[2]+',.42), 0 0 13px rgba('+c[0]+','+c[1]+','+c[2]+',.22)'; }

  // ---------- DOM mount ----------
  function mount(el, ascii, options){
    ensureFont();
    var opt = normOpts(options);
    var grid = parse(ascii);
    var pw=grid.pw, ph=grid.ph;
    var parts = buildParticles(grid.cells, opt.seed*9+5, pw, ph, opt.wind);
    var stars = opt.starfield ? buildStars(opt.seed*7+3, pw, ph) : [];
    var fbuf = new Array(pw*ph), sbuf = new Array(pw*ph);

    el.innerHTML='';
    var mono="'Departure Mono', ui-monospace, monospace";
    var box=document.createElement('div');
    var boxW=Math.round(pw*opt.fontSize*0.6), boxH=ph*opt.fontSize;
    box.style.cssText='position:relative;width:'+boxW+'px;height:'+boxH+'px;';

    function pre(color, shadow){
      var p=document.createElement('pre');
      p.style.cssText='position:absolute;inset:0;margin:0;display:flex;align-items:center;justify-content:center;'+
        'font-family:'+mono+';font-size:'+opt.fontSize+'px;line-height:'+opt.fontSize+'px;white-space:pre;'+
        'pointer-events:none;-webkit-font-smoothing:none;color:'+color+(shadow?(';text-shadow:'+shadow):'');
      return p;
    }
    var starPre = opt.starfield ? pre('#403a64','') : null;
    if (starPre) box.appendChild(starPre);
    var mainPre = pre(opt.accentColor, opt.glow?glowStr(opt.accentColor):'none');
    box.appendChild(mainPre);
    el.appendChild(box);

    var base=Date.now(), formedDrawn=false, timer=null;

    function frame(){
      var el2=(Date.now()-base)/1000;
      if (starPre){ starBuf(sbuf, stars, pw, ph, el2); starPre.textContent=joinBuf(sbuf,pw,ph); }
      var lt=el2, T=opt.assembleSeconds;
      if (lt < T+0.05){ formationBuf(fbuf, parts, lt, T, pw, ph); mainPre.textContent=joinBuf(fbuf,pw,ph); formedDrawn=false; }
      else {
        if (!formedDrawn){ mainPre.textContent=grid.rows.join('\n'); formedDrawn=true; }
        if (opt.loop && lt > T+opt.holdSeconds){ base=Date.now(); formedDrawn=false; }
      }
    }
    frame();
    timer=setInterval(frame,40);

    return {
      replay: function(){ base=Date.now(); formedDrawn=false; parts=buildParticles(grid.cells, (opt.seed*9+5)+(Math.floor(Date.now()/1000)%97), pw, ph, opt.wind); },
      setOptions: function(next){ destroy(); return mount(el, ascii, Object.assign({}, options, next)); },
      destroy: destroy,
      _opt: opt, _grid: grid
    };
    function destroy(){ if(timer) clearInterval(timer); timer=null; }
  }

  // ================= GIF export =================
  // Minimal GIF89a writer with LZW + global palette. Offline, no workers.
  function GifWriter(palette){
    this.bytes=[]; this.palette=palette; // palette: array of [r,g,b], length power-of-two up to 256
    this.frames=[];
  }
  GifWriter.prototype.addFrame=function(indices, w, h, delayCs){ this.frames.push({i:indices,w:w,h:h,d:delayCs}); };
  function lzwEncode(indices, minCode){
    var clear=1<<minCode, eoi=clear+1;
    var codeSize=minCode+1, dict={}, next=eoi+1;
    function resetDict(){ dict={}; for(var i=0;i<clear;i++) dict[String.fromCharCode(i)]=i; next=eoi+1; codeSize=minCode+1; }
    var out=[], cur=0, curBits=0;
    function emit(code){ cur |= code<<curBits; curBits+=codeSize; while(curBits>=8){ out.push(cur&255); cur>>=8; curBits-=8; } }
    resetDict(); emit(clear);
    var prefix=String.fromCharCode(indices[0]);
    for(var k=1;k<indices.length;k++){
      var ch=String.fromCharCode(indices[k]);
      var comb=prefix+ch;
      if(dict[comb]!=null){ prefix=comb; }
      else {
        emit(dict[prefix]);
        dict[comb]=next++;
        if(next-1 === (1<<codeSize) && codeSize<12) codeSize++;
        if(next>4095){ emit(clear); resetDict(); }
        prefix=ch;
      }
    }
    emit(dict[prefix]); emit(eoi);
    if(curBits>0) out.push(cur&255);
    return out;
  }
  GifWriter.prototype.encode=function(){
    var b=[]; var self=this;
    function byte(v){ b.push(v&255); }
    function word(v){ b.push(v&255); b.push((v>>8)&255); }
    function str(s){ for(var i=0;i<s.length;i++) b.push(s.charCodeAt(i)); }
    var w=this.frames[0].w, h=this.frames[0].h;
    // palette size -> color bits
    var pal=this.palette.slice();
    var size=1; while(size<pal.length) size<<=1; if(size<2) size=2; if(size>256) size=256;
    while(pal.length<size) pal.push([0,0,0]);
    var gctBits = Math.log2(size)-1;
    str('GIF89a');
    word(w); word(h);
    byte(0x80 | (gctBits&7)); // global color table, 8-bit, gctBits
    byte(0); byte(0);
    for(var i=0;i<size;i++){ byte(pal[i][0]); byte(pal[i][1]); byte(pal[i][2]); }
    // loop forever
    str('!'); byte(0xFF); byte(11); str('NETSCAPE2.0'); byte(3); byte(1); word(0); byte(0);
    var minCode = Math.max(2, Math.ceil(Math.log2(size)));
    for(var f=0;f<this.frames.length;f++){
      var fr=this.frames[f];
      // graphic control extension
      str('!'); byte(0xF9); byte(4); byte(0); word(fr.d); byte(0); byte(0);
      // image descriptor
      byte(0x2C); word(0); word(0); word(fr.w); word(fr.h); byte(0);
      byte(minCode);
      var data=lzwEncode(fr.i, minCode);
      var p=0;
      while(p<data.length){ var n=Math.min(255,data.length-p); byte(n); for(var q=0;q<n;q++) byte(data[p+q]); p+=n; }
      byte(0);
    }
    byte(0x3B);
    return new Uint8Array(b);
  };

  function buildPalette(bg, accent, starfield){
    var pal=[], bgc=hexToRgb(bg), ac=hexToRgb(accent);
    pal.push(bgc.slice()); // index 0 = bg
    var STEPS=24;
    for(var i=1;i<=STEPS;i++){ var t=i/STEPS; pal.push([Math.round(bgc[0]+(ac[0]-bgc[0])*t),Math.round(bgc[1]+(ac[1]-bgc[1])*t),Math.round(bgc[2]+(ac[2]-bgc[2])*t)]); }
    // a couple brighter-than-accent tints for glow cores
    pal.push([Math.min(255,ac[0]+40),Math.min(255,ac[1]+40),Math.min(255,ac[2]+40)]);
    pal.push([Math.min(255,ac[0]+80),Math.min(255,ac[1]+80),Math.min(255,ac[2]+80)]);
    if(starfield){ // faint star greys/whites
      var sc=[64,58,100];
      pal.push(sc); pal.push([120,112,170]); pal.push([200,196,235]);
    }
    return pal;
  }
  function nearest(pal, r, g, b){
    var best=0, bd=1e12;
    for(var i=0;i<pal.length;i++){ var p=pal[i]; var dr=r-p[0],dg=g-p[1],db=b-p[2]; var d=dr*dr+dg*dg+db*db; if(d<bd){bd=d;best=i;} }
    return best;
  }

  // render frame to canvas (flat glyphs, optional cheap glow)
  function renderCanvas(ctx, cellW, cellH, fontSize, bufMain, bufStar, pw, ph, accent, bg, glow){
    ctx.fillStyle=bg; ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.textBaseline='top'; ctx.font=fontSize+'px "Departure Mono", ui-monospace, monospace';
    // stars first
    if(bufStar){ ctx.fillStyle='#5d5798';
      for(var y=0;y<ph;y++) for(var x=0;x<pw;x++){ var c=bufStar[y*pw+x]; if(c!==' '&&c!==undefined) ctx.fillText(c, x*cellW, y*cellH); }
    }
    if(glow){ ctx.save(); ctx.shadowColor=accent; ctx.shadowBlur=fontSize*0.9; }
    ctx.fillStyle=accent;
    for(var yy=0;yy<ph;yy++) for(var xx=0;xx<pw;xx++){ var ch=bufMain[yy*pw+xx]; if(ch!==' '&&ch!==undefined) ctx.fillText(ch, xx*cellW, yy*cellH); }
    if(glow) ctx.restore();
  }

  function exportGIF(ascii, options, gifOpts){
    ensureFont();
    gifOpts=gifOpts||{};
    var opt=normOpts(options);
    var grid=parse(ascii), pw=grid.pw, ph=grid.ph;
    var parts=buildParticles(grid.cells, opt.seed*9+5, pw, ph, opt.wind);
    var stars=opt.starfield ? buildStars(opt.seed*7+3, pw, ph) : null;
    var fbuf=new Array(pw*ph), sbuf=stars?new Array(pw*ph):null;
    var onProgress=gifOpts.onProgress||function(){};

    return document.fonts.ready.then(function(){
      // choose font size to honor maxWidth
      var maxW = gifOpts.maxWidth || 520;
      var cellWRatio=0.6;
      var fs = opt.fontSize;
      var natW = pw*fs*cellWRatio;
      if (natW>maxW) fs = Math.max(4, maxW/(pw*cellWRatio));
      var cellW=fs*cellWRatio, cellH=fs;
      var W=Math.ceil(pw*cellW), H=Math.ceil(ph*cellH);
      var fps=gifOpts.fps||16;
      var T=opt.assembleSeconds, hold=Math.min(opt.holdSeconds,1.2);
      var dur=T+hold;
      var nFrames=gifOpts.frames || Math.round(dur*fps);
      var delayCs=Math.round(100/fps);

      var canvas=document.createElement('canvas'); canvas.width=W; canvas.height=H;
      var ctx=canvas.getContext('2d', { willReadFrequently:true });

      var pal=buildPalette(opt.background, opt.accentColor, opt.starfield);
      var gif=new GifWriter(pal);

      // cache nearest-color for speed
      var cache={};
      function q(r,g,b){ var key=(r>>3<<10)|(g>>3<<5)|(b>>3); var v=cache[key]; if(v===undefined){ v=nearest(pal,r,g,b); cache[key]=v; } return v; }

      return new Promise(function(resolve){
        var f=0;
        function step(){
          var t = nFrames<=1 ? dur : (f/(nFrames-1)) * dur;
          var lt = Math.min(t, T+0.05);
          formationBuf(fbuf, parts, lt, T, pw, ph);
          if (t>=T) { for(var i=0;i<fbuf.length;i++){ var cy=(i/pw)|0, cx=i%pw; var ch=grid.rows[cy] ? grid.rows[cy][cx] : ' '; fbuf[i]= ch===undefined?' ':ch; } }
          if (sbuf) starBuf(sbuf, stars, pw, ph, t);
          renderCanvas(ctx, cellW, cellH, fs, fbuf, sbuf, pw, ph, opt.accentColor, opt.background, opt.glow);
          var img=ctx.getImageData(0,0,W,H).data;
          var idx=new Uint8Array(W*H);
          for(var p=0,j=0;p<img.length;p+=4,j++){ idx[j]=q(img[p],img[p+1],img[p+2]); }
          gif.addFrame(idx, W, H, delayCs);
          f++;
          onProgress(f/nFrames);
          if(f<nFrames) setTimeout(step, 0);
          else { var bytes=gif.encode(); resolve(new Blob([bytes], {type:'image/gif'})); }
        }
        step();
      });
    });
  }

  global.GSVAscii = {
    ensureFont: ensureFont,
    parse: parse,
    mount: mount,
    exportGIF: exportGIF,
    RAMP: RAMP,
    FONT_DATAURL: FONT_DATAURL,
    WINDS: ['right','left','up','down','scatter']
  };
})(typeof window!=='undefined' ? window : this);

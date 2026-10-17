/* Athar · two paths section (recorded / live) · loader + motion · built 2026-10-17 */
(function(){
  var BASE=window.ATHAR_PATHS_BASE||(function(){ var s=document.currentScript; return s? s.src.replace(/paths\.js(\?.*)?$/,'') : ''; })();
  /* GSAP from cdnjs, with jsDelivr as a second source; reuse a script tag home.js already injected instead of loading a second copy */
  var CDNS=['https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/','https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/'];
  function tag(src,name){ return new Promise(function(res,rej){ var ex=document.querySelector('script[src="'+src+'"]'); if(ex){ if(ex.getAttribute('data-ok')||window[name]) return res(); if(ex.getAttribute('data-err')) return rej(new Error('cdn failed')); ex.addEventListener('load',res); ex.addEventListener('error',rej); return; } var s=document.createElement('script'); s.src=src; s.async=false; s.onload=function(){ s.setAttribute('data-ok','1'); res(); }; s.onerror=function(){ s.setAttribute('data-err','1'); rej(new Error('cdn failed')); }; document.head.appendChild(s); }); }
  function load(file,name,i){ i=i||0; return tag(CDNS[i]+file,name).catch(function(e){ if(i+1<CDNS.length) return load(file,name,i+1); throw e; }); }
  function need(name,file){ return (window[name])?Promise.resolve():load(file,name); }
  function injectLib(root){ return fetch(BASE+'paths-lib.svg',{mode:'cors'}).then(function(r){return r.text()}).then(function(t){ var w=document.createElement('div'); w.innerHTML=t; var s=w.querySelector('svg'); s.setAttribute('class','ap-lib'); s.setAttribute('aria-hidden','true'); root.insertBefore(s, root.firstChild); }); }
  function start(){
    var root=document.getElementById('athar-paths'); if(!root) return;
    /* the morph is one-shot content, so it also plays for visitors with reduced motion enabled (the CSS tickers stay off for them) */
    /* everything is requested at once (scripts keep their order with async=false; the SVG library downloads alongside) */
    Promise.all([need('gsap','gsap.min.js'),need('ScrollTrigger','ScrollTrigger.min.js'),need('MorphSVGPlugin','MorphSVGPlugin.min.js'),need('DrawSVGPlugin','DrawSVGPlugin.min.js'),injectLib(root)])
      .then(function(){ BOOT(); }).catch(function(e){ if(window.console) console.warn('athar paths: motion skipped', e); });
  }
  var BOOT=function(){
    var root=document.getElementById('athar-paths'); if(!root||root.classList.contains('ap-js')) return;
    gsap.registerPlugin(ScrollTrigger,MorphSVGPlugin,DrawSVGPlugin);
    var q=function(s,c){return (c||root).querySelector(s)}, qa=function(s,c){return [].slice.call((c||root).querySelectorAll(s))};
    var lib=q('.ap-lib'); if(!lib) return; var E3='power2.inOut';
    function bboxOf(d){ var n=d.match(/-?\d+\.?\d*/g).map(parseFloat),xs=[],ys=[]; for(var i=0;i<n.length;i+=2){xs.push(n[i]);ys.push(n[i+1]);} return {x:Math.min.apply(0,xs),y:Math.min.apply(0,ys),x2:Math.max.apply(0,xs),y2:Math.max.apply(0,ys)}; }
    function area(p){ var b=bboxOf(p.getAttribute('d')); return (b.x2-b.x)*(b.y2-b.y); }
    function attrsOf(p){ var a={fill:p.getAttribute('fill')||'none',stroke:p.getAttribute('stroke')||'none'}; if(p.getAttribute('stroke-width')) a['stroke-width']=p.getAttribute('stroke-width'); return a; }
    function chars(el){ var t=el.textContent; el.textContent=''; t.split('').forEach(function(ch){ var s=document.createElement('span'); s.className='c'; s.textContent=ch===' '?'\u00a0':ch; el.appendChild(s); }); }
    root.classList.add('ap-js');
    chars(q('#ap-k-rec')); chars(q('#ap-k-live .txt'));
    var art=q('#ap-morph'), svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.setAttribute('viewBox','0 0 750 500'); art.appendChild(svg);
    var order=["v2-lines", "v2-scene", "v2-books-left", "v2-books-cup", "v2-cup", "v2-phone", "v2-bubble", "v2-sticky", "v2-clock", "v2-folder", "v2-gears", "v2-checklist", "v2-folder-window", "v2-timer", "v2-lamp", "v2-lamp-loops", "v2-doc-check", "v2-squiggle-mid", "v2-circle-left", "v2-circle-2", "v2-dots-bl", "v2-dot-left", "v2-circle-br", "v2-circle-top"];
    order.forEach(function(id){ var g=q('#'+id,lib); if(g){ var c=g.cloneNode(true); c.id='ap-'+id; svg.appendChild(c);} });
    var pairs=[['v2-lines','v1-lines'],['v2-scene','v1-scene'],[['v2-books-left','v2-books-cup','v2-cup'],'v1-desk'],['v2-phone',['v1-dot-right','v1-squiggle-right']],['v2-bubble','v1-x2'],['v2-sticky','v1-bubble'],['v2-clock','v1-clock'],['v2-folder','v1-cap'],['v2-gears','v1-pie'],['v2-checklist','v1-plant'],['v2-folder-window','v1-xy2'],['v2-timer','v1-bulb'],[['v2-lamp','v2-lamp-loops'],'v1-lamp'],['v2-doc-check','v1-xy'],['v2-squiggle-mid','v1-squiggle-left'],['v2-circle-left','v1-circle-left'],['v2-circle-2','v1-circle-mid'],['v2-dots-bl','v1-dot-left'],['v2-dot-left','v1-circle-top'],['v2-circle-br','v1-circle-rb'],['v2-circle-top','v1-circle-mid2']];
    var morphs=[],recOnly=[],liveOnly=[],MIN=90;
    pairs.forEach(function(pr){
      var src=[].concat(pr[0]).map(function(id){return qa('path',q('#ap-'+id,svg))}).reduce(function(a,b){return a.concat(b)},[]);
      var dst=[].concat(pr[1]).map(function(id){return qa('path',q('#'+id,lib))}).reduce(function(a,b){return a.concat(b)},[]);
      src.sort(function(a,b){return area(b)-area(a)}); dst.sort(function(a,b){return area(b)-area(a)});
      var n=Math.max(src.length,dst.length), host=q('#ap-'+[].concat(pr[0])[0],svg);
      for(var i=0;i<n;i++){ var s=src[i], d=dst[i];
        if(s&&d){ if(area(s)>MIN||area(d)>MIN){ s.__lib=d; morphs.push({el:s,rec:s.getAttribute('d'),live:d.getAttribute('d'),ra:attrsOf(s),la:attrsOf(d)}); } else { recOnly.push(s); var c=d.cloneNode(true); c.__lib=d; host.appendChild(c); gsap.set(c,{scale:0}); liveOnly.push(c); } }
        else if(s){ recOnly.push(s); }
        else if(d){ var c2=d.cloneNode(true); c2.__lib=d; host.appendChild(c2); gsap.set(c2,{scale:0}); liveOnly.push(c2); } }
    });
    /* layering: shapes keep the recorded scene's drawing order, so once they reshape into the live scene the
       screen could cover the instructor. Each state therefore re-stacks the paths in its own drawing order */
    var recOrder=qa('path',svg), byLib=new Map(); recOrder.forEach(function(p){ if(p.__lib) byLib.set(p.__lib,p); });
    var liveOrder=[]; qa('[id^="v1-"] path',lib).forEach(function(d){ var p=byLib.get(d); if(p) liveOrder.push(p); }); recOnly.forEach(function(p){ if(liveOrder.indexOf(p)<0) liveOrder.unshift(p); });
    function restack(list){ list.forEach(function(p){ svg.appendChild(p); }); }
    var strokes=qa('path[stroke]',svg).filter(function(p){return p.getAttribute('stroke')!=='none'});
    var recLines=qa('#ap-st-rec .ln > *'), liveLines=qa('#ap-st-live .ln > *'), txt=q('#ap-txt');
    var upRec=q('#ap-st-rec .ap-upnext'), upLive=q('#ap-st-live .ap-upnext'), OPEN='inset(0 0 0% 0)', SHUT='inset(0 0 100% 0)';
    /* the section opens on the live state: the scene is set to the live shapes instantly and the recorded state waits below */
    morphs.forEach(function(m){ gsap.set(m.el,{morphSVG:{shape:m.live,shapeIndex:0},attr:m.la}); }); gsap.set(recOnly,{scale:0}); gsap.set(liveOnly,{scale:1}); restack(liveOrder);
    gsap.set(liveLines,{yPercent:110}); gsap.set(recLines,{yPercent:110}); gsap.set('#ap-k-live',{opacity:1}); gsap.set('#ap-k-rec .c',{yPercent:110});
    /* the active state's text block and the illustration link to that state's category */
    var stRec=q('#ap-st-rec'), stLive=q('#ap-st-live'), recURL=stRec.getAttribute('href'), liveURL=stLive.getAttribute('href');
    function mark(s){ stRec.classList.toggle('is-on',s==='rec'); stLive.classList.toggle('is-on',s==='live'); var u=s==='live'?liveURL:recURL; if(art.tagName==='A'&&u){ art.setAttribute('href',u); art.setAttribute('aria-label',s==='live'?'\u062a\u0635\u0641\u062d \u062f\u0648\u0631\u0627\u062a \u0627\u0644\u0628\u062b \u0627\u0644\u0645\u0628\u0627\u0634\u0631':'\u062a\u0635\u0641\u062d \u0627\u0644\u062f\u0648\u0631\u0627\u062a \u0627\u0644\u0645\u0633\u062c\u0644\u0629'); } }
    mark('live');
    txt.style.minHeight=Math.max(q('#ap-st-rec').offsetHeight,q('#ap-st-live').offsetHeight)+'px';
    var state='live',busy=null, radios={rec:q('#ap-rec'),live:q('#ap-live')};
    function go(s){
      if(s===state) return; state=s; if(busy) busy.kill(); radios[s].checked=true; mark(s);
      var toLive=s==='live', tl=gsap.timeline({defaults:{ease:E3}}); busy=tl;
      morphs.forEach(function(m,i){ tl.to(m.el,{morphSVG:{shape:toLive?m.live:m.rec,shapeIndex:0},attr:toLive?m.la:m.ra,duration:1.4},(i%6)*.05); });
      tl.add(function(){ restack(toLive?liveOrder:recOrder); },.55);
      tl.to(toLive?recOnly:liveOnly,{scale:0,duration:.5,ease:'power2.in'},0)
        .to(toLive?liveOnly:recOnly,{scale:1,duration:.7,ease:'back.out(1.3)'},.8)
        .to(toLive?recLines:liveLines,{yPercent:-110,stagger:.05,duration:.5},0)
        .to(toLive?liveLines:recLines,{yPercent:0,stagger:.07,duration:.7},.45)
        .to(toLive?'#ap-k-rec .c':'#ap-k-live .c',{yPercent:-110,stagger:.02,duration:.4},0)
        .set('#ap-k-live',{opacity:toLive?1:0},.4)
        .to(toLive?'#ap-k-live .c':'#ap-k-rec .c',{yPercent:0,stagger:.02,duration:.4},.45)
        .to(upLive?upLive:{},{clipPath:toLive?OPEN:SHUT,duration:.6},toLive?1.1:0)
        .to(upRec?upRec:{},{clipPath:toLive?SHUT:OPEN,duration:.6},toLive?0:1.1);
    }
    radios.rec.addEventListener('change',function(){ if(radios.rec.checked) go('rec'); });
    radios.live.addEventListener('change',function(){ if(radios.live.checked) go('live'); });
    var intro=gsap.timeline({paused:true,defaults:{ease:'power1.inOut'}});
    intro.fromTo(strokes,{drawSVG:'0%'},{drawSVG:'100%',duration:1.4,stagger:{each:.004}},0)
         .to(liveLines,{yPercent:0,stagger:.08,duration:.7,ease:'power3.out'},.3)
         .to(upLive?upLive:{},{clipPath:OPEN,duration:.6,ease:'power3.out'},.9)
         .add(function(){ setTimeout(function(){ if(state==='live') go('rec'); },1800); });
    ScrollTrigger.create({trigger:root,start:'top 70%',once:true,onEnter:function(){ intro.play(); }});
  };
  var waited=0; function whenReady(){ if(document.getElementById('athar-paths')) return start(); if(waited++<40) setTimeout(whenReady,250); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',whenReady); else whenReady();
})();

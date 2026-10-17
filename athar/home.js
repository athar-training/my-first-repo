/* Athar · homepage motion (campaign frames, featured courses, reviews, partners) · built 2026-10-17 */
(function(){
  if(window.__athrHome) return; window.__athrHome=1;
  /* diagnostics: open the page with #athr-debug to see a status box */
  var DBG=location.hash==='#athr-debug';
  function dbg(m){ if(!DBG) return; var b=document.getElementById('athr-dbg'); if(!b){ b=document.createElement('pre'); b.id='athr-dbg'; b.style.cssText='position:fixed;left:8px;bottom:96px;z-index:2147483647;background:#3D1A6E;color:#fff;font:12px/1.5 monospace;padding:8px 10px;border-radius:10px;max-width:90vw;white-space:pre-wrap;direction:ltr;text-align:left;margin:0'; document.body.appendChild(b);} b.textContent+=m+'\n'; }
  if(DBG){ window.addEventListener('error',function(e){ dbg('ERR '+(e.message||'')+' '+((e.filename||'').split('/').pop())+':'+(e.lineno||'')); }); dbg('home.js '+(new Date).toISOString().slice(11,19)+' ua '+navigator.userAgent.replace(/.*(iPhone OS [^ ]+|Android [^;]+).*/,'$1')+' reduce='+(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)); }
  /* GSAP from cdnjs, with jsDelivr as a second source if the first is blocked on the visitor's network */
  var CDNS=['https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/','https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/'];
  function tag(src,name){ return new Promise(function(res,rej){
    var ex=document.querySelector('script[src="'+src+'"]');
    if(ex){ if(ex.getAttribute('data-ok')||window[name]) return res(); if(ex.getAttribute('data-err')) return rej(new Error('cdn failed')); ex.addEventListener('load',res); ex.addEventListener('error',rej); return; }
    var s=document.createElement('script'); s.src=src; s.async=false; s.onload=function(){ s.setAttribute('data-ok','1'); res(); }; s.onerror=function(){ s.setAttribute('data-err','1'); rej(new Error('cdn failed')); }; document.head.appendChild(s); }); }
  function load(file,name,i){ i=i||0; return tag(CDNS[i]+file,name).catch(function(e){ if(i+1<CDNS.length) return load(file,name,i+1); throw e; }); }
  function need(name,file){ return window[name]?Promise.resolve():load(file,name); }
  /* reduced motion: keep the one-shot reveals, drop only the scroll-linked parallax */
  var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var E='power3.out', EB='back.out(1.7)';
  var isDesk=window.matchMedia('(min-width:760px)').matches, fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var q=function(s,c){return (c||document).querySelector(s)}, qa=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var fresh=0;
  function flag(el){ if(el.getAttribute('data-ah')) return false; el.setAttribute('data-ah','1'); fresh++; return true; }
  /* split a heading into words (visible at rest; motion animates FROM) */
  function words(h){ var t=h.textContent.trim().split(/\s+/); h.textContent=''; t.forEach(function(w,i){ var s=document.createElement('span'); s.className='ah-w'; s.style.display='inline-block'; s.textContent=w; h.appendChild(s); if(i<t.length-1) h.appendChild(document.createTextNode(' ')); }); }

  /* 1. Intro: campaign 01 frame reveals, image settles, scan dots, CTA, pager */
  function intro(){
    var fr=q('#ah-heroFrame'); if(!fr||!flag(fr)) return;
    var tl=gsap.timeline({defaults:{ease:E}});
    tl.fromTo(fr,{clipPath:'inset(0 0 100% 0 round 22px)'},{clipPath:'inset(0 0 0% 0 round 22px)',duration:1.1,ease:'expo.out'})
      .from('#ah-heroImg',{scale:1.18,duration:1.6,ease:'expo.out'},'<')
      .to('#ah-hero .ah-scan i',{scale:1,duration:.5,ease:EB,stagger:.15},'-=.9')
      .from('#ah-heroCta',{y:20,opacity:0,duration:.6},'-=.5')
      .from('#ah-hero .ah-pager > *',{scale:0,duration:.4,ease:EB,stagger:.08},'-=.4');
    /* 2. Parallax while the frame leaves the viewport (zero shift at rest, so no gap on load) */
    if(!reduce) gsap.to('#ah-heroImg',{yPercent:8,ease:'none',scrollTrigger:{trigger:fr,start:'top top',end:'bottom top',scrub:true}});
  }
  function prime(){
    var pf=q('#ah-primeFrame'); if(!pf||!flag(pf)) return;
    gsap.fromTo(pf,{clipPath:'inset(0 100% 0 0 round 22px)'},{clipPath:'inset(0 0% 0 0 round 22px)',duration:1.2,ease:'expo.out',scrollTrigger:{trigger:pf,start:'top 85%',once:true}});
  }
  /* 3. Section headings: word reveal · kickers slide in · 4. cards, quotes and logos rise in sequence */
  function reveals(){
    qa('.ah-sh').forEach(function(h){ if(!flag(h)) return; words(h); if(h.closest('#ah-hero')) return;
      gsap.from(h.querySelectorAll('.ah-w'),{yPercent:100,opacity:0,duration:.8,ease:E,stagger:.06,scrollTrigger:{trigger:h,start:'top 88%',once:true}}); });
    qa('.ah-kick').forEach(function(k){ if(k.closest('#ah-hero')||!flag(k)) return;
      gsap.from(k,{opacity:0,x:-16,duration:.6,ease:E,scrollTrigger:{trigger:k,start:'top 92%',once:true}}); });
    var rv=qa('.ah-rv').filter(flag);
    if(rv.length) ScrollTrigger.batch(rv,{start:'top 90%',once:true,onEnter:function(b){ gsap.from(b,{y:40,opacity:0,duration:.9,ease:E,stagger:.12}); }});
    /* 5. Magnetic buttons on desktop pointers only */
    if(isDesk&&fine) qa('.ah-btn').forEach(function(b){ if(!flag(b)) return;
      b.addEventListener('mousemove',function(e){ var r=b.getBoundingClientRect(); gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.18,y:(e.clientY-r.top-r.height/2)*.28,duration:.4,ease:E}); });
      b.addEventListener('mouseleave',function(){ gsap.to(b,{x:0,y:0,duration:.6,ease:'elastic.out(1,.5)'}); }); });
  }
  function init(){ fresh=0; intro(); prime(); reveals(); return fresh; }
  function boot(){
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ignoreMobileResize:true});
    /* the theme sets scroll-behavior:smooth on the page; ScrollTrigger measures positions by jumping to 0 and back,
       which must be instant or every position comes out shifted by the current scroll */
    try{ document.documentElement.style.scrollBehavior='auto'; document.body.style.scrollBehavior='auto'; }catch(e){}
    init();
    /* Salla renders HTML blocks from the browser one after another: watch for late sections for 20s,
       and recalculate only when a new section was actually set up */
    var t=null, mo=new MutationObserver(function(){ clearTimeout(t); t=setTimeout(function(){ if(init()) ScrollTrigger.refresh(); },150); });
    mo.observe(document.body,{childList:true,subtree:true});
    setTimeout(function(){ mo.disconnect(); },20000);
  }
  /* both files are requested at once; async=false keeps their execution order */
  function start(){ Promise.all([need('gsap','gsap.min.js'),need('ScrollTrigger','ScrollTrigger.min.js')]).then(function(){ dbg('gsap+ScrollTrigger ok'); boot(); dbg('home boot ok, sections='+document.querySelectorAll('.ah').length); }).catch(function(e){ dbg('home FAILED '+(e&&e.message)); if(window.console) console.warn('athar home: motion skipped',e); }); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();

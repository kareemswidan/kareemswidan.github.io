const header=document.querySelector('[data-header]');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>24);
updateHeader();
window.addEventListener('scroll',updateHeader,{passive:true});

menu?.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')==='true';
  menu.setAttribute('aria-expanded',String(!open));
  nav.classList.toggle('open',!open);
});
nav?.addEventListener('click',event=>{
  if(event.target.matches('a')){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
  });
},{threshold:.13});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const countObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target,target=Number(el.dataset.count),suffix=el.dataset.suffix||'';
    if(reduceMotion){el.textContent=target+suffix;return;}
    const start=performance.now(),duration=1300;
    const tick=now=>{const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,3);el.textContent=Math.round(target*eased)+suffix;if(progress<1)requestAnimationFrame(tick);};
    requestAnimationFrame(tick);countObserver.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));

const glow=document.querySelector('.cursor-glow');
if(glow&&!reduceMotion)window.addEventListener('pointermove',event=>{
  glow.style.left=`${event.clientX}px`;glow.style.top=`${event.clientY}px`;
},{passive:true});

const form=document.querySelector('[data-contact-form]');
form?.addEventListener('submit',event=>{
  event.preventDefault();
  const status=form.querySelector('.form-status');
  const button=form.querySelector('button[type="submit"]');
  button.disabled=true;status.textContent='يتم إرسال طلبك…';
  fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))})
    .then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.error);status.textContent=data.message;form.reset();})
    .catch(error=>status.textContent=error.message||'تعذر إرسال الطلب، حاول مرة أخرى.')
    .finally(()=>button.disabled=false);
});
document.querySelector('[data-year]').textContent=new Date().getFullYear();

const state={user:null};
const $=selector=>document.querySelector(selector);

async function api(url,options={}){
  const response=await fetch(url,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
  const data=await response.json().catch(()=>({}));
  if(response.status===401){location.href='./login.html';throw new Error('Unauthorized');}
  if(!response.ok)throw new Error(data.error||'حدث خطأ، حاول مرة أخرى.');
  return data;
}

function renderBrief(data){
  const brief=data.brief;
  $('.result-empty').style.display='none';
  const container=$('.result-content');container.classList.add('show');
  container.innerHTML=`<div class="result-head"><div><small>AI PROJECT BRIEF</small><h2>${escapeHtml($('#title').value)}</h2></div><span class="mode-chip">${data.mode==='ollama'?`Ollama · ${escapeHtml(data.model)}`:'Local Fallback'}</span></div><div class="result-section"><h3>الملخص التنفيذي</h3><p>${escapeHtml(brief.executiveSummary)}</p></div><div class="result-section"><h3>الجمهور الأساسي</h3><p>${escapeHtml(brief.audience)}</p></div><div class="result-section"><h3>ميزات النسخة الأولى</h3><ul class="feature-list">${brief.features.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div><div class="result-section"><h3>مراحل التنفيذ</h3>${brief.phases.map(x=>`<div class="phase"><b>${escapeHtml(x.name)}</b><span>${escapeHtml(x.duration)}</span><p>${escapeHtml(x.output)}</p></div>`).join('')}</div><div class="result-section"><h3>التقنيات المقترحة</h3><ul class="stack-list">${brief.stack.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div><div class="result-section"><h3>الخطوة التالية</h3><p>${escapeHtml(brief.nextStep)}</p></div>`;
}

const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

async function boot(){
  try{
    const data=await api('/api/dashboard');state.user=data.user;
    $('[data-user-name]').textContent=data.user.name;
    $('[data-user-email]').textContent=data.user.email;
    $('[data-user-initial]').textContent=data.user.name.trim().charAt(0);
    $('[data-brief-count]').textContent=data.stats.briefs;
    $('[data-request-count]').textContent=data.stats.requests;
    $('[data-ai-mode]').textContent=`AI محلي · ${data.aiModel}`;
    const history=await api('/api/briefs');
    $('.history-list').innerHTML=history.briefs.length?history.briefs.map(item=>`<div class="history-item"><div><b>${escapeHtml(item.title)}</b><small>${new Date(item.created_at+'Z').toLocaleDateString('ar')}</small></div><span>←</span></div>`).join(''):'<p class="card-sub">لا توجد تحليلات محفوظة بعد.</p>';
  }finally{$('.dashboard-loading').classList.add('hide');}
}

$('.brief-form')?.addEventListener('submit',async event=>{
  event.preventDefault();const button=event.currentTarget.querySelector('button');
  button.disabled=true;button.textContent='يتم تحليل فكرتك…';
  try{const data=await api('/api/ai/brief',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)))});renderBrief(data);$('[data-brief-count]').textContent=Number($('[data-brief-count]').textContent)+1;}
  catch(error){$('.result-empty').innerHTML=`<div><div class="ai-symbol">!</div><p>${escapeHtml(error.message)}</p></div>`;}
  finally{button.disabled=false;button.textContent='توليد Project Brief بالذكاء الاصطناعي ✦';}
});

$('[data-logout]')?.addEventListener('click',async()=>{await fetch('/api/auth/logout',{method:'POST'});location.href='./login.html';});
boot();

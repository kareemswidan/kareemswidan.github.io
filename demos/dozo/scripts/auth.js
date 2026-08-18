const form=document.querySelector('[data-auth-form]');
const alertBox=document.querySelector('.form-alert');
document.querySelectorAll('[data-password-toggle]').forEach(button=>button.addEventListener('click',()=>{
  const input=document.querySelector(button.dataset.passwordToggle);
  input.type=input.type==='password'?'text':'password';
  button.textContent=input.type==='password'?'إظهار':'إخفاء';
}));

async function request(url,data){
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const body=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(body.error||'تعذر إتمام العملية.');
  return body;
}

form?.addEventListener('submit',async event=>{
  event.preventDefault();
  alertBox.className='form-alert';
  const button=form.querySelector('button[type="submit"]');
  button.classList.add('loading');button.disabled=true;
  try{
    const data=Object.fromEntries(new FormData(form));
    if(data.confirmPassword!==undefined&&data.password!==data.confirmPassword)throw new Error('كلمتا المرور غير متطابقتين.');
    delete data.confirmPassword;
    await request(form.dataset.endpoint,data);
    alertBox.textContent='تم بنجاح، يتم تحويلك إلى مساحة العمل…';
    alertBox.classList.add('show','success');
    setTimeout(()=>location.href='./dashboard.html',450);
  }catch(error){
    alertBox.textContent=error.message;alertBox.classList.add('show','error');
  }finally{button.classList.remove('loading');button.disabled=false;}
});

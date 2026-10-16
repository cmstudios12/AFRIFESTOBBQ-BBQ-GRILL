(() => {
  'use strict';
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-main-nav]');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open',open);
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
      document.body.classList.toggle('menu-open',open);
    };
    toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
    window.addEventListener('keydown',event=>{if(event.key==='Escape')setOpen(false)});
    window.addEventListener('resize',()=>{if(window.innerWidth>800)setOpen(false)});
  }
  const filters=document.querySelectorAll('[data-filter]');
  const menuItems=document.querySelectorAll('[data-menu-category]');
  filters.forEach(filter=>filter.addEventListener('click',()=>{
    const selected=filter.dataset.filter;
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));
    menuItems.forEach(card=>{card.hidden=selected!=='all'&&card.dataset.menuCategory!==selected;});
  }));
  const form=document.getElementById('enquiryForm');
  if(form){
    const status=document.getElementById('formStatus');
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const data=new FormData(form);
      const name=String(data.get('name')||'').trim();
      const email=String(data.get('email')||'').trim();
      const phone=String(data.get('phone')||'').trim();
      const topic=String(data.get('subject')||'General enquiry');
      const message=String(data.get('message')||'').trim();
      // Static presentation: creates a draft via the visitor's own email app.
      // This does NOT submit to a server or claim that an email was sent.
      const subject=encodeURIComponent('Afrifesto website enquiry — '+topic);
      const body=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\nPhone: '+(phone||'Not provided')+'\nEnquiry type: '+topic+'\n\n'+message);
      const url='mailto:info@afrifestobbqandgrill.co.uk?subject='+subject+'&body='+body;
      if(status){status.hidden=false;status.style.display='block';status.textContent='Your email application should open with a draft. Please press Send there to deliver your enquiry.';}
      window.location.href=url;
    });
  }
})();

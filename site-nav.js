(() => {
  const header=document.getElementById('site-navigation');
  if(!header)return;
  const menu=header.querySelector('.site-nav-menu');
  const current=new URL(window.location.href);
  const pagePath=path=>path.replace(/\/index\.html$/,'/');
  const openCalendar=()=>{
    if(window.location.hash!=='#bookingCalendarCard')return;
    const calendar=document.getElementById('bookingCalendarCard');
    if(calendar){calendar.open=true;calendar.scrollIntoView({block:'start'});}
  };
  for(const link of header.querySelectorAll('.site-nav-primary a')) {
    const url=new URL(link.href);
    if(!url.hash&&pagePath(url.pathname)===pagePath(current.pathname))link.setAttribute('aria-current','page');
    link.addEventListener('click',()=>{
      menu.open=false;
      if(url.hash==='#bookingCalendarCard'&&pagePath(url.pathname)===pagePath(current.pathname)){
        const calendar=document.getElementById('bookingCalendarCard');
        if(calendar)calendar.open=true;
      }
    });
  }
  openCalendar();
  window.addEventListener('hashchange',openCalendar);
  const input=header.querySelector('#guideSearchInput');
  const results=header.querySelector('#guideSearchResults');
  const status=header.querySelector('#guideSearchStatus');
  const closeSearch=()=>{results.hidden=true;status.textContent='';};
  menu.addEventListener('toggle',()=>{if(menu.open)closeSearch();});
  input.addEventListener('focus',()=>{menu.open=false;});
  header.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    const hadResults=!results.hidden;closeSearch();
    if(hadResults)input.focus();
    else if(menu.open){menu.open=false;menu.querySelector('summary').focus();}
  });
  results.addEventListener('click',event=>{if(event.target.closest('a'))closeSearch();});
  document.addEventListener('pointerdown',event=>{
    if(!header.contains(event.target)){closeSearch();menu.open=false;}
  });
})();

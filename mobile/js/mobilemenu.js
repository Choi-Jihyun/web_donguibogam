window.addEventListener("load", () => {
  const header = document.querySelector('header');
  const mobileMenuIcon = document.querySelector("#mobilemenu > i");
  const mobileCloseBtn = document.querySelector("#mobileclose_btn > i");
  const mobileMenuWrap = document.querySelector("#mobilemenu_inner");
  const mobileMenuLiA = document.querySelectorAll("#mobilemenu_list > li > a");
  const mobileSubmenuLiA = document.querySelectorAll(".mobile_submenu_list > li > a");
  const grayLayer = document.createElement('div');
  grayLayer.id = 'mobile_graylayer';

  let mobileMenuWidth = mobileMenuWrap.clientWidth;
  let openHeight = null;
  let closeHeight = 50;
  let selectedMenu = null;
  gsap.set(mobileMenuWrap, {right: -mobileMenuWidth});
  // gsap.set(mobileMenuWrap, {right: 0});

  mobileMenuIcon.addEventListener("click", openMobileMenu)
  mobileCloseBtn.addEventListener("click", closeMobileMenu)
  grayLayer.addEventListener("click", closeMobileMenu)
  for(item of mobileMenuLiA) {
    item.addEventListener("click", activateMobileMenu);
  }

  function openMobileMenu() {
    header.append(grayLayer);
    gsap.to(grayLayer, {display: 'block',  opacity: 0.8, duration: 0.2})

    gsap.set(mobileMenuWrap, {display: 'block'});
    
    gsap.to(mobileMenuWrap, {right: 0, duration: 0.4, ease: 'power1.out'})

    gsap.set('body, html', {overflow: 'hidden'})
  }
  function closeMobileMenu() {
    if(selectedMenu != null) {
      gsap.to(selectedMenu.parentElement, {height: closeHeight, duration: 0.3, ease: 'power1.out'})
      selectedMenu.classList.remove('selected');
      selectedMenu = null;
    }
    gsap.to(mobileMenuWrap, {right: -mobileMenuWidth, duration: 0.4, ease: 'power1.out', onComplete: () => {
      gsap.set(mobileMenuWrap, {display: 'none'});
      gsap.set('body, html', {overflow: 'visible'})
    }})
    gsap.to(grayLayer, {display: 'none', opacity: 0})
  }

  function activateMobileMenu() {      

    if(selectedMenu!=null && selectedMenu == this) {
      gsap.to(selectedMenu.parentElement, {height: closeHeight, duration: 0.1*selectedMenu.nextElementSibling.children.length, ease: 'power1.out'})
      selectedMenu.classList.remove('selected');
      selectedMenu = null;
    } else if(selectedMenu!=null && selectedMenu!=this) {
      gsap.to(selectedMenu.parentElement, {height: closeHeight, duration: 0.1*selectedMenu.nextElementSibling.children.length, ease: 'power1.out'})
      selectedMenu.classList.remove('selected');
      selectedMenu = this;
      openHeight = closeHeight + (closeHeight*selectedMenu.nextElementSibling.children.length)
      gsap.to(selectedMenu.parentElement, {height: openHeight, duration: 0.1*selectedMenu.nextElementSibling.children.length, ease: 'power1.out'})
      selectedMenu.classList.add('selected');
    } else if(selectedMenu==null) {
      selectedMenu = this;
      openHeight = closeHeight + (closeHeight*selectedMenu.nextElementSibling.children.length)
      gsap.to(selectedMenu.parentElement, {height: openHeight, duration: 0.1*selectedMenu.nextElementSibling.children.length, ease: 'power1.out'})
      selectedMenu.classList.add('selected');
    }

  }




})
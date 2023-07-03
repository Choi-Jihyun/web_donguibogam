document.addEventListener('DOMContentLoaded', ()=>{
  const headerWrap = document.querySelector("#header_wrap");
  const mainMenu = document.querySelectorAll("#mainmenu_list> li > a");
  const subMenuList = document.querySelectorAll('.submenu_list');

  let selectedMenu = null;
  let closeHeight = 100;
  let openHeight = 270;
  let isHeaderOpen = false;

  gsap.set(headerWrap, {height: closeHeight})
  gsap.set(subMenuList, {display: 'none'})
  
  for(item of mainMenu){
    item.addEventListener('mouseenter', overMainMenu);
  }
  for(item of subMenuList){
    item.addEventListener('mouseenter', overMainMenu2)
  }
  headerWrap.addEventListener('mouseleave', inActivateMenu);

  function overMainMenu(){
    activateMenu(this);
  }
  function overMainMenu2(){
    activateMenu2(this);
  }

  function activateMenu(menu){
    if(selectedMenu != null && selectedMenu != menu) {
      selectedMenu.parentElement.classList.remove('selected');
      selectedMenu.classList.remove('selected');
    }
    if(selectedMenu != menu) {
      selectedMenu = menu.nextElementSibling;
      // a 태그로 잡았으니까 css는 li.selected 있으니 거기에 붙인다.
      selectedMenu.parentElement.classList.add('selected');
      selectedMenu.classList.add('selected');
    }
    gsap.to(headerWrap, {height: openHeight, duration: 0.3})
    gsap.to(subMenuList, {display: 'block', duration: 0.3, opacity: 1})
  }

  // 구조에 따라서 다음과 같이 해야될 수 있다.
  // function overSubMenu(){
  //   activateMenu(this.parentElement)
  //   activateMenu(this.nextElementSibling)
  // }

  function activateMenu2(menu){
    if(selectedMenu != menu) {
      selectedMenu.classList.remove('selected');
      selectedMenu.parentElement.classList.remove('selected');
      selectedMenu = menu;
      selectedMenu.classList.add('selected');
      selectedMenu.parentElement.classList.add('selected');
    }
  }

  function inActivateMenu(){
    selectedMenu.parentElement.classList.remove('selected');
    selectedMenu.classList.remove('selected');
    
    gsap.to(subMenuList, {display: 'none', opacity: 0, duration: 0.3})
    selectedMenu = null;
    gsap.to(headerWrap, {height: closeHeight, duration: 0.3, ease: 'power1.out'})
  }

})
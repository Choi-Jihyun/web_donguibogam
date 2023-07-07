window.addEventListener('load', ()=>{
  const mainVisualWrap = document.querySelector("#mainvisual_wrap");
  const mainVisualSection = document.querySelector("#mainvisual_section");
  const mainVisualList = document.querySelector("#mainvisual_list");
  const mainVisualLi = document.querySelectorAll("#mainvisual_list > li");
  const mainVisual = document.querySelectorAll(".mainvisual");
  const dotList = document.querySelector("#selectbar_list");
  const dot = document.querySelectorAll("#selectbar_list > li");
  const prevBtn = document.querySelector("#prev_btn");
  const nextBtn = document.querySelector("#next_btn");

  let slideWidth = mainVisualList.children[0].offsetWidth;
  let visualLength = mainVisualList.children.length;
  let slideIndex = 0;
  let overDot = dot[0];

  for(item of dot) {
    item.addEventListener('mouseenter', mouseOverDot)
  }
  // setInterval(addOverIndex, 1000);
  prevBtn.addEventListener('click', delOverIndex);
  nextBtn.addEventListener('click', addOverIndex);


  function addOverIndex(){
    slideIndex++;
    if(slideIndex>visualLength-1){
      slideIndex = 0;
    }
    activateDot(slideIndex)
    // visualSlide(slideIndex)
  }
  function delOverIndex(){
    slideIndex--;
    if(slideIndex<0){
      slideIndex = visualLength - 1;
    }
    activateDot(slideIndex)
    // visualSlide(slideIndex)
  }

  function mouseOverDot(){
    slideIndex = getIndex(this);
    activateDot(slideIndex)
    // visualSlide(slideIndex)
  }

  function getIndex(thisMenu){
    let selectedIndex = 0;
    while((thisMenu = thisMenu.previousElementSibling)!=null){
      selectedIndex++;
    }
    return selectedIndex;
  }

  function activateDot(index){
    if(overDot!=null && overDot!=dot[index]){
      overDot.classList.remove('selected');
    }
    overDot=dot[index];
    overDot.classList.add('selected');
  }

  function visualSlide(index){
    gsap.to(mainVisualList, {left: -slideWidth*index})
  }


})
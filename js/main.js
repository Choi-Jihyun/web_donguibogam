window.addEventListener('load', ()=>{
  const mainVisualWrap = document.querySelector("#mainvisual_wrap");
  const visualFrame = document.querySelector("#visual_frame");
  const mainVisualLi = document.querySelectorAll("#mainvisual_list > li");
  const dot = document.querySelectorAll("#selectbar_list > li");
  const prevBtn = document.querySelector("#prev_btn");
  const nextBtn = document.querySelector("#next_btn");
  const playBtn = document.querySelector("#play_btn > i");
  const pauseBtn = document.querySelector("#pause_btn > i");

  const mainVisualContents = document.querySelectorAll(".mainvisual_contents");

  let visualWidth = visualFrame.offsetWidth;
  let currentIndex = 0;
  let nextIndex = null;
  let selectedDot = dot[0] 
  let isAnimating = false;
  let timer = null;
  
  autoPlay();
  visualFrame.addEventListener('mouseenter', stopAutoPlay);
  visualFrame.addEventListener('mouseleave', autoPlay);

  function autoPlay() {
    timer = setInterval(addVisualIndex, 3000);
    gsap.to(pauseBtn, {display: 'none', opacity: 0, duration: 0.3, ease: 'power1.in'});
  }
  function stopAutoPlay() {
    clearInterval(timer);
    gsap.to(pauseBtn, {display: 'block', opacity: 1, duration: 0.4, ease: 'power3.out'})
  }

  window.addEventListener("resize", ()=> {
    visualWidth = visualFrame.offsetWidth;
    gsap.set(mainVisualLi, {left: visualWidth})
    gsap.set(mainVisualLi[currentIndex], {left:0})
  });

  for(item of dot) {
    item.addEventListener('click', overDot)
  }
  nextBtn.addEventListener('click', addVisualIndex);
  prevBtn.addEventListener('click', () => {
    if(isAnimating == false) {
      nextIndex = currentIndex - 1;
      if(nextIndex < 0) {
        nextIndex = mainVisualLi.length - 1;
      }
      slidePrevVisual(nextIndex);
      activateDot(nextIndex);
    }
  });

  function addVisualIndex() {
    if(isAnimating == false) {
      nextIndex = currentIndex + 1;
      if(nextIndex > mainVisualLi.length - 1) {
        nextIndex = 0;
      }
      slideNextVisual(nextIndex);
      activateDot(nextIndex);
    }
  }

  gsap.set(mainVisualLi, {left: visualWidth, opacity: 1, scale: 1})
  gsap.set(mainVisualContents, {top: 60+"%", opacity: 0})

  gsap.set(mainVisualLi[0], {left: 0, opacity: 1, scale: 1})
  activateDot(0);
  gsap.to(mainVisualContents[0], {top: 54+"%", scale:1, opacity: 1, duration: 1.4, ease: "power1.out"})
    
  function overDot() {
    if(isAnimating == false) {
      nextIndex = getIndex(this);
      activateDot(nextIndex);
      if(nextIndex > currentIndex) {
        slideNextVisual(nextIndex);
      } else if (nextIndex < currentIndex) {
        slidePrevVisual(nextIndex);
      }
    }
  }

  function getIndex(checkMenu) {
    let selectedIndex = 0;
    while((checkMenu = checkMenu.previousElementSibling) != null) {
      selectedIndex++;
    } 
    return selectedIndex;
  }

  function activateDot(index) {
    if(selectedDot != null && selectedDot != dot[index]) {
      selectedDot.classList.remove("selected");
    }
    if(selectedDot != dot[index]) {
      selectedDot = dot[index];
      selectedDot.classList.add("selected");
    }
  }

  function slideNextVisual(index) {
    isAnimating = true;
    gsap.to(mainVisualLi[currentIndex], {left: - visualWidth, opacity: 1, duration: 0.8, ease: 'power1.out'})
    gsap.set(mainVisualContents[currentIndex], {top: 60+"%", opacity: 0})

    gsap.set(mainVisualLi[index], {left: visualWidth,  opacity: 1, scale: 1.2})
    // 다 들어오고 크기가 줄어들어야 하니까 onComplete을 써야 한다.
    gsap.to(mainVisualLi[index], {left: 0, opacity: 1, duration:0.8, ease:'power1.out', onComplete: ()=>{
      gsap.to(mainVisualLi[index], {scale:1, duration: 0.8, ease: 'power1.out', onComplete: ()=>{
        gsap.to(mainVisualContents[index], {top: 54+"%", scale:1, opacity: 1, duration: 0.8, ease: "power1.out", onComplete: ()=>{
          isAnimating = false;
        }})
      }})
      currentIndex = index;
    }})
  }
  function slidePrevVisual(index) {
    isAnimating = true;
    gsap.to(mainVisualLi[currentIndex], {left: visualWidth,  opacity: 1, duration: 0.8, ease: 'power1.out'})
    gsap.set(mainVisualContents[currentIndex], {top: 60+"%", opacity: 0})

    gsap.set(mainVisualLi[index], {left: -visualWidth,  opacity: 1, scale: 1.2})
    gsap.to(mainVisualLi[index], {left: 0, opacity: 1, duration:0.8, ease:'power1.out', onComplete: ()=>{
      gsap.to(mainVisualLi[index], {scale:1, duration: 0.8, ease: 'power1.out', onComplete: ()=>{
        gsap.to(mainVisualContents[index], {top: 54+"%", scale:1,  opacity: 1, duration: 0.8, ease: "power1.out", onComplete: ()=>{
          isAnimating = false;
        }});
      }})
      currentIndex = index;
    }})
  }



})
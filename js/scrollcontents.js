document.addEventListener('DOMContentLoaded', () => {
// window.addEventListener("load", () => {
  const treatmentWidgetLi = document.querySelectorAll('#treatment_detail_list > li.widget');

  window.addEventListener('scroll', scrollWindow);

  function scrollWindow() {
    let scrollHeight = window.scrollY + window.innerHeight;
    
    if(scrollHeight > 1400){
      for(i = 0; i < treatmentWidgetLi.length; i++){
        gsap.to(treatmentWidgetLi[i], {top: 0, opacity:1, delay: 0.2*i, duration: 1, ease: "power1.out"})
      }
    }
  }
})
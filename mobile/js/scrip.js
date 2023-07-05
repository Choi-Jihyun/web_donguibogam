  const serviceList = document.querySelector('#services_widget_list');
  const services = document.querySelectorAll('#services_widget_list li');

  let currentPosition = 0;
  let firstChildWidth = services[0].offsetWidth;
  let count = 0;

  function move() {
    count++;

    if (count % (2 * services.length) === 0) {
      count = 0;
    }

    let newPostion = (currentPosition - firstChildWidth);

    if (count % 2 === 0 && count !== 0) {
      newPostion = (currentPosition + firstChildWidth);
    }

    currentPosition = newPostion;

    serviceList.style.transform = `translateX(${newPostion}px)`;
  }

  const interval = setInterval(move, 3000);


  // 위 코드는 자바스크립트를 이용하여 ul 안에 있는 li가 왼쪽으로 천천히 움직이도록 하는 코드입니다.

// 자세한 동작은 다음과 같습니다.

// setInterval을 이용하여 일정 시간마다 move 함수가 실행됩니다.
// move 함수 내부에서 count 변수에 따라 이동 방향이 결정됩니다.
// count 변수는 li의 개수 두 배만큼 카운팅됩니다. (한 번 회전할 때마다 8씩 증가)
// 특정 조건에 따라 currentPosition 값이 바뀌면서 ul 태그의 transform 속성도 업데이트됩니다.
// 이러한 변경사항으로 인해 ul 태그가 이동하게 됩니다.

// 추가적으로, 이 코드에서는 width 값을 사용하고 있기 때문에, 화면 크기에 따라 결과가 다른 점에 유의해야 합니다. 만약 % 값을 사용하고 싶다면, 상황에 맞게 변경하여 사용하시면 됩니다.

const serviceList = document.querySelector('#services_widget_list');
const services = document.querySelectorAll('#services_widget_list li');

let currentPosition = 0;
let firstChildLeft = services[0].offsetLeft;
let count = 0;
let positionOffset = 0;

function move() {
  count++;

  if (count % (2 * services.length) === 0) {
    count = 0;
  }

  if (count % 2 === 0 && count !== 0) {
    positionOffset = 1;
  } else {
    positionOffset = -1;
  }

  currentPosition += positionOffset;

  serviceList.style.transform = `translateX(${currentPosition}px)`;

  if (currentPosition === -firstChildLeft) {
    const firstChild = serviceList.removeChild(services[0]);
    serviceList.appendChild(firstChild);
    currentPosition += firstChild.offsetWidth;
  }
  
  requestAnimationFrame(move);
}

requestAnimationFrame(move);



// 이동시키는 쉬운 버전
const serviceList = document.querySelector('#services_widget_list'); 
const services = document.querySelectorAll('#services_widget_list > li'); 

let servicesListFirstChild = services[0];
let lastWidgetPosition = null; 
let timer = null; 
let positionNum = 0;

serviceList.addEventListener('mouseenter', stopServiceWidgetMove) 
serviceList.addEventListener('mouseleave', autoPlay)

autoPlay();

function autoPlay() { 
  timer = setInterval(serviceWidgetMove, 1); 
}

function serviceWidgetMove() { 
  positionNum = positionNum + 0.05; 
  serviceList.style.left = -${positionNum}vw 
}

function moveFirstToLast() { 
  // Get the first li element 
  const firstService = services.shift(); 
  // Add the removed li element to the end of services 
  services.push(firstService); 
  // Remove the first li element from the DOM 
  firstService.remove(); 
  // Append the new last li element to the DOM 
  serviceList.append(services[services.length - 1]); 
}

function stopServiceWidgetMove() { 
  clearInterval(timer) 
}

setInterval(moveFirstToLast, 3000); 
// Call moveFirstToLast every 3 seconds.
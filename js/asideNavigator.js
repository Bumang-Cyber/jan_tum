const toolBox = document.querySelector(".menu_on");
const shirnkedBox = document.querySelector(".menu_off");
const timeMargin = document.querySelector(".time");

//greeting 마진 조절용
const greetingMargin = document.querySelector("#greeting");

//컨텐츠 패널 영역 & 기능 패널 영역
const contentsPanel = document.querySelector(".contents_panel");
const functionPanel = document.querySelector(".function_panel");

//기능 선택 아이콘
const onOffToggle = document.querySelector(".function_panel :nth-child(1)");
const wordsIcon = document.querySelector(".function_panel :nth-child(2)");
const toDoIcon = document.querySelector(".function_panel :nth-child(3)");
const BGIcon = document.querySelector(".function_panel :nth-child(4)");

//컨텐츠 영역들 (hide & show 전환)
const wordsContents = document.querySelector("#words");
const toDoContents = document.querySelector("#todo");
const BGContents = document.querySelector("#background");

// 저장된 값 모음
const lastClicked = localStorage.getItem("lastClicked");

//
// 아래 클릭 시 펑션 모음
//

function onOffIconClicked() {
  contentsPanel.classList.toggle("hidden");
  wordsIcon.classList.toggle("hidden");
  toDoIcon.classList.toggle("hidden");
  toolBox.classList.toggle("hidden");
  timeMargin.classList.toggle("time__whenSideBarShrinked");
}

function wordsIconClicked() {
  wordsContents.classList.remove("hidden");
  toDoContents.classList.add("hidden");
  //   BGContents.classList.add("hidden");
  wordsIcon.firstElementChild.classList.add("focused");
  toDoIcon.firstElementChild.classList.remove("focused");
  //   BGIcon.classList.remove("focused");
  localStorage.setItem("lastClicked", "wordsIcon");
}

function toDoIconClicked() {
  toDoContents.classList.remove("hidden");
  wordsContents.classList.add("hidden");
  //   BGContents.classList.add("hidden");
  toDoIcon.firstElementChild.classList.add("focused");
  wordsIcon.firstElementChild.classList.remove("focused");
  //   BGIcon.classList.remove("focused");
  localStorage.setItem("lastClicked", "toDoIcon");
}

function BGIconClicked() {
  BGContents.classList.remove("hidden");
  toDoContents.classList.add("hidden");
  wordsContents.classList.add("hidden");
  BGIcon.classList.add("focused");
  toDoIcon.classList.remove("focused");
  wordsIcon.classList.remove("focused");
  localStorage.setItem("lastClicked", "BGIcon");
}

//
// 아래 이벤트 리스너
//

onOffToggle.addEventListener("click", onOffIconClicked);
wordsIcon.addEventListener("click", wordsIconClicked);
toDoIcon.addEventListener("click", toDoIconClicked);
shirnkedBox.addEventListener("click", onOffIconClicked);
// BGIcon.addEventListener("click", BGIconClicked);

//
// 아래 마지막으로 켰던 탭 기억하는 if문 실행
//

if (lastClicked !== null) {
  if (lastClicked === "wordsIcon") {
    wordsIconClicked();
  } else if (lastClicked === "toDoIcon") {
    toDoIconClicked();
  }
} else {
  wordsIconClicked();
}

const toolBox = document.querySelector("#tool_box");

//컨텐츠 패널 영역 & 기능 패널 영역
const contentsPanel = document.querySelector(".contents_panel");
const functionPanel = document.querySelector(".function_panel");

//기능 선택 아이콘
const openCloseToggle = document.querySelector(".function_panel :nth-child(1)");
const wordsIcon = document.querySelector(".function_panel :nth-child(2)");
const toDoIcon = document.querySelector(".function_panel :nth-child(3)");
const BGIcon = document.querySelector(".function_panel :nth-child(4)");

//컨텐츠 영역들 (hide & show 전환)
const wordsContents = document.querySelector("#words");
const toDoContents = document.querySelector("#todo");
const BGContents = document.querySelector("#background");

//
// 아래 펑션 모음
//

function wordsIconClicked() {
  wordsContents.classList.remove("hidden");
  toDoContents.classList.add("hidden");
  //   BGContents.classList.add("hidden");
  wordsIcon.firstElementChild.classList.add("focused");
  toDoIcon.firstElementChild.classList.remove("focused");
  //   BGIcon.classList.remove("focused");
}

function toDoIconClicked() {
  toDoContents.classList.remove("hidden");
  wordsContents.classList.add("hidden");
  //   BGContents.classList.add("hidden");
  toDoIcon.firstElementChild.classList.add("focused");
  wordsIcon.firstElementChild.classList.remove("focused");
  //   BGIcon.classList.remove("focused");
}

function BGIconClicked() {
  BGContents.classList.remove("hidden");
  toDoContents.classList.add("hidden");
  wordsContents.classList.add("hidden");
  BGIcon.classList.add("focused");
  toDoIcon.classList.remove("focused");
  wordsIcon.classList.remove("focused");
}

//
// 아래 이벤트 리스너
//

wordsIcon.addEventListener("click", wordsIconClicked);
toDoIcon.addEventListener("click", toDoIconClicked);
// BGIcon.addEventListener("click", BGIconClicked);

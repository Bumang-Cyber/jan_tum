const tabEnglish = document.querySelector(".tab_area :first-child");
const tabJapanese = document.querySelector(".tab_area :last-child");

// 텍스트 인풋 선택자
const wordForm = document.querySelector(".input_area form");
const wordInput = document.querySelector(".word_input");
const descInput = document.querySelector(".desc_input");

// 단어 영역 선택자
const engWordArea = document.querySelector(".word_area__eng");
const jpnWordArea = document.querySelector(".word_area__jpn");

engWordList = [];
jpnWordList = [];

// 로컬 저장소 선택자
const savedEngWordList = localStorage.getItem("engWordList");
const savedJpnWordList = localStorage.getItem("jpnWordList");

//
// 아래는 탭 스위칭
//
function switchTab(event) {
  if (event.target === tabEnglish) {
    tabEnglish.classList.add("tab-button__clicked");
    tabJapanese.classList.remove("tab-button__clicked");
  } else {
    tabEnglish.classList.remove("tab-button__clicked");
    tabJapanese.classList.add("tab-button__clicked");
  }
  wordInput.value = "";
  descInput.value = "";
  switchContents();
}

function switchContents() {
  if (tabEnglish.classList.contains("tab-button__clicked")) {
    engWordArea.classList.remove("hidden");
    jpnWordArea.classList.add("hidden");
  } else {
    engWordArea.classList.add("hidden");
    jpnWordArea.classList.remove("hidden");
  }
}

//
// 아래는 새 단어 추가
//
function divideLocalObjectForGenFunction(item) {
  const wv = item.wordText;
  const dv = item.wordDesc;
  const lt = item.langType;
  const id = item.id;
  generateNewWordUnit(wv, dv, lt, id);

  if (lt === "eng") {
    engWordList.push(item);
  } else {
    jpnWordList.push(item);
  }
  saveLocal();
}

function validateSubmit(event) {
  event.preventDefault();
  const wordValue = wordInput.value;
  const descValue = descInput.value;
  //console.log(wordValue, descValue);
  if (wordValue.length === 0 || descValue.length === 0) {
    return;
  }

  const newWord = {
    wordText: wordValue,
    wordDesc: descValue,
    langType: null,
    id: Date.now(),
  };

  if (tabEnglish.classList.contains("tab-button__clicked")) {
    newWord.langType = "eng";
    engWordList.push(newWord);
  } else {
    newWord.langType = "jpn";
    jpnWordList.push(newWord);
  }
  const langType = newWord.langType;
  const id = newWord.id;
  saveLocal();

  generateNewWordUnit(wordValue, descValue, langType, id);
  wordInput.value = "";
  descInput.value = "";
}

function generateNewWordUnit(wv, dv, lt, id) {
  // 1. html구조를 생성한다.
  const newWordLayout = document.createElement("div");
  const newWordFirstRow = document.createElement("div");
  const newWordTitle = document.createElement("span");
  const newWordIconset = document.createElement("div");
  const newWordModify = document.createElement("span");
  const newWordDelete = document.createElement("span");
  const newWordDesc = document.createElement("span");

  // 2. class들을 단다.
  newWordLayout.classList.add("new_word_layout");
  newWordLayout.id = id;

  newWordFirstRow.classList.add("new_word_firstrow");
  newWordTitle.classList.add("new_word_title");
  newWordIconset.classList.add("new_word_iconset");

  newWordModify.classList.add("material-icons-outlined");
  newWordModify.classList.add("new_word_modify");
  newWordModify.innerText = "edit";

  newWordDelete.classList.add("material-icons-outlined");
  newWordDelete.classList.add("new_word_Delete");
  newWordDelete.innerText = "close";

  newWordDesc.classList.add("new_word_Desc");

  // 3. 조립한다.
  newWordLayout.appendChild(newWordFirstRow);
  newWordFirstRow.appendChild(newWordTitle);
  newWordFirstRow.appendChild(newWordIconset);
  newWordIconset.appendChild(newWordModify);
  newWordIconset.appendChild(newWordDelete);
  newWordLayout.appendChild(newWordDesc);

  // 4. value를 먹인다.
  newWordTitle.innerText = wv;
  newWordDesc.innerText = dv;

  // 5. 수정 & 삭제 선택자 선언
  newWordModify.addEventListener("click", modifyWord);
  newWordDelete.addEventListener("click", deleteWord);

  // 6. html에 추가한다. (일본어면 일본어에, 영어면 영어에)
  if (lt === "eng") {
    newWordLayout.classList.add("eng");
    engWordArea.prepend(newWordLayout);
  } else {
    newWordLayout.classList.add("jpn");
    jpnWordArea.prepend(newWordLayout);
  }
}

function deleteWord(event) {
  if (window.confirm("Do you want to Delete it?")) {
  } else {
    return;
  }
  const thatWordLayout = event.target.parentElement.parentElement.parentElement;

  if (thatWordLayout.classList.contains("eng")) {
    engWordList = engWordList.filter(
      (item) => item.id !== parseInt(thatWordLayout.id)
    );
  } else {
    jpnWordList = jpnWordList.filter(
      (item) => item.id !== parseInt(thatWordLayout.id)
    );
  }
  thatWordLayout.remove();
  saveLocal();

  //영어면 영어로, 일본어면 일본어 삭제 업데이트
  //id 대조해서 삭제하기
}
function modifyWord(event) {
  const thatIconset = event.target.parentElement;
  const thatDelBtn = event.target;
  const thatModBtn =
    event.target.parentElement.querySelector(".new_word_Delete");
  const thatWordLayout = event.target.parentElement.parentElement.parentElement;
  const thatWordText =
    event.target.parentElement.parentElement.parentElement.querySelector(
      ".new_word_title"
    );
  const thatWordDesc =
    event.target.parentElement.parentElement.parentElement.querySelector(
      ".new_word_Desc"
    );

  const newForm = document.createElement("form");
  const newWordText = document.createElement("input");
  const newWordDesc = document.createElement("input");

  const newDelBtn = document.createElement("span");
  newDelBtn.innerText = "Cancel";
  newDelBtn.addEventListener("click", cancelModify);
  const newModBtn = document.createElement("span");
  newModBtn.innerText = "Finish";
  newModBtn.addEventListener("click", finishModify);
  thatIconset.appendChild(newDelBtn);
  thatIconset.appendChild(newModBtn);

  //css용 클래스 선언..
  thatIconset.parentElement.classList.add("new_word_firstrow_modifying");
  thatWordLayout.classList.add("new_word_layout_modifying");

  newForm.classList.add("new_form");
  newWordText.classList.add("new_input");
  newWordDesc.classList.add("new_input");

  newWordText.value = thatWordText.innerText;
  newWordDesc.value = thatWordDesc.innerText;

  thatWordText.classList.add("hidden");
  thatWordDesc.classList.add("hidden");
  thatDelBtn.classList.add("hidden");
  thatModBtn.classList.add("hidden");

  newForm.appendChild(newWordText);
  newForm.appendChild(newWordDesc);
  thatWordLayout.appendChild(newForm);

  newForm.addEventListener("submit", finishModify);

  function cancelModify() {
    eraseLayout();
  }

  function finishModify(event) {
    event.preventDefault();
    console.log("submit-processing");
    let reNewText = newWordText.value;
    let reNewDesc = newWordDesc.value;

    thatWordText.innerText = reNewText;
    thatWordDesc.innerText = reNewDesc;

    if (thatWordLayout.classList.contains("eng")) {
      console.log("ward1");
      let sorted = engWordList.filter(
        (item) => item.id === parseInt(thatWordLayout.id)
      );
      console.log(sorted);
      sorted = sorted[0];
      console.log(sorted);
      sorted.wordText = reNewText;
      sorted.wordDesc = reNewDesc;
      engWordListIndex = engWordList.indexOf(sorted, 0);
      engWordList[engWordListIndex] = sorted;
    } else {
      console.log("ward2");
      let sorted = jpnWordList.filter(
        (item) => item.id === parseInt(thatWordLayout.id)
      );
      console.log(sorted);
      sorted = sorted[0];
      sorted.wordText = reNewText;
      sorted.wordDesc = reNewDesc;
      jpnWordListIndex = jpnWordList.indexOf(sorted, 0);
      jpnWordList[jpnWordListIndex] = sorted;
    }
    eraseLayout();
    saveLocal();
  }

  function eraseLayout() {
    thatWordText.classList.remove("hidden");
    thatWordDesc.classList.remove("hidden");
    thatDelBtn.classList.remove("hidden");
    thatModBtn.classList.remove("hidden");
    newWordText.remove();
    newWordDesc.remove();
    newForm.remove();
    newDelBtn.remove();
    newModBtn.remove();

    thatIconset.parentElement.classList.remove("new_word_firstrow_modifying");
    thatWordLayout.classList.remove("new_word_layout_modifying");
  }
}

function saveLocal() {
  localStorage.setItem("engWordList", JSON.stringify(engWordList));
  localStorage.setItem("jpnWordList", JSON.stringify(jpnWordList));
}

//탭 이벤트 리스너
tabEnglish.addEventListener("click", switchTab);
tabJapanese.addEventListener("click", switchTab);

// 이벤트 리스너
wordForm.addEventListener("submit", validateSubmit);

if (localStorage.getItem("engWordList") !== null) {
  const parsedEngWordlist = JSON.parse(savedEngWordList);
  parsedEngWordlist.forEach(divideLocalObjectForGenFunction);
}

if (localStorage.getItem("jpnWordList") !== null) {
  const parsedJpnWordlist = JSON.parse(savedJpnWordList);
  parsedJpnWordlist.forEach(divideLocalObjectForGenFunction);
}

const todoArea = document.querySelector("#todo");

const todoListArea = document.querySelector(".todos_area");
const tabAreaTimeText = document.querySelector(".tab_area__todo span");

const todoForm = document.querySelector(".input_box__word form");
const todoInput = document.querySelector(".todo_input");

let toDos = [];
let count = 0;

tabAreaTimeText.innerText = `To Doㅤ${dateNow.innerText}`;

function setNewTodo(event) {
  event.preventDefault();
  const newToDo = todoInput.value;
  todoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDo();
}

function paintToDo(newToDoObj) {
  // 새로운 할 일 리스트 구조 생성
  const newTodoDiv = document.createElement("div");
  newTodoDiv.id = newToDoObj.id;
  const newTodoDiv__firstRow = document.createElement("div");
  const newTodoDiv__order = document.createElement("span");
  const newTodoDiv__iconArea = document.createElement("div");
  const newTodoDiv__modify = document.createElement("span");
  const newTodoDiv__delete = document.createElement("span");
  const newTodoDiv__todoContents = document.createElement("span");
  const newTodoDiv__checkBoxArea = document.createElement("div");
  const newTodoDiv__checkBoxInput = document.createElement("input");
  const newTodoDiv__checkBoxSpan = document.createElement("span");

  // 조립!
  newTodoDiv.appendChild(newTodoDiv__firstRow);
  newTodoDiv__firstRow.appendChild(newTodoDiv__order);
  newTodoDiv__firstRow.appendChild(newTodoDiv__iconArea);
  newTodoDiv__iconArea.appendChild(newTodoDiv__modify);
  newTodoDiv__iconArea.appendChild(newTodoDiv__delete);
  newTodoDiv.appendChild(newTodoDiv__todoContents);
  newTodoDiv.appendChild(newTodoDiv__checkBoxArea);
  newTodoDiv__checkBoxArea.appendChild(newTodoDiv__checkBoxInput);
  newTodoDiv__checkBoxArea.appendChild(newTodoDiv__checkBoxSpan);

  // class 추가
  newTodoDiv.classList.add("new_todo_div");
  newTodoDiv__firstRow.classList.add("new_todo_div__first_row");
  newTodoDiv__order.classList.add("new_todo_div__order"); // 순서 넘버
  newTodoDiv__iconArea.classList.add("new_todo_div__icon_area"); // 아이콘 div

  newTodoDiv__modify.classList.add("material-icons-outlined"); // 수정 아이콘 설정
  newTodoDiv__modify.classList.add("new_todo_div__modify");
  newTodoDiv__modify.innerText = "edit";

  newTodoDiv__delete.classList.add("material-icons-outlined"); // 삭제 아이콘 설정
  newTodoDiv__delete.classList.add("new_todo_div__delete");
  newTodoDiv__delete.innerText = "close";

  newTodoDiv__todoContents.classList.add("new_todo_div__todo_contents"); // todo 내용물
  newTodoDiv__todoContents.innerText = newToDoObj.text;

  newTodoDiv__checkBoxArea.classList.add("new_todo_div__checkbox_area"); // 체크박스 컨테이너 설정
  newTodoDiv__checkBoxArea.querySelector("span").innerText = "To Do";

  newTodoDiv__checkBoxInput.classList.add("new_todo_div__checkbox_input"); // 체크 박스 설정
  newTodoDiv__checkBoxInput.setAttribute("type", "checkbox");
  newTodoDiv__checkBoxSpan.classList.add("new_todo_div__checkbox_span");
  newTodoDiv__checkBoxSpan.innerText = "To Do";

  //실제 html에 추가
  todoListArea.prepend(newTodoDiv);

  //넘버링 수정 setNumberingOnTodo()
  let sortedToNumber = toDos.filter(
    (item) => item.id === parseInt(newTodoDiv.id)
  );
  sortedToNumber = sortedToNumber[0];
  const order = toDos.indexOf(sortedToNumber, 0);
  newTodoDiv__order.innerText = `${order + 1}.`;

  function switchDone() {
    if (newTodoDiv__checkBoxSpan.innerText === "To Do") {
      newTodoDiv__checkBoxSpan.innerText = " Done";
    } else {
      newTodoDiv__checkBoxSpan.innerText = "To Do";
    }
    newTodoDiv__checkBoxInput.classList.toggle(
      "new_todo_div__checkbox_input__checked"
    );
    newTodoDiv__checkBoxSpan.classList.toggle(
      "new_todo_div__checkbox_span__checked"
    );
    newTodoDiv__checkBoxArea.classList.toggle(
      "new_todo_div__checkbox_area__checked"
    );
    newTodoDiv.classList.toggle("new_todo_div__checked");
  }

  newTodoDiv__checkBoxInput.addEventListener("click", switchDone);
  newTodoDiv__delete.addEventListener("click", deleteToDo);
  newTodoDiv__modify.addEventListener("click", modifyToDo);
}

function modifyToDo(event) {
  count = count + 1;
  if (count % 2 !== 0) {
    const targetDiv = event.target.parentElement.parentElement.parentElement;
    let targetText = targetDiv.querySelector(".new_todo_div__todo_contents");

    const newForm = document.createElement("form");
    const newText = document.createElement("input");
    //새로운 인풋이 나와서 수정되는 값을 수집
    newText.classList.add("new_input");
    newText.value = targetText.innerText;
    targetText.innerText = "";
    newForm.appendChild(newText);
    targetDiv.appendChild(newForm);

    newForm.addEventListener("submit", completeModifyToDo);

    function completeModifyToDo(event) {
      event.preventDefault();
      let reNewText = newText.value;
      newForm.remove();
      targetText.innerText = reNewText;
      let sorted = toDos.filter((item) => item.id === parseInt(targetDiv.id));

      sorted = sorted[0];
      sorted.text = newText.value;
      toDosIndex = toDos.indexOf(sorted, 0);
      toDos[toDosIndex] = sorted;
      saveToDo();

      count = count + 1;
    }
  } else {
    count = count + 1;
  }
}

function deleteToDo(event) {
  if (window.confirm("Do you want to Delete it?")) {
  } else {
    return;
  }
  const targetDiv = event.target.parentElement.parentElement.parentElement;
  toDos = toDos.filter((item) => item.id !== parseInt(targetDiv.id));
  targetDiv.remove();
  saveToDo();
}

function saveToDo() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem("todos");

todoForm.addEventListener("submit", setNewTodo);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach((item) => toDos.push(item));
  parsedToDos.forEach(paintToDo);
}

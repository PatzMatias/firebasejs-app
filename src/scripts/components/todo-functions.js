// Attach Events
addButton.addEventListener('click', function(event){
  var task = todoText.value;
  if (task.split(' ').join('').length === 0) {  alert('There\'s no text on the field. *Field Required'); return; }
  if(todoList.className==='empty')  { todoList.innerHTML = ''; todoList.className = '';}
  addTask(todoList);
})

clearAll.addEventListener('click',function(event){
  if(todoList.className === 'empty') { alert('There\'s nothing to clear. The list is empty'); return;}
  todoList.innerHTML = '';
  updateList();
  attachEmptyMessage();
})


function addTask(targettodoList) {
  var task = todoText.value;

  getList().then(function(snapshot) {
    var listData = snapshot.val();

    var dataLength = listData.length;

    // Change initial dummy Value
    if(dataLength === 1 && listData[0] === 'no-data') {
      addQuery(0, task);
    } else if (dataLength >= 1 && listData[0] !== 'no-data') { // If data has 1 or more data and index 0 isn't equal to 'no-data', add new data
      addQuery(dataLength, task);
    }
  });
  todoText.value='';

}

function removeListItem(item) {
  var parent = item.parentElement,
      listIndex = parent.getAttribute("data-key");
  removeListItemQuery(listIndex);
  updateList();
  attachEmptyMessage();
}


function updateList() {
  var items = [];
  if(todoList.childNodes.length != 0) {
    for(var i=0; i<todoList.childNodes.length; i++) {
      var itemText = todoList.childNodes[i].childNodes[0].textContent;
      if(itemText === "undefined") {
        console.log("undefined text")
      } else {
        items.push(itemText);
      }
    }
  }
  if(items.length === 0) items = ["no-data"];
  updateListQuery(items);
}

function attachEmptyMessage() {
  if(todoList.childNodes.length <= 0) {
      attachListUi('Your todo list is currently empty. Add tasks with the form above.', 0, false);
  }
}

function loadList() {
  listsRefObject.on('value', function(snapshot){
    var list = snapshot.val();

    if( list === null ) { todoList.innerHTML = ''; updateList(); return}
    if(list.length === 1 && list[0] === "no-data"){return;}
    if(list.length >= 1 && list[0] !== "no-data") {
      todoList.innerHTML = ''; todoList.className = '';
      list.forEach(function(item, index){
          attachListUi(item, index, true);
      });
    }
  });
}

function attachListUi(textNode, index, state) {
  var li = document.createElement('li'),
      p = document.createElement('p'),
      listText = document.createTextNode(textNode),
      removeButton = document.createElement('button');

    if(state) {
      p.appendChild(listText);
      li.setAttribute('data-key', index);
      li.appendChild(p);
      li.appendChild(removeButton);
      removeButton.className = 'removeMe btn btn-green';
      removeButton.innerHTML = 'DONE';
      removeButton.setAttribute('onclick', 'removeListItem(this);');
      todoList.appendChild(li);
    } else {
      p.appendChild(listText);
      li.appendChild(p);
      todoList.appendChild(li);
      todoList.className = 'empty';
    }
}
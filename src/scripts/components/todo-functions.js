var ul = document.getElementById('theTodoList'),
    todoText = document.getElementById('todoText'),
    clearAll = document.getElementById('clearAll'),
    add = document.getElementById('addToList');



add.onclick = () => {
  var task = todoText.value;
  if (task.split(' ').join('').length === 0) {  alert('There\'s no text on the field. *Field Required'); return; }
  if(ul.className==='empty')  { ul.innerHTML = ''; ul.className = '';}
  addLi(ul);
};

function addLi(targetUl) {
  var task = todoText.value;

  addToList().then(function(snapshot) {
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
  if(ul.childNodes.length != 0) {
    for(var i=0; i<ul.childNodes.length; i++) {
      var itemText = ul.childNodes[i].childNodes[0].textContent;
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
  if(ul.childNodes.length <= 0) {
    var li = document.createElement('li'),
        p = document.createElement('p'),
        textNode = document.createTextNode('Your todo list is currently empty. Add tasks with the form above.');
        p.appendChild(textNode);
        li.appendChild(p);
        ul.appendChild(li);
        ul.className = 'empty';
  }
}

function loadList() {
  listsRefObject.on('value', function(snapshot){
    var list = snapshot.val();

    if(list.length === 1 && list[0] === "no-data"){return;}
    if(list.length >= 1 && list[0] !== "no-data") {
      ul.innerHTML = ''; ul.className = '';
      list.forEach(function(item, index){
        var li = document.createElement('li'),
            p = document.createElement('p'),
            listText = document.createTextNode(item),
            removeButton = document.createElement('button');

            p.appendChild(listText);
            li.setAttribute('data-key', index);
            li.appendChild(p);
            li.appendChild(removeButton);
            removeButton.className = 'removeMe btn btn-green';
            removeButton.innerHTML = 'DONE';
            removeButton.setAttribute('onclick', 'removeListItem(this);');

            ul.appendChild(li);
      });
    }
  });
}

clearAll.onclick = function() {
  if(ul.className === 'empty') { alert('There\'s nothing to clear. The list is empty'); return;}
  ul.innerHTML = '';
  updateList();
  attachEmptyMessage();
};

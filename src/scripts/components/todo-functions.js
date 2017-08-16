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
  var task = todoText.value,
      li = document.createElement('li'),
      textNode = document.createTextNode(task),
      p = document.createElement('p'),
      removeButton = document.createElement('button');

  todoText.value = '';

  removeButton.className = 'removeMe btn btn-green';
  removeButton.innerHTML = 'DONE';
  removeButton.setAttribute('onclick', 'removeMe(this);');

  p.appendChild(textNode);
  li.appendChild(p);
  li.appendChild(removeButton);

  targetUl.appendChild(li);
}


function removeMe(item) {
  var parent = item.parentElement;
  parent.parentElement.removeChild(parent);
  attachEmptyMessage();
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

clearAll.onclick = function() {
  if(ul.className === 'empty') { alert('There\'s nothing to clear. The list is empty'); return;}
  ul.innerHTML = '';
  attachEmptyMessage();
};

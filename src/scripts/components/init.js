 
firebase.initializeApp(config);

// Firebase objects
var auth = firebase.auth(),
	provider = new firebase.auth.GoogleAuthProvider(), 
	database = firebase.database(), 
	listsRefObject, 
	currentUser;

// DOM objects
var todoList = document.getElementById('theTodoList'),
    todoText = document.getElementById('todoText'),
    clearAll = document.getElementById('clearAll'),
    addButton = document.getElementById('addToList');

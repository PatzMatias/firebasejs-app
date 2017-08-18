
firebase.initializeApp(config);

// Firebase objects
var auth = firebase.auth(),
	provider = new firebase.auth.GoogleAuthProvider(), 
	database = firebase.database(), 
	listsRefObject, 
	currentUser;


	provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
	provider.setCustomParameters({
	  'login_hint': 'user@example.com'
	});

// DOM objects


var login = document.getElementById('login');
var signInButton = document.getElementById('signIn');
var signOutButton = document.getElementById('signOut');
var displayUser = document.getElementById("displayUser");

var app = document.getElementById('app');

var todoList = document.getElementById('theTodoList'),
    todoText = document.getElementById('todoText'),
    clearAll = document.getElementById('clearAll'),
    addButton = document.getElementById('addToList');

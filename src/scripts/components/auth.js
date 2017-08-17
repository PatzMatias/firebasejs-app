var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
var currentUser;
var login = document.getElementById('login');
var signInButton = document.getElementById('signIn');
var signOutButton = document.getElementById('signOut');
var app = document.getElementById('app');


provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

// SIGN-IN USER
function initiateSignIn(event) {
	var _this = this;
	auth.signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
    currentUser = auth.currentUser;
    processForRegistration();

	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	  console.log(errorCode);
	  console.log(errorMessage);
	});
}

// SIGN-OUT USER
function signOutUser(event) {
	auth.signOut().then(function() {
    signInStateChanged();
	}).catch(function(error) {
	  // An error happened.
	});
}

// BIND SIGN-IN/SIGN-OUT EVENTS
signInButton.addEventListener('click', initiateSignIn);
signOutButton.addEventListener('click', signOutUser);


// MONITOR AUTHSTATE
auth.onAuthStateChanged(user => {
  currentUser = firebase.auth().currentUser;
  listsRefObject = firebase.database().ref('lists').child(currentUser.uid)
  if(user) {
    login.setAttribute('style','display: none');
    app.className += ' logged-in';
    window.location.hash = '/list';
    loadList();
    setName();
	} else {
    login.setAttribute('style','display: flex');
    app.className = app.className.replace(' logged-in', '');
  }
});

function processForRegistration() {
  var user = firebase.auth().currentUser;
  initiateRegistration(user);
}

function setName() {
  var displayUser = document.getElementById("displayUser");
  var user = firebase.auth().currentUser;
  var template = "<li><a href=\"#\"><img src=\"{{ user.photo }}\" />Hello, {{ user.displayName }}!</a></li>";
  template = template.replace("{{ user.photo }}", user.photoURL).replace("{{ user.displayName }}", user.displayName);
  displayUser.insertAdjacentHTML('beforeend',template);
}

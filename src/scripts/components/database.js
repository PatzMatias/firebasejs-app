
function registerUser(userId, name, email, imageUrl, listName) {
  firebase.database().ref('/users/').child(userId).set({
    name: name,
    email: email,
    photo : imageUrl,
    list : listName
  });
  checkIfListCreated(userId);
}

// initiate Registration Process
function initiateRegistration(user) {
  var userId = user.uid;
  var name = user.displayName;
  var photo = user.photoURL;
  var email = user.email;
  console.log(user);
  getUser(userId).then(function(snapshot) {
    var user = snapshot.val();
    var isUserRegistered = ( user !== null ) ? true : false;

    // Stop registration if user is already registered.
    if(isUserRegistered) return;

    registerUser(userId, name, email, photo, userId);


  });
}

function getUser(userId) {
  return firebase.database().ref('/users/' + userId).once('value');
}

function createList(userId) {
  firebase.database().ref('/lists/').child(userId).child('items').set(["no-data"]);
}

function checkIfListCreated(userId){
  firebase.database().ref('/lists/'+userId).child('items').once('value').then(function(snapshot){
    var list = snapshot.val();
    if(list === null) {
      createList(userId);
    }
  })
}

function addToList(textValue) {
  return firebase.database().ref('/lists/' + currentUser.uid).child('items').once('value');
}

function addQuery(index, value) {
  firebase.database().ref('/lists/'+currentUser.uid+'/items/').child(index).set(value);
}

function getList() {
  return firebase.database().ref('/lists/' + currentUser.uid).child('items').once('value');
}

function removeListItemQuery(index) {
  firebase.database().ref('/lists/' + currentUser.uid+"/items").child(index).remove();
}

function updateListQuery(items) {
  firebase.database().ref('/lists/' + currentUser.uid).child('items').set(items);
}

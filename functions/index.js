const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.sanitizePost = functions.database
	.ref('/lists/{pushId}/items/')
	.onWrite(event => {
		const list = event.data.val()
		console.log(list)
		// if(post.sanitized) {return}
		// console.log("Sanitizing new list" + event.params.pushId)
		// console.log(post)
		// list.sanitized = true
		// list.title = sanitize(list.title)
		// list.body = sanitize(list.body)
		// return event.data.ref.set(list)
	})

	function sanitize(s) {
		var sanitizedText = s
		sanitizedText = sanitizedText.replace(/\bstupid\b/ig, "wonderful")
		return sanitizedText
	}
import Firebase from 'firebase'

let config = {
    apiKey: "a0ISjRwyJFyTT8WfZWI3ooDWlU4FldaizBx3RFRn",
    authDomain: "vuecms-63087.firebaseapp.com",
    databaseURL: "https://vuecms-63087.firebaseio.com",
    projectId: "vuecms-63087",
    storageBucket: "vuecms-63087.appspot.com",
    messagingSenderId: "720603301863"
}

let app = Firebase.initializeApp(config);
let db = app.database();

export default db;
import { firebase } from "@firebase/app"
import "@firebase/firestore"

const firebaseApp = firebase.initializeApp({
    apiKey: "a0ISjRwyJFyTT8WfZWI3ooDWlU4FldaizBx3RFRn",
    authDomain: "vuecms-63087.firebaseapp.com",
    databaseURL: "https://vuecms-63087.firebaseio.com",
    projectId: "vuecms-63087",
    storageBucket: "vuecms-63087.appspot.com",
    messagingSenderId: "720603301863"
})

const db = firebaseApp.firestore()

const pagesRef = db.collection("pages")
const menusRef = db.collection("menus")
const blocksRef = db.collection("blocks")

export { pagesRef, menusRef, blocksRef, db }
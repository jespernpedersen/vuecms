import { firebase } from "@firebase/app"
import "@firebase/firestore"
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "w7gOcBhRsWT2WQ2uM2wq9vgrvtS0nHTV68kMOmNM",
    authDomain: "test-case-4bc3e.firebaseapp.com",
    databaseURL: "https://test-case-4bc3e.firebaseio.com",
    projectId: "test-case-4bc3e",
    storageBucket: "test-case-4bc3e.appspot.com",
    messagingSenderId: "868000158634"
})

const db = firebaseApp.firestore()

const pagesRef = db.collection("pages")
const menusRef = db.collection("menus")
const blocksRef = db.collection("blocks")
const storageRef = firebase.storage();

export { pagesRef, menusRef, blocksRef, db, storageRef }
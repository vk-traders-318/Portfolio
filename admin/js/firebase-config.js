/* ================================
FIREBASE CONFIG
================================ */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtMDQO7biYOSkgm_dkdpwsLea2HGNnTRg",
  authDomain: "private-chat-app-ebc27.firebaseapp.com",
  projectId: "private-chat-app-ebc27",
  storageBucket: "private-chat-app-ebc27.firebasestorage.app",
  messagingSenderId: "574641324024",
  appId: "1:574641324024:web:ce337beb259f220fe0600d",
  measurementId: "G-171WXSEWQG"
};



/* ================================
INITIALIZE FIREBASE
================================ */

firebase.initializeApp(firebaseConfig);


/* ================================
SERVICES
================================ */

const db = firebase.firestore();

const auth = firebase.auth();


/* ================================
COLLECTION REFERENCES
================================ */

const profileRef = db.collection("profile");

const projectsRef = db.collection("projects");

const blogsRef = db.collection("blogs");

const messagesRef = db.collection("messages");
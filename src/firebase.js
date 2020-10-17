import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCujl1yv46zuMebHe46M2JIowMcUrEBDuI",
    authDomain: "dmapp-668a2.firebaseapp.com",
    databaseURL: "https://dmapp-668a2.firebaseio.com",
    projectId: "dmapp-668a2",
    storageBucket: "dmapp-668a2.appspot.com",
    messagingSenderId: "1036871886587",
    appId: "1:1036871886587:web:c16824383d1c686c4af25e"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;
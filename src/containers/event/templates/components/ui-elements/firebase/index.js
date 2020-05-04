import firebase from "firebase";
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyB2uQPFagtZLU_R_0r3K0sO9bTi3TQnyfs",
    authDomain: "video-cfff0.firebaseapp.com",
    databaseURL: "https://video-cfff0.firebaseio.com",
    projectId: "video-cfff0",
    storageBucket: "video-cfff0.appspot.com",
    messagingSenderId: "817174580699",
    appId: "1:817174580699:web:b0a934aa2a5f3601b22bfe",
    measurementId: "G-DMGY070GZE"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}

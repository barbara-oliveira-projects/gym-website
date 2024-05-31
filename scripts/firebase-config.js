// firebase-config.js

// Configurações do Firebase
var firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "gym-website-3617b.firebaseapp.com",
    projectId: "gym-website-3617b",
    storageBucket: "gym-website-3617b.appspot.com",
    messagingSenderId: "72435253446",
    appId: "1:72435253446:web:f45cb051a81af30ff157c7",
    measurementId: "G-HHYPMV0KLD"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

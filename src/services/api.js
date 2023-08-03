import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzYT2a_AMipO93OxmTlEnsbxhty1EkfyQ",
  authDomain: "commerce-be041.firebaseapp.com",
  projectId: "commerce-be041",
  storageBucket: "commerce-be041.appspot.com",
  messagingSenderId: "610137179794",
  appId: "1:610137179794:web:e63489b802f24dac28c84b",
  measurementId: "G-GVGYXX7595"
};

firebase.initializeApp(firebaseConfig);

export const api = firebase.firestore();

export const fetchData = async () => {
  const result = [] 
  try {
    await api.collection("estoque").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
    });
    
  } catch (error) {
    console.log(error);
  }

  return result;
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs51p3kodUEGEnr8dfFSdiFcTKSDWtpdw",
  authDomain: "jixeral-guestbook.firebaseapp.com",
  projectId: "jixeral-guestbook",
  storageBucket: "jixeral-guestbook.firebasestorage.app",
  messagingSenderId: "262603090467",
  appId: "1:262603090467:web:8828bb6aa221fe1d879f96",
  measurementId: "G-BVMC9H2WKS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

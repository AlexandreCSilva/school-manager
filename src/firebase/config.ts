import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyCNgabBr274TotiRwjtfAEirTheVIjjLlc",

  authDomain: "school-manager-ff136.firebaseapp.com",

  projectId: "school-manager-ff136",

  storageBucket: "school-manager-ff136.appspot.com",

  messagingSenderId: "525760468959",

  appId: "1:525760468959:web:31497f8e055c8faa88566a",

  measurementId: "G-ZKT2PNM233"

};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

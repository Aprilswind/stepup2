import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC0xauXaG1qkQy9U3jvRQzRtxrKVC99pkA",
  authDomain: "laptopapp-b32d9.firebaseapp.com",
  projectId: "laptopapp-b32d9",
  storageBucket: "laptopapp-b32d9.appspot.com",
  messagingSenderId: "715518686396",
  appId: "1:715518686396:web:d473a84d7971a762810cb9",
  measurementId: "G-C9XFY3XJJV"
};

const app = initializeApp(firebaseConfig);
let storage = getStorage(app)
export { storage }

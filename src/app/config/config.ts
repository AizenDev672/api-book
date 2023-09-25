import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore  } from "firebase-admin/firestore";
const firebaseConfig = require("./sttings.json");


const app = initializeApp({
    credential: cert(firebaseConfig)
});
export const db = getFirestore(app);
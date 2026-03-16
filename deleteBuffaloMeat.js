import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuT82tMpY4yrlLBn5XD4EMjobGbjiFp34",
    authDomain: "dhuruvan-exports.firebaseapp.com",
    projectId: "dhuruvan-exports",
    storageBucket: "dhuruvan-exports.firebasestorage.app",
    messagingSenderId: "118904789493",
    appId: "1:118904789493:web:577461a8362bdbaa1de8bc",
    measurementId: "G-40YFNMCGHZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const deleteBuffaloMeat = async () => {
    try {
        console.log("Searching for Buffalo Meat product...");
        const q = query(collection(db, "products"), where("categorySlug", "==", "livestock"));
        const snapshot = await getDocs(q);

        let deleted = 0;
        for (const document of snapshot.docs) {
            const data = document.data();
            const title = (data.title || "").toLowerCase();
            // Match the generic "Buffalo Meat" (not tongue, tail, tripe, etc.)
            if (title === "buffalo meat") {
                console.log(`Deleting: "${data.title}" (ID: ${document.id})`);
                await deleteDoc(doc(db, "products", document.id));
                deleted++;
            }
        }

        if (deleted === 0) {
            console.log("No matching 'Buffalo Meat' product found in Firestore (may be static-only).");
        } else {
            console.log(`Deleted ${deleted} product(s) from Firestore.`);
        }
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
};

deleteBuffaloMeat();

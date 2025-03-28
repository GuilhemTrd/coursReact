import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from './lib/firebase.ts';

export const getTopCats = async () => {
    const catRef = collection(db, "cats");
    const catQuery = query(catRef, orderBy("score", "desc"));
    const snapshot = await getDocs(catQuery);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

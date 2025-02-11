import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, updateDoc, increment } from "firebase/firestore";

interface Cat {
    id: string;
    imageUrl: string;
    name: string;
}

const Duel = () => {
    const [cats, setCats] = useState<Cat[]>([]);

    useEffect(() => {
        const fetchCats = async () => {
            const snapshot = await getDocs(collection(db, "cats"));
            const catList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Cat[];
            setCats(catList.sort(() => Math.random() - 0.5).slice(0, 2));
        };

        fetchCats();
    }, []);

    const handleVote = async (winnerId: string, loserId: string) => {
        await voteForCat(winnerId, loserId);
        window.location.reload(); // Recharge deux nouveaux chats
    };

    return (
        <div className="flex justify-center">
            {cats.map((cat, index) => (
                <div key={cat.id}>
                    <img className="cat-img" src={cat.imageUrl} alt={cat.name} />
                    <button
                        className="mt-2 bg-blue-500 text-white p-2 rounded"
                        onClick={() => handleVote(cat.id, cats[1 - index].id)}
                    >
                        Voter pour {cat.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

const voteForCat = async (winnerId: string, loserId: string) => {
    const winnerRef = doc(db, "cats", winnerId);
    const loserRef = doc(db, "cats", loserId);

    await updateDoc(winnerRef, { score: increment(10) });
    await updateDoc(loserRef, { score: increment(-5) });
};

export default Duel;

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase.ts";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import "./Duel.css";

interface Cat {
    id: string;
    imageUrl: string;
    name: string;
}

const Duel = () => {
    const [cats, setCats] = useState<Cat[]>([]);

    const fetchCats = async () => {
        const snapshot = await getDocs(collection(db, "cats"));
        const catList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Cat[];
        setCats(catList.sort(() => Math.random() - 0.5).slice(0, 2));
    };

    useEffect(() => {
        fetchCats();
    }, []);

    const handleVote = async (winnerId: string, loserId: string) => {
        await voteForCat(winnerId, loserId);
        await fetchCats(); // recharge deux nouveaux chats SANS recharger la page
    };

    const voteForCat = async (winnerId: string, loserId: string) => {
        const winnerRef = doc(db, "cats", winnerId);
        const loserRef = doc(db, "cats", loserId);

        await updateDoc(winnerRef, { score: increment(10) });
        await updateDoc(loserRef, { score: increment(-5) });
    };

    return (
        <div className="duel-container">
            <h1 className="text-center">🔥 Duel de chats 🔥</h1>
            <h3 className="text-center">Choisissez votre chat préféré !</h3>
            <div className="duel-cards">
                {cats.map((cat, index) => (
                    <div
                        key={cat.id}
                        className="cat-card"
                        onClick={() => handleVote(cat.id, cats[1 - index].id)}
                    >
                        <img className="cat-img cursor-pointer" src={cat.imageUrl} alt={cat.name} />
                        <p className="cat-name">{cat.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Duel;

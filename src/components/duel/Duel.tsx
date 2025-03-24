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
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [disabled, setDisabled] = useState(false);

    const fetchCats = async () => {
        const snapshot = await getDocs(collection(db, "cats"));
        const catList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Cat[];
        setCats(catList.sort(() => Math.random() - 0.5).slice(0, 2));
        setSelectedId(null);
        setDisabled(false);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    const handleVote = async (winnerId: string, loserId: string) => {
        if (disabled) return;

        setSelectedId(winnerId);
        setDisabled(true);

        await voteForCat(winnerId, loserId);

        // attendre que l’animation se termine avant de recharger
        setTimeout(() => {
            fetchCats();
        }, 1000);
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
                {cats.map((cat, index) => {
                    const isWinner = cat.id === selectedId;
                    const isLoser = selectedId && cat.id !== selectedId;

                    return (
                        <div
                            key={cat.id}
                            className={`cat-card ${isWinner ? "winner" : ""} ${isLoser ? "loser" : ""}`}
                            onClick={() => handleVote(cat.id, cats[1 - index].id)}
                        >
                            <img className="cat-img" src={cat.imageUrl} alt={cat.name} />
                            <p className="cat-name">{cat.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Duel;

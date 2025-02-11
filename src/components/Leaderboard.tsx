import { useEffect, useState } from 'react';
import { db } from '../lib/firebase.ts';
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Leaderboard() {

    interface Cat {
        id: string;
        name?: string;
        imageUrl: string;
        score: number;
    }

    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCats = async () => {
            try {
                const catRef = collection(db, "cats");
                const catQuery = query(catRef, orderBy("score", "desc"));
                const snapshot = await getDocs(catQuery);

                const catList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Cat[];
                setCats(catList);
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            } finally {
                console.log(cats)
                setLoading(false);
            }
        };

        fetchCats();
    }, [])

    if (loading) return <p className="text-center text-xl">Chargement...</p>;


    return (
        <div className="app-container">
            <h1>🏆 Classement des meilleurs chats</h1>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Nom</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {cats.map((cat, index) => (
                    <tr key={cat.id} className="text-center">
                        <td className="border p-3 font-bold">{index + 1}</td>
                        <td className="border p-3">
                            <img src={cat.imageUrl} alt="Chat" className="cat-img" />
                        </td>
                        <td className="border p-3">{cat.name || "Chat Mystère"}</td>
                        <td className="border p-3 text-lg font-semibold">{cat.score} pts</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;
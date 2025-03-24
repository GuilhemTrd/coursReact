import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase.ts';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import './Leaderboard.css';

function Leaderboard() {
    interface Cat {
        id: string;
        name?: string;
        imageUrl: string;
        score: number;
    }

    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                setLoading(false);
            }
        };

        fetchCats();
    }, []);

    if (loading) return <p className="text-center text-xl">Chargement...</p>;

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">🏆 Classement des meilleurs chats</h1>

            <div className="top-3">
                {cats.slice(0, 3).map((cat, index) => (
                    <div key={cat.id} className={`podium-card place-${index + 1}`}>
                        <span className="medal">{['🥇', '🥈', '🥉'][index]}</span>
                        <img
                            src={cat.imageUrl}
                            alt={cat.name}
                            className="podium-img clickable"
                            onClick={() => setSelectedImage(cat.imageUrl)}
                        />
                        <p className="cat-name">{cat.name || "Chat Mystère"}</p>
                        <p className="cat-score">{cat.score} pts</p>
                    </div>
                ))}
            </div>

            <table className="leaderboard-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Nom</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {cats.slice(3).map((cat, index) => (
                    <tr key={cat.id}>
                        <td>{index + 4}</td>
                        <td>
                            <img
                                src={cat.imageUrl}
                                alt={cat.name}
                                className="table-img clickable"
                                onClick={() => setSelectedImage(cat.imageUrl)}
                            />
                        </td>
                        <td>{cat.name || "Chat Mystère"}</td>
                        <td>{cat.score} pts</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedImage && (
                <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={() => setSelectedImage(null)}>✖</span>
                        <img src={selectedImage} alt="Chat en grand" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;

import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

const UploadForm = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        setUploading(true);
        try {

            // Ajout des infos dans Firestore
            await addDoc(collection(db, "cats"), {
                name: name || "Inconnu",
                imageUrl,
                score: 1000, // Score initial
                timestamp: Date.now(),
            });

            alert("Photo envoyée avec succès !");
        } catch (error) {
            console.error("Erreur d'upload :", error);
            alert("Erreur lors de l'upload !");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="app-container">
            {/*Ajouter un champs d'input "name"*/}
            <label className="block mb-2">Nom du chat</label>
            <input
                type="text"
                className="border p-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="block mb-2">URL de la photo du chat</label>
            <input
                type="text"
                className="border p-2 w-full"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <button
                className="bg-blue-500 text-white p-2 mt-2 rounded disabled:bg-gray-400"
                onClick={handleUpload}
                disabled={!imageUrl || uploading}
            >
                {uploading ? "Envoi en cours..." : "Uploader"}
            </button>
        </div>
    );
};

export default UploadForm;

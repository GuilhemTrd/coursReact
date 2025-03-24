import { useState } from "react";
import { db } from "../../lib/firebase.ts";
import { addDoc, collection } from "firebase/firestore";
import "./Uploadform.css";

const UploadForm = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpload = async () => {
        if (!imageUrl) return;

        setUploading(true);
        setSuccess(false);

        try {
            await addDoc(collection(db, "cats"), {
                name: name || "Inconnu",
                imageUrl,
                score: 1000,
                timestamp: Date.now(),
            });

            setSuccess(true);
            setImageUrl("");
            setName("");
        } catch (error) {
            console.error("Erreur d'upload :", error);
            alert("Erreur lors de l'upload !");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2 className="upload-title">🚀 Ajouter un nouveau chat</h2>

            <label className="upload-label">Nom du chat</label>
            <input
                type="text"
                className="upload-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Gribouille"
            />

            <label className="upload-label">URL de la photo</label>
            <input
                type="text"
                className="upload-input"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
            />

            {imageUrl && (
                <div className="preview">
                    <img src={imageUrl} alt="Prévisualisation" className="preview-img" />
                </div>
            )}

            <button
                className="upload-button"
                onClick={handleUpload}
                disabled={!imageUrl || uploading}
            >
                {uploading ? "Envoi en cours..." : "Uploader"}
            </button>

            {success && <p className="upload-success">🎉 Chat ajouté avec succès !</p>}
        </div>
    );
};

export default UploadForm;

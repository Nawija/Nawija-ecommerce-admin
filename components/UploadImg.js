import { useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function UploadImages() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImg = async () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

        try {
            await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
        } catch (error) {
            console.error("Błąd podczas przesyłania zdjęcia: ", error);
        }
    };

    return (
        <>
            {imageUrl ? (
                <div className="mb-12">
                    <img
                        src={imageUrl}
                        className="h-52"
                        alt="Ostatnio dodane zdjęcie"
                    />
                </div>
            ) : (
                <>
                    <div className="mb-4 h-52 w-full bg-white border-dashed border-2 rounded-lg border-gray-800 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 flex items-center justify-center flex-col">
                            <input
                                onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                }}
                                type="file"
                                className=""
                            />
                        </div>
                    </div>
                    <button onClick={uploadImg} className="btn-delete mb-12">
                        Zapisz zdjęcie
                    </button>
                </>
            )}
        </>
    );
}

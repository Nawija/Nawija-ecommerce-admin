import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UploadImages from "./UploadImg";

export default function ProductForm({
    _id,
    title: existingTitle,
    desc: existingDesc,
    price: existingPrice,
}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [desc, setDesc] = useState(existingDesc || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProduct, setGoToProduct] = useState(false);
    const router = useRouter();

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, desc, price };
        if (_id) {
            //update
            await axios.put("/api/produkty", { ...data, _id });
        } else {
            //create
            await axios.post("/api/produkty", data);
        }
        setGoToProduct(true);
    }
    if (goToProduct) {
        router.push("/produkty");
    }

    function prevPage() {
        router.push("/produkty");
    }
    return (
        <>
            <button onClick={prevPage} className="mb-4 text-sm text-blue-500">
                Powrót
            </button>
            <h2 className="text-h2">Zdjęcie</h2>
            <UploadImages />
            <form onSubmit={saveProduct}>
                <label>
                    <h2 className="text-h2">Nagłówek</h2>
                    <input
                        type="text"
                        placeholder="Nazwa produktu"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    />
                </label>

                <label>
                    <h2 className="text-h2">Szczegółowy Opis</h2>
                    <textarea
                        placeholder="Opis"
                        value={desc}
                        onChange={(ev) => setDesc(ev.target.value)}
                    />
                </label>
                <label>
                    <h2 className="text-h2">Cena w PLN</h2>
                    <input
                        type="number"
                        placeholder="Cena"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                    />
                </label>
            </form>
            <div className="mt-4">
                <button onClick={saveProduct} className="btn-main">
                    Zapisz
                </button>
            </div>
        </>
    );
}

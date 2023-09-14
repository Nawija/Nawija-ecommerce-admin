import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
    const [cleanForm, setCleanForm] = useState(false);

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

    function clearInputs() {
        setTitle("");
        setDesc("");
        setPrice("");
    }
    function handleCleanForm() {
        setCleanForm(!cleanForm);
    }
    return (
        <>
            <form onSubmit={saveProduct}>
                <input
                    type="text"
                    placeholder="Nazwa produktu"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />
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
                <button className="btn-delete mr-4" onClick={handleCleanForm}>
                    Usuń Wszystko
                </button>
                <button onClick={saveProduct} className="btn-main">
                    Zapisz
                </button>
                {cleanForm ? (
                    <div className="absolute top-0 left-0 h-full w-full bg-red-500/90 flex-c anim-opacity overflow-hidden">
                        <div className="p-10 bg-gray-100 text-center shadow-2xl anim-scale">
                            <p className="text-h2 pb-6">
                                Jesteś pewny ze chcesz wyczyścic formularz?
                            </p>
                            <button
                                className="btn-delete mr-4"
                                onClick={clearInputs && handleCleanForm}
                            >
                                Usuń
                            </button>
                            <button
                                onClick={handleCleanForm}
                                className="btn-main "
                            >
                                Nie usuwaj!
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

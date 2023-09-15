import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { AiOutlineCloudUpload } from "react-icons/ai";

export default function ProductForm({
    _id,
    title: existingTitle,
    desc: existingDesc,
    price: existingPrice,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [desc, setDesc] = useState(existingDesc || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProduct, setGoToProduct] = useState(false);
    const router = useRouter();

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, desc, price, images };
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

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            console.log(res);
        }
    }
    return (
        <>
            <form onSubmit={saveProduct}>
                <label>
                    <h2 className="text-h2">Zdjęcie</h2>
                    <div className="mb-4 h-52 w-full bg-white border-dashed border-2 rounded-lg border-gray-800 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 flex items-center justify-center flex-col">
                            <p className="btn-main flex-c">
                                <AiOutlineCloudUpload className="mr-1 text-xl" />
                                Wybierz plik
                            </p>
                            <input
                                value={images}
                                onChange={uploadImages}
                                type="file"
                                className="hidden"
                            />
                        </div>
                    </div>
                </label>
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

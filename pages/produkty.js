import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LiaEdit } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";

export default function Produkty() {
    const [imageLoaded, setImageLoaded] = useState(false);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("/api/produkty").then((response) => {
            setProducts(response.data);
            setImageLoaded(true);
        });
    }, []);
    return (
        <Layout>
            {!imageLoaded && <Spinner />}

            <div className="anim-opacity">
                <Link className="btn-main" href="/produkty/dodaj-produkt">
                    Dodaj Produkt
                </Link>
            </div>
            <table className="basic mt-6 anim-opacity">
                <thead>
                    <tr>
                        <td>Nazwa Produktu</td>
                        <td>Cena</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>
                            <td>{product.title}</td>
                            <td>
                                {product.price} <small>zł</small>
                            </td>
                            <td className="space-x-3 flex-ec">
                                <Link
                                    href={`/produkty/usun/` + product._id}
                                    className="text-[15px] text-red-500 flex-c"
                                >
                                    <RiDeleteBinLine className="mr-1.5" />
                                    Usuń
                                </Link>
                                <Link
                                    href={`/produkty/edytuj/` + product._id}
                                    className="text-[15px] flex-c"
                                >
                                    <LiaEdit className="mr-1.5" />
                                    Edytuj
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

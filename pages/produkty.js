import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Produkty() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("/api/produkty").then((response) => {
            setProducts(response.data);
        });
    }, []);
    return (
        <Layout>
            <Link className="btn-main" href="/produkty/dodaj-produkt">
                Dodaj Produkt
            </Link>
            <table className="basic mt-6">
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
                            <td className="text-end space-x-3">
                                <Link
                                    href={`/produkty/usun/` + product._id}
                                    className="text-[15px] text-red-500"
                                >
                                    Usuń
                                </Link>
                                <Link
                                    href={`/produkty/edytuj/` + product._id}
                                    className="text-[15px]"
                                >
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

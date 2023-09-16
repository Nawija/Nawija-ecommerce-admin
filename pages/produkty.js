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
                        <td>PLN</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.title}</td>
                                <td>
                                    {product.price}
                                    <span className="text-gray-500 font-normal ml-1 -tracking-widest">
                                        ,-
                                    </span>
                                </td>
                                <td className="lg:space-x-3 lg:flex lg:items-center lg:justify-end">
                                    <Link
                                        href={`/produkty/usun/` + product._id}
                                        className="text-[15px] text-red-500 flex-c mb-2 lg:mb-0 hover:bg-slate-100 transition-colors"
                                    >
                                        <RiDeleteBinLine className="md:mr-1.5 mr-0 text-2xl lg:text-base" />
                                        <span className="hidden md:flex items-center">
                                            Usuń
                                        </span>
                                    </Link>
                                    <Link
                                        href={`/produkty/edytuj/` + product._id}
                                        className="text-[15px] flex-c hover:bg-slate-100 transition-colors"
                                    >
                                        <LiaEdit className="md:mr-1.5 mr-0 text-2xl lg:text-base" />
                                        <span className="hidden md:flex items-center">
                                            Edytuj
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

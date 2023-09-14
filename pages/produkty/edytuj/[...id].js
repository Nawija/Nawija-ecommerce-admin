import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/api/produkty?id=" + id).then((response) => {
            setProductInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h1 className="text-h1">Edytuj Produkt</h1>
            {productInfo && <ProductForm {...productInfo} />}
        </Layout>
    );
}

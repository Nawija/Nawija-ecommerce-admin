import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/api/produkty?id=" + id).then((response) => {
            setProductInfo(response.data);
        });
    }, [id]);
    function goBack() {
        router.push("/produkty");
    }
    function deleteProduct() {
        axios.delete("/api/produkty?id=" + id);
        goBack();
    }

    return (
        <Layout>
            <div className="flex items-center justify-center flex-col min-h-full">
                <p className="text-h2">
                    Czy na pewno chcesz usunąć "{productInfo?.title}"?
                </p>
                <div className="space-x-3 mt-2">
                    <button onClick={deleteProduct} className="btn-delete">
                        Tak
                    </button>
                    <button onClick={goBack} className="btn-main">
                        Nie
                    </button>
                </div>
            </div>
        </Layout>
    );
}

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function DodajProdukt() {
    return (
        <Layout>
            <h1 className="text-h1">Nowy Produkt</h1>
            <ProductForm />
        </Layout>
    );
}

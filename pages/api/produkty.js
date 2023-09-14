import { Product } from "@/models/Produkty";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findOne({ _id: req.query.id }));
        }
        res.json(await Product.find());
    }

    if (method === "POST") {
        const { title, desc, price } = req.body;
        const productDoc = await Product.create({ title, desc, price });
        res.json(productDoc);
    }

    if (method === "PUT") {
        const { title, desc, price, _id } = req.body;
        await Product.updateOne({ _id }, { title, desc, price });
        res.json(true);
    }
}

import prismadb from "@/lib/prismadb";
import {CardForm} from "./components/cmp-form";
import { Inter } from "next/font/google";

interface CmpIdPageProps {
    params: {
        cmpid: string;
    };
};

const CmpIdPage = async ({params}: CmpIdPageProps) => {

    const cardId = params.cmpid;

    // Log to debug the value and type
    console.log('Params:', params);
    console.log('Card ID:', cardId, 'Type:', typeof cardId);

    // if ((cardId)) {
    //     return <div>Form?</div>;
    // }

    const card = await prismadb.card.findUnique({
        where: {
            id: (params.cmpid)
        }
    });

    const categories = await prismadb.category.findMany();

    return (
        <CardForm
            initialData={card}
            categories={categories}
        />
    );
}

export default CmpIdPage;
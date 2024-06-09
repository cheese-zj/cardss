import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const {name, description, instructions, categoryId, seed} = body;

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name || !description || !instructions || !categoryId || !seed) {
            return new NextResponse("Bad Request: Missing fields", { status: 400 });
        }

        const card = await prismadb.card.create({
            data: {
                userId: user.id,
                userName: user.firstName,
                name,
                description,
                instructions,
                seed,
                categoryId,
            },
        });

        return NextResponse.json(card);

    } catch(error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
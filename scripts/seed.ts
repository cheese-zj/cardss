const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient(); 

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Neutralised-Fire" },
                { name: "Unstable-Fire" },
                { name: "Items" },
                { name: "Neutralised-shadow" },
                { name: "Shadow" },
                { name: "Unstable-Electrio" },
                { name: "Other" },
            ]
        })
    } catch (error) {
        console.error("Error seeding default categories", error );

    } finally {
        await db.$disconnect();
    }
};

main();
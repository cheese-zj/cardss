"use client";

import { Category } from "@prisma/client";
import qs from "query-string";
import {cn} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoriesProps {
    data: Category[];
}

export const Categories = ({data}: CategoriesProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");

    const onClick = (id: number | undefined) => {
        const query = {
            categoryId: id,
        };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query: query,
        }, { skipNull: true });

        router.push(url.toString());
    }

    return (
        <div className="w-full overflow-x-auto space-x-2 flex p-1">
            <button onClick={() => onClick(undefined)} className={cn(
                `flex items-center px-2 py-2 rounded-md text-center
                text-xs md:text-sm md:px-4 md:py-3 bg-primary/10 hover:opacity-80 transition`,
                !categoryId ? "bg-primary/25" : "bg-primary/10"
            )}>
                All
            </button>
            {data.map((item) => (
                <button onClick={() =>onClick(item.id)} key={item.id} className={cn(
                    `flex items-center px-2 py-2 rounded-md text-center
                    text-xs md:text-sm md:px-4 md:py-3 bg-primary/10 hover:opacity-80 transition`,
                    item.id === Number(categoryId) ? "bg-primary/25" : "bg-primary/10",
                )}>
                    {item.name}
                </button>
            ))}
        </div>
    )
}
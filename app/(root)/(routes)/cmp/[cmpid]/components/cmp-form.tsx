"use client";

import axios from "axios";
import * as z from "zod";
import prismadb from "@/lib/prismadb";
import { useForm } from "react-hook-form";
import { Card, Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form ,FormControl,FormDescription,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

interface CmpFormProps {
    initialData: Card | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    description: z.string().min(10, {
        message: "Description is required. min=10",
    }),
    instructions: z.string().min(10, {
        message: "Instructions are required. min=10",
    }),
    categoryId: z.number().int({ message: "Category is required." }),
    seed: z.string().min(2, {message: "Seed is required. min=2" }),
})

export const CardForm = ({
    categories,
    initialData,
}: CmpFormProps) => {

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            categoryId: 7,
            seed: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                await axios.patch(`/api/card/${initialData.id}`, values);

            } else {
                await axios.post("/api/card", values);
            }

            toast({
                description: "Success",
            })

            router.refresh();
            router.push("/");
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong",

            });
            console.error(error);
        }
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                General Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Basic information about the card.
                            </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="Fire...!"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Name of the card.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="The card that burns...!"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Description of the card functionalities.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="categoryId"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Category</FormLabel>
                                <Select
                                    disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue 
                                                defaultValue={field.value}
                                                placeholder="Select a category..."
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Description of the card functionalities.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Detailed instructions for the card.
                            </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField
                        name="instructions"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Instruction</FormLabel>
                                <FormControl>
                                    <Textarea className="bg-background resize-none"
                                    rows={10}
                                    disabled={isLoading}
                                    placeholder="Surely you won't burn yourself...?"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Cast targets; Upgrade Specs.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="seed"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Seed</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="SECRETWEAPON"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Seed Magic.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={isLoading}>
                            {initialData ? "Edit your card" : "Create your card"}
                            <Wand2 className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
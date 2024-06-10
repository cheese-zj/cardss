"use client";

import { Card as PrismaCard } from "@prisma/client"
import { Card as UiCard} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"; // Import the Dialog components from shadcn/ui
import { useState } from 'react';
import { generateFunMessage } from "@/components/googlegenmsg";

interface CardProps {
    data: (PrismaCard)[];
}


export const CC = ({
    data
}: CardProps) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<PrismaCard | null>(null);
    const [funMessage, setFunMessage] = useState<string>('');

    const handleCardClick = async (card: PrismaCard) => {
        setSelectedCard(card);
        setIsDialogOpen(true);

        const message = await generateFunMessage(card.description, card.instructions, card.name, card.seed);
        setFunMessage(message);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedCard(null);
        setFunMessage('');
    };

    const generateRandomGradient = () => {
        const randomColor = () => Math.floor(Math.random() * 255);
        const color1 = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.8)`;
        const color2 = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1.0)`
        return `linear-gradient(140deg, ${color1}, ${color2})`;
    }

    if (data.length === 0) {
        return (
            <div>
                No cards found.
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols2 sm:grid-cols-3 md:grid-cols-4 lg-grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
                {data.map((item) => (
                    <UiCard key={item.id}
                        className="bg-primary/10 rounded-lg cursor-pointer
                        hover:opacity-80 transition duration-200 ease-in-out"
                        onClick={() => handleCardClick(item)}
                    >
                        <div className="p-2.5 rounded-lg shadow-md bg-background">
                            <div
                                className="w-full h-64 rounded-md"
                                style={{ background: generateRandomGradient() }}
                            >
                            </div>
                            <div className="text-center mt-2 rounded-xl bg-background">
                                {item.name}
                            </div>
                        </div>
                    </UiCard>
                ))}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Card Details</DialogTitle>
                        <DialogDescription>
                            {/* Displaying card details */}
                            {selectedCard && (
                                <div>
                                    <p><strong>Name:</strong> {selectedCard.name}</p>
                                    <p><strong>Description:</strong> {selectedCard.description}</p>
                                    <p><strong>Instructions:</strong> {selectedCard.instructions}</p>
                                    <div className="mt-4 p-2 bg-background rounded">
                                        <p><strong>Fun Message:</strong></p>
                                        <p className="text-primary">{funMessage}</p>
                                    </div>
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogClose>Close</DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    )
}
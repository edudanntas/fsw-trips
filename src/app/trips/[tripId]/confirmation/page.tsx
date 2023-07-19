'use client'
import { useSearchParams, useRouter } from "next/navigation";
import Image from 'next/image';
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import React from 'react';
import { Trip } from "@prisma/client";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
    const [trip, setTrip] = useState<Trip | null>()
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const { status, data } = useSession();

    const router = useRouter()

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTrip = async () => {
            const response = await fetch(`/api/trips/check`, {
                method: "POST",
                body: JSON.stringify({
                    tripId: params.tripId,
                    startDate: searchParams.get('startDate'),
                    endDate: searchParams.get('endDate'),
                })
            })

            const res = await response.json();

            if (res?.error) {
                return router.push("/")
            }

            setTrip(res.trip);
            setTotalPrice(res.totalPrice);
        }

        if (status === "unauthenticated") {
            router.push("/")
        }

        fetchTrip();
    }, [status, searchParams, params.tripId, router]);

    if (!trip) return null;

    const handleFinishReservation = async () => {
        const res = await fetch(`/api/payment`, {
            method: "POST",
            body: Buffer.from(JSON.stringify({
                tripId: params.tripId,
                startDate: searchParams.get('startDate'),
                endDate: searchParams.get('endDate'),
                guests: Number(searchParams.get('guests')),
                finalPrice: totalPrice,
                coverImage: trip.coverImage,
                name: trip.name,
                description: trip.description,
            })
            )
        });

        if (!res.ok) {
            return toast.error("Erro ao realizar reserva!", { position: "bottom-center" });
        };

        const { sessionId } = await res.json();

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

        await stripe?.redirectToCheckout({ sessionId });

        toast.success("Reserva realizada com sucesso!", { position: "bottom-center" });
    }

    const startDate = new Date(searchParams.get('startDate') as string);
    const endDate = new Date(searchParams.get('endDate') as string);
    const guests = searchParams.get('guests');

    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

            {/* {card} */}
            <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
                <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
                    <div className="relative h-[106px] w-[124px]">
                        <Image src={trip.coverImage} fill style={{ objectFit: "cover" }} className="rounded-lg" alt={trip.name} />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
                        <div className="flex items-center gap-1">
                            <ReactCountryFlag countryCode={trip.countryCode} svg />
                            <p className="text-xs text-grayPrimary underline">{trip.location}</p>
                        </div>
                    </div>
                </div>

                <h3 className="font-semibold text-lg text-primaryDarker mt-3">Informações sobre o preço</h3>

                <div className="flex justify-between mt-1">
                    <p className="text-primaryDarker">Total:</p>
                    <p className="font-medium">R${totalPrice.toLocaleString('pt-BR')}</p>
                </div>
            </div>

            <div className="flex flex-col mt-5 text-secondary">
                <h3 className="font-semibold">Data</h3>
                <div className="flex items-center gap-1 mt-1">
                    <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
                    {" - "}
                    <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
                </div>

                <h3 className="font-semibold mt-5">Hóspedes</h3>
                <p>{guests} Hóspedes</p>

                <Button className="mt-5" onClick={handleFinishReservation}>Finalizar Reserva</Button>

            </div>
        </div>
    );
}

export default TripConfirmation;
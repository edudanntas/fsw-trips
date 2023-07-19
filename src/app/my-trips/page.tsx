'use client'
import * as React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Prisma, TripReservation } from '@prisma/client';

import UserReservationItem from './components/UserReservationItem';
import Link from 'next/link';
import Button from '@/components/Button';

const MyTrips = () => {
    const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{
        include: {
            trip: true;
        }
    }>[]>([]);
    const { status, data } = useSession();

    const router = useRouter();

    const fetchTrips = async () => {
        const response = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`);
        const json = await response.json();
        setReservations(json);
    };

    useEffect(() => {
        if (status === 'unauthenticated') {
            return router.push('/');
        }

        fetchTrips();

    }, [status, router, data])

    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">Minhas Viagens</h1>
            {reservations.length > 0 ? (
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
                    {reservations?.map((reservation) => (
                        <UserReservationItem fetchTrips={fetchTrips} key={reservation.id} reservation={reservation} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col lg:max-w-[500px]">
                    <p className="mt-2 font-medium text-primaryDarker">Você ainda não possui nenhuma reserva =(</p>

                    <Link href="/">
                        <Button className="w-full mt-2 lg:mt-5">Reserve agora!</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MyTrips;
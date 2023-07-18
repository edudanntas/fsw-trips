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

    useEffect(() => {
        if (status === 'unauthenticated' || !data?.user) {
            return router.push('/');
        }

        const fetchTrips = async () => {
            const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/reservations`);
            const json = await response.json();
            setReservations(json);
        };

        fetchTrips();

    }, [status, router, data])

    return (
        <div className='container mx-auto p-5'>
            <h1 className='font-semibold text-xl text-secondary'>Minhas Viagens</h1>

            {reservations.length > 0 ? (reservations.map((reservation => <UserReservationItem key={reservation.id} reservation={reservation} />))) : (
                <div className="flex flex-col">
                    <p className='text-secondary font-medium mt-5'>Você ainda não possui nenhuma viagem =(</p>
                    <Link href='/'>
                        <Button className='w-full mt-4'>Reserve agora! =)</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MyTrips;
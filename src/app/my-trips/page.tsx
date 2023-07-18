'use client'
import * as React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TripReservation } from '@prisma/client';

const MyTrips = () => {
    const [reservations, setReservations] = useState<TripReservation[]>([]);
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
        <div>
            <h1>My Trips</h1>

        </div>);
}

export default MyTrips;
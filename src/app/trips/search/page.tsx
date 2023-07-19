'use client'
import { set } from 'date-fns';
import { Trip } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import TripItem from '@/components/TripItem';

const Trip = () => {
    const [trips, setTrips] = React.useState<Trip[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch(`/api/trips/search?text=${searchParams.get('text') ?? ""}&startDate=${searchParams.get('startDate')}&budget=${searchParams.get('budget')}`)

            const data = await response.json();

            setTrips(data);
        }
        fetchTrips();
    }, [])
    return (
        <div className='container mx-auto flex flex-col p-5 items-center'>
            <div className='flex flex-col items-center gap-1 mb-2'>
                <h1 className='font-semibold text-xl text-secondary'>Hospedagens Encontradas</h1>
                <p className='text-graySecondary font-medium'>{trips.length > 0 ? "Listamos os melhores locais para você!" : "Poxa, não encontramos nada por aqui =("}</p>
            </div>

            <div className="flex flex-col gap-4">
                {trips?.map((trip => <TripItem key={trip.id} trip={trip} />))}
            </div>
        </div>
    );
}

export default Trip;
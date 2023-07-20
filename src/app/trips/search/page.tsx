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
            const searchText = searchParams.get('text') ?? "";
            const searchTextEncoded = `?text=${encodeURIComponent(searchText)}`;

            const response = await fetch(`/api/trips/search${searchTextEncoded}&startDate=${searchParams.get('startDate')}&budget=${searchParams.get('budget')}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            setTrips(data);
        }
        fetchTrips();
    }, [])
    return (
        <div className='container mx-auto flex flex-col p-5 items-center lg:items-start'>
            <div className='flex flex-col items-center gap-1 mb-5 lg:gap-5 lg:items-start'>
                <h1 className='font-semibold text-xl text-secondary lg:text-[2.5rem]'>Hospedagens Encontradas</h1>
                <p className='text-graySecondary font-medium lg:text-base'>{trips.length > 0 ? "Listamos os melhores locais para você!" : "Poxa, não encontramos nada por aqui =("}</p>
            </div>

            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:mt-10 lg:pb-16">
                {trips?.map((trip => <TripItem key={trip.id} trip={trip} />))}
            </div>
        </div>
    );
}

export default Trip;
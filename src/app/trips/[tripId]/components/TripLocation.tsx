'use client'
import * as React from 'react';
import Button from '@/components/Button';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Trip } from '@prisma/client';
import TripMap from './TripMap';
interface TripLocationProps {
    location: string
    locationDescription: string
    trip: Trip
}

const TripLocation = ({ location, locationDescription, trip }: TripLocationProps) => {

    return (
        <div className="p-5 lg:p-0 lg:mt-12 lg:pb-20">
            <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">Localização</h2>
            <div className="relative h-[280px] w-full lg:hidden">
                <TripMap trip={trip} />
            </div>

            <div className="relative h-[480px] w-full hidden lg:block">
                <TripMap trip={trip} />
            </div>
            <h3 className='text-secondary text-sm font-semibold mt-3 lg:text-base lg:mt-5'>{location}</h3>
            <p className='text-xs text-secondary mt-2 leading-5 lg:text-sm lg:mt-4'>{locationDescription}</p>
            <Button variant='outlined' className='w-full mt-5'>Ver no Google Maps</Button>
        </div>
    );

}
export default TripLocation;
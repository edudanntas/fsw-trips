import * as React from 'react';
import { prisma } from '@/lib/prisma';
import TripHeader from './components/TripHeader';
import TripReservation from './components/TripReservation';
import TripDescription from './components/TripDescription';
import TripHighlight from './components/TripHighlight';
import TripLocation from './components/TripLocation';


const getTripsDetails = async (tripId: string) => {
    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId
        }
    })

    return trip;
}

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
    const trip = await getTripsDetails(params.tripId);

    if (!trip) return null

    return (
        <div className='container mx-auto lg:px-40 lg:mt-10'>
            <TripHeader trip={trip} />
            <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
                <div className="lg:order-2">
                    <TripReservation tripId={trip.id} pricePerDay={trip.pricePerDay as any} maxGuests={trip.maxGuests} tripStartDate={trip.startDate} tripEndDate={trip.endDate} />
                </div>
                <div className="lg:order-1">
                    <TripDescription description={trip.description} />
                    <TripHighlight highlights={trip.highlights} />
                </div>
            </div>
            <TripLocation trip={trip} location={trip.location} locationDescription={trip.locationDescription} />
        </div>
    );
}

export default TripDetails;
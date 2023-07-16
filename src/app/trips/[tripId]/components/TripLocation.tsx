import * as React from 'react';
import Image from 'next/image';

interface TripLocationProps {
    location: string
}

const TripLocation = ({ location }: TripLocationProps) => {
    return (
        <div className="p-5">
            <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">Localização</h2>
            <div className="relative h-[280px] w-full">
                <Image
                    src="/map-mobile.png"
                    alt={location}
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                    className="rounded-lg shadow-md"
                />
            </div>
            <p className='text-secondary text-sm font-semibold mt-3'>{location}</p>
        </div>
    );
}

export default TripLocation;
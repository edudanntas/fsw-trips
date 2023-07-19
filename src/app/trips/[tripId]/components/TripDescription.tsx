import * as React from 'react';

interface TripDescriptionProps {
    description: string
}

const TripDescription = ({ description }: TripDescriptionProps) => {
    return (
        <div className="flex flex-col p-5 lg:p-0">
            <h2 className="font-semibold text-secondary lg:text-xl">Sobre a viagem</h2>
            <p className='text-sm leading-5 text-secondary mt-1 lg:mt-5 lg:text-base lg:leading-6'>{description}</p>
        </div>
    );
}

export default TripDescription;
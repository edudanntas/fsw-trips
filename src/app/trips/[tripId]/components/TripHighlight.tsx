import * as React from 'react';
import Image from 'next/image';

interface TripHighlightsProps {
    highlights: string[]
}

const TripHighlight = ({ highlights }: TripHighlightsProps) => {
    return (
        <div className="flex flex-col p-5 lg:p-0 lg:mt-12">
            <h2 className="font-semibold text-secondary lg:text-xl">Destaques</h2>
            <div className="flex flex-wrap gap-y-3 mt-4 lg:mt-5">
                {highlights.map((highlight, index) => (
                    <div key={highlight} className="flex items-center gap-2 lg:gap-2 w-1/2">
                        <Image src="/check-icon.svg" width={25} height={25} alt={highlight} />
                        <p className='text-secondary text-sm lg:text-base'>{highlight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TripHighlight;
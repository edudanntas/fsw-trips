import * as React from 'react';
import Image from 'next/image';

interface TripHighlightsProps {
    highlights: string[]
}

const TripHighlight = ({ highlights }: TripHighlightsProps) => {
    return (
        <div className="flex flex-col p-5">
            <h2 className="font-semibold text-secondary">Destaques</h2>
            <div className="flex flex-wrap gap-y-3 mt-1">
                {highlights.map((highlight, index) => (
                    <div key={highlight} className="flex items-center gap-1 w-1/2">
                        <Image src="/check-icon.png" width={15} height={15} alt={highlight} />
                        <p className='text-secondary text-sm'>{highlight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TripHighlight;
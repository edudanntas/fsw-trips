import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const QuickSearch = () => {
    return (
        <div className='container mx-auto p-5'>
            <div className="flex items-center">
                <div className='w-full h-[1px] bg-primarylight'></div>
                <h2 className='px-5 font-medium text-grayPrimary whitespace-nowrap'>Tente pesquisar por</h2>
                <div className='w-full h-[1px] bg-primarylight'></div>
            </div>

            <div className='flex w-full justify-between mt-5 lg:justify-center lg:gap-40 lg:mt-10'>
                <div className="flex flex-col items-center gap-1">
                    <Link href={'/trips/search?text=hotel'} className='flex flex-col items-center hover:text-primary transition-all'>
                        <Image width={40} height={40} src='/Hotel.svg' alt='hotel' />
                    </Link>

                    <p className='text-base lg:text-base text-grayPrimary'>Hotel</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Link href={'/trips/search?text=fazenda'} className='flex flex-col items-center hover:text-primary transition-all'>
                        <Image width={40} height={40} src='/Farm.svg' alt='fazenda' />
                    </Link>

                    <p className='text-base lg:text-base text-grayPrimary'>Fazenda</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Link href={'/trips/search?text=chalé'} className='flex flex-col items-center hover:text-primary transition-all'>
                        <Image width={40} height={40} src='/Cabin.svg' alt='cottage' />
                    </Link>

                    <p className='text-base lg:text-base text-grayPrimary'>Chalé</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Link href={'/trips/search?text=pousada'} className='flex flex-col items-center hover:text-primary transition-all'>
                        <Image width={40} height={40} src='/inn.svg' alt='pousada' />
                    </Link>

                    <p className='text-base lg:text-base text-grayPrimary'>Pousada</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Link href={'/trips/search?text=resort'} className='flex flex-col items-center hover:text-primary transition-all'>
                        <Image width={40} height={40} src='/Resort.svg' alt='resort' />
                    </Link>

                    <p className='text-base lg:text-base text-grayPrimary'>Resort</p>
                </div>


            </div>
        </div>
    )
}

export default QuickSearch;

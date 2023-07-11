'use client'
import Button from '@/components/Button';
import CurrencyInput from '@/components/CurrencyInput';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import * as React from 'react';

const TripSearch = () => {
    return (
        <div className='container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat'>
            <h1 className='font-semibold text-secondary text-xl text-center'>Encontre sua próxima <span className='text-primary'>viagem!</span></h1>

            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder='Onde você quer ir?' />

                <div className="flex gap-4">
                    <DatePicker placeholderText='Data de ida' onChange={() => { }} />
                    <CurrencyInput placeholder='Orçamento' />
                </div>
                <Button>Procurar</Button>
            </div>
        </div>
    )
}

export default TripSearch;
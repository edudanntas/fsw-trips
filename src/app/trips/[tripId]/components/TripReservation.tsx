'use client'

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { Trip } from '@prisma/client';
import * as React from 'react';

interface TripReservationProps {
    trip: Trip
}

const TripReservation = ({ trip }: TripReservationProps) => {
    return (
        <div>
            <div className='flex flex-col px-5'>
                <div className="flex gap-4">
                    <DatePicker placeholderText='Data Inicial' onChange={() => { }} className='w-full' />
                    <DatePicker placeholderText='Data Final' onChange={() => { }} className='w-full' />
                </div>
                <Input placeholder={`Número de Hospedes (Máx: ${trip.maxGuests})`} className='mt-4' />
                <div className="flex justify-between mt-3">
                    <p className='font-medium text-sm text-secondary'>Total:</p>
                    <p className='font-medium text-sm text-secondary'>R$3000</p>
                </div>

                <Button className='mt-4'>Reservar agora</Button>
            </div>
        </div>
    );
}

export default TripReservation;
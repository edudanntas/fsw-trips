'use client'

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { Trip } from '@prisma/client';
import { error } from 'console';
import { differenceInDays } from 'date-fns';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface TripReservationProps {
    tripId: string
    tripStartDate: Date;
    tripEndDate: Date;
    maxGuests: number;
    pricePerDay: number;
}

interface TripReservationForm {
    guests: number;
    startDate: Date | null;
    endDate: Date | null;
}

const TripReservation = ({ tripId, maxGuests, tripStartDate, tripEndDate, pricePerDay }: TripReservationProps) => {
    const { register, handleSubmit, formState: { errors }, control, watch, setError } = useForm<TripReservationForm>()

    const onSubmit = async (data: TripReservationForm) => {
        const response = await fetch('http://localhost:3000/api/trips/check', {
            method: "POST",
            body: Buffer.from(JSON.stringify({
                startDate: data.startDate,
                endDate: data.endDate,
                tripId,
            }))
        })

        const res = await response.json()

        if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
            setError("startDate", {
                type: 'manual',
                message: "Esta data já está reservada.",
            });

            setError("endDate", {
                type: 'manual',
                message: "Esta data já está reservada.",
            })
        }

        if (res?.error?.code === 'INVALID_START_DATE') {
            setError("startDate", {
                type: 'manual',
                message: "Data inválida.",
            });
        }

        if (res?.error?.code === 'INVALID_END_DATE') {
            setError("endDate", {
                type: 'manual',
                message: "Data inválida.",
            });
        }
    }

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    return (
        <div className='flex flex-col px-5'>
            <div className="flex gap-4">
                <Controller
                    name='startDate'
                    rules={{
                        required: {
                            value: true,
                            message: 'Data inicial é obrigatória',
                        },
                    }}
                    control={control}
                    render={({ field }) => <DatePicker
                        placeholderText='Data Inicial'
                        onChange={field.onChange}
                        selected={field.value}
                        error={!!errors.startDate}
                        errorMessage={errors.startDate?.message}
                        className='w-full'
                        minDate={tripStartDate}
                    />}
                />
                <Controller
                    name='endDate'
                    rules={{
                        required: {
                            value: true,
                            message: 'Data final é obrigatória',
                        },
                    }}
                    control={control}
                    render={({ field }) => <DatePicker
                        placeholderText='Data Final'
                        onChange={field.onChange}
                        selected={field.value}
                        error={!!errors.endDate}
                        errorMessage={errors.endDate?.message}
                        className='w-full'
                        maxDate={tripEndDate}
                        minDate={startDate ?? tripStartDate}
                    />}
                />
            </div>
            <Input {...register("guests", {
                required: {
                    value: true,
                    message: "Número de hóspedes é obrigatório.",
                },
            })} placeholder={`Número de Hospedes (Máx: ${maxGuests})`} className='mt-4'
                error={!!errors?.guests}
                errorMessage={errors?.guests?.message}
            />
            <div className="flex justify-between mt-3">
                <p className='font-medium text-sm text-secondary'>{(startDate && endDate) ? `Total (${differenceInDays(endDate, startDate)} Noites)` : "Total (0 noites)"}</p>
                <p className='font-medium text-sm text-secondary'>{(startDate && endDate) ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay}` : "R$0"}</p>
            </div>

            <div className=' w-full pb-10 border-b border-grayPrimary'>
                <Button onClick={() => handleSubmit(onSubmit)()} className='mt-4 w-full'>Reservar agora</Button>
            </div>
        </div>
    );
}

export default TripReservation;
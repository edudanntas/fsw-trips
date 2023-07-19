'use client'
import Button from '@/components/Button';
import CurrencyInput from '@/components/CurrencyInput';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface TripSearchForm {
    text: string;
    startDate: Date | null;
    budget: string;
}

const TripSearch = () => {
    const router = useRouter();
    const { control, register, formState: { errors }, handleSubmit } = useForm<TripSearchForm>();

    const onSubmit = (data: TripSearchForm) => {
        router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`)
    }
    return (
        <div className='container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-20'>
            <h1 className='font-semibold text-secondary text-xl text-center lg:text-[2.5rem]'>Encontre sua próxima <span className='text-primary'>viagem!</span></h1>

            <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg lg:mt-12">
                <Input placeholder="Onde você quer ir?"
                    error={!!errors.text}
                    errorMessage={errors.text?.message}
                    {...register('text', {
                        required: {
                            value: true,
                            message: 'Digite uma cidade ou país'
                        }
                    })}
                />

                <div className="flex gap-4 lg:w-full">
                    <Controller
                        name='startDate'
                        control={control}
                        render={({ field }) => <DatePicker
                            placeholderText='Data Inicial'
                            onChange={field.onChange}
                            selected={field.value}
                            className='w-full'
                            minDate={new Date()}
                        />}
                    />

                    <Controller
                        name='budget'
                        control={control}
                        render={({ field }) => <CurrencyInput className='w-full' placeholder='Orçamento' onValueChange={field.onChange as any} value={field.value} onBlur={field.onBlur} />}
                    />

                </div>
                <Button className='lg:w-1/2 lg:h-fit' onClick={() => handleSubmit(onSubmit)()}>Procurar</Button>
            </div>
        </div>
    )
}

export default TripSearch;
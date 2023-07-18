import Button from '@/components/Button';
import { Prisma, Trip, TripReservation, User } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { toast } from 'react-toastify';

interface UserReservationItemProps {
    reservation: Prisma.TripReservationGetPayload<{
        include: {
            trip: true;
        }
    }>;
    fetchTrips: () => void;
}

const UserReservationItem = ({ reservation, fetchTrips }: UserReservationItemProps) => {
    const router = useRouter();

    const { trip } = reservation;

    const handleCancelReservation = async () => {
        const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            return toast.error('Erro ao cancelar reserva!', { position: 'bottom-center' });
        }

        toast.success('Reserva cancelada com sucesso!', { position: 'bottom-center' });

        fetchTrips()
    }

    return (
        // CARD
        <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
            <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
                <div className="relative h-[106px] w-[124px]">
                    <Image src={trip.coverImage} fill style={{ objectFit: "cover" }} className="rounded-lg" alt={trip.name} />
                </div>

                <div className="flex flex-col">
                    <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
                    <div className="flex items-center gap-1">
                        <ReactCountryFlag countryCode={trip.countryCode} svg />
                        <p className="text-xs text-grayPrimary underline">{trip.location}</p>
                    </div>
                </div>
            </div>

            {/* SOBRE A VIAGEM */}
            <h3 className="font-semibold text-md text-primaryDarker mt-3">Sobre a viagem</h3>

            <div className="flex flex-col mt-5 text-secondary pb-5 border-b border-grayLighter border-solid">
                <h3 className="text-sm">Data</h3>
                <div className="flex items-center gap-1">
                    <p>{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
                    {" - "}
                    <p>{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
                </div>

                <h3 className="text-sm mt-5">Hóspedes</h3>
                <p>{reservation.guests} Hóspedes</p>

            </div>

            {/* SOBRE O PREÇO */}
            <h3 className="font-semibold text-md text-primaryDarker mt-3">Informações do pagamento</h3>

            <div className="flex justify-between mt-2">
                <p className="text-primaryDarker">Total:</p>
                <p className="font-bold">R${Number(reservation.finalPrice).toLocaleString('pt-BR')}</p>
            </div>
            <Button variant='danger' className='mt-5' onClick={handleCancelReservation}>Cancelar Reserva</Button>
        </div>
    );
}

export default UserReservationItem;
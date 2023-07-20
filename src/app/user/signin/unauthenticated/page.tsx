'use client'
import Button from '@/components/Button';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const UserAuthentiticate = () => {
    const { status, data } = useSession();
    const handleLoginClick = () => signIn();
    const router = useRouter();

    if (status === 'authenticated') {
        router.push('/');
    }

    return (
        <div className='container mx-auto p-5'>
            {status === 'unauthenticated' && (
                <div>
                    <div className="flex flex-col items-center">
                        <h1 className='font-semibold text-secondary text-xl lg:text-[2.5rem] lg:mt-5 lg:hidden'>Poxa, parece que não te conheço</h1>
                        <h1 className='hidden lg:block lg:text-[2.5rem] lg:mt-5 lg:font-semibold lg:text-secondary'>Poxa, parece que ainda não te conheço</h1>
                        <p className='text-secondary text-sm mt-2 text-center lg:text-xl lg:mt-4'>Para continuar, faça login ou crie uma conta</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-6 lg:flex lg:flex-row lg:justify-center">
                        <Button className='lg:w-[30%]' onClick={handleLoginClick}>Entrar</Button>
                        <Button className='lg:w-[30%]' variant='outlined'>Criar conta</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserAuthentiticate;
import * as React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className='bg-walterwhite p-5 flex flex-col items-center gap-1'>
            <Image src='/logo.svg' width={30} height={32} alt='Logo' />
            <p className='text-xs lg:text-sm text-secondary'>2023 Desenvovido por Eduardo</p>
            <p className='text-xs lg:text-sm text-secondary'>Todos os direitos reservados</p>
        </div>
    );
}

export default Footer;

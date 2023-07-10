'use client'

import * as React from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const [loginMenuIsOpen, setLoginMenuIsOpen] = React.useState(false);
    const { status, data } = useSession();
    const handleLoginClick = () => signIn();
    const handleLogoutClick = () => signOut();
    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);
    const handleLoginMenuClick = () => setLoginMenuIsOpen(!loginMenuIsOpen);
    return (
        <div className="container mx-auto p-5 flex justify-between">
            <Image width={30} height={32} src='/logo.svg' alt='Logo' />

            {status === 'unauthenticated' && (
                <div className="flex items-center gap-3 border-solid border-grayPrimary border-2 rounded-full p-2 relative">
                    <AiOutlineMenu onClick={handleLoginMenuClick} size={16} className='cursor-pointer' />
                    <CgProfile size={25} />

                    {loginMenuIsOpen && (
                        <div className="absolute top-12 left-0 h-full w-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                            <button onClick={handleLoginClick} className='text-primary text-sm font-semibold'>Login</button>
                        </div>
                    )}
                </div>
            )}

            {/* <button className='text-primary text-sm font-semibold' onClick={handleLoginClick}>Login</button> */}

            {status === 'authenticated' && data.user && (
                <div className="flex items-center gap-3 border-solid border-grayPrimary border-2 rounded-full p-2 relative">
                    <AiOutlineMenu onClick={handleMenuClick} size={16} className='cursor-pointer' />
                    <Image className='rounded-full' height={30} width={30} src={data.user.image!} alt={data.user.name!} />

                    {menuIsOpen && (
                        <div className="absolute top-12 left-0 h-full w-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                            <button onClick={handleLogoutClick} className='text-primary text-sm font-semibold'>Logout</button>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default Header;
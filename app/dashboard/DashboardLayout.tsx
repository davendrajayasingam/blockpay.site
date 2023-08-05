'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation'

import { LiaBarsSolid, LiaCashRegisterSolid, LiaFileInvoiceDollarSolid, LiaLifeRing, LiaMoneyCheckAltSolid, LiaTimesSolid } from 'react-icons/lia'

import { classNames } from '@/utils/helpers/tailwindHelper'

import Logo from './Logo'

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: Props)
{
    const pathname = usePathname()

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', current: pathname === '/dashboard', icon: LiaCashRegisterSolid },
        { name: 'Invoices', href: '/dashboard/invoices', current: pathname.startsWith('/dashboard/invoices'), icon: LiaFileInvoiceDollarSolid },
        { name: 'Withdrawals', href: '/dashboard/withdrawals', current: pathname === '/dashboard/withdrawals', icon: LiaMoneyCheckAltSolid },
        { name: 'Support', href: '/dashboard/support', current: pathname === '/dashboard/support', icon: LiaLifeRing }
    ]

    const showContent = () => (
        <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10'>
            <div className='flex h-16 shrink-0 items-center'>
                <Logo />
            </div>
            <nav className='flex flex-1 flex-col'>
                <ul className='flex flex-1 flex-col gap-y-7'>
                    {/* Navigation */}
                    <li>
                        <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* Logout Button */}
                    <li className='-mx-6 mt-auto'>
                        <button
                            type='button'
                            className='w-full flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800'
                        >
                            <span aria-hidden='true'>Log Out</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )

    return (
        <div>

            {/* Mobile */}
            <Transition.Root
                show={sidebarOpen}
                as={Fragment}
            >
                <Dialog
                    as='div'
                    className='relative z-50 lg:hidden'
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity ease-linear duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-linear duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-900/80' />
                    </Transition.Child>

                    <div className='fixed inset-0 flex'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='-translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='-translate-x-full'
                        >
                            <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='ease-in-out duration-300'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='ease-in-out duration-300'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                >
                                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                                        <button
                                            type='button'
                                            className='-m-2.5 p-2.5'
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className='sr-only'>
                                                Close sidebar
                                            </span>
                                            <LiaTimesSolid
                                                className='h-6 w-6 text-white'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>

                                {showContent()}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Desktop */}
            <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
                {showContent()}
            </div>

            <div className='lg:pl-72'>
                <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8'>
                    <button
                        type='button'
                        className='-m-2.5 p-2.5 text-white lg:hidden'
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className='sr-only'>Open sidebar</span>
                        <LiaBarsSolid className='h-5 w-5' aria-hidden='true' />
                    </button>

                    <div className='flex items-center flex-1 gap-x-4 self-stretch lg:gap-x-6'>
                        {/* <p className='font-bold text-white'>Dashboard</p> */}
                    </div>
                </div>

                <main className='p-4 sm:p-6 lg:p-8'>
                    {children}
                </main>
            </div>

        </div>
    )
}
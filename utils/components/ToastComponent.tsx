'use client'

import { ToastClassName, ToastContainer, TypeOptions } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const contextClass: {
    [key in TypeOptions]: ToastClassName
} = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-rose-500 text-white',
    info: 'bg-sky-500 text-white',
    warning: 'bg-amber-500 text-white',
    default: 'bg-sky-500 text-white'
}

export default function ToastComponent()
{
    return <ToastContainer
        icon={false}
        position='bottom-center'
        toastClassName={(context?: { type?: TypeOptions | undefined }) => contextClass[context?.type || 'default'] + ' mb-3 shadow-xl relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'}
        bodyClassName={() => 'font-sans font-bold text-md p-3'}
        progressClassName='bg-white'
        autoClose={3000}
    />
}
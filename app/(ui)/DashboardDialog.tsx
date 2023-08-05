import { Dialog } from '@headlessui/react'

type Props = {
    isOpen: boolean,
    setIsOpen: (show: boolean) => void,
    children: React.ReactNode,
    title?: string,
}

export default function DashboardDialog({
    isOpen,
    setIsOpen,
    children,
    title
}: Props)
{
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className='relative z-50'
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className='fixed inset-0 bg-black/70' aria-hidden='true' />

            {/* Full-screen scrollable container */}
            <div className='fixed inset-0 overflow-y-auto'>
                {/* Container to center the panel */}
                <div className='flex min-h-full items-center justify-center p-8'>
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className='mx-auto w-full max-w-screen-sm rounded-lg shadow p-8 bg-gray-900 border-2 border-sky-500'>
                        {/* Title */}
                        {
                            title
                            && <Dialog.Title className='mb-1 font-bold text-2xl text-sky-500 text-center'>
                                {title}
                            </Dialog.Title>
                        }
                        {/* Contents */}
                        <div className='pt-8'>
                            {children}
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}
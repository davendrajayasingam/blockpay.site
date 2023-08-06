import { format } from 'date-fns'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'

import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    paymentsData: PaymentData[]
}

export default function ViewPayments({ paymentsData }: Props)
{
    if (paymentsData.length === 0)
    {
        return <p className='text'>No payments yet.</p>
    }

    return <table className='w-full border-separate border-spacing-y-3'>
        <thead>
            <tr>
                <th className='text p-2'>
                    Status
                </th>
                <th className='text p-2 md:hidden'>
                    Info
                </th>
                <th className='text p-2 hidden md:table-cell'>
                    Amount
                </th>
                <th className='text p-2 hidden md:table-cell'>
                    Date
                </th>
                <th className='text p-2 hidden md:table-cell'>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                paymentsData
                    .map(event => ({
                        createdAt: new Date(event.createdAt),
                        status: event.status,
                        transactionId: event.transactionId,
                        local: `${event.net.local.currency} ${event.net.local.amount}`,
                        crypto: `${event.net.crypto.currency} ${event.net.crypto.amount}`
                    }))
                    // remove duplicate events
                    .filter((event, index, self) => index === self.findIndex(e => e.transactionId === event.transactionId))
                    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                    .map(event => (
                        <tr
                            key={event.createdAt.getTime()}
                            className='bg-black/10 border border-white/5 p-4 rounded-md shadow-md'
                        >
                            <td className={classNames(
                                'text p-2 text-center font-bold',
                                event.status === 'CONFIRMED' ? 'text-emerald-500' : '',
                                event.status === 'PENDING' ? 'text-amber-500' : '',
                            )}>
                                {event.status}
                                <a
                                    href={`https://etherscan.io/tx/${event.transactionId}`}
                                    target='_blank'
                                    className='button flex flex-row items-center justify-center w-min mx-auto md:hidden mt-4'
                                >
                                    View <LiaExternalLinkAltSolid className='text-2xl' />
                                </a>
                            </td>
                            <td className='text p-2 text-center md:hidden'>
                                {event.local}
                                <br />
                                <span className='text-xs'>{event.crypto}</span>
                                <br />
                                {format(new Date(event.createdAt), 'EEE, do MMM yyyy, K:mm a')}
                            </td>
                            <td className='text p-2 text-center hidden md:table-cell'>
                                {event.local}
                                <br />
                                <span className='text-xs'>{event.crypto}</span>
                            </td>
                            <td className='text p-2 text-center hidden md:table-cell'>
                                {format(new Date(event.createdAt), 'EEE, do MMM yyyy, K:mm a')}
                            </td>
                            <td className='text-center hidden md:table-cell'>
                                <a
                                    href={`https://etherscan.io/tx/${event.transactionId}`}
                                    target='_blank'
                                    className='button flex flex-row items-center justify-center w-min mx-auto'
                                >
                                    View <LiaExternalLinkAltSolid className='text-2xl' />
                                </a>
                            </td>
                        </tr>
                    ))
            }
        </tbody>
    </table>
}
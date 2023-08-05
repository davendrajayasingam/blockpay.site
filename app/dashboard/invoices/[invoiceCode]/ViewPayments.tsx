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

    return <table className='w-full'>
        <thead>
            <tr>
                <th className='text p-2'>
                    Status
                </th>
                <th className='text p-2'>
                    Amount
                </th>
                <th className='text p-2'>
                    Date
                </th>
                <th className='text p-2'>
                    Actions
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
                    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                    .map(event => (
                        <tr
                            key={event.createdAt.getTime()}
                            className='bg-black/5 border border-white/5 p-4 rounded-md shadow-md'
                        >
                            <td className={classNames(
                                'text p-2 text-center font-bold',
                                event.status === 'CONFIRMED' ? 'text-emerald-500' : '',
                                event.status === 'PENDING' ? 'text-amber-500' : '',
                            )}>
                                {event.status}
                            </td>
                            <td className='text p-2 text-center'>
                                {event.local}
                                <br />
                                <span className='text-xs'>{event.crypto}</span>
                            </td>
                            <td className='text p-2 text-center'>
                                {format(new Date(event.createdAt), 'EEE, do MMM yyyy, K:mm a')}
                            </td>
                            <td className='text-center'>
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
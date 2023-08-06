import { format } from 'date-fns'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'

import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    paymentsData: PaymentData[]
}

export default function ViewTimeline({ paymentsData }: Props)
{
    const timelineData: TimelineData[] = paymentsData.reduce((acc: TimelineData[], curr) =>
    {
        if (Array.isArray(curr.timeline))
        {
            acc.push(...curr.timeline)
        }

        // remove duplicates
        return acc.filter((timeline, index, self) => (
            index === self.findIndex(t => (
                t.time === timeline.time
            ))
        ))
    }, [])

    if (timelineData.length === 0)
    {
        return <p className='text'>No timeline yet.</p>
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
                    Context
                </th>
                <th className='text p-2 hidden md:table-cell'>
                    Payment
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
                timelineData.map(timeline => (
                    <tr
                        key={timeline.time}
                        className='bg-black/10 border border-white/5 p-4 rounded-md shadow-md'
                    >
                        <td className={classNames(
                            'pl-2 py-2 font-bold text text-center',
                            timeline.status === 'NEW' ? 'text-sky-500' : '',
                            timeline.status === 'PENDING' ? 'text-amber-500' : '',
                            timeline.status === 'PENDING REFUND' ? 'text-amber-500' : '',
                            timeline.status === 'COMPLETED' ? 'text-emerald-500' : '',
                            timeline.status === 'RESOLVED' ? 'text-emerald-500' : '',
                            timeline.status === 'REFUNDED' ? 'text-emerald-500' : '',
                            timeline.status === 'UNRESOLVED' ? 'text-rose-500' : '',
                            timeline.status === 'EXPIRED' ? 'text-rose-500' : '',
                            timeline.status === 'CANCELLED' ? 'text-rose-500' : '',
                        )}>
                            {timeline.status}
                            {
                                timeline.payment?.transactionId
                                && <a
                                    href={`https://etherscan.io/tx/${timeline.payment.transactionId}`}
                                    target='_blank'
                                    className='py-2 button flex flex-row items-center justify-center w-min mx-auto md:hidden mt-4'
                                >
                                    View <LiaExternalLinkAltSolid className='text-2xl' />
                                </a>
                            }
                        </td>
                        <td className='text py-2 text-center md:hidden'>
                            {timeline.context}
                            {timeline.context && <br />}
                            {
                                timeline.payment?.value.currency
                                && <>
                                    {`${timeline.payment?.value.currency} ${timeline.payment?.value.amount}`}
                                    <br />
                                    {timeline.payment?.network}
                                </>
                            }
                            {timeline.payment?.value.currency && <br />}
                            {format(new Date(timeline.time), 'EEE, do MMM yyyy, K:mm a')}
                        </td>
                        <td className='text py-2 text-center hidden md:table-cell'>
                            {timeline.context}
                        </td>
                        <td className='text py-2 text-center hidden md:table-cell'>
                            {
                                timeline.payment
                                && <>
                                    {`${timeline.payment?.value.currency} ${timeline.payment?.value.amount}`}
                                    <br />
                                    {timeline.payment?.network}
                                </>
                            }
                        </td>
                        <td className='text py-2 text-center hidden md:table-cell'>
                            {format(new Date(timeline.time), 'EEE, do MMM yyyy, K:mm a')}
                        </td>
                        <td className='pr-2 py-2 text-center hidden md:table-cell'>
                            {
                                timeline.payment?.transactionId
                                && <a
                                    href={`https://etherscan.io/tx/${timeline.payment.transactionId}`}
                                    target='_blank'
                                    className='button flex flex-row items-center justify-center w-min mx-auto'
                                >
                                    View <LiaExternalLinkAltSolid className='text-2xl' />
                                </a>
                            }
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
}
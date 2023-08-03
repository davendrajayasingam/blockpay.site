import { format } from 'date-fns'

type Props = {
    chargesData: ChargeData[]
}

export default function ViewPayments({ chargesData }: Props)
{
    const formatChargeType = (type: string) =>
    {
        switch (type)
        {
            case 'charge:confirmed': return 'Confirmed'
            case 'charge:created': return 'Created'
            case 'charge:delayed': return 'Delayed'
            case 'charge:failed': return 'Failed'
            case 'charge:pending': return 'Pending'
            case 'charge:resolved': return 'Resolved'
            default: return 'Unknown'
        }
    }

    if (chargesData.length === 0)
    {
        return <p className='text'>No payments yet!</p>
    }

    return <div className='flex flex-col divide-y divide-white/10'>
        {
            chargesData
                .map(charge => ({
                    type: formatChargeType(charge.type),
                    timestamp: new Date(charge.timestamp)
                }))
                .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
                .map(charge => (
                    <p
                        className='text py-2'
                        key={charge.timestamp.getTime()}
                    >
                        <span className='font-mono'>{format(new Date(charge.timestamp), 'EEE, do MMM yyyy, K:mm a')}:</span> <span className='font-bold'>{charge.type}</span>
                    </p>
                ))
        }
    </div>
}
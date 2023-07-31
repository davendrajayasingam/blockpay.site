import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    required?: boolean,
    type?: 'text' | 'email' | 'password' | 'number' | 'tel'
    label?: string,
    textPosition?: 'left' | 'center',
    value?: string,
    onChange?: (value: string) => void,
    placeholder?: string,
    hint?: string,
    minValue?: number,
    maxValue?: number,
}

export default function DashboardTextInput({
    required = false,
    type = 'text',
    label = '',
    textPosition = 'left',
    value = '',
    onChange = () => { },
    placeholder = '',
    hint,
    minValue,
    maxValue
}: Props)
{
    return (
        <div className='w-full'>
            {
                label
                && <p className='mb-1 font-medium text-lg text-slate-700'>
                    {label}
                </p>
            }
            {
                hint
                && <p className='mb-1 text-sm text-slate-700'>
                    {hint}
                </p>
            }
            <input
                type={type}
                name={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={e => onChange(e.target.value)}
                className={classNames(
                    textPosition === 'left' ? 'text-left' : 'text-center',
                    'h-11 p-2 text-lg bg-white text-slate-700 placeholder:text-slate-400 rounded-md w-full outline-none focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                )}
                onWheel={e => e.currentTarget.blur()}
                onBlur={e =>
                {
                    if (type === 'number' && minValue && maxValue)
                    {
                        e.target.value = Math.min(Math.max(parseFloat(e.target.value), minValue), maxValue).toString()
                    }
                    onChange(e.target.value)
                }}
            />
        </div>
    )
}
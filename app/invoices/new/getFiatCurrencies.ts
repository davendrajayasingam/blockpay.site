export default async function getFiatCurrencies()
{
    const { data }: { data: any[] } = await fetch('https://api.coinbase.com/v2/currencies', { cache: 'no-store' })
        .then(res => res.json())

    const currencies = data.map(currency => ({
        id: currency.id,
        name: currency.name,
        minSize: parseFloat(currency.min_size)
    } as FiatCurrency))

    return currencies
}
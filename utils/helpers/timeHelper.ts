// from time string: i.e. new Date().toTimeString()
export function twelveHourTime(time: string)
{
    // Check correct time format and split into components
    let newTime: any = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

    if (newTime.length > 1)
    { // If time format correct
        newTime = newTime.slice(1) // Remove full string match value
        newTime[5] = +newTime[0] < 12 ? ' AM' : ' PM' // Set AM/PM
        newTime[0] = +newTime[0] % 12 || 12 // Adjust hours
    }
    return newTime.join('') // return adjusted time or original string
}

export function prettyTimeFromMilliseconds(timeInMS: number)
{
    const date = new Date(timeInMS)
    const dateStr = date.toDateString()
    const timeStr = twelveHourTime(date.toTimeString().substring(0, 8))
    return `${dateStr}, ${timeStr}`
}
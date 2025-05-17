import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export function convertDateFormat(dateString: string) {
    // DD MMM
    if (!dateString) return '';
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short'
    }).format(date);
}

export function convertDateStringFormat(date: string): string {
    // YYYY-MM-DD
    return new Date(date).toISOString().split('T')[0] || new Date().toISOString().split('T')[0] || '';
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
export const formatFlightTime = (
    departure: string | null | undefined,
    arrival: string | null | undefined,
    timeZone: string = dayjs.tz.guess()
): string => {
    if (!departure && !arrival) return 'Date/time unavailable';
    if (!departure) return 'Departure time unavailable';
    if (!arrival) return 'Arrival time unavailable';

    try {
        const dep = dayjs.utc(departure).tz(timeZone);
        const arr = dayjs.utc(arrival).tz(timeZone);

        const dayFormatted = dep.format('ddd, MMM D');
        const depTime = dep.format('h:mm A');
        const arrTime = arr.format('h:mm A');

        return `${dayFormatted} • ${depTime} — ${arrTime}`;
    } catch (err) {
        console.error('Invalid date format:', err);
        return 'Invalid date format';
    }
};

export const formatTransitTime = (departureDateStr: string | null, arrivalDateStr: string | null): string => {
    if (!departureDateStr || !arrivalDateStr) return '';

    const departure = dayjs(departureDateStr);
    const arrival = dayjs(arrivalDateStr);

    const dayDiff = arrival.diff(departure, 'day');

    return `${departure.format('ddd, MMM D')}${dayDiff > 0 ? ` +${dayDiff}` : ''}`;
};

export const formatDateToDayMonth = (dateStr: string | null): string => {
    if (!dateStr) return '';
    return dayjs(dateStr).format('ddd, MMM D');
};

export const formatLodgingTime = (checkInDate: string | null, checkOutDate: string | null): string => {
    if (!checkInDate || !checkOutDate) return '';

    const dep = dayjs(checkInDate);
    const arr = dayjs(checkOutDate);

    const formattedDeparture = dep.format('ddd, MMM Do');
    const formattedArrival = arr.format('ddd, MMM Do');

    return `${formattedDeparture} — ${formattedArrival}`;
};

export const getDaysAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - past.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays === 0 ? 'Today' : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export const convertToNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const [month, day, year, hour, minute] = formattedDate.split(/[\s,/:]+/);
    return `${day}/${month}/${year} ${hour}:${minute}`;
};

type OpeningPeriod = {
    openDay: number;
    openTime: string;
    closeDay: number;
    closeTime: string;
};

export function getOpeningPeriodsText(periods: OpeningPeriod[]): string {
    if (!periods || periods.length === 0) return '';
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formatTime = (time: string): string => `${time.slice(0, 2)}:${time.slice(2)}`;
    const formatRange = (start: number, end: number, open: string, close: string): string => {
        const dayRange = start === end ? daysOfWeek[start] : `${daysOfWeek[start]}-${daysOfWeek[end]}`;
        return `${dayRange}: ${open} - ${close}`;
    };

    const sortedPeriods = [...periods].sort((a, b) => a.openDay - b.openDay);

    const result: string[] = [];
    let startDay = sortedPeriods[0]?.openDay || 0;
    let prevDay = startDay;
    let openTime = formatTime(sortedPeriods[0]?.openTime || '0000');
    let closeTime = formatTime(sortedPeriods[0]?.closeTime || '0000');

    sortedPeriods.slice(1).forEach(({ openDay, openTime: oTime, closeTime: cTime }, index) => {
        if (
            sortedPeriods[index] &&
            prevDay &&
            oTime === sortedPeriods[index].openTime &&
            cTime === sortedPeriods[index].closeTime &&
            openDay === prevDay + 1
        ) {
            prevDay = openDay;
        } else {
            result.push(formatRange(startDay, prevDay, openTime, closeTime));
            startDay = openDay;
            prevDay = openDay;
            openTime = formatTime(oTime);
            closeTime = formatTime(cTime);
        }
    });

    // Push the last range
    result.push(formatRange(startDay, prevDay, openTime, closeTime));

    return result.join('\n');
}

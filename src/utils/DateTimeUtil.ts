export function convertDateFormat(dateString: string) {
    // DD MMM
    if (!dateString) return '';
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short'
    }).format(date);
}

export function convertDateStringFormat(date: string) {
    // YYYY-MM-DD
    // console.log(date);
    return new Date(date).toISOString().split('T')[0];
}

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

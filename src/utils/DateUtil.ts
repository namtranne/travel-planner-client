export function convertDateFormat(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short'
    }).format(date);
}

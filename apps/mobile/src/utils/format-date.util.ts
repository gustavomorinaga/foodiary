const formatter = new Intl.DateTimeFormat('pt-BR', {
	weekday: 'long',
	day: '2-digit',
	month: 'long',
});

export function formatDate(date: Date): string {
	const today = new Date();
	const isToday = date.toDateString() === today.toDateString();

	const formattedDate = formatter.format(date).toUpperCase();

	if (isToday) {
		const [, formattedDay] = formattedDate.split(', ');
		return `HOJE, ${formattedDay}`;
	}

	return formattedDate;
}

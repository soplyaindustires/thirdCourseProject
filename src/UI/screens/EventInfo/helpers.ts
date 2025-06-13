const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const getDaysDifference = (start: Date, end: Date): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatEventPeriod = (start: Date, end: Date): string => {
    // Проверка на валидность дат
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 'Некорректная дата';
    }

    const isSameDay =
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate();

    if (isSameDay) {
        // Если один день, возвращаем hh:mm-hh:mm
        return `${formatTime(start)} \u2014 ${formatTime(end)}`;
    } else {
        // Если разные дни, возвращаем hh:mm и количество дней
        const days = getDaysDifference(start, end);
        const dayText = days === 1 ? 'день' : days > 4 ? 'дней' : 'дня';
        return `${formatTime(start)}. ${days} ${dayText}`;
    }
};

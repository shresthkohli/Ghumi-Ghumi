export function toInputTime(apiTime) {
    if (!apiTime) return "";
    return apiTime.slice(0, 5); 
}

export function formatDisplayTime(apiTime) {
    if (!apiTime) return "";

    const [hoursStr, minutesStr] = apiTime.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${period}`;
}

export function getTimeOfDayIcon(apiTime) {
    if (!apiTime) return "schedule";

    const hours = Number(apiTime.split(":")[0]);

    if (hours < 12) return "wb_twilight";
    if (hours < 17) return "sunny";
    return "bedtime";
}
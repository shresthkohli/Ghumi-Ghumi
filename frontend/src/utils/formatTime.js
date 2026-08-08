export function toInputTime(pgTime) {
    if (!pgTime) return "";
    return pgTime.slice(0, 5); 
}

export function toApiTime(inputTime) {
    if (!inputTime) return "";
    return `${inputTime}:00`; 
}

export function formatDisplayTime(pgTime) {
    if (!pgTime) return "";

    const [hoursStr, minutesStr] = pgTime.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${period}`;
}

export function getTimeOfDayIcon(pgTime) {
    if (!pgTime) return "schedule";

    const hours = Number(pgTime.split(":")[0]);

    if (hours < 12) return "wb_twilight";   
    if (hours < 17) return "sunny";         
    return "bedtime";                       
}
export function toInputTime(apiTime) {
    if (!apiTime) return "";
    return apiTime.slice(0, 5);
}

export function formatDisplayTime(apiTime) {
    if (!apiTime) return "";

    const [hoursStr, minutesStr] = apiTime.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) return apiTime;

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${period}`;
}

export function getTimeOfDayIcon(apiTime) {
    if (!apiTime) return "schedule";

    const hours = Number(apiTime.split(":")[0]);
    if (isNaN(hours)) return "schedule";

    if (hours >= 5 && hours < 12) return "wb_twilight"; // Morning
    if (hours >= 12 && hours < 17) return "sunny";       // Afternoon
    if (hours >= 17 && hours < 21) return "wb_twilight"; // Evening
    return "bedtime";                                    // Night
}

/**
 * Parses "HH:MM" (24-hour) into 12-hour components: { hour, minute, period }
 */
export function parseTimeTo12H(time24) {
    if (!time24 || !time24.includes(":")) {
        return { hour: 9, minute: "00", period: "AM" };
    }
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr, 10);
    const m = mStr ? mStr.slice(0, 2).padStart(2, "0") : "00";
    if (isNaN(h)) h = 9;

    const period = h >= 12 ? "PM" : "AM";
    let hour = h % 12;
    if (hour === 0) hour = 12;

    return { hour, minute: m, period };
}

/**
 * Converts 12-hour components to "HH:MM" 24-hour string
 */
export function formatTo24H(hour12, minute, period) {
    let h = parseInt(hour12, 10);
    if (isNaN(h)) h = 12;
    const m = (minute ?? "00").toString().padStart(2, "0");

    if (period === "AM") {
        if (h === 12) h = 0;
    } else {
        if (h !== 12) h += 12;
    }

    return `${h.toString().padStart(2, "0")}:${m}`;
}

/**
 * Adds minutes to a 24-hour time string "HH:MM", returning new "HH:MM"
 */
export function addMinutesToTime(time24, minutesToAdd) {
    if (!time24 || !time24.includes(":")) return "10:00";
    const [h, m] = time24.split(":").map(Number);
    const totalMinutes = h * 60 + m + minutesToAdd;
    // Cap at 23:59 or wrap
    const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
    const newH = Math.floor(wrapped / 60);
    const newM = wrapped % 60;
    return `${newH.toString().padStart(2, "0")}:${newM.toString().padStart(2, "0")}`;
}

/**
 * Computes duration string and validity between start and end time
 */
export function calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return { text: "", totalMinutes: 0, isValid: true };

    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);

    if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) {
        return { text: "", totalMinutes: 0, isValid: true };
    }

    const startTotal = sh * 60 + sm;
    const endTotal = eh * 60 + em;
    const diff = endTotal - startTotal;

    if (diff <= 0) {
        return { text: "End time must be after start time", totalMinutes: diff, isValid: false };
    }

    const hours = Math.floor(diff / 60);
    const mins = diff % 60;

    let text = "";
    if (hours > 0 && mins > 0) text = `${hours}h ${mins}m`;
    else if (hours > 0) text = `${hours} hr${hours > 1 ? "s" : ""}`;
    else text = `${mins} mins`;

    return { text, totalMinutes: diff, isValid: true };
}
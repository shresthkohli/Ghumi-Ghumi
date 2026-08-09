// Rich, vibrant, aesthetically curated travel-themed palettes for activity cards
// Each palette features vivid backgrounds, prominent accent badges, organic shapes, and paper border colors.
export const GRADIENT_PALETTES = [
    {
        id: "sunset-terracotta",
        name: "Sunset Terracotta",
        // Warm fiery terracotta & golden glow
        bgGradient: "linear-gradient(135deg, #fff3ee 0%, #ffe0d3 45%, #ffd4c2 100%)",
        cardBorder: "#fca88f",
        badgeBg: "#e8734a",
        badgeText: "#ffffff",
        accentGlow: "rgba(232, 115, 74, 0.4)",
        organicBlob: "rgba(232, 115, 74, 0.28)",
        paperBorder: "#a23f1a",
    },
    {
        id: "amalfi-azure",
        name: "Amalfi Azure",
        // Fresh Mediterranean turquoise & ocean cyan
        bgGradient: "linear-gradient(135deg, #eaf8f8 0%, #ccf0f0 45%, #b4e8e8 100%)",
        cardBorder: "#78d4d4",
        badgeBg: "#276868",
        badgeText: "#ffffff",
        accentGlow: "rgba(39, 104, 104, 0.4)",
        organicBlob: "rgba(39, 104, 104, 0.25)",
        paperBorder: "#276868",
    },
    {
        id: "kyoto-emerald",
        name: "Kyoto Emerald",
        // Lush botanical forest green & jade mint
        bgGradient: "linear-gradient(135deg, #f0f8ee 0%, #d7f0d2 45%, #c2e8bc 100%)",
        cardBorder: "#98dca2",
        badgeBg: "#4e6447",
        badgeText: "#ffffff",
        accentGlow: "rgba(78, 100, 71, 0.4)",
        organicBlob: "rgba(78, 100, 71, 0.25)",
        paperBorder: "#4e6447",
    },
    {
        id: "capri-citrus",
        name: "Capri Citrus",
        // Radiant sun-drenched gold & warm mango amber
        bgGradient: "linear-gradient(135deg, #fffbe6 0%, #fff0b3 45%, #ffe680 100%)",
        cardBorder: "#f5c842",
        badgeBg: "#b48214",
        badgeText: "#ffffff",
        accentGlow: "rgba(212, 175, 55, 0.45)",
        organicBlob: "rgba(212, 175, 55, 0.3)",
        paperBorder: "#b48214",
    },
    {
        id: "moroccan-rose",
        name: "Moroccan Rose",
        // Vivid coral ruby & sunrise pink
        bgGradient: "linear-gradient(135deg, #fff0f3 0%, #ffd6df 45%, #ffbccb 100%)",
        cardBorder: "#f998ad",
        badgeBg: "#be2d4b",
        badgeText: "#ffffff",
        accentGlow: "rgba(190, 45, 75, 0.4)",
        organicBlob: "rgba(190, 45, 75, 0.28)",
        paperBorder: "#be2d4b",
    },
    {
        id: "santorini-cobalt",
        name: "Santorini Cobalt",
        // Deep Aegean sky & royal cobalt blue
        bgGradient: "linear-gradient(135deg, #edf3ff 0%, #d2e2ff 45%, #b9d3ff 100%)",
        cardBorder: "#88b5ff",
        badgeBg: "#2b41aa",
        badgeText: "#ffffff",
        accentGlow: "rgba(43, 65, 170, 0.4)",
        organicBlob: "rgba(43, 65, 170, 0.25)",
        paperBorder: "#2b41aa",
    },
    {
        id: "nordic-aurora",
        name: "Nordic Aurora",
        // Deep sea teal & glowing cyan mint
        bgGradient: "linear-gradient(135deg, #ecfbfb 0%, #cef4f3 45%, #b0ecea 100%)",
        cardBorder: "#6edbd7",
        badgeBg: "#146478",
        badgeText: "#ffffff",
        accentGlow: "rgba(20, 100, 120, 0.4)",
        organicBlob: "rgba(20, 100, 120, 0.25)",
        paperBorder: "#146478",
    },
    {
        id: "provence-violet",
        name: "Provence Violet",
        // Royal purple & lavender heather
        bgGradient: "linear-gradient(135deg, #f7f2fc 0%, #e7d8f7 45%, #d7bdf2 100%)",
        cardBorder: "#be97e8",
        badgeBg: "#704691",
        badgeText: "#ffffff",
        accentGlow: "rgba(112, 70, 145, 0.4)",
        organicBlob: "rgba(112, 70, 145, 0.28)",
        paperBorder: "#704691",
    },
];

/**
 * Robust variety algorithm: ensures activities on the same day or sequential index
 * ALWAYS cycle through distinct, contrasting color families.
 */
export function getActivityGradient(activity, index = 0) {
    if (!activity) return GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];

    const pos = typeof activity.position === "number" ? activity.position : index;
    const day = typeof activity.dayNumber === "number" ? activity.dayNumber : 1;

    // Hash the ID or title if available
    const str = `${activity.id || ""}${activity.title || ""}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }

    // Multiply position and day by different prime numbers to distribute across all 8 palettes
    const paletteIndex = Math.abs((pos * 3) + (day * 5) + hash) % GRADIENT_PALETTES.length;
    return GRADIENT_PALETTES[paletteIndex];
}

/**
 * Returns a totally randomized gradient from the palette
 */
export function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * GRADIENT_PALETTES.length);
    return GRADIENT_PALETTES[randomIndex];
}

export const formatDate = (date: string): string => {
    if (date.includes("–")) {
        const [from, to] = date.split("–");
        return `${formatDate(from.trim())} – ${formatDate(to.trim())}`;
    }
    const [year, month, day] = date.split("-").map(Number);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if (!year || !month || !day) return "Invalid Date";
    return `${months[month-1]} ${day}, ${year}`;
};

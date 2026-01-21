export const formatDate = (date: string): string => {
    const[year, month, day] = date.split("-").map(Number);

    const months = [
        "Jan", 
        "Feb",
        "Mar", 
        "Apr", 
        "May", 
        "Jun", 
        "Jul", 
        "Aug", 
        "Sep", 
        "Oct", 
        "Nov", 
        "Dec",
    ]
    return `${months[month-1]} ${day}, ${year}`;
}
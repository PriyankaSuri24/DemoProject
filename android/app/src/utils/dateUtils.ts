export const getTodayRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return { from: start.getTime(), to: end.getTime() };
};

export const toDateKey = (time: number) => {
    const d = new Date(time); 
    const year = d.getFullYear(); 
    const month = String(d.getMonth() + 1).padStart(2, "0"); 
    const day = String(d.getDate()).padStart(2, "0"); 
    return `${year}-${month}-${day}`; 
};

export const getDateRangeLabel = (from?: number, to?: number) => {
  const fromKey = toDateKey(from || Date.now());
  const toKey = toDateKey(to || Date.now());
  return fromKey === toKey ? fromKey : `${fromKey}–${toKey}`;
};
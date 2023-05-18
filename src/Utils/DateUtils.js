export const parseDate = (dateString) => {
    let [month, day, year] = dateString.split('/');
    if (month.length === 1){
        month = "0" + month;
    }
    if (day.length === 1){
        day = "0" + day;
    }
    return new Date(`${year}-${month}-${day}`);
}

export const calculatePriorDate = (priorMonths) => {
    const date = new Date();
    
    // accessing current month of the date
    const currentMonth = date.getMonth();
    
    // subtracting required number of months
    date.setMonth(currentMonth - priorMonths);
    
    return date.toLocaleDateString();
};

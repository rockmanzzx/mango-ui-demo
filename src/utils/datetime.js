export function format(datetime) {
    return formatWithSeperator(datetime, "/", ":");
}

export function formatWithSeperator(datetime, dateSeperator, timeSeparator) {
    if (datetime != null) {
        const dateMat = new Date(datetime);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours();
        const mm = dateMat.getMinutes();
        const ss = dateMat.getSeconds();
        const timeFormat = year + dateSeperator + month + dateSeperator + day + " " + hh + timeSeparator + mm + timeSeparator + ss;
        return timeFormat;
    }
}
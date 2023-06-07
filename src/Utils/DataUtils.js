import { parseDate } from './DateUtils';

export function parseOneRMData(data, isFriend=false){
    let newDataPoints = [];
    data.forEach(item => {
        if (item !== null && item["E 1RM"] !== "" && item["Weight"] !== "#VALUE!") {
            let point = new Object();
            if (!isFriend) {
                point.e1rm = parseFloat(item["E 1RM"]);
                point.weight = parseFloat(item["Weight"]);
            } else {
                point.e1rm_friend = parseFloat(item["E 1RM"]);
                point.weight_friend = parseFloat(item["Weight"]);
            }
            point.reps = parseInt(item["Reps"], 10);
            point.date = parseDate(item["Date"]);
            point.date_string = item["Date"];
            newDataPoints.push(point);
        }
    })
    return newDataPoints;
}

export function parseVolumeData(data, isFriend=false){
    let newDataPoints = [];
    data.forEach(item => {
        if (item !== null && item["Volume"] !== "" && item["Volume"] !== "#VALUE!") {
            let point = new Object();
            if (!isFriend) {
                point.weight = parseFloat(item["Volume"]);
            } else {
                point.weight_friend = parseFloat(item["Volume"]);
            }
            point.date = parseDate(item["Date"]);
            point.date_string = item["Date"];
            newDataPoints.push(point);
        }
    })
    return newDataPoints;
}

export function getMaxOneRMDataPoints(newDataPoints, startDate, checked){

    let maxDataPoints = [];
    newDataPoints.forEach(item => {
    var itemDate = new Date(item.date_string)
    var minDate = new Date(startDate);
    if (itemDate < minDate) {
        null;
    }
    else {
        if (maxDataPoints.length === 0) {
            maxDataPoints.push(item);
        } else if (maxDataPoints[maxDataPoints.length - 1].date_string !== item.date_string) {
            maxDataPoints.push(item);
        } else if (maxDataPoints[maxDataPoints.length - 1].e1rm < item.e1rm || (checked && maxDataPoints[maxDataPoints.length - 1].e1rm_friend < item.e1rm_friend)) {
            maxDataPoints[maxDataPoints.length - 1] = item;
        }
    }
    })

    maxDataPoints.sort((a, b) => a.date - b.date)
    return maxDataPoints;

}

export function getMaxVolumeDataPoints(newDataPoints, startDate){
    let maxDataPoints = [];
    newDataPoints.forEach(item => {
    var itemDate = new Date(item.date_string)
    var minDate = new Date(startDate);
    if (itemDate < minDate) {
        null;
    }
    else {
        if (maxDataPoints.length === 0) {
            maxDataPoints.push(item);
        } else if (maxDataPoints[maxDataPoints.length - 1].date_string !== item.date_string) {
            maxDataPoints.push(item);
        } else {
            if(!maxDataPoints[maxDataPoints.length - 1].weight_friend){
                maxDataPoints[maxDataPoints.length - 1].weight += item.weight;
            }
            else {
                maxDataPoints[maxDataPoints.length - 1].weight_friend += item.weight_friend;
            }
        }
    }
    })

    maxDataPoints.sort((a, b) => a.date - b.date)
    return maxDataPoints;
}

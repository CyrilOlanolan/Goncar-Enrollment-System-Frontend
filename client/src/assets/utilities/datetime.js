/* USING DayJS utility */
const dayjs = require("dayjs");
dayjs().format();

// /* TIMEZONE PLUGIN */
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

export function getDateTime() {
    return dayjs().tz("Asia/Manila").toDate();
}

export function getDateString() {
    return dayjs().tz("Asia/Manila").format("DD MMMM YYYY");
}

export function getTimeString() {
    return {
        hours: dayjs().tz("Asia/Manila").format("hh"),
        minutes: dayjs().tz("Asia/Manila").format("mm"),
        seconds: dayjs().tz("Asia/Manila").format("ss"),
        ampm: dayjs().tz("Asia/Manila").format("A")
    }
}

export function stringifyDate(date) {
    return dayjs(date).format("MM/DD/YYYY");
}
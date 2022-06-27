/* USING DayJS utility */
const dayjs = require("dayjs");
dayjs().format();

// /* TIMEZONE PLUGIN */
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

function getDateTime() {
    return dayjs().tz("Asia/Manila").toDate();
}

function getDateString() {
    return dayjs().tz("Asia/Manila").format("DD MMMM YYYY");
}

function getTimeString() {
    return {
        hours: dayjs().tz("Asia/Manila").format("hh"),
        minutes: dayjs().tz("Asia/Manila").format("mm"),
        seconds: dayjs().tz("Asia/Manila").format("ss"),
        ampm: dayjs().tz("Asia/Manila").format("A")
    }
}

export { getDateTime, getDateString, getTimeString };
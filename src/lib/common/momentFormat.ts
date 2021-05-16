import _moment from "moment";
import { Logger } from "../logger";

export const momentFormat = {
    toMomentOrNull: (str: string) => {
        try {
            return _moment(str);
        } catch (e) {
            return null;
        }
    },
    YMD: (dateTime: any = _moment()) => {
        try {
            return _moment(dateTime).format("YYYY-MM-DD");
        } catch (e) {
            Logger.error(e);
            return null;
        }
    },
    shortTime: (dateTime: any = _moment()) => {
        try {
            const moment = _moment(dateTime);
            const desiredFormat = moment.minute() === 0 ? "ha" : "h:mma";
            return moment.format(desiredFormat);
        } catch (e) {
            return null;
        }
    },
    shortHours: (dateTime: any = _moment()) => {
        // should return hours diff ceilng value
        try {
            return Math.ceil(
                _moment.duration(_moment().diff(dateTime)).asHours()
            );
        } catch (e) {
            return null;
        }
    },
    shortMins: (dateTime: any = _moment()) => {
        // should return mins diff ceilng value
        try {
            return Math.ceil(
                _moment.duration(_moment().diff(dateTime)).asMinutes()
            );
        } catch (e) {
            return null;
        }
    },
    shortDay: (dateTime: any = _moment()) => {
        // should return name of days
        try {
            return _moment(dateTime).format("dddd");
        } catch (e) {
            return null;
        }
    },
    shortDayMonth: (dateTime: any = _moment()) => {
        try {
            return _moment(dateTime).format("D MMM");
        } catch (e) {
            return null;
        }
    },
    shortDayMonthYear: (dateTime: any = _moment()) => {
        try {
            return _moment(dateTime).format("D MMM YYYY");
        } catch (e) {
            return null;
        }
    },
    shortDayMonthYearYY: (dateTime: any = _moment()) => {
        try {
            return _moment(dateTime).format("D MMM YY");
        } catch (e) {
            return null;
        }
    },
    shortYear: (dateTime: any = _moment()) => {
        try {
            return _moment(dateTime).format("YYYY");
        } catch (e) {
            return null;
        }
    },
    mulesoft: (dateTime: any = _moment()) => {
        try {
            return _moment(dateTime).format("YYYY-MM-DDTHH:mm:ssZ");
        } catch (e) {
            return null;
        }
    },
};

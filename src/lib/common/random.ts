import moment from "moment";

let randomObj = {
    integer: (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    },
    number: (min, max) => {
        return Math.random() * (max - min) + min;
    },
    array: (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    boolean: () => {
        return Math.random() > 0.5;
    },
    backgroundColorStyle: () => {
        let styles = ["bg-green", "bg-blue"];

        return styles[Math.floor(Math.random() * styles.length)];
    },
    guidV4: () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    },
    phoneNumber: () => {
        let str = "04";
        for (let i = 0; i < 8; i++) {
            str = str + random.integer(0, 9);
        }
        return str;
    },
    email: () => {
        let start = ["fake", "bad", "ok", "word", "breakingTheDesigns6006"];
        let end = [
            "cqu.edu.au",
            "fake.com",
            "testing.au",
            "myAwesomeWebsite.com.au",
        ];
        return random.array(start) + "@" + random.array(end);
    },
    character: (includeLetters = true, includeNumbers = false) => {
        let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let numbers = "0123456789";
        let rnd = "";
        if (!includeLetters && !includeNumbers) {
            return "";
        }
        if (includeNumbers) {
            rnd = rnd + numbers;
        }
        if (includeLetters) {
            rnd = rnd + letters;
        }

        return rnd.charAt(randomObj.number(0, rnd.length));
    },
    productCode: (len) => {
        let ret = "";
        for (let i = 0; i < len; i++) {
            if (i < len / 2) {
                ret = ret + randomObj.character();
            } else {
                ret = ret + randomObj.character(false);
            }
        }

        return ret;
    },
    moment: (startDate, endDate) => {
        const start = moment(startDate);
        const end = moment(endDate);

        const secondsDiff = start.diff(end, "seconds");
        const seconds = randomObj.number(0, secondsDiff);
        return start.add(seconds);
    },
};

export const random = randomObj;

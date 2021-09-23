module.exports = {
    // the helper method 'format_time' will take in a timestamp and return a custom formatted string
    format_time: (date) => {
        //'toLocaleTimeString()' method to format the time with custom parameters
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    },
    //cuts the length of blog content down for front page/index
    format_summary: (content) => {
        if (content.length > 300) {
            return content.substring(0, 300) + "...";
        } else {
            return content;
        }
    },
    //formats create at date string for twitter feeds
    format_time_twitter: (str) => {
        const myDate = new Date(str);
        return myDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    },
    //adds @ sign to screen names if necessary for feed
    at_sign_format_twitter: (str) => {
        if (str.charAt(0) !== "@") {
            return "@" + str;
        }
        return str;
    },
};

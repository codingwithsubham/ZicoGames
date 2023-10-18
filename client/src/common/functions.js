import moment from 'moment';

export const getWebsiteUp = () => {
    let date_now = moment(new Date());
    let date_opened = moment(new Date("1/2/2023, 4:00:30 PM"));
    let time = date_now - date_opened;
    return time;
}

export const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// export const showulDisplay = () => {
//     var standalone = window.navigator.standalone,
//         userAgent = window.navigator.userAgent.toLowerCase(),
//         safari = /safari/.test(userAgent),
//         ios = /iphone|ipod|ipad/.test(userAgent);

//     if (ios) {
//         if (!standalone && safari) {
//             return true;
//         } else if (!standalone && !safari) {
//             return false;
//         };
//     } else {
//         if (userAgent.includes('wv')) {
//             return false;
//         } else {
//             return true;
//         }
//     };
// }

export const showulDisplay = () => {
    var standalone = window.navigator.standalone,
        userAgent = window.navigator.userAgent.toLowerCase(),
        safari = /safari/.test(userAgent),
        ios = /iphone|ipod|ipad/.test(userAgent);

    if (ios) {
        if (!standalone && safari) {
            return false;
        } else if (!standalone && !safari) {
            return true;
        };
    } else {
        if (userAgent.includes('wv')) {
            return true;
        } else {
            return false;
        }
    };
}

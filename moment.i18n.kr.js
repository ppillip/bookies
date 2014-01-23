moment.lang('kr', {
    months : "1월 2월 3월 4월 5월 6월 7월 8월 9월 10월 11월 12월".split(" "),
    monthsShort : "1월 2월 3월 4월 5월 6월 7월 8월 9월 10월 11월 12월".split(" "),
    weekdays : "일요일 월요일 화요일 수요일 목요일 금요일 토요일".split(" "),
    weekdaysShort : "일 월 화 수 목 금 토".split(" "),
    longDateFormat : {
        L: "YYYY.MM.DD",
        LL: "YYYY년 MMMM D일",
        LLL: "YYYY년 MMMM D일 LT",
        LLLL: "YYYY년 MMMM D일 dddd LT",
        LT: "A h시 mm분"
    },
    meridiem : {
        AM : '오전',
        am : '오전',
        PM : '오후',
        pm : '오후'
    },
    calendar : {
        lastDay: "어제 LT",
        lastWeek: "지난주 dddd LT",
        nextDay: "내일 LT",
        nextWeek: "dddd LT",
        sameDay: "오늘 LT",
        sameElse: "L"
    },
    relativeTime : {
        M: "한달",
        MM: "%d달",
        d: "하루",
        dd: "%d일",
        future: "%s 후",
        h: "한시간",
        hh: "%d시간",
        m: "일분",
        mm: "%d분",
        past: "%s 전",
        s: "몇초",
        ss: "%d초",
        y: "일년",
        yy: "%d년"
    },
    ordinal : function (number) {
        return (~~ (number % 100 / 10) === 1) ? '일' : '일';
    }
});

/**/
new Vue({
  el: '#app',
  data: {
    weeks: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
    calDate: {year: 0, month: 0}
  },
  created: function() {
    var date = new Date();
    this.calDate.year = date.getFullYear();
    this.calDate.month = date.getMonth() + 1;
  },
  methods: {
    getMonthName: function(month) {
      var monthName = ['1','2','3','4','5','6','7','8','9','10','11','12'];
      // 1月だったらmonthNameの配列の頭０を取得
      return monthName[month - 1];
    },
    movePrevMonth: function() {
      if (this.calDate.month == 1) {
        this.calDate.year--;
        this.calDate.month = 12;
      }else {
        this.calDate.month--;
      }
    },
    moveNextMonth: function() {
      if (this.calDate.month == 12) {
        this.calDate.year++;
        this.calDate.month = 1;
      }else {
        this.calDate.month++;
      }
    }
  },
  computed: {
    calendar: function() {
      // 日曜始まりではなく、月曜日はじまりに対応したいので、全て-1する。ただし、日曜日に関しては６にする。
      var firstDay_s = new Date(this.calDate.year, this.calDate.month - 1, 1).getDay();
      var firstDay;
      if (firstDay_s == 0){
        firstDay = 6;
      } else {
        firstDay = firstDay_s - 1;
      }
      var lastDate = new Date(this.calDate.year, this.calDate.month, 0).getDate();
      var dayCount = 1;
      var calendar = [];
      for (var w = 0; w < 6; w++) {
        var week = [];

        // 空白の行をなくす
        if (lastDate < dayCount) {break;}

        for (var d = 0; d < 7; d++) {
          if (w == 0 && d < firstDay) {
            week[d] = {day: ''};
          } else if (w == 6 && lastDate < dayIdx) {
            week[d] = {day: ''};
            dayCount++;
          } else if (lastDate < dayCount) {
            week[d] = {day: ''};
            dayCount++;
          } else {
            week[d] = {day: dayCount};
            dayCount++;
          }
        }
        calendar.push(week);
      }
      return calendar;
    }
  }
});
const getWeek = () => {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const date = new Date();
  const dayindex = date.getDay() - 1;
  let dict = {};
  let days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let t = 0;
  for (let i = dayindex; i < dayindex + 7; i++) {
    let nextDay = i % 7;
    dict[days[nextDay]] = date.addDays(t);
    dict[days[nextDay]] = dict[days[nextDay]].toISOString().split("T")[0];
    t += 1;
  }
  return dict;
};

console.log(getWeek());

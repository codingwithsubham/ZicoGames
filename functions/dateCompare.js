const isGreaterDate = (date) => {
  const d1 = new Date();
  const d2 = new Date(date);

  if (d2.getTime() >= d1.getTime()) {
    return true;
  } else {
    return false;
  }
};

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(d) {
  if (!d) return null;
  var date = d.getDate(), month = d.getMonth(), year = d.getFullYear();
  return addZero(date) + "/" + addZero(month + 1) + "/" + year;

}

function addZero(val) {
  return val < 10 ? "0" + val : val;
}

module.exports = { isGreaterDate, addDays, formatDate };

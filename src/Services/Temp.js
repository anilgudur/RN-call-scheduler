class CallService {
  const generateDate = (row, date, arr) => {
    return new Promise((resolve, reject) => {
      let newRow = Object.assign({}, row, {
        generatedScheduleDate: moment(date).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      });
      arr.push(newRow);
      resolve(arr);
    });
  }
}

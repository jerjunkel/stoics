const setQOD = require("../utilities/setQOD");
const onTick = () => {
  setQOD();
};
module.exports = (cron) => {
  const job = new cron.CronJob(
    "0 1 * * *",
    onTick,
    null,
    false,
    "America/New_York"
  );
};

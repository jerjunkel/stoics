const qodStore = require("../store/qod");
const setQOD = require("../utilities/setQOD");
const onTick = () => {
  setQOD();
};
module.exports = (cron) => {
  const job = new cron.CronJob(
    "0 1 * * *",
    onTick,
    null,
    true,
    "America/Los_Angeles"
  );
  job.start();
};

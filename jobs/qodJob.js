module.exports = (cron, fn, config = {}) => {
  const job = new cron.CronJob(
    "* * * * *",
    fn,
    null,
    true,
    "America/Los_Angeles"
  );
  job.start();
};

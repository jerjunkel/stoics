const qodStore = require("../store/qod");
const getRandomQuote = require("../utilities/getRandomQuote");
const onTick = () => {
  getRandomQuote()
    .then((quote) => {
      qodStore.actions.update(quote);
    })
    .catch((err) => console.log(err));
};
module.exports = (cron) => {
  const job = new cron.CronJob(
    "* * * * *",
    onTick,
    null,
    true,
    "America/Los_Angeles"
  );
  job.start();
};

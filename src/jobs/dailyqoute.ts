import { getDailyQuote } from "../utils/quotes.js";
import { CronJob } from "cron";
const onTick = () => {
  getDailyQuote();
};
export default CronJob.from({
  cronTime: "0 1 * * *",
  onTick,
  runOnInit: true,
  timeZone: "America/New_York",
});

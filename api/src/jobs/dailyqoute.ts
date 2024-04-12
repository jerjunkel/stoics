import { CronJob } from "cron";
import QuoteRespository from "../repositories/quotes.repository.js";
import QuoteService from "../services/quotes.service.js";

const service = new QuoteService(new QuoteRespository());

const onTick = async () => {
  if (await service.isTodayQuoteSet()) {
    return;
  }
  await service.setTodaysQuote();
};

export default CronJob.from({
  cronTime: "0 1 * * *",
  onTick,
  runOnInit: true,
  timeZone: "America/New_York",
});

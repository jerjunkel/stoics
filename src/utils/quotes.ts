import Quote from "../models/Quote.js";

const getRandomQuote = async (
  predicate: any[] = [{ $sample: { size: 1 } }]
) => {
  const quotes = await Quote.aggregate(predicate);
  return quotes.length == 0 ? null : quotes[0];
};

const setDailyQuote = async (day: number) => {
  const quote = await getRandomQuote([
    {
      $sample: { size: 1 },
    },
    { $match: { day: undefined } },
  ]);

  if (!quote) return null;

  const dailyQuote = await Quote.findByIdAndUpdate(quote._id, { day });
  return dailyQuote;
};

const getDailyQuote = async () => {
  const day = dayOfTheYear(new Date());
  let quote = await Quote.findOne({ day });

  if (quote) return quote;

  quote = await setDailyQuote(day);

  return quote;
};

function dayOfTheYear(date: Date) {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
}

export { getRandomQuote, getDailyQuote };

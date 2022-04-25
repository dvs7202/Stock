import nodeCron from "node-cron";
import axios from "axios";
import { DateTime } from "luxon";

import Stocks from "../models/stockModel.js";
//'*/1 * * * *' every 1 min.
//'59 23 * * *' every day 23:59PM

console.log("scanner runniing");

var scanner = nodeCron.schedule("59 23 * * *", async () => {
  console.log("scheduler => archived");
  const stock = await Stocks.find().select("stockName -_id");
  console.log(stock);
  for (var i in stock) {
    var data = await searchStonks(stock[i].stockName);
    console.log(data);
  }
});
async function searchStonks(stockName) {
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockName}&interval=5min&apikey=${process.env.API_KEY}`;
  var url1 = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stockName}&apikey=${process.env.API_KEY}`;
  const response = await axios(url);
  var stockData = getChartData(response, stockName);

  return response;
}

async function getChartData(stockData, stockName) {
  var ohlc = [],
    volume = [],
    dataLength = stockData.data["Time Series (5min)"];
  for (var time in dataLength) {
    var stock_info = dataLength[time];
    var date = DateTime.fromSQL(time).ts;
    var open = Number(stock_info["1. open"]);
    var close = Number(stock_info["2. high"]);
    var high = Number(stock_info["3. low"]);
    var low = Number(stock_info["4. close"]);
    ohlc.push({
      x: date,
      o: open,
      h: high,
      l: low,
      c: close,
    });
    volume.push([
      time, // the date
      Number(stock_info["5. volume"]), // the volume
    ]);

    var data = await Stocks.findOneAndUpdate({ stockName }, { data: ohlc });
    console.log(data);
  }
}

export default scanner;

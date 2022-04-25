import Stocks from "../models/stockModel";
import axios from "axios";
import search from "../models/searchModel.js";
import { DateTime } from "luxon";
import logger from "../config/logger";
import catchAsync from "../utils/catchAsync";

//get stock data
async function getChartData(stockData, stockName, userId) {
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
      time,
      Number(stock_info["5. volume"]), // the volume
    ]);
  }
  //stock data store in db
  const storeInDB = await Stocks.create({
    stockName: stockName,
    data: ohlc,
  });
  //stock search history store in db
  await storeSearchInDB(stockName, storeInDB.id, userId);
  return ohlc;
}

const getStockData = catchAsync(async (req, res, next) => {
  logger.info("in get stocks");
  const { stockName } = req.body;
  console.log(stockName);
  const data = await searchStonksInDB(stockName.toUpperCase());

  console.log(data);
  if (data) {
    await storeSearchInDB(data.stockName, data.id, req.user);
    logger.info("stock name" + data.stockName);
    var data1 = JSON.stringify(data.data);
    return res.render("search", {
      ohlc: data1,
      error: null,
      name: data.stockName,
    });
  }
  // console.log("data");
  const stockData = await searchStonks(stockName);
  if (!stockData.data["Error Message"]) {
    var ohlc = await getChartData(stockData, stockName, req.user.id);
    var data1 = JSON.stringify(ohlc);
    return res.render("search", {
      ohlc: data1,
      error: null,
      name: stockName,
    });
  }

  return res.render("search", {
    ohlc: null,
    error: "Invalid name",
    name: null,
  });
});

// stocks data from api
async function searchStonks(stockName) {
  //search for intraday
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockName}&interval=5min&apikey=${process.env.API_KEY}`;

  // search for 7days
  // var url1 = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stockName}&apikey=${process.env.API_KEY}`;
  const response = await axios(url);
  console.log(response);
  return response;
}

//search data in DB
async function searchStonksInDB(stockName) {
  console.log("in search db");
  const stock = await Stocks.findOne({ stockName });
  console.log("hello1" + stock);
  return stock;
}

//store search data in db
async function storeSearchInDB(stockName, dataId, userId) {
  console.log("user id " + userId);
  //check if data already availble
  const stock = await search.findOne({ stockName, user: userId });
  if (stock) {
    return;
  }
  //if not store in db
  const storeSearchInDB = await search.create({
    stockName: stockName,
    user: userId,
    data: dataId,
  });
  console.log(storeSearchInDB);
  return;
}

export default {
  getStockData,
};

import fetch from "node-fetch";
import db from "../connections/dbConnection";
import Stock from "../models/stockModel";

db();

async function getstock() {
  const myStock = await fetch(
    "https://financialmodelingprep.com/api/v3/enterprise-values/AAPL?limit=40&apikey=6e64d625004ed5ea804e9fae12eb24ef"
  );
  const response = await myStock.json();

  try {
    for (let i = 0; i < response.length; i++) {
      const stock = new Stock({
        symbol: response[i]["symbol"],
        date: response[i]["date"],
        stockPrice: response[i]["stockPrice"],
        numberOfShares: response[i]["numberOfShares"],
        marketCapitalization: response[i]["marketCapitalization"],
        minusCashAndCashEquivalents: response[i]["minusCashAndCashEquivalents"],
        addTotalDebt: response[i]["addTotalDebt"],
        enterpriseValue: response[i]["enterpriseValue"],
      });
      stock.save();
    }
  } catch (error) {
    console.log(error);
  }
}

const stock = getstock();
export default stock;

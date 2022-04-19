import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Creating User schema
const stockSchema = new mongoose.Schema({
  symbol: String,
  date: Date,
  stockPrice: Number,
  numberOfShares: Number,
  marketCapitalization: Number,
  minusCashAndCashEquivalents: Number,
  addTotalDebt: Number,
  enterpriseValue: Number,
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;

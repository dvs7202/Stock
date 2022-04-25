import mongoose from "mongoose";

// Creating stock schema
const stockSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      uppercase: true,
      required: true,
    },
    data: [
      {
        x: String,
        o: String,
        h: String,
        l: String,
        c: String,
      },
    ],
  },
  { timestamps: true }
);

const Stocks = mongoose.model("Stocks", stockSchema);

export default Stocks;

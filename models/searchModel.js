import mongoose from "mongoose";

//Creating a Search schema

const searchSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      uppercase: true,
      required: true,
    },
    data: {
      type: mongoose.Types.ObjectId,
      ref: "Stocks",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Search = mongoose.model("Search", searchSchema);

export default Search;

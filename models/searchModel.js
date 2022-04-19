import mongoose from "mongoose";

//Creating a Search schema

const searchSchema = new mongoose.Schema({
  search: String,
  searchBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

const Search = mongoose.model("Search", searchSchema);

export default Search;

import Stock from "../models/stockModel";
import Search from "../models/searchModel";
import { find } from "../helpers/common";
export const searchstock = async (req, res, next) => {
  const searchedField = await req.query.symbol;

  await Search.create({ search: searchedField, searchBy: req.user.id });

  Stock.find({ symbol: { $regex: searchedField, $options: "$i" } }).then(
    (data) => {
      res.send(data);
    }
  );
};

export const getmysearch = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const data = {
      searchedBy: user.id,
    };
    const pastsearching = await Search.find({ searchBy: user.id });

    pastsearching.length > 0
      ? res.status(200).json({
          status: "success",
          data: pastsearching,
        })
      : res.status(403).json({
          status: "fail",
          data: "No Search perform",
        });
  } catch (error) {
    next(new Error(error));
  }
};

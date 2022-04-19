import Stock from "./models/stockModel";

export const searchstock = async (req, res, next) => {
  const searchedField = await req.query.symbol;
  Stock.find({ symbol: { $regex: searchedField, $options: "$i" } }).then(
    (data) => {
      res.send(data);
    }
  );
};

export const getmysearch = async (req, res, next) => {
  try {
    const user = req.user;
    const data = {
      searchedBy: user.id,
    };
    const pastsearching = await find(user, data);

    pastsearching.length > 0
      ? res.status(200).json({
          status: "success",
          data: pastsearching,
        })
      : res.status(403).json({
          status: "failed",
          data: "",
        });
  } catch (error) {
    next(new Error(error));
  }
};

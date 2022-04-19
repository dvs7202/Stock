// create

export const create = async (model, data) => {
  try {
    const doc = await model.create(data);
    return doc ? doc : false;
  } catch (err) {
    return false;
  }
};

//find

export const findOne = async (model, data) => {
  try {
    data.isDeleted = false;
    const doc = await model.findOne(data);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

//Find all
export const find = async (model, data) => {
  try {
    if (!data) {
      data = {};
    }
    data.isDeleted = false;
    const doc = await model.find(data);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

export const deleteOne = async (model, data) => {
  try {
    console.log("deleteone");
    console.log(data);
    data.isDeleted = false;
    const doc = await model.findOneAndUpdate(data, {
      isDeleted: true,
    });
    //console.log("got data",doc);
    return doc ? doc : false;
  } catch (error) {
    new Error(error);
  }
};

import Budget from "../models/budget.model.js";

export const getAllBudgetsController = async (req, res) => {
  try {
    const allBudgets = await Budget.find();

    return res.status(200).json(allBudgets);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

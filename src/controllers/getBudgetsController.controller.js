import Budget from "../models/budget.model.js";

export const getBudgetsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const budget = await Budget.findOne({
        _id: id,
        userId: req.user._id,
      });

      if (!budget) {
        return res.status(404).json({ message: "Budget not found." });
      }

      return res.status(200).json(budget);
    }

    const userBudgets = await Budget.find({ userId: req.user._id });

    return res.status(200).json(userBudgets);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

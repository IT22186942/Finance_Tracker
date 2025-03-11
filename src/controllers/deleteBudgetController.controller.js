import Budget from "../models/budget.model.js";

export const deleteBudgetController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Budget ID is required." });
    }

    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found." });
    }

    return res.status(200).json({
      message: "Budget deleted successfully.",
      data: deletedBudget,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

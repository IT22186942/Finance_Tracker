import Budget from "../models/budget.model.js";

export const updateBudgetController = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid request, Missing ID or data." });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found." });
    }

    // Check if budget exceeds 80% of the limit
    let alertMessage = null;
    if (updatedBudget.spent >= updatedBudget.limit * 0.8) {
      alertMessage = `Warning: You've used ${updatedBudget.spent} of your ${updatedBudget.limit} budget for ${updatedBudget.category}.`;
    }

    return res.status(200).json({
      message: "Budget updated successfully.",
      data: updatedBudget,
      alert: alertMessage,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

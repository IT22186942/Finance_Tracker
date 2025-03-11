import Budget from "../models/budget.model.js";

export const addBudgetController = async (req, res) => {
  try {
    const { category, limit, month, year } = req.body;
    const userId = req.user._id;

    if (!category || !limit || !month || !year) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if budget already exists for the same category and month
    let budget = await Budget.findOne({ userId, category, month, year });

    if (budget) {
      // If budget exists, update the limit
      budget.limit = limit;
      await budget.save();
      return res.json({ message: "Budget updated successfully.", budget });
    }

    // If no existing budget, create a new one
    budget = new Budget({ userId, category, limit, month, year });
    await budget.save();

    return res
      .status(201)
      .json({ message: "Budget set successfully.", budget });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

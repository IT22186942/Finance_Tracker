import Transaction from "../models/transaction.model.js";

export const getTransactionsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, tag, sortBy, order } = req.body;
    const userId = req.user._id;

    if (id) {
      const transaction = await Transaction.findOne({ _id: id, userId });

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found." });
      }

      return res.status(200).json(transaction);
    }

    // Build query filter
    let query = { userId };
    if (type) query.type = type; // Filter by income or expense
    if (category) query.category = category; // Filter by category
    if (tag) query.tags = tag; // Filter by specific tag

    // Sorting logic
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1; // Ascending or Descending
    } else {
      sortOptions["date"] = -1; // Default: Newest first
    }

    const userTransactions = await Transaction.find(query).sort(sortOptions);

    return res.status(200).json(userTransactions);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

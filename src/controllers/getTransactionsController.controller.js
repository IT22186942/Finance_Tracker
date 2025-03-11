import Transaction from "../models/transaction.model.js";

export const getTransactionsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const transaction = await Transaction.findOne({
        _id: id,
        userId: req.user._id,
      });

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found." });
      }

      return res.status(200).json(transaction);
    }

    const userTransactions = await Transaction.find({ userId: req.user._id });

    return res.status(200).json(userTransactions);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

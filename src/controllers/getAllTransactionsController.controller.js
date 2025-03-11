import Transaction from "../models/transaction.model.js";

export const getAllTransactionsController = async (req, res) => {
  try {
    const allTransactions = await Transaction.find();

    return res.status(200).json(allTransactions);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

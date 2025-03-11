import Transaction from "../models/transaction.model.js";

export const addTransactionController = async (req, res) => {
  try {
    const transactionToBeAdded = { ...req.body, userId: req.user._id };
    const transaction = new Transaction(transactionToBeAdded);

    const newTransaction = await transaction.save();
    res.status(201).json({
      message: "Transaction added successfully.",
      data: newTransaction,
    });
  } catch (err) {
    return res``
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

import Transaction from "../models/transaction.model.js";

export const updateTransactionController = async (req, res) => {
  try {
    let { id, ...updateData } = req.body;

    if (!id || !updateData) {
      return res
        .status(400)
        .json({ message: "Invalid request, Missing ID or data." });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    return res.status(200).json({
      message: "Transaction updated successfully.",
      data: updatedTransaction,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};

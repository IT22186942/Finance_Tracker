import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required."],
    },
    date: {
      type: Date,
      required: [true, "Transaction date is required."],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transactions", transactionSchema);

export default Transaction;

import mongoose from "mongoose";

const budgetSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    limit: {
      type: Number,
      required: [true, "Budget limit is required."],
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
      required: [true, "Month is required."],
    },
    year: {
      type: Number,
      required: [true, "Year is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budgets", budgetSchema);

export default Budget;

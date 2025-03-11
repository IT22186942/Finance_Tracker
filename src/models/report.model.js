import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
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
    totalIncome: {
      type: Number,
      default: 0,
    },
    totalExpenses: {
      type: Number,
      default: 0,
    },
    savings: {
      type: Number,
      default: function () {
        return this.totalIncome - this.totalExpenses;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Reports", reportSchema);

export default Report;

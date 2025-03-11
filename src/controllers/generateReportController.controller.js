import Transaction from "../models/transaction.model.js";
import Report from "../models/report.model.js";

export const generateReportController = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.body; // Filtering criteria
    const userId = req.user.id;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required." });
    }

    // Convert dates to JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Ensure end date includes the entire day

    // Build query filter
    let query = { userId, date: { $gte: start, $lte: end } };
    if (category) query.category = category; // Optional category filter

    // Fetch transactions
    const transactions = await Transaction.find(query);

    let totalIncome = 0,
      totalExpenses = 0;
    let categoryBreakdown = {}; // For category-based spending trends

    transactions.forEach((tx) => {
      if (tx.type === "income") {
        totalIncome += tx.amount;
      } else {
        totalExpenses += tx.amount;

        // Track category-based expenses
        categoryBreakdown[tx.category] =
          (categoryBreakdown[tx.category] || 0) + tx.amount;
      }
    });

    const savings = totalIncome - totalExpenses;

    // Prepare report object
    const reportData = {
      userId,
      startDate,
      endDate,
      totalIncome,
      totalExpenses,
      savings,
      categoryBreakdown,
    };

    return res.status(200).json({
      message: "Report generated successfully.",
      report: reportData,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

// controllers/transaction.controller.js
import Transaction from "../models/Transaction.js";
const getMyBuys = async (req, res) => {
  const buys = await Transaction.find({ buyer: req.user.id })
    .populate("offer")
    .sort({ createdAt: -1 });
  res.json(buys);
};

const getMySales = async (req, res) => {
  const sales = await Transaction.find({ seller: req.user.id })
    .populate("offer")
    .sort({ createdAt: -1 });
  res.json(sales);
};

export { getMyBuys, getMySales };

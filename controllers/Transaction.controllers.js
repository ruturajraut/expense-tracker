import Transaction from '../models/Transaction.models.js';

// CREATE
export const createTransaction = async (req, res) => {
  try {
    const newTx = new Transaction(req.body);
    const savedTx = await newTx.save();
    res.status(201).json(savedTx);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ with filters
export const getTransactions = async (req, res) => {
  const { type, category, startDate, endDate } = req.query;

  let filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate && endDate) {
    filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

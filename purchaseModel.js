// purchaseModel.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    purchaseNumber: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    supplier: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);

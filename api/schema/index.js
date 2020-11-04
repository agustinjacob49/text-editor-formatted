const mongoose = require('mongoose');

module.exports = mongoose => {
  const Document = mongoose.model(
    "document",
    mongoose.Schema(
      {
        nombre: String,
        lines: Array
      },
      { timestamps: true }
    )
  );

  return Document;
};
const mongoose = require('mongoose');

const counsellorPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

export const counsellorPerson = mongoose.model('counsellorPerson', counsellorPersonSchema);

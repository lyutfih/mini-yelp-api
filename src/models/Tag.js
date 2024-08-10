const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tag_name: String
});

module.exports = mongoose.model('Tag', TagSchema);

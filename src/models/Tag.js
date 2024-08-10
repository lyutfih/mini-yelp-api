const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tag_name: String
});

TagSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });
  
TagSchema.set('toObject', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });

module.exports = mongoose.model('Tag', TagSchema);

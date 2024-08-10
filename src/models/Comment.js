const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  user_id: String,
  text: String,
  rating: Number
});

CommentSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });
  
CommentSchema.set('toObject', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });

module.exports = mongoose.model('Comment', CommentSchema);

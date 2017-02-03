import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  text: {type: String, required: true}
})

exports.Message = mongoose.model('Message', messageSchema);

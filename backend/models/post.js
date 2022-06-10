//MongoDB Setup
const mongoose = require('mongoose');

//Create the Schema or Blueprint
const postSchema = mongoose.Schema({
  title: {type: String, required: true },
  content: {type: String, required: true },
});

//Export the created model
module.exports = mongoose.model('Post',postSchema);

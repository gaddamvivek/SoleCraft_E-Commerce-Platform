const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    data: Buffer, // or you can use GridFS for larger files
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;

var mongoose = require("mongoose");

var yorumSchema = new mongoose.Schema({
	text	: String,
	yazar	: String
});
module.exports = mongoose.model("Yorum", yorumSchema);

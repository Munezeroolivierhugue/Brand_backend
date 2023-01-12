const { string } = require("@hapi/joi")
const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: String,
	content: String,
    Image: String,
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    likes: {
        type: Number,
        default: 0
}
})
    

module.exports = mongoose.model("Blog", schema)
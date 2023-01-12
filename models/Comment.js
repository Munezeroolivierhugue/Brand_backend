const mongoose = require("mongoose")

const schema = mongoose.Schema({
    blog_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    username: String,
    comment: String,
})

module.exports = mongoose.model("Comment", schema)
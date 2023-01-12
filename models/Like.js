const mongoose = require("mongoose")

const schema = mongoose.Schema({
    blog_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    likes: Number
})

module.exports = mongoose.model("Like", schema)
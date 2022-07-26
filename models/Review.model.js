const { Schema, model } = require('mongoose')

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
            maxlength: 250
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Review', reviewSchema)
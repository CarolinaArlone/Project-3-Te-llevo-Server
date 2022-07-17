const { Schema, model } = require('mongoose')

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5
        },
        reviewDate: {
            type: Date,
            default: Date.now,
            required: true
        },
        text: {
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
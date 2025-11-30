import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        foodName: {
            type: String,
            required: true,
        },
        foodTag: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        // Original expiry date (e.g., best before date)
        expiryDate: {
            type: Date,
            required: true,
        },
        // How many hours this food will stay good
        expiryHours: {
            type: Number,
        },
        // When the food was prepared/made
        madeDate: {
            type: Date,
        },
        // Quantity unit: kg, pieces, etc.
        quantityUnit: {
            type: String,
            default: "kg",
        },
        address: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiverAddress: {
            type: String,
        },
        // Basic status tracking for history
        status: {
            type: String,
            enum: ["available", "ordered", "picked"],
            default: "available",
        },
        orderedAt: {
            type: Date,
        },
        pickedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;

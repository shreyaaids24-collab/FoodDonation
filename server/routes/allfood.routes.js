import { Router } from "express";
import Food from "../models/food.js";
import { verifyToken } from "../controllers/auth.js";

const router = Router();

router.get("/allfoods", verifyToken, async (req, res) => {
    try {
        const allFood = await Food.find();
        res.status(200).json(allFood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// History: only booked or picked items within the last 3 months
router.get("/historyfoods", verifyToken, async (req, res) => {
    try {
        const now = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const history = await Food.find({
            status: { $in: ["ordered", "picked"] },
            createdAt: { $gte: threeMonthsAgo, $lte: now },
        });

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Book a specific food item (receiver books the food)
router.patch("/food/:id/book", verifyToken, async (req, res) => {
    try {
        const { address } = req.body;
        const { id } = req.params;

        const food = await Food.findByIdAndUpdate(
            id,
            {
                status: "ordered",
                orderedAt: new Date(),
                receiverAddress: address,
            },
            { new: true }
        );

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.status(200).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;

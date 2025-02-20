import express from "express";
import { Kudo } from "../models/kudo.model.js";
import { User } from "../models/user.model.js";
import { updateMetrics } from "../utils/metrics.js";

const router = express.Router();

router.post("/give-kudos", async (req, res) => {
  const { sender, receiver, message, category } = req.body;

  try {
    
    const validCategories = [
      "Teamwork",
      "Innovation",
      "Leadership",
      "Excellence",
      "Help",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }


    const newKudo = new Kudo({ sender, receiver, message, category });
    await newKudo.save();

    await User.findByIdAndUpdate(sender, {
      $push: { kudosGiven: newKudo._id },
    });


    await User.findByIdAndUpdate(receiver, {
      $push: { kudosReceived: newKudo._id },
    });
    await updateMetrics(sender, receiver, category);

    res
      .status(201)
      .json({ message: "Kudos sent successfully!", kudo: newKudo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error sending kudos" });
  }
});

const categories = [
  "Teamwork",
  "Innovation",
  "Leadership",
  "Excellence",
  "Help",
];

// Route to get all categories
router.get("/categories", (req, res) => {
  try {
    res.status(200).json({ categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching categories" });
  }
});
router.get("/newsfeed", async (req, res) => {
  try {

    const kudos = await Kudo.find()
      .populate("sender", "name email") 
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(kudos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching kudos" });
  }
});
//

router.get("/kudos-by-category", async (req, res) => {
  try {
    const data = await Kudo.aggregate([
      {
        $group: {
          _id: "$category", 
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch kudos by category" });
  }
});

router.post('/like/:kudoId', async (req, res) => {
    const { userId } = req.body;
    const { kudoId } = req.params;
  
    try {
      const kudo = await Kudo.findById(kudoId);
      if (!kudo) return res.status(404).json({ message: 'Kudo not found' });
  
      const isLiked = kudo.likes.includes(userId);
  
      if (isLiked) {
        // Unlike the kudo
        kudo.likes = kudo.likes.filter(id => id.toString() !== userId);
        kudo.likeCount -= 1; // Decrement count
      } else {
        // Like the kudo
        kudo.likes.push(userId);
        kudo.likeCount += 1; // Increment count
      }
  
      await kudo.save();
  
      res.status(200).json({
        message: isLiked ? 'Kudo unliked' : 'Kudo liked',
        likeCount: kudo.likeCount
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/most-liked', async (req, res) => {
    try {
      // Find the kudo with the most likes
      const kudo = await Kudo.findOne()
        .sort({ likeCount: -1 }) // Sort by `likeCount` in descending order
        .populate('sender', 'name email') // Populate sender details
        .populate('receiver', 'name email') // Populate receiver details
        .exec();
  
      if (!kudo) {
        return res.status(404).json({ message: 'No kudos found' });
      }
  
      res.status(200).json({
        kudo: {
          id: kudo._id,
          message: kudo.message,
          category: kudo.category,
          likeCount: kudo.likeCount,
          sender: kudo.sender,
          receiver: kudo.receiver
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
   
  

export default router;

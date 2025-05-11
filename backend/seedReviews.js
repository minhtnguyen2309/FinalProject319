
import mongoose from 'mongoose';
import Review from './models/Review.js'; // Assuming your Review model is at this path
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const reviewsData = [
  [
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7b1",
      "rating": 2,
      "comment": "Not bad, but I've had better in the area."
    },
    {
      "userId": "681afde46f8e9500766ab3fb",
      "foodId": "680d963160ac8b649645c7b1",
      "rating": 2,
      "comment": "Quite delicious, but it was a bit cold when it arrived."
    },
    {
      "userId": "681afde46f8e9500766ab3fb",
      "foodId": "680d963160ac8b649645c7b1",
      "rating": 4,
      "comment": "Delicious and hearty! Will definitely order again."
    },
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7b1",
      "rating": 4,
      "comment": "Perfect balance of flavors, I'll be back for more."
    }
  ],
  [
    {
      "userId": "681afde46f8e9500766ab3fb",
      "foodId": "680d963160ac8b649645c7b2",
      "rating": 3,
      "comment": "Very fresh and tasty, loved the texture!"
    },
    {
      "userId": "681afae96f8e9500766ab3f1",
      "foodId": "680d963160ac8b649645c7b2",
      "rating": 5,
      "comment": "This was good, but the rice could have been cooked better."
    },
    {
      "userId": "681afae96f8e9500766ab3f1",
      "foodId": "680d963160ac8b649645c7b2",
      "rating": 3,
      "comment": "Good portion size, but could be spicier."
    },
    {
      "userId": "681afde46f8e9500766ab3fb",
      "foodId": "680d963160ac8b649645c7b2",
      "rating": 5,
      "comment": "The flavors are amazing! A must-try for anyone."
    },
    {
      "userId": "681afae96f8e9500766ab3f1",
      "foodId": "680d963160ac8b649645c7b2",
      "rating": 5,
      "comment": "Not bad, but I've had better in the area."
    }
  ],
  [
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7b3",
      "rating": 1,
      "comment": "Delicious and hearty! Will definitely order again."
    },
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7b3",
      "rating": 4,
      "comment": "Satisfying meal, but it could use a bit more seasoning."
    },
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7b3",
      "rating": 4,
      "comment": "Perfect balance of flavors, I'll be back for more."
    }
  ],
  [
    {
      "userId": "681afde46f8e9500766ab3fb",
      "foodId": "680d963160ac8b649645c7c4",
      "rating": 4,
      "comment": "This was good, but the rice could have been cooked better."
    },
    {
      "userId": "681afae96f8e9500766ab3f1",
      "foodId": "680d963160ac8b649645c7c4",
      "rating": 5,
      "comment": "Delicious and hearty! Will definitely order again."
    },
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7c4",
      "rating": 1,
      "comment": "Satisfying meal, but it could use a bit more seasoning."
    },
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7c4",
      "rating": 3,
      "comment": "Perfect balance of flavors, I'll be back for more."
    },
    {
      "userId": "680bdfed1b67418749879b39",
      "foodId": "680d963160ac8b649645c7c4",
      "rating": 2,
      "comment": "Not bad, but I've had better in the area."
    }
  ]
];

const seedReviews = async () => {

  try {
    const mongoURI = process.env.MONGO;

    if(!mongoURI) console.log("The URI not exists")

    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    for (const reviewBatch of reviewsData) {
      for (const review of reviewBatch) {
        await Review.create(review);
      }
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedReviews();

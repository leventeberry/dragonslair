import { User }  from "../models/index.js";

const userData = [
    {
        "username": "user1",
        "email": "user1@example.com",
        "password": "user1password"
    },
    {
        "username": "user2",
        "email": "user2@example.com",
        "password": "user2password"
    },
    {
        "username": "user3",
        "email": "user3@example.com",
        "password": "user3password"
    },
    {
        "username": "user4",
        "email": "user4@example.com",
        "password": "user4password"
    },
    {
        "username": "user5",
        "email": "user5@example.com",
        "password": "user5password"
    },
    {
        "username": "user6",
        "email": "user6@example.com",
        "password": "user6password"
    }
]

const seedUsers = async () => {
    try {
      await User.bulkCreate(userData);
      console.log('\nStatus:: Users seeded successfully');
    } catch (error) {
      console.error(`Status:: Error seeding users: ${error}`);
      throw error; // Rethrow the error after logging it
    }
  };

export default seedUsers;
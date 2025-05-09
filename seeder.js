const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Activity = require('./models/Activity');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error(err));

// Sample activity data
const activities = [
  {
    title: 'Cricket Match - India vs Australia',
    description: 'T20 International match between India and Australia',
    location: 'Wankhede Stadium, Mumbai',
    dateTime: new Date('2023-06-15T14:00:00Z')
  },
  {
    title: 'Football Match - Manchester United vs Chelsea',
    description: 'Premier League match between Manchester United and Chelsea',
    location: 'Old Trafford, Manchester',
    dateTime: new Date('2023-06-20T18:30:00Z')
  },
  {
    title: 'Movie Screening - Avengers: Endgame',
    description: 'Special screening of Marvel\'s Avengers: Endgame',
    location: 'PVR Cinemas, Delhi',
    dateTime: new Date('2023-06-25T20:00:00Z')
  },
  {
    title: 'Yoga Workshop',
    description: 'Beginner-friendly yoga workshop with certified instructors',
    location: 'City Park, Bangalore',
    dateTime: new Date('2023-06-30T07:00:00Z')
  },
  {
    title: 'Live Concert - Coldplay',
    description: 'Coldplay World Tour 2023',
    location: 'DY Patil Stadium, Mumbai',
    dateTime: new Date('2023-07-05T19:00:00Z')
  }
];

// Seed data
const importData = async () => {
  try {
    // Clear existing data
    await Activity.deleteMany();
    
    // Insert new data
    await Activity.insertMany(activities);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
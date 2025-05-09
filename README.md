# Activity Booking App API

A RESTful API for a Basic Activity Booking App built with Node.js, Express, and MongoDB.

## Features

- User Registration & Login with JWT Authentication
- Activity Listing
- Activity Booking
- View User Bookings

## Tech Stack

- Backend: Node.js with Express.js
- Database: MongoDB
- Authentication: JWT Token-based auth
- Validation: Joi
- Password hashing: bcrypt

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/booking-app.git
   cd booking-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/booking-app
   JWT_SECRET=your_secret_jwt_key
   JWT_EXPIRES_IN=30d
   ```

4. Start the server
   ```
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Activity Routes
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create a new activity (for testing)

### Booking Routes
- `POST /api/bookings` - Book an activity (protected)
- `GET /api/bookings/my` - Get user's bookings (protected)

## Testing

A Postman collection is included for testing all API endpoints.

## License

MIT
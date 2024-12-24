const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //   console.log("Database Connected");
});

afterAll(async () => {
  await mongoose.disconnect();
  //   console.log("Database Disconnected");
});

// let server;

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("Database Connected");

//   const app = require("../index"); // Import app
//   server = app.listen(0); // Start server without binding to a specific port
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   console.log("Database Disconnected");
//   server.close(); // Close the server after tests
// });

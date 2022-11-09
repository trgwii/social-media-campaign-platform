const app = require("./app.js");
const connectDB = require("./config/db.js");

// Connect to MongoDB
connectDB();

const serverPort = process.env.PORT;

app.listen(serverPort, () => {
  console.log(`
      ################################################
      🚀 Server listening on port: ${serverPort} 🚀
      ################################################
  `);
});

const mongoose = require("mongoose");

//database implementation and connection
const dbConnection = () => {
  const db = mongoose.connection;

  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () =>
    console.log(`
      ################################################
      🚀 Connection to Database established..... 🚀
      ################################################
      `
    )
  );

  return db;
};

module.exports = dbConnection;

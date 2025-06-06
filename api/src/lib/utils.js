const jwt = require("jsonwebtoken"),
  uuid = require("uuid").v4;

class Utils {
  connectDB = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };

  generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.ENV !== "development",
    });

    return token;
  };

  guid() {
    return uuid();
  }
}

module.exports = new Utils();

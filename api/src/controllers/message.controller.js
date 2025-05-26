const userModel = require("@modal/user.model.js");
const messageModel = require("@modal/message.model.js");

// list all the users
const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel.find(
      {
        _id: { $ne: loggedInUserId },
      },
      { fullName: 1, email: 1, profilePicture: 1 }
    );

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsers controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get respective user messages
const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    const messages = await messageModel.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsers, getMessages };

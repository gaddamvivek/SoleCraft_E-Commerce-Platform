const User = require('../models/Register');


exports.updateUserData = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from route parameters
    const { email, username, fname, lname } = req.body; // Proper destructuring

    // Prepare the update object
    const updateData = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (fname) updateData.fname = fname;
    if (lname) updateData.lname = lname;

    // Update the user in the database by userId
    const updatedUser = await User.findOneAndUpdate(
      {userId }, // Use '_id' if userId corresponds to MongoDB's ObjectId field
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


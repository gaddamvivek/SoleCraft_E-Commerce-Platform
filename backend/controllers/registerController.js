const Register = require('../models/Register');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Register user
exports.registerUser = async (req, res) => {
    const { fname, lname, username, email, password } = req.body;

    try {
        // Check if email already exists
        const userMail = await Register.findOne({ email });
        if (userMail) {
            return res.status(400).send("Email already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        const userId = uuidv4();
        // Create new user and save to database
        const user = new Register({ userId, fname, lname, username, email, password: hashedPassword });
        await user.save();
        
        return res.send('User registered successfully');
    } catch (err) {
        console.error('Error details:', err);
        return res.status(500).send('Error registering user');
    }
};

// Forget password
exports.forgetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const userMail = await Register.findOne({ email });
        if (userMail) {
            // Hash the new password and update
            const hashedPassword = await bcrypt.hash(password, 10);
            userMail.password = hashedPassword;
            await userMail.save();
            return res.status(200).send("Password updated successfully");
        } else {
            return res.status(404).send("User not found");
        }
    } catch (err) {
        console.error('Error details:', err);
        return res.status(500).send('Error occurred while updating password');
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const userMail = await Register.findOne({ email });
        if (!userMail) {
            return res.status(400).send("User not found");
        }

        // Check if password is correct
        const chkpwd = await bcrypt.compare(password, userMail.password);
        if (!chkpwd) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate JSON Web Token
        const payload = { mailid: email, uname: userMail.username, uid: userMail.userId, ufname: userMail.fname, ulname: userMail.lname };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Adding an expiration time for the token

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken: accessToken,
            userName: userMail.username,
            userId: userMail.userId,
            fname: userMail.fname,
            lname: userMail.lname
        });
    } catch (err) {
        console.error('Error details:', err);
        return res.status(500).send('Error logging in');
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { email, newUsername, newEmail, newFname, newLname } = req.body; // Assuming new data is sent in the body of the request

    try {
        // Find the user by their current email
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update the user's information
        if (newUsername) {
            user.username = newUsername; // Update the username if provided
        }
        if (newEmail) {
            // Check if the new email is already in use
            const emailExists = await Register.findOne({ email: newEmail });
            if (emailExists && emailExists.email !== email) {
                return res.status(400).send("Email already in use by another user");
            }
            user.email = newEmail; // Update the email if provided and not in use
        }
        if (newFname) {
            user.fname = newFname; // Update first name if provided
        }
        if (newLname) {
            user.lname = newLname; // Update last name if provided
        }

        // Save the updated user information
        await user.save();

        return res.status(200).send("Profile updated successfully");
    } catch (err) {
        console.error('Error details:', err);
        return res.status(500).send('Error updating profile');
    }
};



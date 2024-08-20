const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailConfirmController");

exports.addUser = async (req, res) => {
  console.log(req.body);

  try {
    const otpCode = sendEmail.otpGenerator(); // Generate OTP
    const { name, lastname, email, password, role, dob, otp } = req.body;

    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = {
      name,
      lastname,
      email,
      passwordHash: hash,
      role,
      dob,
      otpCode,
      otpExpiresAt: Date.now() + 86400000, // OTP expiration time - 24 hours
    };
    console.log(newUser);
    await User.create(newUser);

    //Send OTP Email
    await sendEmail.sendOTP(email, otpCode);

    res
      .status(201)
      .json({
        message:
          "User registered successfully. Please verify OTP sent to your email.",
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error in saving user");
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otpCode !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, update user verification status
    user.isVerified = true;
    user.otp = null; // Clear OTP
    user.otpExpiresAt = null; // Clear OTP expiration time
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ msg: "Invalid email or password!" });
    }

    const match = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!match) {
      return res.status(401).send({ msg: "Invalid email or password!" });
    }

    const payload = {
      user: {
        userId: user._id,
        userEmail: user.email,
        userRole: user.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "defaultSecret", {
      expiresIn: "5h",
    });
    res.status(200).json({ token });
    console.log(`User: ${req.body.email} has been successfully logged in!`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
};

exports.updateOneUserById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "role"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    for (let update of updates) {
      if (update === "password") {
        user.passwordHash = await bcrypt.hash(req.body[update], 10);
      } else {
        user[update] = req.body[update];
      }
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating user");
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).send("All users deleted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting users");
  }
};

exports.deleteOneUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
};

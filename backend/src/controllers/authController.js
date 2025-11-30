const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...safeUser } = user.toObject();
    res.json({ token, user: safeUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.me = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalMembers = async (req, res) => {
  try {
    const totalMembers = await User.countDocuments();
    const employees = await User.countDocuments({ role: "employee" });
    const managers = await User.countDocuments({ role: "manager" });
    
    res.json({
      totalMembers,
      employees,
      managers,
      breakdown: {
        employees,
        managers,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
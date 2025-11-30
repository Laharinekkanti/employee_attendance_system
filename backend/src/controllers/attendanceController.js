const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    console.log("📍 markAttendance called for user:", req.user.id);
    
    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Get current time in HH:MM:SS format
    const now = new Date();
    const checkInTime = now.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
      hour12: true 
    });
    
    // Check if record exists for today
    let attendance = await Attendance.findOne({
      user: req.user.id,
      date: { $gte: today, $lt: tomorrow }
    });

    if (attendance && attendance.checkIn) {
      // Already checked in today
      console.log("⚠️ User already checked in today");
      return res.status(400).json({ error: "Already checked in today", attendance });
    }

    if (!attendance) {
      // Create new record for today
      attendance = await Attendance.create({
        user: req.user.id,
        date: now,
        checkIn: checkInTime,
        checkOut: null,
        status: "present",
      });
    } else {
      // Update existing record (shouldn't happen but just in case)
      attendance.checkIn = checkInTime;
      await attendance.save();
    }

    // Populate user info
    await attendance.populate("user", "name email");

    console.log("✅ Attendance marked:", attendance);
    return res.json({ message: "Attendance marked", attendance });
  } catch (err) {
    console.error("❌ Error marking attendance:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    console.log("📍 getAttendance called for user:", req.user.id);
    
    const records = await Attendance.find({ user: req.user.id })
      .populate("user", "name email role")
      .sort({ date: -1 });
    
    console.log("✅ Found", records.length, "records");
    res.json(records);
  } catch (error) {
    console.error("❌ Error fetching attendance:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.markCheckout = async (req, res) => {
  try {
    console.log("📍 markCheckout called for user:", req.user.id);
    
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Get current time in HH:MM:SS format
    const now = new Date();
    const checkOutTime = now.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
      hour12: true 
    });
    
    // Find today's attendance record for this user
    const attendance = await Attendance.findOneAndUpdate(
      { 
        user: req.user.id, 
        date: { $gte: today, $lt: tomorrow } 
      },
      { checkOut: checkOutTime },
      { new: true }
    ).populate("user", "name email");

    if (!attendance) {
      return res.status(404).json({ error: "No check-in record found for today" });
    }

    console.log("✅ Checkout marked:", attendance);
    return res.json({ message: "Checkout marked", attendance });
  } catch (err) {
    console.error("❌ Error marking checkout:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    console.log("📍 getAllAttendance called");
    
    const records = await Attendance.find()
      .populate("user", "name email role")
      .sort({ date: -1 });
    
    console.log("✅ Found", records.length, "total records");
    res.json(records);
  } catch (error) {
    console.error("❌ Error fetching all attendance:", error.message);
    res.status(500).json({ error: error.message });
  }
};
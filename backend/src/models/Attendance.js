const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  checkIn: { type: String },
  checkOut: { type: String },
  status: { type: String, enum: ["present", "absent", "late"], default: "present" }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
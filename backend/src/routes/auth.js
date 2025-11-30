const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// ❌ DO NOT use auth middleware on register or login

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", auth, authController.me);
router.get("/members/count", auth, authController.getTotalMembers);

module.exports = router;
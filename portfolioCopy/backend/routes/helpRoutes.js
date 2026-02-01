const express = require("express");
const HelpRequest = require("../models/HelpRequest");
const transporter = require("../config/mail");

const router = express.Router();

router.post("/request-help", async (req, res) => {
  try {
    const {
      name,
      course,
      year,
      branch,
      email,
      contact,
      description,
    } = req.body;

    // ❌ Basic validation
    if (!name || !email || !contact || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ WORD COUNT VALIDATION (50–100 words)
    const wordCount = description.trim().split(/\s+/).length;

    if (wordCount < 50 || wordCount > 100) {
      return res.status(400).json({
        message: "Description must be between 50 and 100 words",
      });
    }

    // 1️⃣ Save to database
    await HelpRequest.create({
      name,
      course,
      year,
      branch,
      email,
      contact,
      description,
    });

    // 2️⃣ Send email to admin
    await transporter.sendMail({
      from: `"Help Desk" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "🚨 New Help Request Received",
      html: `
        <h2>New Help Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Course:</strong> ${course || "N/A"}</p>
        <p><strong>Year:</strong> ${year || "N/A"}</p>
        <p><strong>Branch:</strong> ${branch || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <hr />
        <h3>Description</h3>
        <p style="white-space: pre-line;">${description}</p>
      `,
    });

    res.status(200).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Help request error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

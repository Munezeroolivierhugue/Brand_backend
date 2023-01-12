/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the users
 *         username:
 *           type: string
 *           description: The name of user 
 *         email:
 *           type: string
 *           description: email that user use or will use
 *         password:
 *           type: string
 *           description: this is hidden key or password for user 
 *       example:
 *         username: hugue sracer
 *         email: munezeroo@gmail.com
 *         password: "1234567"
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: user's API
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * 
 * /api/auth/login:
 *   post:
 *     summary: User login here
 *     tags: [login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Welcome user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */





const express = require("express");
const { request } = require("http");
const User = require("../models/User");
const router = express.Router();
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/auth/signup", async (req, res) => {
  //validate data before making user
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  //checking to make sure no other user
  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) return res.status(400).json({ message: "email is taken" });

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({user: savedUser});
  } catch (err) {
    res.status(400).json({error: err});
  }
});
// login section
router.post("/auth/login", async (req, res) => {
  //validate data before login

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //checking if we have that email

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "email is wrong" });

  //check if password is correct

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({message: "password is wrong"});

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).status(200).json({ token: token });
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - comments
 *         - likes
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of blog creator
 *         content:
 *           type: string
 *           description: The content that is written inside the blog
 *         comments:
 *           type: array
 *           description: comments that users have sayed on the blog
 *         likes:
 *           type: number
 *           description: likes on the blog
 *       example:
 *         id: d5fE_asz
 *         title: The New Times roma
 *         content:  if you want to prepare for this change.
 *         comment: []
 *         likes: 12
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     comment:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         username:
 *           type: string
 *           description: username of the commentator
 *         email:
 *           type: string
 *           description: email of the one with comment
 *         comment:
 *           type: string
 *           description: comment that users have sayed on the blog
 *       example:
 *         username: baptista
 *         email:  kagabo@gmal.com
 *         comment: excelent, thank you
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     message:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         name:
 *           type: string
 *           description: real name of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         message:
 *           type: string
 *           description: message that user have sent
 *       example:
 *         name: manudi
 *         email:  kagabo@gmal.com
 *         message: hi, i want collaboration
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     like:
 *       type: object
 *       required:
 *         - likes
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         likes:
 *           type: number
 *           description: number of likes of blog
 *       example:
 *         likes: 12
 */

/**
 * @swagger
 * tags:
 *   name: blog
 *   description: blog's API
 * /api/blogs:
 *   get:
 *     summary: view all our blogs
 *     tags: [blog]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blog'
 *     responses:
 *       200:
 *         description: all blogs.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       500:
 *         description: Some server error
 *
 *   post:
 *     summary: create blog
 *     tags: [blog]
 *     parameters:
 *      - in: header
 *        name: auth-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blog'
 *     responses:
 *       200:
 *         description: blog created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       500:
 *         description: Some server error
 *
 * /api/blogs/{id}:
 *   get:
 *     summary: Get the blog by id
 *     tags: [blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       404:
 *         description: The blog was not found
 *
 *   patch:
 *     summary: Update the blog by the id
 *     tags: [blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blog'
 *     responses:
 *       200:
 *         description: The blog was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       404:
 *         description: The blog was not found
 *       500:
 *         description: Some error happened
 *
 *   delete:
 *    summary: Remove the blog by id
 *    tags: [blog]
 *    parameters:
 *      - in: path
 *        name: id
 *      - in: header
 *        name: auth-token
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *
 *    responses:
 *      200:
 *        description: The blog was deleted
 *      404:
 *        description: The blog was not found
 *
 */

/**
 * @swagger
 * tags:
 *   name: comment
 *   description: comment API
 * /api/comment/{id}:
 *   post:
 *     summary: Create a new comment
 *     tags: [comment]
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/comment'
 *     responses:
 *       200:
 *         description: The created comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: like
 *   description: like API
 * /api/blogs/{id}/likes:
 *   post:
 *     summary: Give a like
 *     tags: [like]
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *     required: false
 *     content:
 *     application/json:
 *           schema:
 *             $ref: '#/components/schemas/like'
 *     responses:
 *       200:
 *         description: like provided.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/like'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: unlike
 *   description: unlike API
 * /api/blogs/{id}/unlikes:
 *   post:
 *     summary: Give an unlike
 *     tags: [unlike]
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/like'
 *     responses:
 *       200:
 *         description: unlike provided.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/like'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: message
 *   description: message's API
 * /api/messages:
 *   post:
 *     summary: send message
 *     tags: [message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/message'
 *     responses:
 *       200:
 *         description: message sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: getting messages
 *     tags: [message]
 *     parameters:
 *      - in: header
 *        name: auth-token
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/message'
 *     responses:
 *       200:
 *         description: messages displayed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 *       500:
 *         description: Some server error
 *
 *
 */

const express = require("express");
const { request } = require("http");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const Message = require("../models/Message");
const verify = require("./verifyToken");
const Like = require("../models/Like");
const multer = require("multer")
const path = require("path");

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "djxpkof3f",
    api_key: "619495487349254",
    api_secret: "40P8nJI1tuq4v779pYRklnQSbpc",
});

const router = express.Router();


const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });


  const upload = multer({
      storage: storageEngine,
    limits: { fileSize: 1000000 },
    });

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  return res.status(200).json({ BLOGS: blogs });
});
router.post("/blogs", verify, upload.single("Image"), async (req, res) => {
  const result =await  cloudinary.uploader.upload(req.file.path);
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    Image: result.secure_url,
  });
  await blog.save();
  res.status(200).json({ newBlog: blog });
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id }).populate(
      "comments"
    );
    return res.status(200).json({ oneBlog: blog });
  } catch {
    return res.status(404).json({ error: "blog doesn't exist!" });
  }
});

router.patch("/blogs/:id", verify, upload.single("Image"), async (req, res) => {
  const result =await  cloudinary.uploader.upload(req.file.path);
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.content) {
      blog.content = req.body.content;
    }

    if (result.secure_url) {
      blog.Image = result.secure_url;
    }

    await blog.save();
    return res.status(200).json({ edited: blog });
  } catch {
    return res.status(404).json({ error: "Blog doesn't exist!" });
  }
});

router.delete("/blogs/:id", verify, async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog) {
      await Blog.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: "blog deleted succesfully" });
    }
    return res.status(404).json({ error: "Blog doesn't exist!" });
  } catch {
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

//comment part here

router.post("/comment/:blog_id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.blog_id });
    const comment = new Comment({
      blog_id: req.params.blog_id,
      username: req.body.username,
      comment: req.body.comment,
    });
    await comment.save();
    blog.comments.push(comment);
    await blog.save();
    return res.status(200).json({ newComment: comment });
  } catch {
    return res.status(404).json({ error: "Blog doesn't exist!" });
  }
});

//likes section
router.post("/blogs/:blog_id/likes", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.blog_id });
    let likey = blog.likes + 1;

    const liked = new Like({
      blog_id: req.params.blog_id,
      likes: likey,
    });
    await liked.save();
    blog.likes = likey;
    await blog.save();
    return res.status(200).json({ newLike: liked });
  } catch {
    return res.status(404).json({ error: "Blog doesn't exist!" });
  }
});

//unlike section

router.post("/blogs/:blog_id/unlikes", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.blog_id });
    let likey = blog.likes - 1;

    if (blog.likes <= 0) {
      likey = 0;
    }
    const liked = new Like({
      blog_id: req.params.blog_id,
      likes: likey,
    });
    await liked.save();
    blog.likes = likey;
    await blog.save();
    return res.status(200).json({ unliked: liked });
  } catch {
    return res.status(404).json({ error: "Blog doesn't exist!" });
  }
});

// message section

router.post("/messages", async (req, res) => {
  const mess = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  await mess.save();
  return res.status(200).json({ message: mess });
});

router.get("/messages", verify, async (req, res) => {
  const mess = await Message.find();
  return res.status(200).json({ getMessage: mess });
});

module.exports = router;

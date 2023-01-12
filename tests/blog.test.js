const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = require("../index");
const verifyToken = require("../routes/verifyToken")
const { response } = require("../index");
const jwt = require("jsonwebtoken");

//blogs on this part
//getting all blogs
describe("get all blogs", () => {
  test("200 status code", async () => {
    const response = await (await request(app)
    .get("/api/blogs")
    .send())

    expect(response.statusCode).toBe(200);
  });
});

// get single blog
describe("get single blog", () => {
  let blog_id = "";
  beforeEach(async () =>{
    const response = await request(app).get("/api/blogs")
    blog_id = response.body.BLOGS[0]._id;
  })
  test("200 status code", async () => {
    const response = await request(app).get(`/api/blogs/${blog_id}`).send();
    expect(response.statusCode).toBe(200);
  });
});

//ADDING NEW BLOG
const blog = {
  title: "my blog",
  content: "blog here you've been looking for",
}
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MwMDAzNWZmZWVhYjRkNzg4YWZjZGUiLCJpYXQiOjE2NzM1Mjc3MjV9.ZgoCWGGEk1E42QGdfJYzyEvAkKLdKVbduGU2Vtq1xM4"
describe("post Newblog", () => {
  test("400 status code", async () => {
    const response = await request(app)
    .post("/api/blogs")
    .field(blog)
    .set("auth-token",token)
    .attach("image", `${img}/dafault-blog.jpg`)
    expect(response.statusCode).toBe(404);
  })
});

// UPDATE NEW BLOG
const newblog = {
  title: "my blog",
  content: "blog here you've been looking for"
}
describe("patch blog", () => {
  let blog_id = "";
  beforeEach(async () =>{
    const response = await request(app).get("/api/blogs")
    blog_id = response.body.BLOGS[1]._id;
  })
  test("200 status code", async () => {
    const response = await request(app)
    .patch(`/api/blogs/${blog_id}`)
    .field(blog)
    .set("auth-token",token);
    expect(response.statusCode).toBe(200);
  })

});

//DELETE OUR BLOG
describe("delete blog", () => {
  let blog_id = "";
  beforeEach(async () =>{
    const response = await request(app).get("/api/blogs")
    blog_id = response.body.BLOGS[1]._id;
  })
  test("200 status code", async () => {
    const response = await request(app)
    .delete(`/api/blogs/${blog_id}`)
    .send()
    .set("auth-token",token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("blog deleted succesfully")
  })
});


//COMMENTS
const comment = {
  username: "gasongo",
    comment: "nice blog man",
}
describe("post Comment", () => {
  let blog_id = "";
  beforeEach(async () =>{
    const response = await request(app).get("/api/blogs")
    blog_id = response.body.BLOGS[1]._id;
  })
    test("200 status code", async () => {
      const response = await request(app)
      .post(`/api/comment/${blog_id}`)
      .field(comment)
      expect(response.statusCode).toBe(200);
    })
   const nonblog = "63bd42bd60ad0629f8a00a6q"
    test("404 status code with error", async () => {
        const response = await request(app).post(`/api/comment/${nonblog}`).send();
        expect(response.statusCode).toBe(404);
      })
  });

  //liking blog
  describe("post Like", () => {
    let blog_id = "";
  beforeEach(async () =>{
    const response = await request(app).get("/api/blogs")
    blog_id = response.body.BLOGS[1]._id;
  })
    test("200 status code", async () => {
      const response = await request(app)
      .post(`/api/blogs/${blog_id}/likes`)
      .send()
      expect(response.statusCode).toBe(200);
    })
    const nonblog = "63bd42bd60ad0629f8a00a6q"
    test("404 status code with error", async () => {
        const response = await request(app).post(`/api/blogs/${nonblog}/likes`).send();
        expect(response.statusCode).toBe(404);
      })
  });

  //unliking blog
  describe("post Unike", () => {
    let blog_id = "";
  beforeEach(async () =>{
    const response = await request(app).get("/api/blogs")
    blog_id = response.body.BLOGS[1]._id;
  })
    test("200 status code", async () => {
      const response = await request(app)
      .post(`/api/blogs/${blog_id}/unlikes`)
      .send()
      expect(response.statusCode).toBe(200);
    })
    const nonblog = "63bd42bd60ad0629f8a00a6q"
    test("404 status code with error", async () => {
        const response = await request(app).post(`/api/blogs/${nonblog}/unlikes`).send();
        expect(response.statusCode).toBe(404);
      })
  });

  //post message
  describe("post message", () => {
    test("200 status code", async () => {
      const response = await request(app)
      .post("/api/messages")
      .send( {
        name: "my name",
        email: "ange@gmail.com",
        message: "woooowest"
    })
      expect(response.statusCode).toBe(200);
    })
  });

  //GET ALL MESSAGES
  describe("get all messages", () => {
    test("200 status code", async () => {
      const response = await request(app)
      .get("/api/messages")
      .send()
      .set("auth-token",token);
  
      expect(response.statusCode).toBe(200);
    });
  });
  //verifytoken test
  // test('verifyToken', () => {
  //   expect.assertions(1);
  //   const res = {};
  //   const req = {};
  //   const next = (err) => expect(err).toBeFalsy();
  //   verifyToken(req, res, next);
  // });
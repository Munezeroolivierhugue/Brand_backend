const request = require ("supertest")
const express = require("express")
const mongoose = require("mongoose")
const app = require("../index")

describe("signup with the post", () => {
    describe("Email in use", () => {
        test("400 status code", async () => {
            const response = await request(app)
                .post("/api/auth/signup")
                .send({username: "oliviera", email: "munezeroolivier@gmail.com", password: "1234567" });
            expect(response.body.message).toBe("email is taken");
            expect(response.statusCode).toBe(400);
        });
    });
})

//login tests

describe("login with the post", () => {
    describe("invalid email or password", () => {
        test("400 status code and email", async () => {
            const response = await request(app)
                .post("/api/auth/login")
                .send({ email: "munez@gmail.com", password: "1234567" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("email is wrong");
        });

        test("400 status code and password", async () => {
            const response = await request(app)
                .post("/api/auth/login")
                .send({ email: "munezeroo@gmail.com", password: "gdehjxdcj" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("password is wrong");
        });
    });
})
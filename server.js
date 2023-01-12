const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const authr = require("./routes/auth");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000


dotenv.config();
const app = require("./index");

app.listen(PORT, () => {
  console.log("Server has started!");

  const options = {
    definition: {
      openapi: "3.0.n",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
           url: `https://melodic-toothbrush-production.up.railway.app/`,
          // url: `http://localhost:5000/`
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCssUrl:
        "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
    })
  );


});

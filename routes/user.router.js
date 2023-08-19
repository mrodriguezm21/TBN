const express = require("express");
const router = express.Router();


const passport = require("passport");
const jwt = require("jsonwebtoken");
const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema } = require("../schemas/users.schema");

const config = require("../config");

const response = require("./response");

const userService = require("../services/user.services");


router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const payload = {
        sub: user.id,
      };
      const token = jwt.sign(payload, config.jwt_secret);

      const userResponse = {
        user,
        token,
      };
      response.success(req, res, userResponse, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/register",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      response.success(req, res, user, 201);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

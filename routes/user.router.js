const express = require("express");
const router = express.Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");
const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema } = require("../schemas/users.schema");

const config = require("../config");

const response = require("./response");

const userService = require("../services/user.services");

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Log in a user by providing valid credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: algo@gmail.com
 *               password:
 *                 type: string
 *                 example: contraseña
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 body:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/User"
 *                       example:
 *                         id: 1
 *                         email: "algo@gmail.com"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MjQ0MjEwNH0.rQ6L0OvBT-esDxBpekE86ubHEiK3zu_dciEULP2KvEs"
 *       400:
 *         description: Bad Request
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Bad Request
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Usuario o contraseña incorrecto"
 */

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

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Register a new user by providing necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: algo@gmail.com
 *               password:
 *                 type: string
 *                 example: contraseña
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 body:
 *                   $ref: "#/components/schemas/User"
 *                   example:
 *                     id: 1
 *                     email: "algo@gmail.com"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 *                   example: "\"email\" is required. \"password\" is required"
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "SequelizeUniqueConstraintError"
 *                 errors:
 *                   type: string
 *                   example: "email must be unique"
 */

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

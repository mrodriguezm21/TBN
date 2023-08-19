const express = require("express");
const router = express.Router();

const passport = require("passport");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCharacterSchema,
  getCharacterSchema,
} = require("../schemas/characters.schema");

const response = require("./response");

const characterService = require("../services/character.services");

router.get("/", async (req, res) => {
  const filter = req.query || {};
  try {
    const characters = await characterService.list(filter);
    console.log(characters);
    response.success(req, res, characters, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.get(
  "/:id",
  validatorHandler(getCharacterSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await characterService.listOne(id);
      response.success(req, res, character, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createCharacterSchema, "body"),
  async (req, res, next) => {
    try {
      const character = await characterService.create(req.body);
      response.success(req, res, character, 201);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await characterService.update(id, req.body);
      response.success(req, res, character, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await characterService.delete(id);
      response.success(req, res, character, 204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

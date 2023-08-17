const express = require("express");
const router = express.Router();
const response = require("./response");
const characterService = require("../services/character.services");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCharacterSchema,
  getCharacterSchema,
} = require("../schemas/characters.schema");

router.get("/", async (req, res) => {
  // res.json({
  //     message: "Personajes"
  // });

  try {
    const characters = await characterService.list();
    response.success(req, res, characters, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.get("/:id", validatorHandler(getCharacterSchema,'params'), async (req, res) => {
  try {
    const { id } = req.params;
    const character = await characterService.listOne(id);
    response.success(req, res, character, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.post("/", validatorHandler(createCharacterSchema, 'body'),async (req, res, next) => {
  try {
    const character = await characterService.create(req.body);
    response.success(req, res, character, 201);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const character = await characterService.update(id, req.body);
    response.success(req, res, character, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const character = await characterService.delete(id);
    response.success(req, res, character, 204);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const response = require("./response");
const movieService = require("../services/movie.services");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createMovieSchema,
  getMovieSchema,
} = require("../schemas/movies.schema");

router.get("/", async (req, res) => {
  const filter = req.query || {};
  try {
    const characters = await movieService.list(filter);
    response.success(req, res, characters, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.get(
  "/:id",
  validatorHandler(getMovieSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await movieService.listOne(id);
      response.success(req, res, character, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createMovieSchema, "body"),
  async (req, res, next) => {
    try {
      const character = await movieService.create(req.body);
      response.success(req, res, character, 201);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await movieService.update(id, req.body);
    response.success(req, res, character, 200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await movieService.delete(id);
    response.success(req, res, character, 204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

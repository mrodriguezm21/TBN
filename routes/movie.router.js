const express = require("express");
const router = express.Router();

const passport = require("passport");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createMovieSchema,
  getMovieSchema,
} = require("../schemas/movies.schema");

const response = require("./response");

const movieService = require("../services/movie.services");

/**
 * @openapi
 * /api/v1/movies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Lista de películas
 *     description: Lista de películas y permite filtrarlas por 'title', 'genreid' y ordenar ASC o DESC.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar peliculas por titulo.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description:  Ordenar peliculas por fecha de lanzamiento (asc o desc).
 *       - in: query
 *         name: genre
 *         schema:
 *           type: integer
 *         description: Filtras peliculas por id de genero.
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
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Movie"
 *                   example:
 *                     - id: 1
 *                       image: "https://placehold.co/600x400"
 *                       title: "The Lord of the Rings: The Fellowship of the Ring"
 *                       releaseYear: "2001"
 *                     - id: 2
 *                       image: "https://placehold.co/600x400"
 *                       title: "The Godfather"
 *                       releaseYear: "1972"
 *                     - id: 3
 *                       image: "https://placehold.co/600x400"
 *                       title: "The Dark Knight"
 *                       releaseYear: "2008"
 *                     # ... (other movie objects)
 */

router.get("/", async (req, res) => {
  const filter = req.query || {};
  try {
    const movies = await movieService.list(filter);
    response.success(req, res, movies, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

/**
 * @openapi
 * /api/v1/movies/{id}:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Obtener detalles de una película por ID
 *     description: Obtener detalles de una película por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a obtener.
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
 *                   $ref: "#/components/schemas/Movie"
 *                   example:
 *                     id: 1
 *                     image: "https://placehold.co/600x400"
 *                     title: "The Lord of the Rings: The Fellowship of the Ring"
 *                     releaseYear: "2001"
 *                     rating: 4.4
 *                     genreId: 3
 *                     characters:
 *                       - id: 7
 *                         name: "Gandalf"
 *                         image: "https://placehold.co/600x400"
 *                       - id: 8
 *                         name: "Frodo Baggins"
 *                         image: "https://placehold.co/600x400"
 *                       - id: 9
 *                         name: "Samwise Gamgee"
 *                         image: "https://placehold.co/600x400"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 */

router.get(
  "/:id",
  validatorHandler(getMovieSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await movieService.listOne(id);
      response.success(req, res, movie, 200);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/v1/movies:
 *   post:
 *     tags:
 *       - Movies
 *     summary: Crear una nueva película
 *     description: Crea una nueva pelicula proporcionando los campos necesarios.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: https://placehold.co/600x400
 *               title:
 *                 type: string
 *                 example: IAs2
 *               releaseYear:
 *                 type: integer
 *                 example: 2995
 *               rating:
 *                 type: number
 *                 example: 4
 *               genreId:
 *                 type: integer
 *                 example: 1
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
 *                   $ref: "#/components/schemas/Movie"
 *                   example:
 *                     id: 12
 *                     image: "https://placehold.co/600x400"
 *                     title: "IAs2"
 *                     releaseYear: 2995
 *                     rating: 4
 *                     genreId: 1
 *                     updatedAt: "2023-08-19T10:15:15.913Z"
 *                     createdAt: "2023-08-19T10:15:15.913Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 */

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createMovieSchema, "body"),
  async (req, res, next) => {
    try {
      const movie = await movieService.create(req.body);
      response.success(req, res, movie, 201);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/v1/movies/{id}:
 *   patch:
 *     tags:
 *       - Movies
 *     summary: Actualizar pelicula por ID
 *     description: Actualiza una pelicula proporcionando su ID y los campos a actualizar.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pelicula a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: https://placehold.co/600x400
 *               title:
 *                 type: string
 *                 example: Hunger Games
 *               releaseYear:
 *                 type: string
 *                 example: "2995"
 *               rating:
 *                 type: number
 *                 example: 4
 *               genreId:
 *                 type: integer
 *                 example: 1
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
 *                   $ref: "#/components/schemas/Movie"
 *                   example:
 *                     id: 10
 *                     image: "https://placehold.co/600x400"
 *                     title: "Hunger Games"
 *                     releaseYear: "2995"
 *                     rating: 4
 *                     createdAt: "2023-08-19T07:04:33.000Z"
 *                     updatedAt: "2023-08-19T10:23:05.502Z"
 *                     deletedAt: null
 *                     genreId: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 */


router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await movieService.update(id, req.body);
      response.success(req, res, movie, 200);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/v1/movies/{id}:
 *   delete:
 *     tags:
 *       - Movies
 *     summary: Eliminar pelicula por ID
 *     description: Elimina una pelicula proporcionando su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pelicula a eliminar.
 *     responses:
 *       204:
 *         description: No Content
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
 *                   example: {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 */

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await movieService.delete(id);
      response.success(req, res, movie, 204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

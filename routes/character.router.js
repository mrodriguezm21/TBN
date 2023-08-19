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

/**
 * @openapi
 * /api/v1/characters:
 *   get:
 *     summary: Obtener todos los personajes
 *     description: Obtener todos los personajes de la base de datos y posible filtrado (age, name y movieId ).
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar personajes por 'name'.
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Filtrar personajes por 'age'.
 *       - in: query
 *         name: movies
 *         schema:
 *           type: integer
 *         description: Filtrar personajes por 'movieId'.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Batman
 *                   age:
 *                     type: integer
 *                     example: 35
 *                   movieId:
 *                     type: integer
 *                     example: 1
 *                   image:
 *                     type: string
 *                     example: https://placehold.co/600x400
 */
router.get("/", async (req, res) => {
  const filter = req.query || {};
  try {
    const characters = await characterService.list(filter);
    response.success(req, res, characters, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

/**
 * @openapi
 * /api/v1/characters/{id}:
 *   get:
 *     summary: Obtener detalles de un personaje por ID
 *     description: Obtener detalles de un personaje por ID.
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del personaje a obtener.
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
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: Han Solo
 *                     age:
 *                       type: integer
 *                       example: 40
 *                     weight:
 *                       type: integer
 *                       example: 70
 *                     story:
 *                       type: string
 *                       example: "Han Solo is a fictional character..."
 *                     image:
 *                       type: string
 *                       example: "https://placehold.co/600x400"
 *                     movieId:
 *                       type: integer
 *                       example: 9
 *                     movie:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 9
 *                         title:
 *                           type: string
 *                           example: "Star Wars: Episode IV - A New Hope"
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
 *                   example: Not Found
 *                 message:
 *                   type: string
 *                   example: Character not found
 */
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

/**
 * @openapi
 * /api/v1/characters:
 *   post:
 *     summary: Crear un nuevo personaje
 *     description: Crea un nuevo personaje proporcionando los campos necesarios.
 *     tags:
 *       - Characters
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
 *               name:
 *                 type: string
 *                 example: Han Solo
 *               age:
 *                 type: integer
 *                 example: 25
 *               weight:
 *                 type: number
 *                 example: 65.6
 *               story:
 *                 type: string
 *                 example: Story...
 *               movieId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Created
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
 *                     id:
 *                       type: integer
 *                       example: 17
 *                     image:
 *                       type: string
 *                       example: https://placehold.co/600x400
 *                     name:
 *                       type: string
 *                       example: Han Solo
 *                     age:
 *                       type: integer
 *                       example: 25
 *                     weight:
 *                       type: number
 *                       example: 65.6
 *                     story:
 *                       type: string
 *                       example: Story...
 *                     movieId:
 *                       type: integer
 *                       example: 2
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-19T10:18:24.884Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-19T10:18:24.884Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             example: Unauthorized
 */
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

/**
 * @openapi
 * /api/v1/characters/{id}:
 *   patch:
 *     tags:
 *       - Characters
 *     summary: Actualizar un personaje por ID
 *     description: Actualiza un personaje proporcionando su ID y los campos a actualizar.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del personaje a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan
 *               age:
 *                 type: integer
 *                 example: 76
 *               weight:
 *                 type: number
 *                 example: 654
 *               story:
 *                 type: string
 *                 example: Esto hacia
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
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     name:
 *                       type: string
 *                       example: Juan
 *                     age:
 *                       type: integer
 *                       example: 76
 *                     weight:
 *                       type: number
 *                       example: 654
 *                     story:
 *                       type: string
 *                       example: Esto hacia
 *                     image:
 *                       type: string
 *                       example: https://placehold.co/600x400
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-19T07:07:05.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-19T09:08:51.150Z"
 *                     deletedAt:
 *                       type: null
 *                       example: null
 *                     movieId:
 *                       type: integer
 *                       example: 2
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
 *                   example: "Character not found"
 */

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

/**
 * @openapi
 * /api/v1/characters/{id}:
 *   delete:
 *     summary: Eliminar un personaje por ID
 *     description: Elimina un personaje proporcionando su ID.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del personaje a eliminar.
 *     responses:
 *       204:
 *         description: No Content
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
 *                   example: "Character not found"
 */

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

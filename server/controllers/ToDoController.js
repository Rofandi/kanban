const models = require('../models');
const ToDo = models.ToDo;
const createError = require("http-errors");

/**
 * @swagger
 * tags:
 *  name: ToDo
 *  description: ToDo management
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 */
class ToDoController{
    /**
     * @swagger
     * path:
     *  /todos/:
     *    get:
     *      summary: Get all todos
     *      tags: [ToDo]
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Array of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static getTodos(req, res, next){
        const user = req.user;
        ToDo.findAll({
            where: { UserId: user.id }
        })
            .then(todos => res.status(200).json(todos))
            .catch(err => next(err));
    }
            /**
     * @swagger
     * path:
     *  /todos/{id}:
     *    get:
     *      summary: Get todo by id
     *      tags: [ToDo]
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: integer
     *          required: true
     *          description: Numeric ID of the todo
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */

    static getTodo(req, res, next){
        const todo = req.todo;
        res.status(200).json(todo);
    }
            /**
     * @swagger
     * path:
     *  /todos/:
     *    post:
     *      summary: Create todo
     *      tags: [ToDo]
     *      responses:
     *        "201":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                items:
     *                  $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */

    static addTodo(req, res, next){
        const title = req.body.title;
        const category = req.body.category;
        const user = req.user;
        ToDo.create({
            title,
            category,
            UserId: user.id
        })
            .then(todo => res.status(201).json(todo))
            .catch(err => next(err));
    }
                /**
     * @swagger
     * path:
     *  /todos/{id}:
     *    put:
     *      summary: Update todo by id
     *      tags: [ToDo]
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: integer
     *          required: true
     *          description: Update from numeric ID of the todo
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static updateTodo(req, res, next){
        const todo = req.todo;
        todo.title = req.body.title;
        todo.category = req.body.category;
        todo.save()
            .then(todo => res.status(200).json(todo))
            .catch(err => {
                next(err);
            });
    }
                    /**
     * @swagger
     * path:
     *  /todos/{id}:
     *    delete:
     *      summary: Delete todo by id
     *      tags: [ToDo]
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: integer
     *          required: true
     *          description: Delete from numeric ID of the todo
     *      security:
     *        - BearerAuth: []
     *      responses:
     *        "200":
     *          description: Object of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static deleteTodo(req, res, next){
        const todo = req.todo;
        todo.destroy()
            .then(data => res.status(200).json(data))
            .catch(err => {
                next(err);
            });
    }
}

module.exports = ToDoController;
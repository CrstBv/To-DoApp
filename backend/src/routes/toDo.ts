import express from "express";
import * as ToDoController from "../controllers/toDo";

const router = express.Router();

router.get("/", ToDoController.getToDos);

router.get("/:toDoId", ToDoController.getToDo);

router.post("/", ToDoController.createToDo);

router.patch("/:toDoId", ToDoController.updateToDo);

router.delete("/:toDoId", ToDoController.deleteToDo);

export default router;

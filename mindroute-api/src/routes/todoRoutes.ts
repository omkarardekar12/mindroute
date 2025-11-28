import { Router } from "express";
import {
  getTodos,
  addTodo,
  markTodoDone,
  deleteTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/:uid", getTodos);

router.post("/:uid", addTodo);

router.put("/:uid/:id", markTodoDone);

router.delete("/:uid/:id", deleteTodo);

export default router;

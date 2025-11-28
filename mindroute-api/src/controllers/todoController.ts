import type { Request, Response } from "express";
import { driver } from "../db";

export const getTodos = async (req: Request, res: Response) => {
  const session = driver.session();
  const { uid } = req.params;

  try {
    const result = await session.run(
      "MATCH (u:User {uid: $uid})-[:OWNS]->(t:Task) RETURN t",
      { uid }
    );

    const todos = result.records.map((record) => {
      const todo = record.get("t").properties;
      return { id: todo.id, task: todo.task, isDone: todo.isDone };
    });

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching todos");
  } finally {
    session.close();
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const session = driver.session();
  const { uid } = req.params;
  const { task } = req.body;
  const id = crypto.randomUUID();

  try {
    await session.run(
      `
      MERGE (u:User {uid: $uid})
      CREATE (t:Task {id: $id, task: $task, isDone: false})
      MERGE (u)-[:OWNS]->(t)
    `,
      { uid, id, task }
    );

    res.json({ id, task, isDone: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding todo");
  } finally {
    session.close();
  }
};

export const markTodoDone = async (req: Request, res: Response) => {
  const session = driver.session();
  const { uid, id } = req.params;

  try {
    await session.run(
      "MATCH (u:User {uid: $uid})-[:OWNS]->(t:Task {id: $id}) SET t.isDone = true",
      { uid, id }
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating todo");
  } finally {
    session.close();
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const session = driver.session();
  const { uid, id } = req.params;

  try {
    await session.run(
      "MATCH (u:User {uid: $uid})-[:OWNS]->(t:Task {id: $id}) DETACH DELETE t",
      { uid, id }
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting todo");
  } finally {
    session.close();
  }
};

import type { Request, Response } from "express";
import { driver } from "../db";
import crypto from "crypto";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const session = driver.session();
  const { uid } = req.params;

  try {
    const result = await session.run(
      `MATCH (u:User {uid: $uid})-[:OWNS]->(t:Task) 
      RETURN t
      ORDER BY t.createdAt`,
      { uid }
    );

    const todos = result.records.map((record) => {
      const todo = record.get("t").properties as {
        id: string;
        task: string;
        isDone: boolean;
      };
      return { id: todo.id, task: todo.task, isDone: todo.isDone };
    });

    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching todos");
  } finally {
    session.close();
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const session = driver.session();
  const { uid } = req.params;
  const { id, task, isDone } = req.body;

  try {
    const result = await session.run(
      `MERGE (u:User {uid: $uid})
      CREATE (t:Task {
        id: $id, 
        task: $task, 
        isDone: $isDone, 
        createdAt: datetime()
      })
      MERGE (u)-[:OWNS]->(t)
      RETURN t`,
      { uid, id, task, isDone }
    );

    const t = result.records[0].get("t").properties as {
      id: string;
      task: string;
      isDone: boolean;
    };

    res.json({
      id: t.id,
      task: t.task,
      isDone: t.isDone,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding todo");
  } finally {
    session.close();
  }
};

export const markTodoDone = async (
  req: Request,
  res: Response
): Promise<void> => {
  const session = driver.session();
  const { uid, id } = req.params;

  try {
    await session.run(
      `MATCH (u:User {uid: $uid})-[:OWNS]->(t:Task {id: $id}) 
      SET t.isDone = true`,
      { uid, id }
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating todo");
  } finally {
    session.close();
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const session = driver.session();
  const { uid, id } = req.params;

  try {
    await session.run(
      `MATCH (u:User {uid: $uid})-[:OWNS]->(t:Task {id: $id}) 
      DETACH DELETE t`,
      { uid, id }
    );
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting todo");
  } finally {
    session.close();
  }
};

import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ToDoModel from "../models/toDo";
import { assertIsDefined } from "../util/assertIsDefined";

export const getToDos: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  
  try {
    assertIsDefined(authenticatedUserId);

    const toDos = await ToDoModel.find({userId: authenticatedUserId}).exec();
    res.status(200).json(toDos);
  } catch (error) {
    next(error);
  }
};

export const getToDo: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const toDoId = req.params.toDoId;

  try {
    assertIsDefined(authenticatedUserId);


    if (!mongoose.isValidObjectId(toDoId)) {
      throw createHttpError(400, "Invalid ToDo id");
    }

    const toDo = await ToDoModel.findById(toDoId).exec();

    if (!toDo) {
      throw createHttpError(400, "ToDo not found");
    }

    if(!toDo.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this ToDo");
    }

    res.status(200).json(toDo);
  } catch (error) {
    next(error);
  }
};

interface CreatetoDoBody {
  title?: string;
  text?: string;
  note?: string;
  completed?: boolean;
}

export const createToDo: RequestHandler<
  unknown,
  unknown,
  CreatetoDoBody,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const title = req.body.title;
  const text = req.body.text;
  const note = req.body.note;
  const completed = req.body.completed;

  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "ToDo most have a title");
    }

    const newToDo = await ToDoModel.create({
      userId: authenticatedUserId,
      title: title,
      text: text,
      note: note,
      completed: completed,
    });

    res.status(201).json(newToDo);
  } catch (error) {
    next(error);
  }
};

interface UpdateToDoParams {
  toDoId: string;
}

interface UpdateToDoBody {
  title: string;
  text: string;
  note: string;
  completed: boolean;
}

export const updateToDo: RequestHandler<
  UpdateToDoParams,
  unknown,
  Partial<UpdateToDoBody>,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const toDoId = req.params.toDoId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const newNote = req.body.note;
  const isComleted = req.body.completed;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(toDoId)) {
      throw createHttpError(400, "Invalid ToDo id");
    }

    if (!newTitle) {
      throw createHttpError(400, "ToDo most have a title");
    }

    const toDo = await ToDoModel.findById(toDoId).exec();

    if (!toDo) {
      throw createHttpError(404, "ToDo not found");
    }

    if(!toDo.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this ToDo");
    }

    toDo.title = newTitle;
    toDo.text = newText;
    toDo.note = newNote;
    toDo.completed = isComleted;

    const updatedToDo = await toDo.save();

    res.status(200).json(updatedToDo);
  } catch (error) {
    next(error);
  }
};

export const deleteToDo: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const toDoId = req.params.toDoId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(toDoId)) {
      throw createHttpError(400, "Invalid ToDo id");
    }

    const toDo = await ToDoModel.findById(toDoId).exec();

    if (!toDo) {
      throw createHttpError(404, "Note not found");
    }

    if(!toDo.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this ToDo");
    }

    await toDo.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getcompletedToDos: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  
  try {
    assertIsDefined(authenticatedUserId);

    const toDos = await ToDoModel.find({userId: authenticatedUserId}, {completed: true}).exec();

    res.status(200).json(toDos);
  } catch (error) {
    next(error);
  }
};


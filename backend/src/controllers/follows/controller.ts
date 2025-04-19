import { NextFunction, Request, Response } from "express";
import Follow from "../../models/follow";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "socket-enums-vacations-tomerogn";

export async function follow(
  req: Request<{ vacationId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const follow = await Follow.create({
      userId: req.user.id,
      vacationId: req.params.vacationId,
    });
    res.json(follow);

    socket.emit(SocketMessages.FOLLOW, {
      from: req.headers['x-client-id'],
      data: { vacationId:  req.params.vacationId, user: req.user }
  })
  } catch (e) {
    if (e.message === "Validation error")
      return next(
        new AppError(StatusCodes.CONFLICT, "vacation already followed")
      );
    next(e);
  }
}

export async function unfollow(
  req: Request<{ vacationId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const unfollow = await Follow.destroy({
      where: {
        userId: req.user.id,
        vacationId: req.params.vacationId,
      },
    });
    if (!unfollow)
      return next(
        new AppError(StatusCodes.NOT_FOUND, "tried to delete unexisting record")
      );
    res.json({ success: true });

    socket.emit(SocketMessages.UNFOLLOW, {
      from: req.headers['x-client-id'], 
      data: { vacationId: req.params.vacationId, user: req.user }
  })
  } catch (e) {
    next(e);
  }
}

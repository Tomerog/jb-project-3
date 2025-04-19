import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import { createHmac } from "crypto";
import config from "config";
import { sign } from "jsonwebtoken";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";

export function hashPassword(password: string): string {
  return createHmac("sha256", config.get<string>("app.secret"))
    .update(password)
    .digest("hex");
}

export async function login(
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user)
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, "Email incorrect or not found")
      );

    if (user.password !== hashPassword(password)) {
      return next(new AppError(StatusCodes.UNAUTHORIZED, "Incorrect password"));
    }

    const jwt = sign(
      user.get({ plain: true }),
      config.get<string>("app.jwtSecret")
    );
    res.json({ jwt });
  } catch (e) {
    next(e);
  }
}

export async function signUp(
  req: Request<
    {},
    {},
    { firstName: string; lastName: string; email: string; password: string }
  >,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      password: hashPassword(password),
      email,
    });

    const jwt = sign(
      user.get({ plain: true }),
      config.get<string>("app.jwtSecret")
    );
    res.json({ jwt });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError")
      return next(
        new AppError(
          StatusCodes.CONFLICT,
          `email ${email} already exists. please choose another email.`
        )
      );
    next(e);
  }
}

import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/vacation";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import User from "../../models/user";

export async function getAllVacations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const vacations = await Vacation.findAll({
      order: [["vacationStart", "ASC"]],
      include: [User],
    });
    res.json(vacations);
  } catch (e) {
    next(e);
  }
}

export async function addVacation(
  req: Request<
    {},
    {},
    {
      destination: string;
      description: string;
      vacationStart: Date;
      vacationEnd: Date;
      price: number;
      imageUrl: string;
    }
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const newVacation = await Vacation.create({ ...req.body });
    res.json(newVacation);
  } catch (e) {
    // check if need to add validation error handler
    next(e);
  }
}

export async function editVacation(
  req: Request<
    { id: string },
    {},
    {
      destination: string;
      description: string;
      vacationStart: Date;
      vacationEnd: Date;
      price: number;
      imageUrl: string;
    }
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);

    if (!vacation) {
      return next(new AppError(StatusCodes.NOT_FOUND, "Vacation not found"));
    }

    const {
      destination,
      description,
      vacationStart,
      vacationEnd,
      price,
      imageUrl,
    } = req.body;

    vacation.destination = destination;
    vacation.description = description;
    vacation.vacationStart = vacationStart;
    vacation.vacationEnd = vacationEnd;
    vacation.price = price;
    vacation.imageUrl = imageUrl;

    await vacation.save();

    res.json(vacation);
  } catch (e) {
    // check if need to add validation error handler
    next(e);
  }
}

export async function removeVacation(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const deleted = await Vacation.destroy({ where: { id } });

    if (deleted === 0)
      return next(
        new AppError(
          StatusCodes.NOT_FOUND,
          "Vacation not found or does not exist"
        )
      );

    res.json({ success: true });
  } catch (e) {
    // check if need to add validation error handler
    next(e);
  }
}

export async function exportFollowersCSV(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Fetch all vacations with their followers
    const vacations = await Vacation.findAll({
      include: [
        {
          model: User,
          as: "followers",
          attributes: ["id"], // We only need the IDs for counting
        },
      ],
      order: [["destination", "ASC"]], // Sort by destination
    });

    // Set headers for CSV download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=vacation_followers.csv"
    );

    // Write CSV header
    res.write("Destination,Followers\n");

    // Write data rows
    vacations.forEach((vacation) => {
      // Properly escape any commas in the destination name
      const safeDestination = vacation.destination.includes(",")
        ? `"${vacation.destination}"`
        : vacation.destination;

      res.write(`${safeDestination},${vacation.followers.length}\n`);
    });

    // End the response
    res.end();
  } catch (e) {
    next(e);
  }
}

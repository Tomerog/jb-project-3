import { Request, Response } from "express";
import enforceAuth from "./enforce-auth";
import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app-error";
import { sign } from "jsonwebtoken";
import config from "config";

describe("enforce-auth middleware tests", () => {
  test("calls next with a 401 error when no authorization header is provided", () => {
    const request = { headers: {} } as Request;
    const response = {} as Response;
    const next = jest.fn((err) => {});
    enforceAuth(request, response, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0]).toEqual(
      new AppError(StatusCodes.UNAUTHORIZED, "Missing authorization header")
    );
  });
  test("success when all is valid", () => {
    const jwt = sign({}, config.get<string>("app.jwtSecret"));
    const request = {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    } as Request;
    const response = {} as Response;
    const next = jest.fn((err) => {});
    enforceAuth(request, response, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0]).toBeUndefined();
  });
  test("calls next with 401 if authorization header does not have two parts", () => {
    const request = {
      headers: {
        authorization: "BearerOnlyNoSpace",
      },
    } as Request;
    const response = {} as Response;
    const next = jest.fn();

    enforceAuth(request, response, next);

    expect(next).toHaveBeenCalledWith(
      new AppError(StatusCodes.UNAUTHORIZED, "bad authorization header")
    );
  });
  test("calls next with 401 if authorization header does not start with 'Bearer'", () => {
    const jwt = sign({}, config.get<string>("app.jwtSecret"));
    const request = {
      headers: {
        authorization: `Token ${jwt}`, // wrong scheme
      },
    } as Request;
    const response = {} as Response;
    const next = jest.fn();

    enforceAuth(request, response, next);

    expect(next).toHaveBeenCalledWith(
      new AppError(StatusCodes.UNAUTHORIZED, "bad authorization header")
    );
  });
  test("calls next with 401 if JWT is invalid", () => {
    const request = {
      headers: {
        authorization: "Bearer invalid.jwt.token",
      },
    } as Request;
    const response = {} as Response;
    const next = jest.fn();

    enforceAuth(request, response, next);

    expect(next).toHaveBeenCalledWith(
      new AppError(StatusCodes.UNAUTHORIZED, "invalid JWT")
    );
  });
});

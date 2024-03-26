import { Request } from "express";


export const extractJWT = (req: Request) => {
  if (!req.headers.authorization) {
    throw new Error("Authorization header missing");
  }

  const [schema, token] = req.headers.authorization.split(" ");

  if (schema !== "Bearer") {
    throw new Error("Invalid authentication.");
  }

  if (!token) {
    throw new Error("JWT token missing");
  }
  return token;
};

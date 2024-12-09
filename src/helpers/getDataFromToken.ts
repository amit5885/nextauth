import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

interface Token {
  id: ObjectId;
  username: string;
  email: string;
}

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as Token;
    return decodedToken.id;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

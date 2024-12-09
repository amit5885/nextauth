import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", sucess: true },
      { status: 200 },
    );

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

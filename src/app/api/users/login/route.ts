import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



connect();

export async function POST(request: NextRequest) {
  console.log("hello ");

  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    console.log("******", requestBody);
    const user = await User.findOne({ email });
    console.log(user, "0000000000");

    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    // check password
    if (!validPassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    //create token data
    const token = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET as string,
      { expiresIn: 3600 }
    );

    const response = NextResponse.json({
      message: "login Sucessfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true});
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
    {
      status: 500;
    }
  }
}

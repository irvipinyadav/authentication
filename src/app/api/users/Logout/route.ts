import { NextResponse } from "next/server";

export async function GET() {
  try {
    const respose = await NextResponse.json({
      message: "logout successful",
      success: true,
    });
    await respose.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.meessage,
      },
      { status: 500 }
    );
  }
}

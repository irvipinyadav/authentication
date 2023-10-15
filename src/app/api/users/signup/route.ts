import{ connect} from "@/dbConfig/dbConfig"

import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect()

export async function POST(request:NextRequest){
    try{
        const requestBody = await request.json()
        const {email, password,username} = requestBody
        console.log("******",requestBody )
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"user already exists"},{status:409})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        return NextResponse.json({
            message:"user created successfully",
            success: true,
            savedUser

        })
         
    }
    catch(error:any){
        return NextResponse.json("error***********88",error)

    }
}


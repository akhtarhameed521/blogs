// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.models";
import { connectDB } from "@/database/db.config";
import { registerSchema } from "@/lib/validationSchema/schema";
import { handleError } from "@/lib/errorHandling/errorHandler";

connectDB()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = registerSchema.parse(body);

    const existingUser = await User.findOne({ email: data.email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 401 }
      );
    }
   
    const hashedPassword = await bcrypt.hash(data.password, 10);
   
    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
   
    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    
    return handleError(error);
  }
}

export async function GET(){
  try {
    const user = await User.find()
    if(!user.length) return NextResponse.json({message: "no user found"})
    return NextResponse.json({  message: "user fetched successfully", user })
  } catch (error) {
    return handleError(error)
  }
}
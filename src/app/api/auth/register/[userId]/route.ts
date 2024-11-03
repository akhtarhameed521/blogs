// src/app/api/auth/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.models";
import { connectDB } from "@/database/db.config";
import { handleError } from "@/lib/errorHandling/errorHandler";
import { updateUserSchema } from "@/lib/validationSchema/updateSchema";
import { UploadImage } from "@/lib/uploadImage";


export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Parse the request body
    const formData = await req.formData();
    const updateData = Object.fromEntries(formData.entries());
    const { userId } = params;
    console.log("user id is", userId);

    // Validate data with Zod
    const data = updateUserSchema.parse(updateData);

    // Connect to the database
    await connectDB();

    // Find and update the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update fields if they are provided
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.description) user.description = data.description;
    if (data.password) user.password = await bcrypt.hash(data.password, 10);

    // Handle image upload and save only the secure_url
    if (data.image) {
      const uploadedImageUrl = await UploadImage(data.image as unknown as File, "e-image");
      user.image = uploadedImageUrl;  // Save only the URL
    }

    // Save updated user
    await user.save();

    // Respond with success message
    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    // Centralized error handling
    return handleError(error);
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Extract userId from the route parameters
    const { userId } = params;

    // Validate that userId is provided
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Find and delete the user
    const user = await User.findByIdAndDelete(userId);

    // Check if the user was found and deleted
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Respond with a success message
    return NextResponse.json(
      { message: "User deleted successfully", userId },
      { status: 200 }
    );
  } catch (error) {
    // Centralized error handling
    return handleError(error);
  }
}

export async function GET(req: NextRequest, { params }: { params: { userId: string } }){
  try {
    const {userId} = params
    const user = await User.findById(userId)
    if(!user) return NextResponse.json({error: "user does not found", status: 400})

    return NextResponse.json({
      message: "user fetched successfullu",
      status: 200,
      user
    })
  } catch (error) {
    console.log(error)
    handleError(error)
  }
}
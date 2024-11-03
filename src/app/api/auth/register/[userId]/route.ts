// src/app/api/auth/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.models";
import { connectDB } from "@/database/db.config";
import { handleError } from "@/lib/errorHandling/errorHandler";
import { updateUserSchema } from "@/lib/validationSchema/updateSchema";
import { UploadImage } from "@/lib/uploadImage";

// Update user information
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Check if userId is provided in the parameters
    const { userId } = params;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Parse the request body and convert FormData to an object
    const formData = await req.formData();
    const updateData = Object.fromEntries(formData.entries());

    // Validate data with Zod
    const data = updateUserSchema.parse(updateData);

    // Connect to the database
    await connectDB();

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the email is already taken by another user
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return NextResponse.json(
        { error: "Email already exists, please try a different email" },
        { status: 409 }
      );
    }

    // Update fields if they are provided
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.description) user.description = data.description;
    if (data.password) user.password = await bcrypt.hash(data.password, 10);

    // Handle image upload and save only the secure URL
    if (data.image) {
      try {
        const uploadedImageUrl = await UploadImage(data.image as unknown as File, "e-image");
        user.image = uploadedImageUrl;
      } catch (uploadError) {
        return handleError(new Error("Image upload failed, please try again"));
      }
    }

    // Save the updated user
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

// Delete a user
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Check if userId is provided in the parameters
    const { userId } = params;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Find and delete the user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Respond with success message
    return NextResponse.json(
      { message: "User deleted successfully", userId },
      { status: 200 }
    );
  } catch (error) {
    // Centralized error handling
    return handleError(error);
  }
}

// Fetch a user by ID
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Check if userId is provided in the parameters
    const { userId } = params;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Respond with user data
    return NextResponse.json(
      { message: "User fetched successfully", user },
      { status: 200 }
    );
  } catch (error) {
    // Centralized error handling
    return handleError(error);
  }
}

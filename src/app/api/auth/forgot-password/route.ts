import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.models";
import { connectDB } from "@/database/db.config";
import { sendResetEmail } from "@/lib/sendEmail";
import { randomBytes } from "crypto";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    // Generate a reset token and its expiration date
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // Send the reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendResetEmail(user.email, resetUrl);

    return NextResponse.json(
      { message: "Password reset email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot-password:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

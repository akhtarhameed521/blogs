// src/lib/utils/errorHandler.ts
import { ZodError } from "zod";
import { NextResponse } from "next/server";

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    return NextResponse.json({ errors: formattedErrors }, { status: 400 });
  }

  console.error("Unexpected error:", error);
  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 }
  );
}

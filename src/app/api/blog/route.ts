import { NextResponse } from "next/server";
import { handleError } from "@/lib/errorHandling/errorHandler";
import { UploadImage } from "@/lib/uploadImage";
import { Blog } from "@/models/blog.models";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/option";
// import { authOptions } from "@/path/to/your/nextauth";  // Adjust the import path accordingly

export async function POST(request: Request) {
    try {
        // Fetch session data on the server
        const session = await getServerSession(authOption);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content, postedBy, tags, category, userImage } = await request.json();

        
        
        // You can store either the short URL directly or just the public ID
        const newPost = {
            postedBy: session.user.name,
            userId: session.user.id,
            title,
            content: content, 
            tags,
            category,
            userImage: session.user.image || ""
        }        
        const response = await Blog.create(newPost);

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        handleError(error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const title = searchParams.get("title") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const older = searchParams.get("older") === "true";
        const latest = searchParams.get("latest") === "true";

        const filter: any = {};
        if (userId) {
            filter.userId = userId;
        }
        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }

        const skip = (page - 1) * limit;

        
        const sortOrder: { createdAt: 1 | -1 } = latest ? { createdAt: 1 } : { createdAt: -1 };


        const blogs = await Blog.find(filter).sort(sortOrder).skip(skip).limit(limit);
        const totalBlogs = await Blog.countDocuments(filter);

        if (!blogs.length) {
            return NextResponse.json({ message: "No blogs found" });
        }

        return NextResponse.json({
            data: blogs,
            pagination: {
                totalBlogs,
                currentPage: page,
                totalPages: Math.ceil(totalBlogs / limit),
            },
        });
    } catch (error) {
        handleError(error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}


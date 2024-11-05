import { handleError } from "@/lib/errorHandling/errorHandler";
import { Blog } from "@/models/blog.models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE( request : NextRequest, {params} : {params: any} ){
    const {id} = params
    await Blog.findByIdAndDelete(id)
    return NextResponse.json({message: "deleted"})
}

export async function GET(request : NextRequest, {params} : {params: any}){
    const {id} = params
    const blog = await Blog.findById(id)
    return NextResponse.json(blog)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { title, content, tags, images } = await request.json();

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        // Update blog fields
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.tags = tags || blog.tags;
       
       
        const updatedBlog = await blog.save();
        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        handleError(error);
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}


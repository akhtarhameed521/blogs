import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string ;

console.log(baseUrl)
//user auth apis

export async function userRegister(newUser: UserRegisterType): Promise<UserRegisterType> {
    const response = await axios.post(`${baseUrl}/auth/register`, newUser);
     
    const data = response.data;
    
    return data; 
}

export async function getAllUsers(): Promise<UserRegisterType[]> {
    const response = await axios.get(`${baseUrl}/auth/register`); 
    const data = response.data;
    return data;
}

export async function getUser (id: string): Promise<UserRegisterType> {
    const response = await axios.get(`${baseUrl}/auth/register/${id}`);
    const data = response.data
    return data 
}

export async function updateRegister ( id: string, updateValue : UpdateUserType ) : Promise<UpdateUserType> {
    const response = await axios.put(`${baseUrl}/auth/register/${id}`, updateValue)
    const data =  response.data
    return data
}

export async function forgetPassword(emailData: ForgotPasswordTypes): Promise<void> {
   const response = await axios.post(`${baseUrl}/auth/forgot-password`, emailData);
   return response.data
}

export async function resetPassword({ token, password, confirmPassword }: resetPasswordTypes ): Promise<resetPasswordTypes> {
    const response = await axios.post(`${baseUrl}/auth/reset-password`, { token, password, confirmPassword });

    return response.data;
  }

//blog apis

export async function createBlog(newBlog: CreateBlogTypes): Promise<CreateBlogTypes> {
    return await axios.post(`${baseUrl}/blog`, newBlog);
}

export async function getBlogs(page = 1, limit = 10, title?: string, userId?: string, sort?: string): Promise<CreateBlogTypes[]> {
    const url = new URL(`${baseUrl}/blog`);
    
    if (page) url.searchParams.append("page", page.toString());
    if (limit) url.searchParams.append("limit", limit.toString());
    if (title) url.searchParams.append("title", title);
    if (userId) url.searchParams.append("userId", userId);
    if (sort) url.searchParams.append("sort", sort);

    const response = await axios.get(url.toString());
    return response.data.data;
}



export async function getBlog(id: string): Promise<CreateBlogTypes> {
    const response = await axios.get(`${baseUrl}/blog/${id}`);
    return response.data;
}

export async function updateBlog(id: string, updatedBlog: Partial<CreateBlogTypes>): Promise<CreateBlogTypes> {
    const response = await axios.put(`${baseUrl}/blog/${id}`, updatedBlog);
    return response.data;
}

export async function deleteBlog(id: string) {
    const response = await axios.delete(`${baseUrl}/blog/${id}`)
    return response.data
}


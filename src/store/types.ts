export type userStore = {
    users: Array<UserRegisterType>,
    apiError: { [key: string]: string } | null;
    loadUser: () => Promise<void>,
    getUser : (id: string) =>  Promise<void>
    createUser: (value: UserRegisterType) => Promise<void>,
    updateUser: ( id: string, value: UpdateUserType ) => Promise<void>
    forgetPassword: (value: ForgotPasswordTypes) => Promise<void>
    resetPassword: ( {password, token, confirmPassword} : resetPasswordTypes ) => Promise<void>
};

export type blogStore = {
    blogs: Array<CreateBlogTypes>,
    selectedBlog: CreateBlogTypes | null,
    loading: boolean,
    page: number, 
    limit: number, 
    searchTitle: string, 
    createBlog: (value: CreateBlogTypes) => Promise<CreateBlogTypes>,
    getBlogs: (userId?: string, page?: number, limit?: number, title?: string, sort?: string) => Promise<void>,
    getBlog: (value: string) => Promise<void>,
    editBlogs: (id: string, updatedBlog: Partial<CreateBlogTypes>) => Promise<void>,
    deleteBlogs: (id: string) => Promise<void>,
};









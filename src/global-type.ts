type UserRegisterType = {
    name: string,
    email: string,
    password: string
    description?: string
    image?: File | null
    confirmPassword?: string
}

type userLogin = {
    email: string,
    password: string
}

type UpdateUserType = FormData | {
    name: string,
    email: string,
    image?: File | null,
    description?: string,
    password: string,
  };

type globalId = {
    id: string
}

type ForgotPasswordTypes = {
    email: string
}

type resetPasswordTypes ={
    password: string,
    confirmPassword: string
    token: string

}

type CreateBlogTypes = {  
    title: string,
    content: string,
    category: string,
    tags: string[]
    userImage?: File | null
    createdAt?: Date | any
    postedBy?: string
    userId?: string
    _id?: string,
}